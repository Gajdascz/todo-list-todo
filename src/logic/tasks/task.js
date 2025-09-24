const VALIDPRIORITIES = ["urgent", "high", "medium", "low", "none"];

const task = ({
  priority = "none",
  title = "",
  due = null,
  description = null,
  subtasks = null,
  status = false,
  taskID = null,
  timestamp = null,
} = {}) => {
  function validatePriority(priority) {
    return VALIDPRIORITIES.includes(priority) ? priority : "none";
  }

  let _priority = validatePriority(priority);
  let _title = title;
  let _due = due;
  let _description = description;
  let _subtasks = subtasks;
  let _status = status;
  const _timestamp = timestamp || `${new Date().toLocaleString()}`;
  const _taskID =
    taskID ||
    `${title.charAt(0)}${priority.charAt(0)}${title.slice(-1)}-${(Date.now() + Date.now() * Math.round(Math.random() * 100)).toString(36)}`.toUpperCase();
  const toggleStatus = () => (_status = !_status);
  return {
    get priority() {
      return _priority;
    },
    set priority(newPriority) {
      _priority = newPriority;
    },
    get title() {
      return _title;
    },
    set title(newTitle) {
      _title = newTitle;
    },
    get due() {
      return _due;
    },
    set due(newDue) {
      _due = newDue;
    },
    get description() {
      return _description;
    },
    set description(newDescription) {
      _description = newDescription;
    },
    get subtasks() {
      return _subtasks;
    },
    set subtasks(newSubtasks) {
      _subtasks = newSubtasks;
    },
    get status() {
      return _status;
    },
    get timestamp() {
      return _timestamp;
    },
    get taskID() {
      return _taskID;
    },
    toggleStatus,
  };
};

export default task;
