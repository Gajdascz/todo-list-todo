import uiObjs from "../general/uiObjs";

const groupsUIObjs = (() => {
  const groupsUIContainerObj = () => uiObjs.containerDivObj("groups-ui");
  const groupsUIContentContainerObj = () =>
    uiObjs.containerDivObj("groups-ui-content");
  const uiBtnsContainerObj = () => uiObjs.containerDivObj("groups-ui-btns");
  const overviewButtonObj = () => uiObjs.btnObj("groups-overview", "Overview");
  const newGroupButtonObj = () => uiObjs.btnObj("new-group", "New Group");
  const manageGroupsButtonObj = () => uiObjs.btnObj("groups-manager", "Manage");

  return {
    uiContainerObj: groupsUIContainerObj,
    uiContentContainerObj: groupsUIContentContainerObj,
    btnsContainerObj: uiBtnsContainerObj,
    overviewBtnObj: overviewButtonObj,
    newGroupBtnObj: newGroupButtonObj,
    manageGroupsBtnObj: manageGroupsButtonObj,
  };
})();

export default groupsUIObjs;
