const VALIDPRIORITIES  = ['urgent', 'high', 'medium', 'low', 'none'];

const Task = ( {priority='none', title='', dueDate=null, dueTime=null, description=null, subtasks=null, status=false} = {}) => {
  function validatePriority(priority) {
    return VALIDPRIORITIES.includes(priority) ? priority : 'none';
  }
  
  let _priority = validatePriority(priority);
  let _title = title;
  let _dueDate = dueDate;
  let _dueTime = dueTime;
  let _description = description;
  let _subtasks = subtasks;
  let _status = status;
  let _groups = [];
  const toggleStatus = () => {
    _status = !_status;
  }
  const timestamp = new Date().toUTCString().replace('GMT','UTC');
  const taskID = `${title.charAt(0)}${priority.charAt(0)}${title.slice(-1)}-${(Date.now()+(Date.now()*Math.round(Math.random()*100))).toString(36)}`.toUpperCase()
  const userID = 0;
  return {
    get priority() { return _priority; },
    set priority(newPriority) { (_priority = newPriority); },
    get title() { return _title; }, 
    set title(newTitle) { (_title = newTitle); },
    get dueDate() { return _dueDate; },
    set dueDate(newDueDate) { (_dueDate = newDueDate); },
    get dueTime() { return _dueTime; },
    set dueTime(newDueTime) { (_dueTime = newDueTime); },
    get description() { return _description; },
    set description(newDescription) { (_description = newDescription); },
    get subtasks() { return _subtasks; },
    set subtasks(newSubtasks) { (_subtasks = newSubtasks); },
    get status() { return _status; },
    get timestamp() { return timestamp; },
    get groups() { return _groups; },
    get taskID() { return taskID; },
    get userID() { return userID; },
    toggleStatus
  };
};

export default Task;