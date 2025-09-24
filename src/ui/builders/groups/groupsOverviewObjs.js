import uiObjs from "../general/uiObjs";

const groupsOverviewObjs = (() => {
  const overviewContainerObj = () => uiObjs.containerDivObj("groups-overview");

  const overviewHeaderObj = () =>
    uiObjs.headerObj("groups-overview", "Overview", 1);

  const groupCollectionContainerObj = (collectionName) =>
    uiObjs.containerDivObj(`${collectionName}-group-overview`);
  const groupCollectionHeaderObj = (collectionName, headerText) =>
    uiObjs.headerObj(collectionName, headerText, 2);
  const groupCollectionAllGroupsListContainerObj = (collectionName) =>
    uiObjs.containerDivObj(`${collectionName}-all-groups-list`);

  const groupWithSubgroupsListContainerObj = () =>
    uiObjs.containerDivObj("group-with-subgroups-list");

  const groupListEntryContainerObj = (context) =>
    uiObjs.containerDivObj(context.toLowerCase());
  const groupListEntryHeaderObj = (groupName) =>
    uiObjs.headerObj(groupName.toLowerCase(), groupName, 3);
  const groupNameTextObj = (groupName) =>
    uiObjs.textDivObj("group-name", groupName);
  const numberOfTasksObj = (num) =>
    uiObjs.textDivObj("group-number-of-tasks", num.toString());

  return {
    overviewContainerObj,
    overviewHeaderObj,

    groupWithSubgroupsListContainerObj,
    groupListEntryContainerObj,
    groupListEntryHeaderObj,
    groupNameTextObj,
    numberOfTasksObj,

    groupCollectionHeaderObj,
    groupCollectionContainerObj,
    groupCollectionAllGroupsListContainerObj,
  };
})();

export default groupsOverviewObjs;
