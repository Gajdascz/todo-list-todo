import { buildElementTree, createCustomSelectObj } from '../utility';
import { buildBaseDialogElement } from './buildBaseDialog';
import { processTaskFormData } from '../processing/processTaskFormData'
import { findUserTask } from '../processing/taskGroupManager';
import { buildWarningDialog } from './buildWarningDialog'

export const buildTaskDialogForm = (type, title, taskID) => {
  const taskDialog = buildBaseDialogElement(title);
  if(taskID) {
    const task = findUserTask(taskID);
    const taskForm = buildTaskForm(type, task);
    taskDialog.append(taskForm);
    return taskDialog;
  }
    const taskForm = buildTaskForm(type);
    taskDialog.append(taskForm);
    return taskDialog;
}

const buildTaskForm = (type, task=null) => {
  console.log(task);
  if(!task){
    return buildElementTree(
      { type: 'form', 
        attributes: {class: `task-dialog-form ${type}-dialog-form`}, 
        children: [
          createTaskPriorityCustomSelectObj(),
          createTaskTitleObj(),
          createTaskDueObj(),
          createTaskDescriptionObj(),
          createSubTaskInputObj(),
          createSubTaskContainerObj(),
          createTaskSubmitButtonObj(type),
        ]
      }
    );
  } if(task) {
      return buildElementTree(
      { type: 'form', 
        attributes: {class: `task-dialog-form ${type}-dialog-form`}, 
        children: [
          createTaskPriorityCustomSelectObj(task.priority),
          createTaskTitleObj(task.title),
          createTaskDueObj(task.dueDate, task.dueTime),
          createTaskDescriptionObj(task.description),
          createSubTaskInputObj(),
          createSubTaskContainerObj(task.subtasks),
          createMainButtonContainerObj(type, task.taskID),
        ]
      }
    );
  }
};

const createMainButtonContainerObj = (type, taskID) => {
  const buttons = [];
  buttons.push(createTaskSubmitButtonObj(type, taskID));
  if(type === 'edit-task') {
    buttons.push(createTaskDeleteButtonObj(taskID))
  }
  return {
    type: 'div',
    attributes: {class: 'task-dialog-form-main-button-container'},
    children: buttons,
  }
}


const createTaskPriorityCustomSelectObj = (value=null) => {
  let valueText;
  if(value) valueText = value.slice(0,1).toUpperCase() + value.slice(1);
  return  createCustomSelectObj({
            section: `task-dialog-form`,
            identifier: `task-dialog-form-priority`,
            defaultSelectText: valueText ? valueText : 'Priority',
            options: ['Urgent', 'High', 'Medium', 'Low', 'None'],
            value  
          }  
  )
};

const createTaskDescriptionObj = ( value=null) => {
  return createTextAreaObj({
    id: `task-dialog-form-description`,
    name: `task-dialog-form-description`,
    rows: 5,
    cols: 30,
    placeholder: `Task Description`,
    value,
  })
};

const createTaskTitleObj = (value=null) => {
  return createTextInputObj({
    id: 'task-dialog-form-title',
    placeholder: 'Task',
    identifier: 'title',
    required: true,
    value
  })
};

const createTaskDueObj = (dueDate=null, dueTime=null) => {
  if(dueDate) dueDate = `${dueDate.slice(-4)}-${dueDate.slice(0,2)}-${dueDate.slice(3,5)}`;
  if(dueTime) dueTime = `${dueTime.slice(0,2)}:${dueTime.slice(3,5)}`;
  const taskDueDateObj = createFormDatePickerObj({
                          id: 'due-date',
                          name: 'due-date',
                          value: dueDate
                        });
  const taskDueTimeObj =  createFormTimePickerObj({
                            id: 'due-time',
                            name: 'due-time',
                            value: dueTime
  });

  const taskDueContainer = { type: 'div',
                                attributes: {class: `task-dialog-form-due-container`},
                                children: [
                                  taskDueDateObj,
                                  taskDueTimeObj
                                ]
                              }
  return taskDueContainer
};

const createFormTimePickerObj = ({id,value='',min='',max='',required=false}) => {
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

const createFormDatePickerObj = ({id,value='',min='',max='',required=false}) => {
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

const createSubTaskInputObj = () => {
  return { type: 'div', 
           attributes: {class:'subtask-input-container'},
           children: [
            { type: 'label', attributes: { for: 'subtask-input'},
              children: [
                { type: 'input',
                attributes: { type: 'text', class: `task-dialog-form-subtask-text-input`, id: 'subtask-input', placeholder: 'Subtask', maxlength: '18'},
              },
              ]},
            { type: 'button', text: '+', attributes: {type:'button', class: `task-dialog-form-add-subtask-button`},
              listeners: { 'click': [
                (e) => {
                  const subtaskContainer = document.querySelector(`.task-dialog-form-subtask-container`);
                  const textInput = document.querySelector(`input.task-dialog-form-subtask-text-input`);
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

const createSubtaskEntryObj = (subtask) => {
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
              { type: 'p', text: subtask, attributes: {class: `task-dialog-form-subtask-entry-text`}}
            ]
         }
  };

const createSubTaskContainerObj = (value=null) => {
  const subtasks = [];
  if(value) { 
    value.forEach(subtask => {
      subtasks.push(createSubtaskEntryObj(subtask))
    })
  }
  return { type:'div', 
           attributes: {class: 'task-dialog-form-subtask-container'},
           children: subtasks
          }
};

const createTaskSubmitButtonObj = (type, taskID=null) => {
  return { type: 'button',
           text: 'Submit',
           attributes: {  type: 'submit', 
                          class:`task-dialog-form-submit-button`, 
                          id: `task-dialog-form-submit-${type}`,
                       },
           listeners: {
            'click': [
              function (e) { 
                e.preventDefault();
                let isNew = type === 'new-task' ? true : false;
                processTaskFormData(isNew, taskID);
                const form = this.closest('form');
                form.reset();
                document.querySelector('button.dialog-close-icon-button').click();
                
              }
            ] 
           }
         }
};

const createTaskDeleteButtonObj = (taskID) => {
  return { type: 'button',
           text: 'Delete',
           attributes: {  type: 'button', 
                          class:`task-dialog-form-delete-button`, 
                          id: `task-dialog-form-delete`,
                       },
           listeners: {
            'click': [
              function (e) { 
                console.log(taskID);
                const warningDialog = buildWarningDialog('Are you sure you want to delete this task? This action is irreversible.', taskID);
                document.body.append(warningDialog);
                warningDialog.showModal();
                document.querySelector('button.dialog-close-icon-button').click();
                
              }
            ] 
           }
         }
};


