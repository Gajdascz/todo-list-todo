import './styles/normalize.css';
import './styles/style.css';

import { renderNewTaskDialogForm, renderCardArray, renderClearMemoryWarningDialog } from './render';


import groupManager from './logic/groups/groupManager';
import sidebarUI from './ui/groups/groupSidebarUI';
import taskManager from './logic/tasks/taskManager';


import { renderGroupsInterfaceDialog } from './render';
import initDemo from './demo';



const newTaskBtn = document.querySelector('button#open-create-task-dialog')

const settingsBtn = document.querySelector('button.settings-icon-button');
const clearMemBtn = document.querySelector('button.clear-memory-button');
const changeColorThemeBtn = document.querySelector('button.change-color-theme-button')
settingsBtn.addEventListener('click', function (e) {
  this.nextElementSibling.classList.toggle('hide');
});

clearMemBtn.addEventListener('click', function (e) {
  renderClearMemoryWarningDialog();
});





newTaskBtn.addEventListener(('click'), (e) => {
  renderNewTaskDialogForm();
});

const groupsInterfaceBtn = document.querySelector('.groups-interface-button');

groupsInterfaceBtn.addEventListener('click', (e) => {
  renderGroupsInterfaceDialog();
});


const initWrapper = () => {
  taskManager.initStoredTasks();
  groupManager.init();
  sidebarUI().init();
  renderCardArray(groupManager.getGroupTaskCards('all'));

}

initWrapper();

if(localStorage.length === 0) {
   initDemo()
   groupManager.init();
}

