import { buildBaseDialogElement } from "./buildBaseDialog";
import { buildElementTree } from "../utility";
import userStorage from "../processing/userStorage";

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
          userStorage.get(taskID).card.deleteCard();
          userStorage.remove(taskID)
          document.querySelectorAll('dialog').forEach(dialog => {
            dialog.close();
            dialog.remove();
          })
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
          const warningDialog = this.closest('dialog');
          warningDialog.close();
          warningDialog.remove();
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