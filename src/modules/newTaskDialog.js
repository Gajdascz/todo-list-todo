import { buildElementTree, buildIconButtonObj,createCustomSelectObj, dateHelper } from './utility';
import { buildBaseDialogElement } from './baseDialog';

const buildNewTaskDialog = () => {
  const taskDialog = buildBaseDialogElement('New Task');
  taskDialog.append(buildNewTaskForm());
  return taskDialog;
}

const buildNewTaskForm = () => {
  return buildElementTree(
    { type: 'form', 
      attributes: {class: 'new-task-dialog-form'}, 
      children: [
        createNewTaskCustomSelectObj(),
        createNewTaskTitleObj(),
        createNewTaskDueObj(),
        createNewTaskDescriptionObj(),
        createSubTaskInputObj(),
        createSubTaskContainerObj(),
        createNewTaskSubmitButtonObj(),
      ]
    }
  );
}

const createNewTaskCustomSelectObj = () => {
  return  createCustomSelectObj({
            section: 'new-task-form',
            identifier: 'dropdown',
            defaultSelectText: 'Priority',
            options: ['Urgent', 'High', 'Medium', 'Low', 'None']  
          }  
  )
}

const createNewTaskDescriptionObj = () => {
  return createTextAreaObj({
    id: 'new-task-description',
    name: 'new-task-description',
    form: 'new-task-description',
    rows: 5,
    cols: 30,
    placeholder: `Task Description`,
  })
}

const createNewTaskTitleObj = () => {
  return createTextInputObj({
    id: 'new-task-title',
    name: 'new-task-title',
    form: 'new-task',
    placeholder: 'Task',
  })
}

const createNewTaskDueObj = () => {
  const TODAY = new Date();
  const month = TODAY.getMonth();
  const year = TODAY.getFullYear();
  const dayOfMonth = TODAY.getDate();
  let today = `${year}-${month}-${dayOfMonth}`;
  const taskDueDateObj = createFormDatePickerObj({
                          id: 'due-date',
                          name: 'due-date',
                          form: 'new-task',
                          value: today,
                          min: today,
                        });
  const taskDueTimeObj =  createFormTimePickerObj({
                            id: 'due-time',
                            name: 'due-time',
                            form: 'new-task',
  });

  const newTaskDueContainer = { type: 'div',
                                attributes: {class:'new-task-due-container'},
                                children: [
                                  taskDueDateObj,
                                  taskDueTimeObj
                                ]
                              }
  return newTaskDueContainer
}

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
}

const createFormDatePickerObj = ({id,name,form,value,min,max,required=false}) => {
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
}

const createTextInputObj = ({id, form, name=null, placeholder=null}) => {
  if(!name) name = id;
  return { type: 'label', 
           attributes: {for: id}, 
            children: [
              { type: 'input', 
                attributes: { type: 'text', 
                              id: id, 
                              class: `${form}-text-input ${form}-text-${name}-input`, 
                              placeholder
                            }
              }
            ]
          }
} 

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
}

const createSubTaskInputObj = () => {
  return { type: 'div', 
           attributes: {class:'subtask-input-container'},
           children: [
            { type: 'label', attributes: { for: 'subtask-input'}},
            { type: 'input',
              attributes: { class: 'subtask-input', id: 'subtask-input', placeholder: 'Subtask'},
            },
            {type: 'button', text: '+', attributes: {class: 'new-task-form-add-subtask-button'}}
           ]}
} 

const createSubTaskContainerObj = () => {
  return { type:'div', 
           attributes: {class: 'new-task-form-subtask-container'}
          }
}

const createNewTaskSubmitButtonObj = () => {
  return { type: 'button',
           text: 'Submit',
           attributes: {  type: 'submit', 
                          class:'new-task-form-button new-task-form-submit', 
                          id:'new-task-submit'
                       },
           listeners: {
            'click': [
              (e) => { 
                e.preventDefault();
              }
            ] 
           }
         }
}



export default buildNewTaskDialog;