import taskDialogForm from "./ui/dialogs/tasks/taskFormDialog";
import warningDialog from "./ui/dialogs/general/warningDialog";
import groupsInterfaceDialog from "./ui/dialogs/groupsUI/groupsInterfaceDialog";

const taskCardContainer = document.querySelector("div.task-card-container");

const renderTaskCard = (taskCard) => taskCardContainer.append(taskCard.element);

const clearTaskCardContainer = () =>
  taskCardContainer
    .querySelectorAll(".task-card")
    .forEach((card) => card.remove());

const renderNewTaskDialogForm = () => {
  const newTaskDialogForm = taskDialogForm("new");
  document.body.append(newTaskDialogForm.element);
  newTaskDialogForm.element.showModal();
};

const renderEditTaskDialogForm = (task) => {
  const editTaskDialogForm = taskDialogForm("edit", task);
  document.body.append(editTaskDialogForm.element);
  editTaskDialogForm.element.showModal();
};

const renderDeleteWarningDialog = (task, confirmActionFn) => {
  const deleteWarningDialog = warningDialog(
    "Are you sure you want to delete this task? This action is irreversible.",
    task.taskID,
    confirmActionFn,
  );
  document.body.append(deleteWarningDialog.element);
  deleteWarningDialog.element.showModal();
};

const renderClearMemoryWarningDialog = () => {
  const clearMemoryWarningDialog = warningDialog(
    "Proceed Thoughtfully! By clearing the applications memory you will be deleting ALL tasks and custom groups you've created.",
    null,
    () => {
      localStorage.clear();
      localStorage.setItem("holder", "_");
      location.reload();
    },
  );
  document.body.append(clearMemoryWarningDialog.element);
  clearMemoryWarningDialog.element.showModal();
};
const renderRefreshDemoWarningDialog = () => {
  const refreshDemoWarningDialog = warningDialog(
    "Refreshing the demo will erase ALL current local memory and refresh the page.",
    null,
    () => {
      localStorage.clear();
      location.reload();
    },
  );
  document.body.append(refreshDemoWarningDialog.element);
  refreshDemoWarningDialog.element.showModal();
};

const renderCardArray = (groupCards) => {
  clearTaskCardContainer();
  groupCards.forEach((groupCardObj) => {
    taskCardContainer.append(groupCardObj.element);
  });
};

const renderSortedCards = (sortedTaskCards) => {
  clearTaskCardContainer();
  sortedTaskCards.forEach((cardObj) => {
    taskCardContainer.append(cardObj.element);
  });
};

const renderGroupsInterfaceDialog = () => {
  const groupsInterfaceDialogElement = groupsInterfaceDialog().element;
  document.body.append(groupsInterfaceDialogElement);
  groupsInterfaceDialogElement.showModal();
};

export {
  renderTaskCard,
  renderNewTaskDialogForm,
  renderEditTaskDialogForm,
  renderDeleteWarningDialog,
  renderCardArray,
  renderSortedCards,
  renderGroupsInterfaceDialog,
  renderClearMemoryWarningDialog,
  renderRefreshDemoWarningDialog,
};
