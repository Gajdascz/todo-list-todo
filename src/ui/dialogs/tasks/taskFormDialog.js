import {
  buildElementTree,
  eventHandler,
} from "../../../logic/utility/domHelperFunctions";
import { buildBaseDialogElement } from "../general/baseDialog";
import { processFormData } from "../../../logic/tasks/processFormData";

import { renderDeleteWarningDialog } from "../../../render";
import taskManager from "../../../logic/tasks/taskManager";

import taskFormObjs from "../../builders/tasks/taskFormObjs";

const taskDialogForm = (formContext, task = null) => {
  if (formContext.match(/new/i)) formContext = "new-task";
  else if (formContext.match(/edit/i)) formContext = "edit-task";
  else return;
  const taskDialogElement = buildBaseDialogElement(
    task ? "Edit Task" : "New Task",
  );
  const taskForm = taskFormObjs.taskFormObj();
  taskForm.children = [
    taskFormObjs.prioritySelectObj(task ? task.priority : null),
    taskFormObjs.titleInputObj(task ? task.title : null),
    taskFormObjs.dueInputObj(task ? task.due : null),
    taskFormObjs.descriptionInputObj(task ? task.description : null),
    taskFormObjs.subtaskInputObj(),
    taskFormObjs.subtaskContainerObj(task ? task.subtasks : null),
    taskFormObjs.mainButtonContainerObj(formContext),
  ];

  taskDialogElement.append(buildElementTree(taskForm));

  const fieldSelectors = {
    priority: `div.task-dialog-form-priority-selected-option`,
    title: `input.task-dialog-form-title-text-input`,
    dueDate: `input.task-dialog-form-datepicker-input`,
    dueTime: `input.task-dialog-form-timepicker-input`,
    description: `textarea.task-dialog-form-description-textarea-input`,
    subtasks: [`p.task-dialog-form-subtask-entry-text`],
  };

  const submitForm = (task = null) => {
    const data = processFormData(fieldSelectors, task ? task : null);
    data.data.subtasks = Object.values(data.data.subtasks);
    data.obj
      ? taskManager.update(data.obj.taskID, data.data)
      : taskManager.create(data.data);
    taskDialogElement.querySelector("form").reset();
    taskDialogElement.close();
    taskDialogElement.remove();
  };
  const addSubtask = () => {
    const subtaskContainer = taskDialogElement.querySelector(
      `.task-dialog-form-subtask-container`,
    );
    const textInput = taskDialogElement.querySelector(
      `.task-subtask-dialog-form-text-input`,
    );
    let text = textInput.value.trim();
    if (text && text !== "") {
      const subtaskEntryElement = buildElementTree(
        taskFormObjs.subtaskEntryObj(text),
      );
      eventHandler(subtaskEntryElement, "button", "click", () =>
        subtaskEntryElement.remove(),
      );
      subtaskContainer.append(subtaskEntryElement);
    }
    textInput.value = "";
  };

  const selectDelete = (taskID) =>
    renderDeleteWarningDialog(taskID, () => taskManager.delete(taskID));

  eventHandler(
    taskDialogElement,
    ".task-dialog-form-submit-button",
    "click",
    submitForm,
    task ? task : null,
  );

  if (formContext === "edit-task")
    eventHandler(
      taskDialogElement,
      ".task-dialog-form-delete-button",
      "click",
      selectDelete,
      task.taskID,
    );

  eventHandler(
    taskDialogElement,
    ".task-subtask-dialog-form-text-input-button",
    "click",
    addSubtask,
  );

  taskDialogElement
    .querySelectorAll(".task-subtask-entry-delete-button")
    .forEach((btn) =>
      btn.addEventListener("click", (e) => btn.parentElement.remove()),
    );

  return { element: taskDialogElement };
};

export default taskDialogForm;
