import groupFormObjs from "../../builders/groups/groupFormObjs";
import taskManager from "../../../logic/tasks/taskManager";
import {
  buildElementTree,
  eventHandler,
} from "../../../logic/utility/domHelperFunctions";
import groupManager from "../../../logic/groups/groupManager";
import { renderDeleteWarningDialog } from "../../../render";

const groupForm = (formContext, group = null, groupBtn = null) => {
  const originalGroupName = group ? group.groupName : null;
  let headerText,
    subHeaderText,
    tasksInGroup = null;
  if (formContext === "new-group") {
    headerText = "New Group";
    subHeaderText = "Add Tasks To Group";
  } else if (formContext === "edit-group") {
    headerText = `Editing: ${group.groupName}`;
    subHeaderText = "Modify Group Tasks";
    tasksInGroup = groupManager.getAllTasksInGroup("user", group.groupName);
  }
  const groupFormObj = groupFormObjs.groupFormObj(formContext);
  const allTaskTitles = taskManager.getAllTaskTitles();

  const buildTaskListContainerObj = () => {
    const taskListContainerObj = groupFormObjs.tasksListContainerObj();
    const allTaskBtns = Object.entries(allTaskTitles).map(([key, value]) =>
      groupFormObjs.taskListEntryBtnObj(key, value),
    );
    if (tasksInGroup) {
      const taskIDsInGroup = new Set(tasksInGroup.map((task) => task.taskID));
      allTaskBtns.forEach((btn) => {
        const btnTaskID = btn.attributes[`data-taskid`];
        if (taskIDsInGroup.has(btnTaskID)) btn.attributes.class += " in-group";
      });
    }
    taskListContainerObj.children = [...allTaskBtns];
    return taskListContainerObj;
  };

  groupFormObj.children = [
    groupFormObjs.groupFormHeaderObj(headerText),
    groupFormObjs.groupNameInputObj(group ? group.groupName : ""),
    groupFormObjs.groupFormHeaderObj(subHeaderText, 2),
    buildTaskListContainerObj(),
    groupFormObjs.submitButtonObj(),
    ...[formContext === "edit-group" && groupFormObjs.deleteButtonObj()],
  ];

  const fieldSelectors = {
    groupName: "input.group-dialog-form-group-name-text-input",
    taskBtns: ["button.group-form-task-entry-button"],
  };

  const groupFormElement = buildElementTree(groupFormObj);

  const getTaskInputData = (formTaskBtns) => {
    return [...formTaskBtns].reduce(
      (acc, btn) => {
        if (btn.classList.contains("add-to-group")) acc.add.push(btn);
        else if (btn.classList.contains("remove-from-group"))
          acc.remove.push(btn);
        return acc;
      },
      { add: [], remove: [] },
    );
  };

  const updateFormOnSubmit = (taskBtns, groupName) => {
    groupFormElement.reset();
    if (group && groupName !== originalGroupName) {
      groupFormElement.querySelector(
        ".group-dialog-form-group-name-text-input",
      ).value = groupName;
      groupFormElement.querySelector("h1.group-form-header").textContent =
        `Editing: ${groupName}`;
      groupBtn.textContent = groupName;
    }
    taskBtns.forEach((btn) => {
      const classes = btn.classList;
      if (formContext === "new-group") {
        classes.remove("in-group");
        classes.remove("add-to-group");
      }
      if (
        classes.contains("in-group") &&
        classes.contains("remove-from-group")
      ) {
        classes.remove("in-group");
        classes.remove("remove-from-group");
      }
      if (classes.contains("add-to-group")) {
        classes.remove("add-to-group");
        classes.add("in-group");
      }
    });
  };

  const submitGroup = () => {
    const groupName = groupFormElement
      .querySelector(fieldSelectors.groupName)
      .value.trim();
    if (groupName.length === 0) {
      alert("Group Name Required");
      return;
    }
    const taskBtns = groupFormElement.querySelectorAll(fieldSelectors.taskBtns);
    const taskData = getTaskInputData(taskBtns);
    const taskAddIDs = taskData.add.map((task) => task.dataset.taskid);
    const taskRemoveIDs =
      taskData.remove.length > 0
        ? taskData.remove.map((task) => task.dataset.taskid)
        : [];
    formContext === "new-group"
      ? groupManager.createUserGroup(groupName, taskAddIDs)
      : groupManager.updateUserGroup(
          groupName,
          taskAddIDs,
          taskRemoveIDs,
          originalGroupName,
        );
    updateFormOnSubmit(taskBtns, groupName);
  };

  const selectDelete = () =>
    renderDeleteWarningDialog("0", () =>
      groupManager.deleteUserGroup(originalGroupName),
    );

  eventHandler(
    groupFormElement,
    ".group-form-submit-button",
    "click",
    submitGroup,
    group ? group : null,
    true,
  );
  if (formContext === "edit-group")
    eventHandler(
      groupFormElement,
      ".group-form-delete-button",
      "click",
      selectDelete,
    );

  groupFormElement
    .querySelectorAll(".group-form-task-entry-button")
    .forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const classes = this.classList;
        if (
          classes.contains("in-group") &&
          !classes.contains("remove-from-group")
        ) {
          classes.add("remove-from-group");
        } else if (
          classes.contains("in-group") &&
          classes.contains("remove-from-group")
        ) {
          classes.toggle("remove-from-group");
        } else if (classes.contains("add-to-group")) {
          classes.toggle("add-to-group");
        } else classes.toggle("add-to-group");
      });
    });

  return { element: groupFormElement };
};

export default groupForm;
