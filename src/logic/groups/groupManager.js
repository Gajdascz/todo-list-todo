import userStorage from "../storage/userStorage";

import group from "./group";

import { checkDue } from "../utility/dateHelperFunctions";

import taskManager from "../tasks/taskManager";

import sidebarUI from "../../ui/groups/groupSidebarUI";

const groupManager = (() => {
  const groupCollections = new Map();

  /* Initializes Default Group Collection and Populates Each Group Using assignTaskToDefaultGroups */
  const initializeDefaultGroupsCollection = () => {
    const allTasks = taskManager.getAllTaskObjs();
    const defaultGroupsCollection = {
      all: group("all"),
      complete: group("complete"),
      due: initializeDueGroups(),
      priority: initializePriorityGroups(),
    };
    groupCollections.set("default", defaultGroupsCollection);
    assignTasksToDefaultGroups(allTasks);
  };
  /* Creates subgroup For Due Based on Task Due Properties (overdue, today, tomorrow, etc.) */
  const initializeDueGroups = () => ({
    overdue: group("dueOverdue"),
    today: group("dueToday"),
    tomorrow: group("dueTomorrow"),
    thisWeek: group("dueThisWeek"),
    nextWeek: group("dueNextWeek"),
    thisMonth: group("dueThisMonth"),
    nextMonth: group("dueNextMonth"),
    later: group("dueLater"),
    allDue: group("dueAll"),
  });
  /* Creates subgroup For Priority Based on Task Priority Property (urgent, high, medium, etc.) */
  const initializePriorityGroups = () => ({
    urgent: group("priorityUrgent"),
    high: group("priorityHigh"),
    medium: group("priorityMedium"),
    low: group("priorityLow"),
    none: group("priorityNone"),
  });

  /* Populates Default Groups Based On All Existing Task Objects Properties (priority,due,status, etc.) */
  const assignTasksToDefaultGroups = (allTasks) =>
    allTasks.forEach((task) => {
      assignTaskToDefaultGroups(task);
    });

  /* Assigns task to it's relevant default groups */
  const assignTaskToDefaultGroups = (task) => {
    const defaultCollection = groupCollections.get("default");
    if (!defaultCollection) initializeDefaultGroupsCollection();
    else if (task.status) defaultCollection.complete.add(task);
    else {
      defaultCollection.all.add(task);
      if (task.due) {
        defaultCollection.due.allDue.add(task);
        checkDue(task).forEach((dueCategory) => {
          defaultCollection.due[dueCategory]?.add(task);
        });
      }
      defaultCollection.priority[task.priority].add(task);
    }
  };

  /* GetAllGroups Helper */
  // Takes Collection Key and Collection Groups -> Returns Object {collection: nameOfCollection, groups: [{groupName, groupObj: {}}]}
  const getAllGroupsFromCollection = (collectionKey, groupCollection) => {
    const collectionIterator = (currentGroup) => {
      return Object.entries(currentGroup).reduce(
        (nestedGroups, [key, value]) => {
          if (value.isGroup)
            nestedGroups.push({ groupName: key, groupObj: value });
          else if (typeof value === "object")
            nestedGroups.push({
              groupName: key,
              subgroups: collectionIterator(value),
            });
          return nestedGroups;
        },
        [],
      );
    };
    return {
      collection: collectionKey,
      groups: collectionIterator(groupCollection),
    };
  };

  /* Returns Array of All Groups from All Collections (Combined Results of getAllGroupsFromCollection()) */
  const getAllGroups = () =>
    [...groupCollections.entries()].map(([collectionKey, groupCollection]) =>
      getAllGroupsFromCollection(collectionKey, groupCollection),
    );

  const getNumberOfGroups = () => {
    return [...groupCollections.values()].reduce((totalAcc, collection) => {
      const collectionGroupCount = Object.values(collection).reduce(
        (acc, group) => {
          return group.isGroup ? acc + 1 : acc + Object.keys(group).length;
        },
        0,
      );
      return totalAcc + collectionGroupCount;
    }, 0);
  };

  /* getTaskGroups Helper */
  // Takes Group/groupCollection Obj and TaskObj -> Returns An Array Of Groups Containing The TaskObj
  const findTaskGroups = (groupObj, task) => {
    return Object.values(groupObj).flatMap((group) => {
      if (
        group &&
        typeof group === "object" &&
        group.isGroup &&
        group.inGroup(task.taskID)
      ) {
        return [group];
      } else if (group && typeof group === "object") {
        return findTaskGroups(group, task);
      }
      return [];
    });
  };

  /* Returns Array of All Groups The Specified Task Belongs To (Combined Results of FindTaskGroups()) */
  const getTaskGroups = (task) =>
    [...groupCollections.values()].flatMap((groupsCollection) =>
      findTaskGroups(groupsCollection, task),
    );

  /* Updates A Tasks Default Groups */
  const updateTaskDefaultGroups = (updatedTask) => {
    groupManager.removeTaskFromAllGroups(updatedTask);
    assignTaskToDefaultGroups(updatedTask);
  };

  /* Returns All taskCard Objects from Specified Group and Optional subgroup */
  const getGroupTaskCards = (groupName, subgroupName = null) => {
    const tasksInGroup = [];
    const taskCards = [];
    groupManager.getAllGroups().forEach((collection) => {
      collection.groups.forEach((group) => {
        if (group.groupName === groupName) {
          if (group.groupObj && group.groupObj.isGroup()) {
            group.groupObj.tasks.forEach((task) => {
              tasksInGroup.push(taskManager.getTaskObj(task.taskID));
            });
          } else if (group.subgroups) {
            if (!subgroupName) {
              group.subgroups.forEach((subgroup) => {
                subgroup.groupObj.tasks.forEach((task) => {
                  tasksInGroup.push(taskManager.getTaskObj(task.taskID));
                });
              });
            } else {
              group.subgroups.forEach((subgroup) => {
                if (subgroup.groupName === subgroupName) {
                  subgroup.groupObj.tasks.forEach((task) => {
                    tasksInGroup.push(taskManager.getTaskObj(task.taskID));
                  });
                }
              });
            }
          }
        }
      });
    });
    const sortedTasks = taskManager.sortTasksByDate(tasksInGroup);
    sortedTasks.forEach((task) =>
      taskCards.push(taskManager.getTaskCardObj(task.taskID)),
    );
    return taskCards;
  };

  const getGroupFromCollection = (
    collection,
    groupName,
    subgroupName = null,
  ) => {
    const currentCollection = groupCollections.get(collection);
    return subgroupName
      ? currentCollection[groupName]?.[subgroupName]
      : currentCollection[groupName];
  };

  const getPropertyFromAllGroupTasks = (
    collection,
    property,
    groupName,
    subgroupName = null,
  ) => {
    const group = getGroupFromCollection(collection, groupName, subgroupName);
    if (group && Array.isArray(group.tasks))
      return group.tasks.map((task) => task[property]);
    else return [];
  };

  const getTitleFromAllGroupTasks = (
    collection,
    groupName,
    subgroupName = null,
  ) =>
    getPropertyFromAllGroupTasks(collection, "title", groupName, subgroupName);

  const getTotalTasksInGroup = (collection, groupName, subgroupName = null) => {
    const currentGroup = getGroupFromCollection(
      collection,
      groupName,
      subgroupName,
    );
    return currentGroup?.isGroup
      ? currentGroup.tasks.length
      : (currentGroup.isGroup?.[subgroupName]?.tasks?.length ?? 0);
  };

  /* Returns an Array of Structured Objects Containing the Name of Each Collection,
   *  The names of every group/subgroup within the collection, and the number of tasks
   *  in each group.
   *
   * Return Structure:
   *   [{collection: name,
   *     groups: [
   *       {groupName: name, (numberOfTasks: number || subgroups: [{groupName:name, numberOfTasks:number}])}
   *     ]}
   *   ]
   *
   */
  const getAllGroupUIData = () => {
    return getAllGroups().map((groupCollection) => {
      return {
        collectionName: groupCollection.collection,
        groups: groupCollection.groups.map((group) => {
          return {
            groupName: group.groupName,
            ...(!group.subgroups && {
              numberOfTasks: group.groupObj.tasks.length,
            }),
            ...(group.subgroups && {
              subgroups: group.subgroups.map((subgroup) => {
                return {
                  groupName: subgroup.groupName,
                  numberOfTasks: subgroup.groupObj.tasks.length,
                };
              }),
            }),
          };
        }),
      };
    });
  };

  /* Removes Given Task From All Groups It Exists In */
  const removeTaskFromAllGroups = (task) => {
    [...groupCollections.values()].forEach((groupObj) =>
      findTaskGroups(groupObj, task).forEach((group) => group.remove(task)),
    );
    userStorage.updateGroupsAfterTaskRemoval(task.taskID);
  };

  /* Initializes User Group Collection  */
  const initializeUserGroupCollection = () => {
    const groupDataObjs = userStorage.getAllDataObjs("group");
    groupCollections.set("user", {});
    if (groupDataObjs) {
      [...groupDataObjs].forEach((groupData) => {
        let groupTaskObjs = groupData.tasks.map(
          (task) => taskManager.getTaskObj(task).taskID,
        );
        createUserGroup(groupData.groupName, groupTaskObjs);
      });
    }
  };
  const createUserGroup = (groupName, taskIDs) => {
    const userGroupCollection = groupCollections.get("user");
    const userGroup = group(
      groupName,
      taskIDs ? taskIDs.map((id) => taskManager.getTaskObj(id)) : [],
    );
    userGroupCollection[groupName] = userGroup;
    userStorage.storeGroup(userGroup);
    sidebarUI().populateUserGroups();
  };

  const updateUserGroup = (
    groupName,
    taskAddIDs,
    taskRemoveIDs,
    originalGroupName,
  ) => {
    const userGroup = groupCollections.get("user")[originalGroupName];
    const addTasks = taskAddIDs.map((id) => taskManager.getTaskObj(id));
    const removeTasks = taskRemoveIDs.map((id) => taskManager.getTaskObj(id));
    if (addTasks.length > 0) addTasks.forEach((task) => userGroup.add(task));
    if (taskRemoveIDs.length > 0)
      removeTasks.forEach((task) => userGroup.remove(task));
    if (groupName === originalGroupName) userStorage.storeGroup(userGroup);
    else if (groupName !== originalGroupName) {
      userGroup.groupName = groupName;
      const userGroups = groupCollections.get("user");
      delete userGroups[originalGroupName];
      userGroups[groupName] = userGroup;
      userStorage.storeGroup(userGroup);
      userStorage.removeGroup(originalGroupName);
      sidebarUI().populateUserGroups();
    }
  };

  const deleteUserGroup = (groupName) => {
    delete groupCollections.get("user")[groupName];
    userStorage.removeGroup(groupName);
    sidebarUI().populateUserGroups();
  };

  const getAllUserGroups = () => groupCollections.get("user");

  const getAllTasksInGroup = (collection, groupName) =>
    groupCollections.get(collection)[groupName].tasks;

  /* Wrapper Function To Initialize Both Default and User Group Collections */
  const initializeGroupCollections = () => {
    initializeDefaultGroupsCollection();
    initializeUserGroupCollection();
  };
  return {
    init: initializeGroupCollections,
    removeTaskFromAllGroups,
    updateTaskDefaultGroups,
    getTaskGroups,
    getAllGroups,
    getAllGroupUIData,
    getGroupTaskCards,

    getTitleFromAllGroupTasks,
    getTotalTasksInGroup,
    getNumberOfGroups,

    createUserGroup,
    updateUserGroup,
    getAllUserGroups,
    deleteUserGroup,

    getAllTasksInGroup,
  };
})();

export default groupManager;
