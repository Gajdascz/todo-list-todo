import { buildTaskDialogForm } from "./building/buildTaskDialogForm";


const taskCardContainer = ('div.task-card-container')

const renderTaskCard = (taskCard, location=taskCardContainer) => {
  document.querySelector(location).append(taskCard.element);
}



const renderNewTaskDialogForm = () => {
  const newTaskDialogForm = buildTaskDialogForm('new-task', 'New Task');
  document.body.append(newTaskDialogForm);
  newTaskDialogForm.showModal();
}

const renderEditTaskDialogForm = (taskID=null) => {
  const editTaskDialogForm = buildTaskDialogForm('edit-task', 'Edit Task', taskID);
  document.body.append(editTaskDialogForm);
  editTaskDialogForm.showModal();
}


export {  renderTaskCard, 
          renderNewTaskDialogForm,
          renderEditTaskDialogForm
       }