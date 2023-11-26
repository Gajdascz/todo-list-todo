import userStorage from "../storage/userStorage";
import groupManager from "../groups/groupManager";
import task from "./task";
import taskCard from "../../ui/tasks/taskCard";
import { renderTaskCard } from "../../render";
import { formatDateForTaskObj } from "../utility/dateHelperFunctions";

const createTask = (taskData) => {
  const newTask = task({
      priority:    taskData.priority.toLowerCase(),
      title:       taskData.title,
      due:         taskData.dueDate ? formatDateForTaskObj(taskData.dueDate, taskData.dueTime ? taskData.dueTime : null) : null,
      description: taskData.description,
      subtasks:    taskData.subtasks
    });
  const newTaskCard = taskCard(newTask);
  userStorage.store(newTask.taskID, newTask, newTaskCard);
  renderTaskCard(newTaskCard);
};


const updateTask = (taskID, taskData) => {
  const task       = userStorage.getTaskObj(taskID);
  task.priority    = taskData.priority.toLowerCase();
  task.title       = taskData.title;
  task.due         = taskData.dueDate ? formatDateForTaskObj(taskData.dueDate, taskData.dueTime ? taskData.dueTime : null) : null;
  task.description = taskData.description;
  task.subtasks    = taskData.subtasks;
  const taskCard   = userStorage.getTaskCardObj(taskID);
  taskCard.update(task);
  groupManager.updateTaskDefaultGroups(task)
};

const deleteTask = (taskID) => {
  const task = userStorage.getTaskObj(taskID);
  const card = userStorage.getTaskCardObj(taskID);
  groupManager.removeTaskFromAllGroups(task);
  card.delete();
  userStorage.remove(taskID);
};


const toggleTaskStatus = (taskID) => {
  const task = userStorage.getTaskObj(taskID);
  task.toggleStatus();
  groupManager.updateTaskDefaultGroups(task)
};

const getTask = (taskID) => userStorage.getTaskObj(taskID);
const getTaskCard = (taskID) => userStorage.getTaskCardObj(taskID);

const getTotalTasks = () => userStorage.getAllTaskObjs().length

const taskManager = {
  create: createTask,
  update: updateTask,
  delete: deleteTask,
  getTask,
  getTaskCard,
  toggleTaskStatus,
  getTotalTasks
}

export default taskManager
