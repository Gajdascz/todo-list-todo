import { buildElementTree, createCustomSelectObj } from '../../logic/utility/domHelperFunctions';


const taskFormObj = (type, formType='dialog') => {
  return {
    type: 'form', 
    attributes: {class: `task-${formType}-form ${type}-${formType}-form`}
  }
};


const formCustomPrioritySelectObj = (value=null, formType='dialog') => {
  let valueText;
  if(value) valueText = value.slice(0,1).toUpperCase() + value.slice(1);
  return  createCustomSelectObj({
            section: `task-${formType}-form`,
            identifier: `task-${formType}-form-priority`,
            defaultSelectText: valueText ? valueText : 'Priority',
            options: ['Urgent', 'High', 'Medium', 'Low', 'None'],
            value  
          }  
  )
};
const formDescriptionInputObj = (value=null, formType='dialog') => {
  return createTextAreaObj({
    id: `task-${formType}-form-description`,
    name: `task-${formType}-form-description`,
    rows: 5,
    cols: 30,
    placeholder: `Task Description`,
    value,
  });
};
const formTitleInputObj = (value=null, formType='dialog') => {
  return createTextInputObj({
    id: `task-${formType}-form-title`,
    placeholder: 'Task',
    identifier: 'title',
    required: true,
    value
  })
};
const formDueInputObj = (dueDate=null, dueTime=null, formType='dialog') => {
  const taskDueDateObj = createDatePickerObj({
                          id: 'due-date',
                          name: 'due-date',
                          value: dueDate
                        });
  const taskDueTimeObj =  createTimePickerObj({
                            id: 'due-time',
                            name: 'due-time',
                            value: dueTime
  });

  const taskDueContainer = { type: 'div',
                                attributes: {class: `task-${formType}-form-due-container`},
                                children: [
                                  taskDueDateObj,
                                  taskDueTimeObj
                                ]
                              }
  return taskDueContainer
};
const formSubtaskInputObj = (formType='dialog') => {
  return { type: 'div', 
           attributes: {class:'subtask-input-container'},
           children: [
            { type: 'label', attributes: { for: 'subtask-input'},
              children: [
                { type: 'input',
                attributes: { type: 'text', class: `task-${formType}-form-subtask-text-input`, id: 'subtask-input', placeholder: 'Subtask', maxlength: '18'},
              },
              ]},
            { type: 'button', text: '+', attributes: {type:'button', class: `task-${formType}-form-add-subtask-button`},
              listeners: { 'click': [
                (e) => {
                  const subtaskContainer = document.querySelector(`.task-${formType}-form-subtask-container`);
                  const textInput = document.querySelector(`input.task-${formType}-form-subtask-text-input`);
                  let text = textInput.value.trim()
                  let subtaskEntry;
                  if(text !== ''){
                    subtaskEntry = createSubtaskEntryObj(text);
                    subtaskContainer.append(buildElementTree(subtaskEntry));
                  }
                  textInput.value = '';
                }
              ]}}
           ]}
};
const formSubtaskContainerObj = (value=null, formType='dialog') => {
  const subtasks = [];
  if(value) { 
    value.forEach(subtask => {
      subtasks.push(createSubtaskEntryObj(subtask));
    })
  }
  return { type:'div', 
           attributes: {class: `task-${formType}-form-subtask-container`},
           children: subtasks
          }
};
const formMainButtonContainerObj = (type, formType='dialog') => {
  const buttons = [];
  buttons.push(createSubmitButtonObj(type));
  if(type.match(/edit/i)) buttons.push(createDeleteButtonObj(formType));
  return {
    type: 'div',
    attributes: {class: `task-${formType}-form-main-button-container`},
    children: buttons,
  }
};



const createTimePickerObj = ({id,value='',min='',max='',required=false}) => {
  return { type: 'label', 
            attributes: {for: id},
            children: [
              { type: 'input',
                attributes: { type: 'time', 
                              id, 
                              class: `task-dialog-form-timepicker-input`,
                              value,
                              min,
                              max
                            }
              } 
            ]
         }
};
const createDatePickerObj = ({id,value='',min='0000-01-01',max='9999-01-01',required=false}) => {
  return { type: 'label', 
            attributes: {for: id},
            children: [
              { type: 'input',
                attributes: { type: 'date', 
                              id, 
                              class: `task-dialog-form-datepicker-input`,
                              value,
                              min,
                              max
                            }
              } 
            ]
         }
};
const createTextInputObj = ({id, identifier, value=null, placeholder=null, required=false}) => {
  return { type: 'label', 
           attributes: {for: id}, 
            children: [
              { type: 'input', 
                attributes: { type: 'text', 
                              id: id, 
                              class: `task-dialog-form-text-input task-dialog-form-${identifier}-input`, 
                              placeholder,
                              required,
                              value: value ? value : ''
                            }
              }
            ]
          }
} ;
const createTextAreaObj = ({id, name, rows, cols, placeholder='', value=null}) => {
  if(!name) name = id;
  return { type: 'label', 
           attributes: {for: id},
            children: [
              { type: 'textarea',
                text: value,  
                attributes: { type: 'text', 
                              id: id, 
                              class: `task-dialog-form-description-input`,
                              rows,
                              cols,
                              placeholder
                            }
              }
            ]
          }
};
const createSubtaskEntryObj = (subtask, formType='dialog') => {
  return {  type: 'div', attributes: {class:'subtask-entry-container'},
            children: [
              { type: 'button', text:'-', attributes: {type: 'button', class: 'subtask-entry-delete-button'},
                listeners: {
                  'click' : [
                    function (e) {
                      this.parentElement.remove();
                    }
                  ]
                }
              },
              { type: 'p', text: subtask, attributes: {class: `task-${formType}-form-subtask-entry-text`}}
            ]
         }
};
const createSubmitButtonObj = (type, formType='dialog') => {
  return { type: 'button',
           text: 'Submit',
           attributes: {  type: 'button', 
                          class:`task-${formType}-form-submit-button`, 
                          id: `task-${formType}-form-submit-${type}`,
                       }
         }
};
const createDeleteButtonObj = (formType='dialog') => {
  return { type: 'button',
           text: 'Delete',
           attributes: {  type: 'button', 
                          class:`task-${formType}-form-delete-button`, 
                          id: `task-${formType}-form-delete`,
                       }
         }
};



export {
  taskFormObj,
  formCustomPrioritySelectObj,
  formTitleInputObj,
  formDueInputObj,
  formDescriptionInputObj,
  formSubtaskInputObj,
  formSubtaskContainerObj,
  formMainButtonContainerObj,
}