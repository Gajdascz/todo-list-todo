import formObjs from "../general/formObjs";
import uiObjs from "../general/uiObjs";

const groupFormObjs = (() => {
  const context = "group";
  const formType = "dialog";

  const groupFormObj = (formContext) =>
    formObjs.formObj(context, formType, formContext);
  const groupNameInputObj = (groupName = null) =>
    formObjs.textInputObj(
      context,
      formType,
      groupName,
      "group-name",
      "Group Name",
      true,
      12,
    );

  const groupFormHeaderObj = (text, headerLevel = 1) =>
    uiObjs.headerObj("group-form", text, headerLevel);

  const tasksListContainerObj = () =>
    formObjs.containerObj(context, formType, "all-tasks");
  const taskListEntryBtnObj = (taskID, taskTitle) =>
    uiObjs.btnObj(
      "group-form-task-entry",
      taskTitle,
      { "data-taskid": taskID },
      "button",
    );

  const submitButtonObj = () =>
    uiObjs.btnObj("group-form-submit", "Submit", {}, "submit");
  const deleteButtonObj = () => uiObjs.btnObj("group-form-delete", "Delete");

  return {
    groupFormObj,
    groupFormHeaderObj,
    groupNameInputObj,
    tasksListContainerObj,
    taskListEntryBtnObj,
    submitButtonObj,
    deleteButtonObj,
  };
})();

export default groupFormObjs;
