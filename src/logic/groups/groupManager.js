import userStorage from "../storage/userStorage";
import group from "./group";
import { checkDue } from "../utility/dateHelperFunctions";
import taskSort from "../utility/taskSort";


const groupManager = (() => {
  const groupCollections = new Map();


  /* Initializes Default Group Collection and Populates Each Group Using assignTaskToDefaultGroups */
  const initializeDefaultGroupsCollection = () => {
    const allTasks = userStorage.getAllTaskObjs();
    const defaultGroupsCollection = ({
      all: group('all'),
      complete: group('complete'),
      due: initializeDueGroups(),
      priority: initializePriorityGroups(),
    });
    groupCollections.set('default', defaultGroupsCollection)
    assignTasksToDefaultGroups(allTasks);
  };
  /* Creates Subgroups For Due Based on Task Due Properties (overdue, today, tomorrow, etc.) */
  const initializeDueGroups = () => ({
    overdue: group('dueOverdue'),
    today: group('dueToday'),
    tomorrow: group('dueTomorrow'),
    thisWeek: group('dueThisWeek'),
    nextWeek: group('dueNextWeek'),
    thisMonth: group('dueThisMonth'),
    nextMonth: group('dueNextMonth'),
    later: group('dueLater'),
    allDue: group('dueAll'),
  });
  /* Creates Subgroups For Priority Based on Task Priority Property (urgent, high, medium, etc.) */
  const initializePriorityGroups = () => ({
    urgent: group('priorityUrgent'),
    high: group('priorityHigh'),
    medium: group('priorityMedium'),
    low: group('priorityLow'),
    none: group('priorityNone'),
  });

  /* Populates Default Groups Based On All Existing Task Objects Properties (priority,due,status, etc.) */
  const assignTasksToDefaultGroups = (allTasks) => {
    allTasks.forEach(task => {
      assignTaskToDefaultGroups(task)
    })
  };

  /* Assigns task to it's relevant default groups */
  const assignTaskToDefaultGroups = (task) => {
    const defaultCollection = groupCollections.get('default');
    console.log(defaultCollection)
    if(task.status) defaultCollection.complete.add(task);
    else {
      defaultCollection.all.add(task);
      if(task.due) {
        defaultCollection.due.allDue.add(task);
        checkDue(task).forEach(dueCategory => {
          defaultCollection.due[dueCategory]?.add(task);
        });
      }
      defaultCollection.priority[task.priority].add(task);
    }
  };


  /* Initializes User Group Collection ~~WIP~~ */
  const initializeUserGroupCollection = (userGroups) => {
    const userGroupCollection = {}
    groupCollections.set('user', userGroupCollection)
  };

    const createUserGroup = (groupName, tasks=[]) => {
     const userGroup = group(groupName,tasks);
     const userGroupCollection = groupCollections.get('user');
     userGroupCollection[groupName] = userGroup;
     groupCollections.set('user', userGroupCollection);
   };


  /* Wrapper Function To Initialize Both Default and User Group Collections */
  const initializeGroupCollections = () => { 
    initializeDefaultGroupsCollection(); 
    initializeUserGroupCollection(); 
  };


  /* GetAllGroups Helper */
  // Takes Collection Key and Collection Groups -> Returns Object {collection: nameOfCollection, groups: [{groupName, groupObj: {}}]}
  const getAllGroupsFromCollection = (collectionKey,groupCollection) => {
    const collectionIterator = (currentGroup) => {
      return Object.entries(currentGroup).reduce((nestedGroups, [key,value]) => {
        if(value.isGroup) nestedGroups.push({groupName: key, groupObj: value});
        else if (typeof value === 'object') nestedGroups.push({groupName: key, subGroups: collectionIterator(value)});
        return nestedGroups;
      },[]);
    }
    return {
      collection: collectionKey,
      groups: collectionIterator(groupCollection)
    }
  };

  /* Returns Array of All Groups from All Collections (Combined Results of getAllGroupsFromCollection()) */
  const getAllGroups = () => [...groupCollections.entries()].map(([collectionKey, groupCollection]) => getAllGroupsFromCollection(collectionKey, groupCollection));
  

  /* Returns All Collection and Group Names In A Structured Object */
  const getAllGroupNames = () => {
    return getAllGroups().map(groupCollection =>  {
      return {
        collectionName: groupCollection.collection,
        groups: groupCollection.groups.map(group => {
          return {
            groupName: group.groupName,
            subGroups: group.subGroups ? group.subGroups.map(subGroup => subGroup.groupName) : []
          }
        })
      }
    })
  };

  /* Removes Given Task From All Groups It Exists In */
  const removeTaskFromAllGroups = (task) => {
    ([...groupCollections.values()].forEach(groupObj => findTaskGroups(groupObj,task).forEach(group => group.remove(task))));
  };

  /* getTaskGroups Helper */
  // Takes Group/groupCollection Obj and TaskObj -> Returns An Array Of Groups Containing The TaskObj
  const findTaskGroups = (groupObj, task) => {
    return Object.values(groupObj)
                 .flatMap(group => {
                   if (group && typeof group === 'object' && group.isGroup && group.inGroup(task.taskID)) {
                     return [group];
                   } else if (group && typeof group === 'object') {
                     return findTaskGroups(group, task);
                   }
                   return [];
                 });
  };

  /* Returns Array of All Groups The Specified Task Belongs To (Combined Results of FindTaskGroups()) */
  const getTaskGroups = (task) => [...groupCollections.values()].flatMap(groupsCollection => findTaskGroups(groupsCollection,task));

  /* Updates A Tasks Default Groups */
  const updateTaskDefaultGroups = (updatedTask) => {
    groupManager.removeTaskFromAllGroups(updatedTask);
    assignTaskToDefaultGroups(updatedTask);
  };
  
  /* Returns All taskCard Objects from Specified Group and Optional subGroup */
  const getGroupTaskCards = (groupName, subGroupName=null) => {
    const tasksInGroup = []
    const taskCards = [];
    groupManager.getAllGroups().forEach(collection => {
      collection.groups.forEach(group => {
        if(group.groupName === groupName) {
          if(group.groupObj && group.groupObj.isGroup()) {
            group.groupObj.tasks.forEach(task => {
              tasksInGroup.push(userStorage.getTaskObj(task.taskID))
            })
          } else if (group.subGroups) {
              if(!subGroupName){
                group.subGroups.forEach(subGroup => {
                  subGroup.groupObj.tasks.forEach(task => {
                    tasksInGroup.push(userStorage.getTaskObj(task.taskID))
                  })
              })              
            } else {
              group.subGroups.forEach(subGroup => {
                if(subGroup.groupName === subGroupName) {
                  subGroup.groupObj.tasks.forEach(task => {
                    tasksInGroup.push(userStorage.getTaskObj(task.taskID));
                  })
                }
              })
            }
          } 
        }
      })
    })
    const sortedTasks = taskSort.byDate(tasksInGroup);
    sortedTasks.forEach(task => taskCards.push(userStorage.getTaskCardObj(task.taskID)))
    console.log(sortedTasks)
    return taskCards
  };



  return {
    init: initializeGroupCollections,
    removeTaskFromAllGroups,
    updateTaskDefaultGroups,
    getTaskGroups,
    getAllGroups,
    getAllGroupNames,
    getGroupTaskCards
  }
})();

export default groupManager





  // /* Create Group In User Collection */

  // /* Delete Group From User Collection */
  // const deleteUserGroup = (groupName) => {
  //   const userGroupCollection = groupCollections.get('user');
  //   delete userGroupCollection[groupName];
  //   groupCollections.set('user', userGroupCollection)
  // };
  // const getUserGroup = (groupName) => (groupCollections.get('user')[groupName]);
  // const removeTaskFromUserGroup = (task,groupName) => {
  //   const userGroup = getUserGroup(groupName)
  //   delete userGroup[task];
  // };
