import userStorage from "../storage/userStorage";
import groupManager from "../groups/groupManager";
import task from "./task";
import taskCard from "../../ui/tasks/taskCard";
import { renderTaskCard } from "../../render";

const createTask = (taskData) => {
  const newTask = task(
    {
      priority:    taskData.priority.toLowerCase(),
      title:       taskData.title,
      dueDate:     taskData.dueDate,
      dueTime:     taskData.dueTime,
      description: taskData.description,
      subtasks:    taskData.subtasks
    } 
  );
  const newTaskCard = taskCard(newTask);
  userStorage.store(newTask.taskID, newTask, newTaskCard);
  renderTaskCard(newTaskCard);
};
const updateTask = (taskID, taskData) => {
  const task = userStorage.getTask(taskID).task;
  task.priority = taskData.priority.toLowerCase();
  task.title = taskData.title;
  task.dueDate = taskData.dueDate;
  task.dueTime = taskData.dueTime;
  task.description = taskData.description;
  task.subtasks = taskData.subtasks;
  const taskCard = userStorage.getTask(task.taskID).card;
  taskCard.updateUIOnEditSubmit(task);
};
const deleteTask = (taskID) => {
  const task = userStorage.getTask(taskID);
  console.log(task.card)
  task.card.delete();
  userStorage.remove(task.taskID);
  groupManager.removeTaskFromAllGroups(task);
};


const toggleTaskStatus = (taskID) => {
  const task = userStorage.getTask(taskID).task;
  task.toggleStatus();
}


const taskManager = {
  create: createTask,
  update: updateTask,
  delete: deleteTask,
  toggleStatus: toggleTaskStatus,
}

export default taskManager
