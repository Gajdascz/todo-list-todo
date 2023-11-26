const userStorage = ((user='local') => {

  const storage = new Map();
  
  const store = (taskID, taskObj, taskCardObj) => storage.set(taskID, {task: taskObj, card: taskCardObj});  
  const remove = (taskID) => storage.delete(taskID);

  const getTaskObj = (taskID) => storage.get(taskID).task;
  const getTaskCardObj = (taskID) => storage.get(taskID).card;
  
  const getAllTaskObjs = () => [...storage.values()].flatMap(taskStorageRef => taskStorageRef.task);
  const getAllTaskCardObjs = () => [...storage.values()].flatMap(taskStorageRef => taskStorageRef.card);
  const getAllTaskAndCardObjs = () => [...storage.values()];

  return { store,
           remove,
           getTaskObj,
           getTaskCardObj,
           getAllTaskObjs,
           getAllTaskCardObjs,
           getAllTaskAndCardObjs
         };
})();




export default userStorage