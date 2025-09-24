import { renderCardArray } from "../../render";
import groupManager from "../../logic/groups/groupManager";
import { buildElementTree } from "../../logic/utility/domHelperFunctions";
import uiObjs from "../builders/general/uiObjs";

const sidebarUI = () => {
  const sidebar = document.querySelector("section.sidebar");

  const userGroupsContainer = sidebar.querySelector(".user-groups-container");

  const init = () => {
    sidebar
      .querySelectorAll(".sidebar-submenu-expand-button")
      .forEach((btn) => {
        btn.addEventListener("click", function () {
          const thisSubmenu = this.closest(".sidebar-group-with-submenu");
          const otherSubmenus = sidebar.querySelectorAll(
            ".sidebar-group-with-submenu.active",
          );
          otherSubmenus.forEach((group) => {
            if (group !== thisSubmenu) {
              group.classList.remove("active");
              group
                .querySelector(".sidebar-submenu-container")
                .classList.add("hide");
            }
          });
          thisSubmenu.classList.toggle("active");
          const submenu = this.nextElementSibling;
          submenu.classList.toggle("hide");
        });
      });
    sidebar
      .querySelectorAll("#sidebar-hide-group-container-button")
      .forEach((btn) => {
        btn.addEventListener("click", function () {
          const thisContainer = this.closest(
            "button#sidebar-hide-group-container-button",
          );
          const otherContainer = sidebar.querySelectorAll(
            "button#sidebar-hide-group-container-button",
          );
          otherContainer.forEach((container) => {
            if (container !== thisContainer) {
              container.classList.remove("active");
              container.nextElementSibling.classList.add("hide");
              container.classList.add("sidebar-container-hidden");
            }
          });
          thisContainer.classList.toggle("active");
          thisContainer.nextElementSibling.classList.toggle("hide");
          if (thisContainer.nextElementSibling.children.length > 0)
            thisContainer.classList.toggle("sidebar-container-hidden");
        });
      });
    assignRenderButtonEvent(".home-group-button", ["all"], "Home");

    assignRenderButtonEvent(
      ".all-due-group-button",
      ["due", "allDue"],
      "Due: All",
    );
    assignRenderButtonEvent(
      ".overdue-group-button",
      ["due", "overdue"],
      "Due: OverDue",
    );
    assignRenderButtonEvent(
      ".today-group-button",
      ["due", "today"],
      "Due: Today",
    );
    assignRenderButtonEvent(
      ".tomorrow-group-button",
      ["due", "tomorrow"],
      "Due: Tomorrow",
    );
    assignRenderButtonEvent(
      ".this-week-group-button",
      ["due", "thisWeek"],
      "Due: This Week",
    );
    assignRenderButtonEvent(
      ".next-week-group-button",
      ["due", "nextWeek"],
      "Due: Next Week",
    );
    assignRenderButtonEvent(
      ".this-month-group-button",
      ["due", "thisMonth"],
      "Due: This Month",
    );
    assignRenderButtonEvent(
      ".next-month-group-button",
      ["due", "nextMonth"],
      "Due: Next Month",
    );
    assignRenderButtonEvent(
      ".later-group-button",
      ["due", "later"],
      "Due: Later",
    );

    assignRenderButtonEvent(
      ".urgent-group-button",
      ["priority", "urgent"],
      "Priority: Urgent",
    );
    assignRenderButtonEvent(
      ".high-group-button",
      ["priority", "high"],
      "Priority: High",
    );
    assignRenderButtonEvent(
      ".medium-group-button",
      ["priority", "medium"],
      "Priority: Medium",
    );
    assignRenderButtonEvent(
      ".low-group-button",
      ["priority", "low"],
      "Priority: Low",
    );
    assignRenderButtonEvent(
      ".none-group-button",
      ["priority", "none"],
      "Priority: None",
    );

    assignRenderButtonEvent(
      ".completed-group-button",
      ["complete"],
      "Completed",
    );

    populateUserGroups();
  };

  const assignRenderButtonEvent = (selector, group, title = null) => {
    const btn = sidebar.querySelector(selector);
    const taskListTitle = document.querySelector(".task-list-title");
    btn.addEventListener("click", function (e) {
      renderCardArray(groupManager.getGroupTaskCards(...group));
      taskListTitle.textContent = title;
    });
  };

  const buildUserGroupBtnObj = (groupName) =>
    uiObjs.btnObj("user-group", groupName);

  const addUserGroupBtn = (groupName) => {
    const btnElement = buildElementTree(buildUserGroupBtnObj(groupName));
    btnElement.classList.add(`group-${groupName}-button`);
    userGroupsContainer.append(btnElement);
    assignRenderButtonEvent(
      `.group-${groupName}-button`,
      [groupName],
      `${groupName.slice(0, 1).toUpperCase() + groupName.slice(1)}`,
    );
  };

  const populateUserGroups = () => {
    userGroupsContainer.textContent = "";
    const allUserGroups = groupManager.getAllUserGroups();
    if (allUserGroups)
      Object.keys(allUserGroups).forEach((groupName) =>
        addUserGroupBtn(groupName),
      );
  };

  return { init, addUserGroupBtn, populateUserGroups };
};

export default sidebarUI;
