import { eventHandler } from "../../logic/utility/domHelperFunctions"

const initSidebarUI = () => {
  document.querySelectorAll('.sidebar-submenu-expand-button').forEach(btn => {
    btn.addEventListener('click', function () {
      this.closest('.sidebar-group-with-submenu').classList.toggle('active')
      const submenu = this.nextElementSibling;
      submenu.classList.toggle('hide');
    })
  })
}


export default initSidebarUI
