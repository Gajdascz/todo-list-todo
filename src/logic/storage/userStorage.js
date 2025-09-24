const userStorage = ((user = "local") => {
  const storeTask = (taskObj) => {
    if (taskObj.taskID)
      localStorage.setItem("task-" + taskObj.taskID, serializeTaskObj(taskObj));
  };
  const storeGroup = (groupObj) => {
    if (groupObj.groupName)
      localStorage.setItem(
        "group-" + groupObj.groupName,
        serializeGroupObj(groupObj),
      );
  };

  const removeTask = (taskID) => {
    if (taskID) localStorage.removeItem("task-" + taskID);
  };
  const removeGroup = (groupName) => {
    if (groupName) localStorage.removeItem("group-" + groupName);
  };
  const getTaskDataObj = (taskID) => {
    const serializedTaskData = localStorage.getItem("task-" + taskID);
    return serializedTaskData ? deserializeData(serializedTaskData) : null;
  };

  const getAllDataObjs = (dataName) => {
    const taskDataObjs = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(dataName))
        taskDataObjs.push(deserializeData(localStorage.getItem(key)));
    }
    return taskDataObjs;
  };

  const getGroupDataObj = (groupName) => {
    const serializedGroupData = localStorage.getItem("group-" + groupName);
    return serializedGroupData ? deserializeData(serializedGroupData) : null;
  };

  const serializeTaskObj = (taskObj) => {
    return JSON.stringify({
      priority: taskObj.priority,
      title: taskObj.title,
      due: taskObj.due,
      description: taskObj.description,
      subtasks: taskObj.subtasks,
      status: taskObj.status,
      timestamp: taskObj.timestamp,
      taskID: taskObj.taskID,
    });
  };

  const deserializeData = (serializedTask) => JSON.parse(serializedTask);

  const serializeGroupObj = (groupObj) => {
    const tasks = groupObj.tasks.map((task) => task.taskID ?? task);
    return JSON.stringify({
      groupName: groupObj.groupName,
      tasks,
    });
  };

  const updateGroupsAfterTaskRemoval = (taskID) => {
    const allGroups = getAllDataObjs("group");
    allGroups.forEach((groupObj) => {
      if (groupObj.tasks.includes(taskID)) {
        groupObj.tasks = groupObj.tasks.filter((task) => task !== taskID);
        storeGroup(groupObj);
      }
    });
  };

  return {
    storeTask,
    removeTask,
    removeGroup,
    getTaskDataObj,
    getAllDataObjs,
    storeGroup,
    getGroupDataObj,
    updateGroupsAfterTaskRemoval,
  };
})();

export default userStorage;
