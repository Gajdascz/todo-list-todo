import { buildIconButtonObj } from "../../../logic/utility/domHelperFunctions";
import { formatDateForDisplay } from "../../../logic/utility/dateHelperFunctions";

/* Icon Path Defaults */
//#region
const pencilIconPath =
  "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";
const circleCheckMarkPath =
  "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";
const chevronDownPath =
  "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";
const chevronUpPath =
  "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z";
const doubleChevronDownPath =
  "M16.59,5.59L18,7L12,13L6,7L7.41,5.59L12,10.17L16.59,5.59M16.59,11.59L18,13L12,19L6,13L7.41,11.59L12,16.17L16.59,11.59Z";
const doubleChevronUpPath =
  "M7.41,18.41L6,17L12,11L18,17L16.59,18.41L12,13.83L7.41,18.41M7.41,12.41L6,11L12,5L18,11L16.59,12.41L12,7.83L7.41,12.41Z";
//#endregion

/* Object Builder Functions*/
//#region
const taskPriorityIndicatorObj = (
  priority,
  context = "task-card",
  elementTag = "div",
) => {
  return {
    type: elementTag,
    attributes: { class: `${context}-priority-indicator`, id: `${priority}` },
  };
};
const taskHeaderObj = (
  title,
  context = "task-card",
  titleTag = "h1",
  editIconPath = pencilIconPath,
  completeIconPath = circleCheckMarkPath,
) => {
  return {
    type: "div",
    attributes: { class: `${context}-header` },
    children: [
      taskTitleObj(title, context, titleTag),
      taskHeaderBtnContainerObj(
        context,
        (editIconPath = pencilIconPath),
        (completeIconPath = circleCheckMarkPath),
      ),
    ],
  };
};
const taskTitleObj = (title, context = "task-card", elementTag = "h1") => {
  return {
    type: elementTag,
    text: title,
    attributes: { class: `${context}-title` },
  };
};
const taskHeaderBtnContainerObj = (
  context = "task-card",
  editIconPath = pencilIconPath,
  completeIconPath = circleCheckMarkPath,
) => {
  return {
    type: "div",
    attributes: { class: `${context}-header-button-container` },
    children: [
      taskEditIconBtnObj(editIconPath, context),
      taskCompleteIconBtnObj(completeIconPath, context),
    ],
  };
};
const taskEditIconBtnObj = (path = pencilIconPath, context = "task-card") => {
  return buildIconButtonObj({
    iconPath: path,
    purpose: "edit",
    type: "button",
    section: context,
  });
};
const taskCompleteIconBtnObj = (
  path = circleCheckMarkPath,
  context = "task-card",
) => {
  return buildIconButtonObj({
    iconPath: path,
    purpose: "complete",
    type: "button",
    section: context,
  });
};
const taskDueObj = (due, context = "task-card", elementTag = "p") => {
  if (due) {
    return {
      type: elementTag,
      text: formatDateForDisplay(due),
      attributes: { class: `${context}-due` },
    };
  }
};
const taskDescriptionObj = (
  description,
  context = "task-card",
  elementTag = "p",
) => {
  return {
    type: elementTag,
    text: description,
    attributes: { class: `${context}-description` },
  };
};
const taskChecklistObj = (subtasks, taskID, context = "task-card") => {
  let subtaskList = [];
  for (let i = 0; i < subtasks.length; i++) {
    subtaskList.push(createSubtaskObj(subtasks[i], i, taskID, context));
  }
  return {
    type: "div",
    attributes: { class: `${context}-checklist` },
    children: subtaskList,
  };
};
const createSubtaskObj = (subtask, subtaskNumber, taskID, context) => {
  let childInput = [
    {
      type: "input",
      attributes: {
        type: "checkbox",
        id: `subtask-${subtaskNumber}-${taskID}`,
      },
      listeners: {
        click: [
          function (e) {
            this.parentElement.classList.toggle(`${context}-subtask-checked`);
          },
        ],
      },
    },
  ];
  return {
    type: "label",
    text: subtask,
    attributes: {
      for: `subtask-${subtaskNumber}-${taskID}`,
      class: `${context}-checkbox-container`,
    },
    children: childInput,
  };
};
const taskTimestampObj = (
  timestamp,
  context = "task-card",
  elementTag = "p",
) => {
  return {
    type: elementTag,
    text: timestamp,
    attributes: { class: `${context}-timestamp` },
  };
};
const taskHidePrevIconBtnObj = (path, context = "task-card") => {
  return buildIconButtonObj({
    iconPath: path,
    purpose: "hide-previous",
    type: "button",
    section: context,
    listeners: {
      click: [
        function (e) {
          let prevElement = this.parentElement.previousSibling;
          if (prevElement.classList.contains("hide")) {
            while (
              prevElement.classList.contains("hide") &&
              !prevElement.previousSibling.classList.contains(
                `${context}-header`,
              )
            ) {
              prevElement = prevElement.previousSibling;
            }
          }
          prevElement.classList.add("hide");
        },
      ],
    },
  });
};
const taskShowNextIconBtnObj = (path, context = "task-card") => {
  return buildIconButtonObj({
    iconPath: path,
    purpose: "show-next",
    type: "button",
    section: context,
    listeners: {
      click: [
        function (e) {
          let nextElement = this.parentElement.previousSibling;
          while (
            nextElement.previousSibling.classList.contains("hide") &&
            !nextElement.previousSibling.classList.contains(`${context}-header`)
          ) {
            nextElement = nextElement.previousSibling;
          }
          nextElement.classList.remove("hide");
        },
      ],
    },
  });
};
const taskHideAllIconBtnObj = (path, context = "task-card") => {
  return buildIconButtonObj({
    iconPath: path,
    purpose: "show-all",
    type: "button",
    section: context,
    listeners: {
      click: [
        function (e) {
          const taskChildren = this.parentElement.parentElement.children;
          const taskInfo = Array.from(taskChildren).splice(2, 4);
          taskInfo.forEach((child) => {
            child.classList.remove("hide");
          });
        },
      ],
    },
  });
};
const taskShowAllIconBtnObj = (path, context = "task-card") => {
  return buildIconButtonObj({
    iconPath: path,
    purpose: "hide-all",
    type: "button",
    section: context,
    listeners: {
      click: [
        function (e) {
          const taskChildren = this.parentElement.parentElement.children;
          const taskInfo = Array.from(taskChildren).splice(2, 4);
          taskInfo.forEach((child) => {
            child.classList.add("hide");
          });
        },
      ],
    },
  });
};
const taskShowHideIconBtnsObj = (
  context = "task-card",
  hidePrevPath = chevronUpPath,
  showNextPath = chevronDownPath,
  hideAllPath = doubleChevronDownPath,
  showAllPath = doubleChevronUpPath,
) => {
  return {
    type: "div",
    attributes: { class: `${context}-show-hide-icon-button-container` },
    children: [
      taskShowNextIconBtnObj(showNextPath, context),
      taskHidePrevIconBtnObj(hidePrevPath, context),
      taskHideAllIconBtnObj(hideAllPath, context),
      taskShowAllIconBtnObj(showAllPath, context),
    ],
  };
};
const taskCardObj = (taskID) => {
  return {
    type: "div",
    attributes: { class: "task-card", "data-taskid": taskID },
  };
};
//#endregion

export {
  taskPriorityIndicatorObj,
  taskHeaderObj,
  taskTitleObj,
  taskHeaderBtnContainerObj,
  taskDueObj,
  taskDescriptionObj,
  taskChecklistObj,
  taskTimestampObj,
  taskShowHideIconBtnsObj,
  createSubtaskObj,
  taskCardObj,
};
