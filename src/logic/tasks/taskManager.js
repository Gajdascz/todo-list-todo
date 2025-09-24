import userStorage from "../storage/userStorage";
import groupManager from "../groups/groupManager";
import task from "./task";
import taskCard from "../../ui/tasks/taskCard";
import taskSort from "./taskSort";
import { renderTaskCard } from "../../render";
import {
  formatDateForTaskObj,
  mimicFormInput,
} from "../utility/dateHelperFunctions";

const memoryStorage = {};

const createTask = (taskData) => {
  if (taskData.due) {
    const mimicDue = mimicFormInput(taskData.due);
    delete taskData.due;
    taskData["dueDate"] = mimicDue.date;
    taskData["dueTime"] = mimicDue.time;
  }
  const newTask = task({
    priority: taskData.priority.toLowerCase(),
    title: taskData.title,
    status: taskData.status ?? false,
    due: taskData.dueDate
      ? formatDateForTaskObj(
          taskData.dueDate,
          taskData.dueTime ? taskData.dueTime : null,
        )
      : null,
    description: taskData.description,
    subtasks: taskData.subtasks,
    taskID: taskData.taskID || null,
    timestamp: taskData.timestamp || null,
  });
  const newTaskCard = taskCard(newTask);
  renderTaskCard(newTaskCard);
  userStorage.storeTask(newTask);
  memoryStorage[newTask.taskID] = {
    taskObj: newTask,
    taskCardObj: newTaskCard,
  };
};

const initStoredTasks = () => {
  const taskDataObjs = userStorage.getAllDataObjs("task");
  if (taskDataObjs.length > 0)
    taskDataObjs.forEach((taskDataObj) => createTask(taskDataObj));
};

const updateTask = (taskID, taskData) => {
  const task = memoryStorage[taskID].taskObj;
  task.priority = taskData.priority.toLowerCase();
  task.title = taskData.title;
  task.due = taskData.dueDate
    ? formatDateForTaskObj(
        taskData.dueDate,
        taskData.dueTime ? taskData.dueTime : null,
      )
    : null;
  task.description = taskData.description;
  task.subtasks = taskData.subtasks;
  const taskCard = memoryStorage[taskID].taskCardObj;
  userStorage.storeTask(task);
  taskCard.update(task);
  groupManager.updateTaskDefaultGroups(task);
};

const deleteTask = (taskID) => {
  const task = memoryStorage[taskID].taskObj;
  const card = memoryStorage[taskID].taskCardObj;
  groupManager.removeTaskFromAllGroups(task);
  card.delete();
  userStorage.removeTask(taskID);
  delete memoryStorage[taskID];
};

const getTaskObj = (taskID) => memoryStorage[taskID].taskObj;
const getTaskCardObj = (taskID) => memoryStorage[taskID].taskCardObj;
const getAllTaskObjs = () =>
  Object.values(memoryStorage).flatMap(
    (taskStorageRef) => taskStorageRef.taskObj,
  );
const getAllTaskCardObjs = () =>
  Object.values(memoryStorage).flatMap(
    (taskStorageRef) => taskStorageRef.taskCardObj,
  );
const getTotalTasks = () => getAllTaskObjs().length;
const getAllTaskTitles = () =>
  getAllTaskObjs().reduce(
    (acc, taskObj) => ((acc[taskObj.taskID] = taskObj.title), acc),
    {},
  );

const sortTasksByDate = (tasksArray) => taskSort.byDate(tasksArray);

const toggleTaskStatus = (taskID) => {
  const task = memoryStorage[taskID].taskObj;
  task.toggleStatus();
  groupManager.updateTaskDefaultGroups(task);
  userStorage.storeTask(task);
  console.log(userStorage.getTaskDataObj(task.taskID));
};

const taskManager = {
  create: createTask,
  update: updateTask,
  delete: deleteTask,
  getTaskObj,
  getAllTaskObjs,
  getTaskCardObj,
  getAllTaskCardObjs,
  toggleTaskStatus,
  getTotalTasks,
  getAllTaskTitles,
  initStoredTasks,
  sortTasksByDate,
};

export default taskManager;
