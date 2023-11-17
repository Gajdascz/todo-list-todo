const userStorage = ((user='local') => {

  const storage = new Map();
  
  const store = (taskID, taskObj, taskCardObj) =>  {
    console.log(taskID);
    console.log(taskObj)
    console.log(taskCardObj);
    storage.set(taskID, {task: taskObj, card: taskCardObj});
  }
  
  const remove = (taskID) => storage.delete(taskID);
  const get = (taskID) => storage.get(taskID);

  return { store,
           remove,
           get
         };
})();




export default userStorage