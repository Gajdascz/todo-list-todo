const group = ((tasks=[]) => {
  let _tasks = tasks;

  const add = (task) => {
    if(!inGroup(task.taskID)) _tasks.push(task);
  };
  const remove = (task) => {
    if(inGroup(task.taskID)) {
      for(let i = _tasks.length - 1; i >= 0 ; i--) {
        if(_tasks[i].taskID === task.taskID) _tasks.splice(i,1);
      }
    }
  };
  const inGroup = (taskID) => {
    return _tasks.some( (task) => task.taskID === taskID)
  };

  return {
    get tasks() { return _tasks; },
    add,
    remove,
  }
});

export default group