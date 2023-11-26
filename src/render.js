import taskDialogForm from "../src/ui/dialogs/taskFormDialog";
import warningDialog  from '../src/ui/dialogs/warningDialog';
import groupDialog from "./ui/dialogs/groupDialog";

const taskCardContainer = document.querySelector('div.task-card-container')

const renderTaskCard = (taskCard) => {
  taskCardContainer.append(taskCard.element);
}

const clearTaskCardContainer = () => {
  taskCardContainer.querySelectorAll('.task-card').forEach(card => card.remove())
};

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
  document.body.append(deleteWarningDialog.element);
  deleteWarningDialog.element.showModal();
}

const renderGroupDialog = () => {
  const groupDialogElement = groupDialog().element;
  document.body.append(groupDialogElement);
  groupDialogElement.showModal()
}

const renderCardArray = (groupCards) => {
  clearTaskCardContainer()
  groupCards.forEach(groupCardObj => {
    taskCardContainer.append(groupCardObj.element)
  })
}

const renderSortedCards = (sortedTaskCards) => {
  clearTaskCardContainer();
  sortedTaskCards.forEach(cardObj => {
    taskCardContainer.append(cardObj.element)
  })
}

export {  renderTaskCard, 
          renderNewTaskDialogForm,
          renderEditTaskDialogForm,
          renderDeleteWarningDialog,
          renderCardArray,
          renderSortedCards,
          renderGroupDialog
       }