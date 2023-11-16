import './components/styles/mynormalize.css';
import './components/styles/style.css';
import { addUserTask } from './modules/processing/taskGroupManager'

import { renderTaskCard, renderNewTaskDialogForm } from './modules/render';

import TaskCard from './modules/building/TaskCard'
import Task from './modules/Task';

const newTaskBtn = document.querySelector('button#open-create-task-dialog')


let testTask = Task(
  {
    priority: 'urgent',
    title: 'TEST TASK',
    dueDate: '08/01/2001',
    dueTime: '00:30 UTC',
    description: 'BAHAHAAHHAHAHAHAHAHAHAAHHAAHAHAHAHA',
    subtasks: ['Ba','HA','HA','BAAAAA']
  }
  )
let testTask2 = Task(
  {
    priority: 'high',
    title: 'TEST TASK 2',
    dueDate: '09/01/200122',
    dueTime: '',
    description: 'AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    subtasks: ['AH','HHHHHH','HHHHHHHHhh','HHHHHHhh']
  }
  ) 

addUserTask(testTask);
addUserTask(testTask2);
renderTaskCard(TaskCard(testTask), 'div.task-card-container')
renderTaskCard(TaskCard(testTask2), 'div.task-card-container')

newTaskBtn.addEventListener(('click'), (e) => {
  renderNewTaskDialogForm();
})
