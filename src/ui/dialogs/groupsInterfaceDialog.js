import { buildBaseDialogElement } from "./baseDialog";
import { buildElementTree, eventHandler } from "../../logic/utility/domHelperFunctions";
import groupsFormObjs from "../builders/groupFormObjs";
import taskManager from "../../logic/tasks/taskManager";
import groupManager from "../../logic/groups/groupManager";
import formObjs from "../builders/formObjs";

const groupsInterfaceDialog = () => {
  const groupsInterfaceDialogElement = buildBaseDialogElement('Groups Interface');

  const newGroupUI = groupsFormObjs.groupsUIContainer('new-group');

  newGroupUI.children = [
    groupsFormObjs.groupNameInputObj(),
    groupsFormObjs.tasksListContainerObj(),
    groupsFormObjs.submitButtonObj(),
  ]

  groupsInterfaceDialogElement.append(buildElementTree(newGroupUI));

  const allTaskTitles = taskManager.getAllTaskTitles()

  const allTasksContainer = groupsInterfaceDialogElement.querySelector('.groups-dialog-form-all-tasks-container')

  for(const [key,value] of Object.entries(allTaskTitles)) allTasksContainer.append(buildElementTree(groupsFormObjs.taskListEntryObj(key, value)))

  
  return { element: groupsInterfaceDialogElement }
}

export default groupsInterfaceDialog;