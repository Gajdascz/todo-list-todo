import uiObjs from "../general/uiObjs";

const groupsManagerObjs = (() => {
  const contentContainerObj = () => uiObjs.containerDivObj("groups-manager");
  const headerObj = (text, headerLvl = 1) =>
    uiObjs.headerObj("groups-manager", text, headerLvl);

  const groupsListContainerObj = () =>
    uiObjs.containerDivObj("groups-manager-groups-list");
  const groupsListEntryBtnObj = (groupName) =>
    uiObjs.btnObj("manage-group", groupName);

  return {
    contentContainerObj,
    headerObj,
    groupsListContainerObj,
    groupsListEntryBtnObj,
  };
})();

export default groupsManagerObjs;
