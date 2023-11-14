import { buildElementTree, createCustomSelectObj } from '../utility';
import { buildBaseDialogElement } from './buildBaseDialog';
import { processTaskFormData } from '../processing/processNewTaskFormData'

import { buildTaskCard } from './buildTaskCard';
import { renderTaskCard } from '../render';

export const buildTaskDialogForm = (type, title) => {
  const newTaskDialog = buildBaseDialogElement(title);
  const newTaskForm = buildTaskForm(type);
  newTaskDialog.append(newTaskForm);
  return newTaskDialog
}

const buildTaskForm = (type) => {
  return buildElementTree(
    { type: 'form', 
      attributes: {class: `${type}-dialog-form`}, 
      children: [
        createTaskPriorityCustomSelectObj(type),
        createTaskTitleObj(type),
        createTaskDueObj(type),
        createTaskDescriptionObj(type),
        createSubTaskInputObj(type),
        createSubTaskContainerObj(type),
        createTaskSubmitButtonObj(type),
      ]
    }
  );
};

const createTaskPriorityCustomSelectObj = (type) => {
  return  createCustomSelectObj({
            section: `${type}-form`,
            identifier: `${type}-priority`,
            defaultSelectText: 'Priority',
            options: ['Urgent', 'High', 'Medium', 'Low', 'None']  
          }  
  )
};

const createTaskDescriptionObj = (type) => {
  return createTextAreaObj({
    id: `${type}-description`,
    name: `${type}-description`,
    form: `${type}-description`,
    rows: 5,
    cols: 30,
    placeholder: `Task Description`,
  })
};

const createTaskTitleObj = (type) => {
  return createTextInputObj({
    id: 'title',
    name: 'title',
    form: `${type}`,
    placeholder: 'Task',
    required: true,
  })
};

const createTaskDueObj = (type) => {
  const TODAY = new Date();
  const month = TODAY.getMonth();
  const year = TODAY.getFullYear();
  const dayOfMonth = TODAY.getDate();
  let today = `${year}-${month}-${dayOfMonth}`;
  const taskDueDateObj = createFormDatePickerObj({
                          id: 'due-date',
                          name: 'due-date',
                          form: `${type}`,
                          min: today,
                        });
  const taskDueTimeObj =  createFormTimePickerObj({
                            id: 'due-time',
                            name: 'due-time',
                            form: `${type}`,
  });

  const taskDueContainer = { type: 'div',
                                attributes: {class: `${type}-due-container`},
                                children: [
                                  taskDueDateObj,
                                  taskDueTimeObj
                                ]
                              }
  return taskDueContainer
};

const createFormTimePickerObj = ({id,name,form,value='',min='',max='',required=false}) => {
  if(!name) name = id;
  return { type: 'label', 
            attributes: {for: id},
            children: [
              { type: 'input',
                attributes: { type: 'time', 
                              id, 
                              class: `${form}-timepicker-input ${form}-timepicker-${name}-input`,
                              value,
                              min,
                              max
                            }
              } 
            ]
         }
};

const createFormDatePickerObj = ({id,name,form,value='',min='',max='',required=false}) => {
  if(!name) name = id;
  return { type: 'label', 
            attributes: {for: id},
            children: [
              { type: 'input',
                attributes: { type: 'date', 
                              id, 
                              class: `${form}-datepicker-input ${form}-datepicker-${name}-input`,
                              value,
                              min,
                              max
                            }
              } 
            ]
         }
};

const createTextInputObj = ({id, form, name=null, placeholder=null, required=false}) => {
  if(!name) name = id;
  return { type: 'label', 
           attributes: {for: id}, 
            children: [
              { type: 'input', 
                attributes: { type: 'text', 
                              id: id, 
                              class: `${form}-text-input ${form}-${name}-text-input`, 
                              placeholder,
                              required
                            }
              }
            ]
          }
} ;

const createTextAreaObj = ({id, form, name, rows, cols, placeholder=''}) => {
  if(!name) name = id;
  return { type: 'label', 
           attributes: {for: id}, 
            children: [
              { type: 'textarea', 
                attributes: { type: 'text', 
                              id: id, 
                              class: `${form}-textarea-input ${form}-textarea-${name}-input`,
                              rows,
                              cols,
                              placeholder
                            }
              }
            ]
          }
};

const createSubTaskInputObj = (type) => {
  return { type: 'div', 
           attributes: {class:'subtask-input-container'},
           children: [
            { type: 'label', attributes: { for: 'subtask-input'},
              children: [
                { type: 'input',
                attributes: { type: 'text', class: `${type}-form-subtask-text-input`, id: 'subtask-input', placeholder: 'Subtask', maxlength: '18'},
              },
              ]},
            { type: 'button', text: '+', attributes: {type:'button', class: `${type}-form-add-subtask-button`},
              listeners: { 'click': [
                (e) => {
                  const textInput = document.querySelector(`input.${type}-form-subtask-text-input`);
                  let text = textInput.value.trim()
                  if(text !== ''){
                    createSubTaskEntry(text, type);
                  }
                  textInput.value = '';
                }
              ]}}
           ]}
};

const createSubTaskEntry = (subtask, type) => {
  const subtaskContainer = document.querySelector(`.${type}-form-subtask-container`)
  subtaskContainer.append(buildElementTree(
    { type: 'div', attributes: {class:'subtask-entry-container'},
      children: [
        { type: 'button', text:'-', attributes: {type: 'button', class: 'subtask-entry-delete-button'},
          listeners: {
            'click' : [
              function (e) {
                this.parentElement.remove();
              }
            ]
          }},
        { type: 'p', text: subtask, attributes: {class: `${type}-subtask-entry-text`}}
      ]}
  ));
};

const createSubTaskContainerObj = () => {
  return { type:'div', 
           attributes: {class: 'new-task-form-subtask-container'}
          }
};

const createTaskSubmitButtonObj = (type) => {
  return { type: 'button',
           text: 'Submit',
           attributes: {  type: 'submit', 
                          class:`${type}-form-button ${type}-form-submit`, 
                          id: `${type}-submit`,
                       },
           listeners: {
            'click': [
              (e) => { 
                e.preventDefault();
                const fields = { priority:    `div.${type}-priority-selected-option`,
                                 title:       `input.${type}-title-text-input`,
                                 dueDate:     `input.${type}-datepicker-due-date-input`,
                                 dueTime:     `input.${type}-timepicker-due-time-input`,
                                 description: `textarea.${type}-description-textarea-input`,
                                 subtasks:    [`p.${type}-subtask-entry-text`]
                               };
                               console.log(fields.subtasks);
                const newTask = processTaskFormData(parseFormData(fields));
                const newTaskCard = buildTaskCard(newTask);
                renderTaskCard(newTaskCard)
                const newTaskForm = document.querySelector('form.new-task-dialog-form');
                newTaskForm.reset();
                document.querySelector('button.dialog-close-icon-button').click();
                
              }
            ] 
           }
         }
};

const parseFormData = (fields) => {
  const data = {};
  for(const [key,value] of Object.entries(fields)) {
    if(Array.isArray(value)) {
      if(value.length === 0) {
        data[key] = null;
      } else {
        const valueArray = [];
        value.forEach(element => {
          let valuesNodeList = document.querySelectorAll(element);
          valuesNodeList.forEach(node => {
            valueArray.push(node.textContent.trim())
          })
        })
        data[key] = valueArray; 
      }
    } 
    else {
        let element = document.querySelector(value);
        if(!element) { data[key] = null}
        else data[key] = (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') ? element.value.trim() : element.textContent.trim();
    }
  }
  return data
};
