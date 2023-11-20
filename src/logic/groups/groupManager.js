import userStorage from "../storage/userStorage";
import group from "./group";
import checkDue from "../utility/dateHelperFunctions";


const groupManager = (() => {
  const groups = new Map();

  const initializeDefaultGroups = () => {
    const defaultGroups = {
      all: group((userStorage.getAllTasks())),
      complete: group(),
      due: {
        overdue: group(),
        today: group(),
        tomorrow: group(),
        thisWeek: group(),
        nextWeek: group(),
        thisMonth: group(),
        nextMonth: group(),
        later: group(),
        allDue: group(),
        noDue: group(),
      },
      priority: {
        urgent: group(),
        high: group(),
        medium: group(),
        low: group(),
        none: group(),
      },
    }
    for(const task of defaultGroups.all.tasks) {
      if(task.status) defaultGroups.complete.add(task);
      else {
        if(task.dueDate) {
          defaultGroups.due.allDue.add(task);
          defaultGroups.due[checkDue(task)].add(task);
        } else defaultGroups.due.noDue.add(task);
        defaultGroups.priority[task.priority].add(task);
      }
    }
    groups.set('default', defaultGroups)
  };


  const addGroup = (groupName, groupTasks={}) => groups.set(groupName,groupTasks);
  const removeGroup = (groupName) => groups.delete(groupName);
  const getGroup = (groupName) => groups.get(groupName);
  const removeTaskFromAllGroups = (task) => {
    
    groups.forEach(group => console.log(group))
  };

  return {
    initialize: initializeDefaultGroups,
    addGroup,
    removeGroup,
    getGroup,
    removeTaskFromAllGroups
  }
})();

export default groupManager