import { buildBaseDialogElement } from "./baseDialog";
import { buildElementTree } from "../../../logic/utility/domHelperFunctions";

const warningDialog = (
  warningMessage = null,
  taskID = null,
  confirmActionFn,
) => {
  const warningDialogElement = buildBaseDialogElement("Warning!");

  const warningMessageContainer = {
    type: "div",
    text: warningMessage,
    attributes: { class: "warning-dialog-message" },
  };
  const confirmActionButton = {
    type: "button",
    text: "Confirm",
    attributes: {
      class: "warning-dialog-confirm-button dialog-caution-button",
      "data-taskid": taskID,
    },
    listeners: {
      click: [
        function (e) {
          if (confirmActionFn) confirmActionFn();
          document.querySelectorAll("dialog").forEach((dialog) => {
            dialog.close();
            dialog.remove();
          });
        },
      ],
    },
  };
  const cancelActionButton = {
    type: "button",
    text: "Cancel",
    attributes: { class: "button dialog-button-element" },
    listeners: {
      click: [
        function (e) {
          const warningDialog = this.closest("dialog");
          warningDialog.close();
          warningDialog.remove();
        },
      ],
    },
  };
  const warningMessageButtonContainer = {
    type: "div",
    attributes: {
      class: "warning-dialog-button-container dialog-area-container",
    },
    children: [confirmActionButton, cancelActionButton],
  };
  warningDialogElement.append(
    buildElementTree({
      type: "div",
      attributes: { class: "warning-dialog-container dialog-area-container" },
      children: [warningMessageContainer, warningMessageButtonContainer],
    }),
  );

  return { element: warningDialogElement };
};

export default warningDialog;
