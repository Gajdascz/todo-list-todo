import './components/styles/mynormalize.css';
import './components/styles/style.css';
import userStorage from './modules/processing/userStorage'

import { renderTaskCard, renderNewTaskDialogForm } from './modules/render';

import TaskCard from './modules/building/TaskCard'
import Task from './modules/Task';

const newTaskBtn = document.querySelector('button#open-create-task-dialog')


let testTask = Task(
  {
    priority: 'urgent',
    title: 'TEST TASK',
    dueDate: '1876-01-20',
    dueTime: '00:30',
    description: 'BAHAHAAHHAHAHAHAHAHAHAAHHAAHAHAHAHA',
    subtasks: ['Ba','HA','HA','BAAAAA']
  }
  )
let testTask2 = Task(
  {
    priority: 'high',
    title: 'TEST TASK 2',
    dueDate: '2022-06-27',
    dueTime: '',
    description: 'AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    subtasks: ['AH','HHHHHH','HHHHHHHHhh','HHHHHHhh']
  }
  ) 


  let testTaskCard = TaskCard(testTask);
  let testTask2Card = TaskCard(testTask2);


  userStorage.store(testTask.taskID, testTask, testTaskCard);
  userStorage.store(testTask2.taskID, testTask2, testTask2Card);


  renderTaskCard(testTaskCard);
  renderTaskCard(testTask2Card);

newTaskBtn.addEventListener(('click'), (e) => {
  renderNewTaskDialogForm();
})
