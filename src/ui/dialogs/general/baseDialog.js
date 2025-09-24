import {
  buildElementTree,
  buildIconButtonObj,
} from "../../../logic/utility/domHelperFunctions";

export const buildBaseDialogElement = (dialogTitle = null) => {
  const closeIconPath =
    "M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z";
  const dialogCloseButton = buildIconButtonObj({
    purpose: "close",
    type: "button",
    iconPath: closeIconPath,
    viewBox: "0 0 24 24",
    section: "dialog",
    listeners: {
      click: [
        (e) => {
          dialogElement.close();
        },
        (e) => {
          dialogElement.remove();
        },
      ],
    },
  });
  const dialogHeader = {
    type: "div",
    attributes: { class: "dialog-header" },
    children: [
      { type: "h1", text: dialogTitle, attributes: { class: "dialog-title" } },
      dialogCloseButton,
    ],
  };

  const dialogElement = buildElementTree({
    type: "dialog",
    attributes: { class: "base-dialog" },
    children: [dialogHeader],
  });
  return dialogElement;
};
