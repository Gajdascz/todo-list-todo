import './styles/normalize.css';
import './styles/style.css';
import userStorage from './logic/storage/userStorage'

import { renderTaskCard, renderNewTaskDialogForm, renderGroupCards, renderSortedCards } from './render';

import taskCard from './ui/tasks/taskCard'
import task from './logic/tasks/task';

import groupManager from './logic/groups/groupManager';
import initSidebarUI from './ui/groups/groupSidebarUI';
import group from './logic/groups/group';
import taskManager from './logic/tasks/taskManager';


import { dateHelper, formatDateForDisplay, formatDateForTaskObj, getThisWeek } from './logic/utility/dateHelperFunctions';

import taskSort from './logic/utility/taskSort';

import { renderGroupsInterfaceDialog } from './render';


const newTaskBtn = document.querySelector('button#open-create-task-dialog')





// Helper function to format date to YYYY-MM-DD
const formatDate = (date) => {
  return new Date (date.getFullYear(), date.getMonth(), date.getDate())
                  .toISOString()
                  .split('T')[0]
};

// Calculate specific dates
let today = new Date();

let yesterday = new Date();   yesterday.setDate(today.getDate() - 1)
let overdue = new Date();   overdue.setFullYear(today.getFullYear() - 1)

let tomorrow = new Date();  tomorrow.setDate(today.getDate() + 1);

let thisWeek = new Date();  thisWeek.setDate(today.getDate() + (7 - today.getDay()))
let thisWeek2 = new Date();  thisWeek2.setDate(today.getDate() + (5 - today.getDay()))

let nextWeek = new Date();  nextWeek.setDate(today.getDate() + 7)
let nextWeek2 = new Date();  nextWeek2.setDate(today.getDate() + 5)


let thisMonth = new Date(); thisMonth.setMonth(today.getMonth()); 
let thisMonth2 = new Date(); thisMonth2.setMonth(today.getMonth()); 


let nextMonth = new Date(); nextMonth.setMonth(today.getMonth() + 1)
let nextMonth2 = new Date(); nextMonth2.setMonth(today.getMonth() + 1); nextMonth2.setDate(10);

 
let later = new Date();     later.setFullYear(today.getFullYear() + 1)
let later2 = new Date();     later2.setFullYear(today.getFullYear() + 5)


yesterday = formatDate(yesterday);
today =     formatDate(today);
overdue =   formatDate(overdue);
tomorrow =  formatDate(tomorrow);

thisWeek =  formatDate(thisWeek);
thisWeek2 =  formatDate(thisWeek2);

nextWeek =  formatDate(nextWeek);
nextWeek2 =  formatDate(nextWeek2);

thisMonth = formatDate(thisMonth);
thisMonth2 = formatDate(thisMonth2);

nextMonth = formatDate(nextMonth);
nextMonth2 = formatDate(nextMonth2);


later =     formatDate(later);
later2 =     formatDate(later2);

yesterday = formatDateForTaskObj(yesterday);
today =     formatDateForTaskObj(today);
overdue =   formatDateForTaskObj(overdue);
tomorrow =  formatDateForTaskObj(tomorrow);
thisWeek =  formatDateForTaskObj(thisWeek);
thisWeek2 =  formatDateForTaskObj(thisWeek2);

nextWeek =  formatDateForTaskObj(nextWeek);
nextWeek2 =  formatDateForTaskObj(nextWeek2);


thisMonth = formatDateForTaskObj(thisMonth);
thisMonth2 = formatDateForTaskObj(thisMonth2);

nextMonth = formatDateForTaskObj(nextMonth);
nextMonth2 = formatDateForTaskObj(nextMonth2);


later =     formatDateForTaskObj(later);
later2 =     formatDateForTaskObj(later2);


// Sample tasks with varying due dates, times, and priorities
let tasks = [
  task({ priority: 'urgent', title: 'Due Overdue (yesterday)', due: (yesterday), description: 'Due Yesterday', subtasks: [] }),
  task({ priority: 'medium', title: 'Due Overdue (last Year)', due: (overdue), description: 'Due Last Year', subtasks: [] }),
  task({ priority: 'urgent', title: 'Due Overdue (yesterday)', due: (yesterday), description: 'Due Yesterday', subtasks: [] }),
  
  task({ priority: 'low', title: 'Due Today', due: (today), description: 'Task due today', subtasks: ['Subtask 1'] }),
  task({ priority: 'medium', title: 'Due Tomorrow', due: (tomorrow), description: 'Task due tomorrow', subtasks: [] }),
  
  task({ priority: 'high', title: 'Due This Week', due: (thisWeek), description: 'Task due by the end of this week', subtasks: ['Subtask 1', 'Subtask 2'] }),
  task({ priority: 'high', title: 'Due This Week2', due: (thisWeek2), description: 'Task due by the end of this week', subtasks: ['Subtask 1', 'Subtask 2'] }),
  
  task({ priority: 'urgent', title: 'Due Next Week', due: (nextWeek), description: 'Urgent task due by next week', subtasks: [] }),
  task({ priority: 'urgent', title: 'Due Next Week2', due: (nextWeek2), description: 'Urgent task due by next week', subtasks: [] }),
  
  task({ priority: 'low', title: 'Due This Month', due: (thisMonth), description: 'Low task due this month', subtasks: ['Subtask 1'] }),
  task({ priority: 'low', title: 'Due This Month', due: (thisMonth2), description: 'Low task due this month', subtasks: ['Subtask 1'] }),
  
  task({ priority: 'none', title: 'Due Next Month', due: (nextMonth), description: 'Task for next month', subtasks: [] }), 
  task({ priority: 'none', title: 'Due Next Month2', due: (nextMonth2), description: 'Task for next month', subtasks: [] }), 
  
  task({ priority: 'medium', title: 'Due Later', due: (later), description: 'Task for much later', subtasks: [] }),
  task({ priority: 'medium', title: 'Due Later2', due: (later2), description: 'Task for much later', subtasks: [] }),
  
];

// Corresponding task cards for each task
let taskCards = tasks.map(t => taskCard(t));

// Rendering and storing tasks and their task cards
taskCards.forEach((card, index) => {
  renderTaskCard(card);
  
  userStorage.store(tasks[index].taskID, tasks[index], card);
});


groupManager.init();


newTaskBtn.addEventListener(('click'), (e) => {
  renderNewTaskDialogForm();
})


const testBtn = document.querySelector('button#test-button')


testBtn.addEventListener('click', (e) => {
  renderGroupsInterfaceDialog()
})


initSidebarUI();