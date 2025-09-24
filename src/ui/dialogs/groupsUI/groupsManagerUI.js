import { buildElementTree } from "../../../logic/utility/domHelperFunctions";
import groupsManagerObjs from "../../builders/groups/groupsManagerObjs";

import groupForm from "./groupForm";

const groupsManagerUI = (userGroups = null) => {
  const groupsManagerContentContainerObj =
    groupsManagerObjs.contentContainerObj();

  groupsManagerContentContainerObj.children = [
    groupsManagerObjs.headerObj("Groups Manager"),
    groupsManagerObjs.headerObj("Click A Group To Edit", 2),
    ...Object.keys(userGroups).map((groupName) =>
      groupsManagerObjs.groupsListEntryBtnObj(groupName),
    ),
  ];

  const groupsManagerElement = buildElementTree(
    groupsManagerContentContainerObj,
  );

  groupsManagerElement
    .querySelectorAll(".manage-group-button")
    .forEach((btn) => {
      btn.addEventListener("click", function (e) {
        if (Object.keys(userGroups).includes(this.textContent)) {
          const formExists = groupsManagerElement.querySelector(
            ".group-dialog-edit-group-form",
          );
          if (formExists) formExists.remove();
          groupsManagerElement.append(
            groupForm("edit-group", userGroups[this.textContent], this).element,
          );
        }
      });
    });

  return {
    element: groupsManagerElement,
  };
};

export default groupsManagerUI;
