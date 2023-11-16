

const userTasks = [];
const addUserTask = (task) => userTasks.push(task);
const removeUserTask = (taskID) => {
  for( let i = 0; i < userTasks.length; i++) {
    if(userTasks[i].taskID === taskID) userTasks.splice(i,1);
  }
};
const findUserTask = (taskID) => {
  return userTasks.find((task) => task.taskID === taskID)
};

const updateUserTask = (taskID) => {
  const taskIndex = userTasks.findIndex((task) => task.taskID === taskID);

};



export {  userTasks, 
          addUserTask, 
          removeUserTask, 
          findUserTask,
          updateUserTask
       }