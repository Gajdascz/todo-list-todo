import taskDialogForm from "../src/ui/dialogs/taskFormDialog";
import { warningDialog } from '../src/ui/dialogs/warningDialog';

const taskCardContainer = ('div.task-card-container')

const renderTaskCard = (taskCard, location=taskCardContainer) => {
  document.querySelector(location).append(taskCard.element);
}



const renderNewTaskDialogForm = () => {
  const newTaskDialogForm = taskDialogForm('new');
  document.body.append(newTaskDialogForm.element);
  newTaskDialogForm.element.showModal();
}

const renderEditTaskDialogForm = (task) => {
  const editTaskDialogForm = taskDialogForm('edit', task);
  document.body.append(editTaskDialogForm.element);
  editTaskDialogForm.element.showModal();
}

const renderDeleteWarningDialog = (task, confirmActionFn) => {
  const deleteWarningDialog = warningDialog('Are you sure you want to delete this task? This action is irreversible.', task.taskID, confirmActionFn);
  document.body.append(deleteWarningDialog);
  deleteWarningDialog.showModal()
}


export {  renderTaskCard, 
          renderNewTaskDialogForm,
          renderEditTaskDialogForm,
          renderDeleteWarningDialog
       }