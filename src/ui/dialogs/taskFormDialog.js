import { buildElementTree, eventHandler } from '../../logic/utility/domHelperFunctions';
import { buildBaseDialogElement } from './baseDialog';
import { processTaskFormData } from '../../logic/tasks/processTaskFormData'

import { renderDeleteWarningDialog } from '../../render';
import taskManager from '../../logic/tasks/taskManager';

import taskFormObjs from '../builders/taskFormObjs';



const taskDialogForm = (formContext, task=null) =>  {
  if(formContext.match(/new/i))       formContext = 'new-task';
  else if(formContext.match(/edit/i)) formContext = 'edit-task';
  else return;
  const taskDialogElement = buildBaseDialogElement(task ? 'Edit Task' : 'New Task');
  const taskForm = taskFormObjs.taskFormObj();
  taskForm.children = [
    taskFormObjs.prioritySelectObj(task ? task.priority : null),
    taskFormObjs.titleInputObj(task ? task.title : null),
    taskFormObjs.dueInputObj(task ? task.due : null),
    taskFormObjs.descriptionInputObj(task ? task.description : null),
    taskFormObjs.subtaskInputObj(),
    taskFormObjs.subtaskContainerObj(task ? task.subtasks : null),
    taskFormObjs.mainButtonContainerObj(formContext)
  ];

  taskDialogElement.append(buildElementTree(taskForm));


  const fieldSelectors = {
    priority:    `div.task-dialog-form-priority-selected-option`,
    title:       `input.task-dialog-form-title-text-input`,
    dueDate:     `input.task-dialog-form-datepicker-input`,
    dueTime:     `input.task-dialog-form-timepicker-input`,
    description: `textarea.task-dialog-form-description-textarea-input`,
    subtasks:    [`p.task-dialog-form-subtask-entry-text`]
  };

  const submitForm = (task=null) => {
    processTaskFormData(fieldSelectors, task ? task : null);
    taskDialogElement.querySelector('form').reset();
    taskDialogElement.close()
    taskDialogElement.remove();
  }
  const addSubtask = () => {
    const subtaskContainer = taskDialogElement.querySelector(`.task-dialog-form-subtask-container`);
    const textInput = taskDialogElement.querySelector(`.task-subtask-dialog-form-text-input`);
    let text = textInput.value.trim();
    let subtaskEntry;
    if(text && text !== '') subtaskContainer.append(buildElementTree(taskFormObjs.subtaskEntryObj(text)))
    textInput.value = '';
  }

  const selectDelete = (taskID) => renderDeleteWarningDialog(taskID, () => taskManager.delete(taskID));

  eventHandler(taskDialogElement, '.task-dialog-form-submit-button', 'click', submitForm, task ? task: null);

  if(formContext === 'edit-task') eventHandler(taskDialogElement, '.task-dialog-form-delete-button', 'click', selectDelete, task.taskID);

  eventHandler(taskDialogElement, '.task-subtask-dialog-form-text-input-button', 'click', addSubtask);

  return { element: taskDialogElement };

}

export default taskDialogForm;