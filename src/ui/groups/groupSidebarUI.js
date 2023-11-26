import { renderCardArray } from "../../render";
import groupManager from "../../logic/groups/groupManager";

const initSidebarUI = () => {
  const sidebar = document.querySelector('section.sidebar');

  sidebar.querySelectorAll('.sidebar-submenu-expand-button').forEach(btn => {
    btn.addEventListener('click', function () {
      const thisSubmenu = this.closest('.sidebar-group-with-submenu');
      const otherSubmenus = sidebar.querySelectorAll('.sidebar-group-with-submenu.active');
      otherSubmenus.forEach(group => {
        if(group !== thisSubmenu) {
          group.classList.remove('active');
          group.querySelector('.sidebar-submenu-container').classList.add('hide');
        }
      });
      thisSubmenu.classList.toggle('active');
      const submenu = this.nextElementSibling;
      submenu.classList.toggle('hide');
    });
  });
  sidebar.querySelectorAll('#sidebar-hide-group-container-button').forEach(btn => {
    btn.addEventListener('click', function() {
      this.nextElementSibling.classList.toggle('hide')
      this.classList.toggle('sidebar-container-hidden')
      this.classList.toggle('active')
    })
  })




  const assignRenderButtonEvent = (selector, group, title=null) => {
    const btn = sidebar.querySelector(selector)
    const taskListTitle = document.querySelector('.task-list-title')
    btn.addEventListener('click', function (e) {
      renderCardArray(groupManager.getGroupTaskCards(...group))
      taskListTitle.textContent = title;
    })
  }


  assignRenderButtonEvent('.home-group-button', ['all'], 'Home')

  assignRenderButtonEvent('.all-due-group-button', ['due','allDue'], 'Due: All')
  assignRenderButtonEvent('.overdue-group-button', ['due','overdue'], 'Due: OverDue')
  assignRenderButtonEvent('.today-group-button', ['due','today'], 'Due: Today')
  assignRenderButtonEvent('.tomorrow-group-button', ['due','tomorrow'], 'Due: Tomorrow')
  assignRenderButtonEvent('.this-week-group-button', ['due','thisWeek'], 'Due: This Week')
  assignRenderButtonEvent('.next-week-group-button', ['due', 'nextWeek'], 'Due: Next Week')
  assignRenderButtonEvent('.this-month-group-button', ['due', 'thisMonth'], 'Due: This Month')
  assignRenderButtonEvent('.next-month-group-button', ['due', 'nextMonth'], 'Due: Next Month')
  assignRenderButtonEvent('.later-group-button', ['due', 'later'], 'Due: Later')

  assignRenderButtonEvent('.urgent-group-button', ['priority', 'urgent'], 'Priority: Urgent')
  assignRenderButtonEvent('.high-group-button', ['priority', 'high'], 'Priority: High')
  assignRenderButtonEvent('.medium-group-button', ['priority', 'medium'], 'Priority: Medium')
  assignRenderButtonEvent('.low-group-button', ['priority', 'low'], 'Priority: Low')
  assignRenderButtonEvent('.none-group-button', ['priority', 'none'], 'Priority: None')

  assignRenderButtonEvent('.completed-group-button', ['complete'], 'Completed')

}


export default initSidebarUI
