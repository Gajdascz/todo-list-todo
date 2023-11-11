const Task = ( {priority='none', title='', due=null, description=null, subtasks=null, status=false} = {}) => {
  let _priority = priority;
  let _title = title;
  let _due = due;
  let _description = description;
  let _subtasks = subtasks;
  let _status = status;
  const timeStamp = new Date().toUTCString().replace('GMT','UTC');
  return {
    get priority() { return _priority; },
    set priority(newPriority) { (_priority = newPriority); },
    get title() { return _title; }, 
    set title(newTitle) { (_title = newTitle); },
    get due() { return _due; },
    set due(newDue) { (_due = newDue); },
    get description() { return _description; },
    set description(newDescription) { (_description = newDescription); },
    get subtasks() { return _subtasks; },
    set subtasks(newSubtasks) { (_subtasks = newSubtasks); },
    get status() { return _status; },
    set status(newStatus) { (_status = newStatus); },
    get timeStamp() { return timeStamp; }
  };
};

export default Task;