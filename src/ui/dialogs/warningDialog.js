import { buildBaseDialogElement } from "./baseDialog";
import { buildElementTree } from "../../logic/utility/domHelperFunctions";

export const warningDialog = (warningMessage=null, taskID=null, confirmActionFn) => {
  const warningDialogElement =  buildBaseDialogElement('Warning!');
  
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
          if(confirmActionFn) confirmActionFn();
          document.querySelectorAll('dialog').forEach(dialog => {
            dialog.close();
            dialog.remove();
          })
        },
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
  warningDialogElement.append(buildElementTree({
    type: 'div',
    attributes: {class: 'warning-dialog-container'},
    children: [
      warningMessageContainer,
      warningMessageButtonContainer
    ]
  }))

  return warningDialogElement;
};