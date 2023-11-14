import { buildTaskDialogForm } from "./building/buildTaskDialogForm";


const taskCardContainer = ('div.task-card-container')

const renderTaskCard = (taskCard, location=taskCardContainer) => {
  document.querySelector(location).append(taskCard);
}

const renderNewTaskDialogForm = () => {
  const newTaskDialogForm = buildTaskDialogForm('new-task', 'New Task');
  document.body.append(newTaskDialogForm);
  newTaskDialogForm.showModal();
}


export { renderTaskCard, renderNewTaskDialogForm }