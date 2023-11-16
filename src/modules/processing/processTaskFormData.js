import { renderTaskCard } from '../render';
import { addUserTask, findUserTask } from './taskGroupManager';

import Task from '../Task'
import TaskCard from '../building/TaskCard';


const fields = { 
  priority:    `div.task-dialog-form-priority-selected-option`,
  title:       `input.task-dialog-form-title-input`,
  dueDate:     `input.task-dialog-form-datepicker-input`,
  dueTime:     `input.task-dialog-form-timepicker-input`,
  description: `textarea.task-dialog-form-description-input`,
  subtasks:    [`p.task-dialog-form-subtask-entry-text`]
};


const parseFormData = () => {
  const data = {};
  for(const [key,value] of Object.entries(fields)) {
    if(Array.isArray(value)) {
      if(value.length === 0) {
        data[key] = null;
      } else {
        const valueArray = [];
        value.forEach(element => {
          let valuesNodeList = document.querySelectorAll(element);
          valuesNodeList.forEach(node => {
            valueArray.push(node.textContent.trim())
          })
        })
        data[key] = valueArray; 
      }
    } 
    else {
        let element = document.querySelector(value);
        if(!element) { data[key] = null}
        else data[key] = (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') ? element.value.trim() : element.textContent.trim();
    }
  }
  return data
};


function processTaskFormData(isNew=true, taskID=null) {
  if(isNew){
    const formData = parseFormData();
    const newTask = Task(
      {
        priority:    formData.priority.toLowerCase(),
        title:       formData.title,
        dueDate:     formData.dueDate,
        dueTime:     formData.dueTime,
        description: formData.description,
        subtasks:    formData.subtasks
      }
    );
    addUserTask(newTask);
    renderTaskCard(buildTaskCard(newTask));
  } else {
    const formData = parseFormData();
    const task = findUserTask(taskID);
    task.priority = formData.priority.toLowerCase();
    task.title = formData.title;
    task.dueDate = formData.dueDate;
    task.dueTime = formData.dueTime;
    task.description = formData.description;
    task.subtasks = formData.subtasks;
    updateTaskCard(document.querySelector(`[data-taskid="${task.taskID}"]`), task);
  }
};

export { processTaskFormData }