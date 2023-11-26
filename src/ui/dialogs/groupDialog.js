import { buildBaseDialogElement } from "./baseDialog";
import { buildElementTree, eventHandler } from "../../logic/utility/domHelperFunctions";

const groupDialog = () => {
  const groupsDialogElement = buildBaseDialogElement('Groups Interface');





  return { element: groupsDialogElement }
}

export default groupDialog;