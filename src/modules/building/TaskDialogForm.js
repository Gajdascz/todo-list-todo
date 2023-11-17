import { buildElementTree, eventHandler } from '../utility';
import { buildBaseDialogElement } from './buildBaseDialog';
import { processTaskFormData } from '../processing/processTaskFormData'

import * as taskFormObjBuilder from './taskFormObjDOMBuilders'
import { renderDeleteWarningDialog } from '../render';



const TaskDialogForm = (type, task=null) =>  {
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
  ]

  taskDialogElement.append(buildElementTree(taskForm));

  const submitForm = (task=null) => {
    processTaskFormData(task ? task.taskID : null);
    taskDialogElement.querySelector('form').reset();
    taskDialogElement.close()
    taskDialogElement.remove();
  }

  const selectDelete = (task) => {
    renderDeleteWarningDialog(task)
  }

  eventHandler(taskDialogElement, '.task-dialog-form-submit-button', 'click', submitForm, task ? task: null);

  if(type === 'edit-task') eventHandler(taskDialogElement, '.task-dialog-form-delete-button', 'click', selectDelete, task);


  return {
    element: taskDialogElement
  }

}

export default TaskDialogForm;