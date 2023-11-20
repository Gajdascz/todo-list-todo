import './styles/normalize.css';
import './styles/style.css';
import userStorage from './logic/storage/userStorage'

import { renderTaskCard, renderNewTaskDialogForm } from './render';

import taskCard from './ui/tasks/taskCard'
import task from './logic/tasks/task';

import groupManager from './logic/groups/groupManager';
import initSidebarUI from './ui/groups/groupSidebarUI';

const newTaskBtn = document.querySelector('button#open-create-task-dialog')


let testTask = task(
  {
    priority: 'urgent',
    title: 'TEST TASK',
    dueDate: '1970-01-01',
    dueTime: '00:30',
    description: 'BAHAHAAHHAHAHAHAHAHAHAAHHAAHAHAHAHA',
    subtasks: ['Ba','HA','HA','BAAAAA']
  }
  )
let testTask2 = task(
  {
    priority: 'high',
    title: 'TEST TASK 2',
    dueDate: '2022-06-27',
    status: 'true',
    dueTime: '',
    description: 'AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    subtasks: ['AH','HHHHHH','HHHHHHHHhh','HHHHHHhh']
  }
  ) 


  let testTaskCard =  taskCard(testTask);
  let testTask2Card = taskCard(testTask2);

  renderTaskCard(testTaskCard)
  renderTaskCard(testTask2Card);

  userStorage.store(testTask.taskID, testTask, testTaskCard);
  userStorage.store(testTask2.taskID, testTask2, testTask2Card);


newTaskBtn.addEventListener(('click'), (e) => {
  renderNewTaskDialogForm();
})

groupManager.initialize()

initSidebarUI();