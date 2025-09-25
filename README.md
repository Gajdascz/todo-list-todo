# TodoListTodo

TodoListTodo is a task management web application.

- **Live Preview**: https://gajdascz.github.io/todo-list-todo/

## Details

### A Task Management Web App

TodoListTodo represents the practical application of numerous JavaScript concepts:

- **Display and Interactivity:** Task cards provide a clear, interactive view of each task's details.
- **Dynamic Interface and Display:** The interface dynamically updates task cards and group displays as data changes.
- **Data Organization and Persistence:** Utilizing local storage for persistent data across sessions emphasizes effective data management in web apps.
- **Task Sorting and Grouping:** Automated sorting by due dates and flexible grouping showcase the use of array methods and data sorting.

### Purpose and Experience

The development of TodoListTodo was a comprehensive learning experience, focusing on:

- **LocalStorage API:** Managing browser-based storage across JavaScript modules for data persistence.
- **JavaScript ES6 and Beyond:** Extensive use of ES6 features, modules, and array methods, with an attempt to ahere to best practices and design principles.
- **DOM Manipulation:** Programmatic creation and management of DOM elements as JavaScript objects.
- **Date Handling:** Developing a custom dateHelperFunctions module for date manipulations, comparisons, and formatting.
- **Project Complexity:** Navigating challenges in a multi-module project structure for code organization and readability.
- **Webpack and Version Control:** Gaining experience in setting up Webpack and managing project versions with git and GitHub.

## Usage and Specifics

### Header

- **Gear Icon:**
  - `Clear Memory`: Resets the application without default data.
  - `Refresh Demo`: Resets the application with fresh default data.
- **New Task Button:** Opens a form to input task information:
  - `Priority`: Dropdown menu selection, defaults to 'None'.
  - `Task Title`: Primary goal of the task.
  - `Due Date and/or Due Time`: Task deadline.
  - `Task Description`: Note or explanation of the task.
  - `Subtask(s)`: Enter subtask titles and manage using (+) and (-) buttons.

### Main Area

- **Task Display:** Tasks are shown in a card-like format with:
  - `Priority Indicator`: Color-coded (Red for Urgent, Orange for High, etc.).
  - `Title and Action Buttons`: Edit (pencil icon) and mark complete (checkmark icon).
  - `Due Date/Time and Description`: Clearly displayed.
  - `Subtasks`: Interactive checklist.
  - `Timestamp`: Task creation time.
  - `Information Control Buttons`: Arrows to show/hide details.
- **Sorting:** Tasks are sorted by due date in ascending order (refresh may be required).

### Sidebar

- **Home Button:** Displays all incomplete tasks.
- **Groups Interface:**
  - `Overview`: Shows default and custom groups with task counts.
  - `Manage`: Edit/delete custom groups; modify group tasks.
  - `New Group`: Form to create a new group.
- **Default and Custom Groups Containers:** Access grouped tasks sorted by different criteria.

## Created With

- JavaScript: Core language.
- HTML5: Structuring the DOM.
- CSS3: Design and styling.
- Bundled with Webpack: Module bundling and asset management.

