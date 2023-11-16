import { buildElementTree } from "../utility";
import { findUserTask } from "../processing/taskGroupManager";
import * as taskObjBuilder from "./taskObjectDOMBuilders";


const TaskCard = (task) => {
    const taskCard = taskObjBuilder.taskCardObj();
    taskCard.children = [
      taskObjBuilder.taskPriorityIndicatorObj(task.priority, 'task-card', 'div'),
      taskObjBuilder.taskHeaderObj(task.title, 'task-card', 'h1',),
      taskObjBuilder.taskDueObj(task.dueDate,task.dueTime, 'task-card'),
      taskObjBuilder.taskDescriptionObj(task.description, 'task-card'),
      taskObjBuilder.taskChecklistObj(task.subtasks, task.taskID, 'task-card'),
      taskObjBuilder.taskTimestampObj(task.timestamp, 'task-card'),
      taskObjBuilder.taskShowHideIconBtnsObj('task-card')
    ]
    const taskCardElement = buildElementTree(taskCard);
    const taskCardID = task.taskID;


    const getCardElement = (selector) => taskCardElement.querySelector(selector);
    const createAccessor = (selector, property) => ({
      get: () => getCardElement(selector)[property],
      set: (value) => { getCardElement(selector)[property] = value }
    });
    /* Getter and Setter Methods */
    //#region 
    const { get: getPriority, set: setPriority } = createAccessor('.task-card-priority-indicator', 'id');
    const { get: getTitle, set: setTitle } = createAccessor('.task-card-title', 'textContent');
    const { get: getDue, set: setDue } = createAccessor('.task-card-due', 'textContent');
    const { get: getDescription, set: setDescription } = createAccessor('.task-card-description', 'textContent');
    
    const getChecklistSubtasks = () => {
      const checklistSubtasks = taskCardElement.querySelectorAll('.task-card-checklist .task-card-checkbox-container');
      return Array.from(checklistSubtasks).map(subtask => {
        const checkbox = subtask.querySelector('input[type="checkbox"]');
        const subtaskText = subtask.textContent.trim();
        const isChecked = checkbox.checked;
        return { subtaskText, isChecked };
      });
    };
    const setChecklistSubtasks = (newSubtasks) => {
      const checklist = taskCardElement.querySelector('.task-card-checklist');
      checklist.textContent = '';
      newSubtasks.forEach(subtask => {
        checklist.append(buildElementTree(taskObjBuilder.createSubtaskObj(subtask)));
      })
    };

    const getTimestamp = () => getCardElement('.task-card-timestamp').textContent;
    const getCardID = () => taskCardID;
    const getStatus = () => { taskCardElement.classList.contains('task-card-complete')}
    

    const updateUIOnStatusChange = () => {
      taskCardElement.classList.toggle('task-card-complete');
      getCardElement('.task-card-priority-indicator').classList.toggle('hide');
      getCardElement('.task-card-complete-icon').classList.toggle('marked-complete-icon');
      getCardElement('.task-card-edit-icon-button').classList.toggle('hide');
      taskCardElement.querySelectorAll('input[type="checkbox"').forEach(input => input.toggleAttribute('disabled'));
    }

    const setStatus = () => {
      updateUIOnStatusChange();
      findUserTask(taskCardID).toggleStatus();
    }
    //#endregion
    
   taskObjBuilder.taskEventHandler(taskCardElement, '.task-card-complete-icon-button', 'click', setStatus);

    return {
      element: taskCardElement,
      getPriority,
      setPriority,
      getTitle,
      setTitle,
      getDue,
      setDue,
      getDescription,
      setDescription,
      getChecklistSubtasks,
      setChecklistSubtasks,
      getStatus,
      setStatus,
      getTimestamp,
      getCardID
    }
}


export default TaskCard;