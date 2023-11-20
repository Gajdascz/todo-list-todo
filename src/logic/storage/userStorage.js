const userStorage = ((user='local') => {

  const storage = new Map();
  
  const store = (taskID, taskObj, taskCardObj) => storage.set(taskID, {task: taskObj, card: taskCardObj});  
  const remove = (taskID) => storage.delete(taskID);
  const getTask = (taskID) => storage.get(taskID);
  const getAllTasks = () => {
    const tasks = [];
    for(const value of storage.values()) tasks.push(value.task);
    return tasks;
  }


  return { store,
           remove,
           getTask,
           getAllTasks,
         };
})();




export default userStorage