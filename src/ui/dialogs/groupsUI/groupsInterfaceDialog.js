import { buildBaseDialogElement } from "../general/baseDialog";
import {
  buildElementTree,
  eventHandler,
} from "../../../logic/utility/domHelperFunctions";

import groupsUIObjs from "../../builders/groups/groupUIObjs";

import groupsOverview from "./groupsOverview";
import groupForm from "./groupForm";
import groupsManagerUI from "./groupsManagerUI";
import groupManager from "../../../logic/groups/groupManager";

const groupsInterfaceDialog = () => {
  const groupsInterfaceDialogElement =
    buildBaseDialogElement("Groups Interface");

  const groupsUIContainerObj = groupsUIObjs.uiContainerObj();

  const interfaceButtonContainerObj = groupsUIObjs.btnsContainerObj();

  const groupsUIContentContainerObj = groupsUIObjs.uiContentContainerObj();

  interfaceButtonContainerObj.children = [
    groupsUIObjs.overviewBtnObj(),
    groupsUIObjs.manageGroupsBtnObj(),
    groupsUIObjs.newGroupBtnObj(),
  ];
  groupsUIContainerObj.children = [
    interfaceButtonContainerObj,
    groupsUIContentContainerObj,
  ];

  groupsInterfaceDialogElement.append(buildElementTree(groupsUIContainerObj));

  const contentContainerElement = groupsInterfaceDialogElement.querySelector(
    ".groups-ui-content-container-div",
  );

  const checkCurrentContent = (content) => {
    content = new RegExp(content, "i");
    return [...contentContainerElement.firstChild.classList].some((value) =>
      content.test(value),
    );
  };

  const loadGroupsOverview = () => {
    if (!contentContainerElement.firstChild) {
      contentContainerElement.append(
        groupsOverview(
          groupManager.getAllGroupUIData(),
          groupManager.getNumberOfGroups(),
        ).element,
      );
    } else if (!checkCurrentContent("overview")) {
      contentContainerElement.firstChild.remove();
      contentContainerElement.append(
        groupsOverview(
          groupManager.getAllGroupUIData(),
          groupManager.getNumberOfGroups(),
        ).element,
      );
    }
  };
  const loadGroupsManager = () => {
    if (
      contentContainerElement.firstChild &&
      !checkCurrentContent("groups-manager")
    ) {
      contentContainerElement.firstChild.remove();
      contentContainerElement.append(
        groupsManagerUI(groupManager.getAllUserGroups()).element,
      );
    }
  };

  const loadNewGroupForm = () => {
    if (
      contentContainerElement.firstChild &&
      !checkCurrentContent("new-group")
    ) {
      contentContainerElement.firstChild.remove();
      contentContainerElement.append(groupForm("new-group").element);
    }
  };

  eventHandler(
    groupsInterfaceDialogElement,
    ".groups-overview-button",
    "click",
    loadGroupsOverview,
  );
  eventHandler(
    groupsInterfaceDialogElement,
    ".groups-manager-button",
    "click",
    loadGroupsManager,
  );
  eventHandler(
    groupsInterfaceDialogElement,
    ".new-group-button",
    "click",
    loadNewGroupForm,
  );

  loadGroupsOverview();
  // loadNewGroupForm()

  return {
    element: groupsInterfaceDialogElement,
  };
};

export default groupsInterfaceDialog;
