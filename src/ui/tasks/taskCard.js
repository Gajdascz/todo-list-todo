import {
  buildElementTree,
  eventHandler,
} from "../../logic/utility/domHelperFunctions";
import { renderEditTaskDialogForm } from "../../render";
import * as taskObjBuilder from "../builders/tasks/taskObjDOMBuilders";
import taskManager from "../../logic/tasks/taskManager";

const taskCard = (task) => {
  /* Create Task Card Objects and Build Task Card Element */
  const taskCard = taskObjBuilder.taskCardObj(task.taskID);
  taskCard.children = [
    taskObjBuilder.taskPriorityIndicatorObj(task.priority, "task-card", "div"),
    taskObjBuilder.taskHeaderObj(task.title, "task-card", "h1"),
    taskObjBuilder.taskDueObj(task.due, "task-card"),
    taskObjBuilder.taskDescriptionObj(task.description, "task-card"),
    taskObjBuilder.taskChecklistObj(task.subtasks, task.taskID, "task-card"),
    taskObjBuilder.taskTimestampObj(task.timestamp, "task-card"),
    taskObjBuilder.taskShowHideIconBtnsObj("task-card"),
  ];

  /* HTML Task Card DOM element/structure and reference ID*/
  const taskCardElement = buildElementTree(taskCard);
  const taskCardID = task.taskID;

  /* Methods */
  //#region

  /* Helper - Private */
  const getCardElement = (selector) => taskCardElement.querySelector(selector);
  const setPriority = (newPriority) => {
    const element = getCardElement(".task-card-priority-indicator");
    if (element) element.id = newPriority;
  };
  const setTitle = (newTitle) => {
    const element = getCardElement(".task-card-title");
    if (element) element.textContent = newTitle;
  };
  const setDescription = (newDescription) => {
    const element = getCardElement(".task-card-description");
    if (element) element.textContent = newDescription;
  };
  const setDue = (date, time) => {
    const due = getCardElement(".task-card-due");
    if (due) due.remove();
    const header = getCardElement(".task-card-header");
    header.after(buildElementTree(taskObjBuilder.taskDueObj(date, time)));
  };
  const setChecklistSubtasks = (subtasks, taskID) => {
    const checklist = taskCardElement.querySelector(".task-card-checklist");
    if (checklist) checklist.remove();
    const timestamp = getCardElement(".task-card-timestamp");
    timestamp.before(
      buildElementTree(
        taskObjBuilder.taskChecklistObj(subtasks, taskID, "task-card"),
      ),
    );
  };

  /* Public - Exposed*/
  const toggleStatus = () => {
    taskManager.toggleTaskStatus(taskCardID);
    updateUIOnStatusChange();
  };
  const updateUIOnStatusChange = () => {
    taskCardElement.classList.toggle("task-card-complete");
    getCardElement(".task-card-priority-indicator").classList.toggle("hide");
    getCardElement(".task-card-complete-icon").classList.toggle(
      "marked-complete-icon",
    );
    getCardElement(".task-card-edit-icon-button").classList.toggle("hide");
    taskCardElement
      .querySelectorAll('input[type="checkbox"')
      .forEach((input) => input.toggleAttribute("disabled"));
  };
  const updateUIOnEditSubmit = (task) => {
    setPriority(task.priority);
    setTitle(task.title);
    setDue(task.due);
    setDescription(task.description);
    setChecklistSubtasks(task.subtasks, task.taskID);
  };
  const deleteCard = () => taskCardElement.remove();
  //#endregion

  /* Event Handler Assignment */
  eventHandler(
    taskCardElement,
    ".task-card-complete-icon-button",
    "click",
    toggleStatus,
  );
  eventHandler(
    taskCardElement,
    ".task-card-edit-icon-button",
    "click",
    renderEditTaskDialogForm,
    task,
  );

  if (task.status) updateUIOnStatusChange();

  return {
    element: taskCardElement,
    delete: deleteCard,
    update: updateUIOnEditSubmit,
    toggleStatus,
    get taskID() {
      return taskCardID;
    },
  };
};

export default taskCard;
