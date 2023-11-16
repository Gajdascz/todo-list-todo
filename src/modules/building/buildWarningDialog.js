import { buildBaseDialogElement } from "./buildBaseDialog";
import { buildElementTree } from "../utility";
import { removeUserTask } from "../processing/taskGroupManager";

export const buildWarningDialog = (warningMessage=null, taskID=null) => {
  const baseDialog =  buildBaseDialogElement('Warning!');
  
  const warningMessageContainer = {
    type: 'div',
    text: warningMessage,
    attributes: {class: 'warning-dialog-message'}
  }
  const confirmActionButton = {
    type:'button',
    text: 'Confirm',
    attributes: {class: 'warning-dialog-confirm-button', 'data-taskid': taskID},
    listeners: {
      'click' : [
        function (e) {
          removeUserTask(taskID);
          document.querySelector(`div[data-taskid="${taskID}"]`).remove();
          document.querySelector('button.dialog-close-icon-button').click();
         
        }
      ]
    }
  };
  const cancelActionButton = {
    type:'button',
    text: 'Cancel',
    attributes: {class: 'warning-dialog-cancel-button'},
    listeners: {
      'click' : [
        function (e) {
          document.querySelector('button.dialog-close-icon-button').click();
        }
      ]
    }
  };
  const warningMessageButtonContainer = {
    type: 'div',
    attributes: {class: 'warning-dialog-button-container'},
    children: [
      confirmActionButton,
      cancelActionButton
    ]
  }
  baseDialog.append(buildElementTree({
    type: 'div',
    attributes: {class: 'warning-dialog-container'},
    children: [
      warningMessageContainer,
      warningMessageButtonContainer
    ]
  }))

  return baseDialog;
};