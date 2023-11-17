import TaskDialogForm from "./building/TaskDialogForm";
import { buildWarningDialog } from './building/buildWarningDialog';

const taskCardContainer = ('div.task-card-container')

const renderTaskCard = (taskCard, location=taskCardContainer) => {
  document.querySelector(location).append(taskCard.element);
}



const renderNewTaskDialogForm = () => {
  const newTaskDialogForm = TaskDialogForm('new');
  document.body.append(newTaskDialogForm.element);
  newTaskDialogForm.element.showModal();
}

const renderEditTaskDialogForm = (task) => {
  const editTaskDialogForm = TaskDialogForm('edit', task);
  document.body.append(editTaskDialogForm.element);
  editTaskDialogForm.element.showModal();
}

const renderDeleteWarningDialog = (task) => {
  const deleteWarningDialog = buildWarningDialog('Are you sure you want to delete this task? This action is irreversible.', task.taskID);
  document.body.append(deleteWarningDialog);
  deleteWarningDialog.showModal()
}


export {  renderTaskCard, 
          renderNewTaskDialogForm,
          renderEditTaskDialogForm,
          renderDeleteWarningDialog
       }