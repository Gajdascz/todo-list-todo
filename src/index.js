import './components/styles/mynormalize.css';
import './components/styles/style.css';
import buildNewTaskDialog from './modules/newTaskDialog';



const newTaskBtn = document.querySelector('button#open-create-task-dialog')

const newTaskDialog = buildNewTaskDialog();

newTaskBtn.addEventListener(('click'), (e) => {
  document.body.append(newTaskDialog);
  newTaskDialog.showModal();
})
