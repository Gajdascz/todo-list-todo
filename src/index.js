import './components/styles/mynormalize.css';
import './components/styles/style.css';
import { Task } from './modules/Task';
import { buildTaskCard } from './modules/building/buildTaskCard'

import { renderTaskCard, renderNewTaskDialogForm } from './modules/render';



const newTaskBtn = document.querySelector('button#open-create-task-dialog')


let testTask = Task(
  {
    priority: 'urgent',
    title: 'TEST TASK',
    dueDate: '01/01/2001',
    dueTime: '12:30pm',
    description: 'BAHAHAAHHAHAHAHAHAHAHAAHHAAHAHAHAHA',
    subtasks: ['Ba','HA','HA','BAAAAA']
  }
  )
let testTask2 = Task(
  {
    priority: 'high',
    title: 'TEST TASK 2',
    dueDate: '01/01/200122',
    dueTime: '12:30pm',
    description: 'AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    subtasks: ['AH','HHHHHH','HHHHHHHHhh','HHHHHHhh']
  }
  ) 

renderTaskCard(buildTaskCard(testTask), 'div.task-card-container')
renderTaskCard(buildTaskCard(testTask2), 'div.task-card-container')

newTaskBtn.addEventListener(('click'), (e) => {
  renderNewTaskDialogForm();
})
