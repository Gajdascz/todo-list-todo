const Task = (priority='none', title, due=null, description=null, subtasks=null, status=false) => {
  this.title = title;
  this.priority = priority;
  this.due = due;
  this.description = description;
  this.subtasks = subtasks;
  this.status = status;
  const timeStamp = new Date().toUTCString().replace('GMT','UTC');
}

export default Task;