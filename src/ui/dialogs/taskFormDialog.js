import { buildElementTree, eventHandler } from '../../logic/utility/domHelperFunctions';
import { buildBaseDialogElement } from './baseDialog';
import { processTaskFormData } from '../../logic/tasks/processTaskFormData'

import * as taskFormObjBuilder from '../builders/taskFormObjDOMBuilders'
import { renderDeleteWarningDialog } from '../../render';
import taskManager from '../../logic/tasks/taskManager';


const taskDialogForm = (type, task=null) =>  {
  if(type.match(/new/i))  type = 'new-task';
  else if(type.match(/edit/i)) type = 'edit-task';
  else return;
  const taskDialogElement = buildBaseDialogElement(task ? 'Edit Task' : 'New Task');
  const taskForm = taskFormObjBuilder.taskFormObj(type, 'dialog');
  taskForm.children = [
    taskFormObjBuilder.formCustomPrioritySelectObj(task ? task.priority : null, 'dialog'),
    taskFormObjBuilder.formTitleInputObj(task ? task.title : null, 'dialog'),
    taskFormObjBuilder.formDueInputObj(task ? task.dueDate : null, task ? task.dueTime : null, 'dialog'),
    taskFormObjBuilder.formDescriptionInputObj(task ? task.description : null, 'dialog'),
    taskFormObjBuilder.formSubtaskInputObj('dialog'),,
    taskFormObjBuilder.formSubtaskContainerObj(task ? task.subtasks : null, 'dialog'),
    taskFormObjBuilder.formMainButtonContainerObj(type, 'dialog')
  ];

  taskDialogElement.append(buildElementTree(taskForm));


  const fieldSelectors = {
    priority:    `div.task-dialog-form-priority-selected-option`,
    title:       `input.task-dialog-form-title-input`,
    dueDate:     `input.task-dialog-form-datepicker-input`,
    dueTime:     `input.task-dialog-form-timepicker-input`,
    description: `textarea.task-dialog-form-description-input`,
    subtasks:    [`p.task-dialog-form-subtask-entry-text`]
  };

  const submitForm = (task=null) => {
    processTaskFormData(fieldSelectors, task ? task : null);
    taskDialogElement.querySelector('form').reset();
    taskDialogElement.close()
    taskDialogElement.remove();
  }

  const selectDelete = (taskID) => {
    renderDeleteWarningDialog(taskID, () => taskManager.delete(taskID));
  }

  eventHandler(taskDialogElement, '.task-dialog-form-submit-button', 'click', submitForm, task ? task: null);

  if(type === 'edit-task') eventHandler(taskDialogElement, '.task-dialog-form-delete-button', 'click', selectDelete, task.taskID);


  return {
    element: taskDialogElement
  }

}

export default taskDialogForm;