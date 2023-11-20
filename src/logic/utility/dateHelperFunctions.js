const checkDue = (task) => {
  const today = new Date();
  const dueDate = new Date(task.dueDate);
  if(dueDate.getFullYear() > today.getFullYear()) return 'later';
  if(dueDate.getFullYear() < today.getFullYear()) return 'overdue';
  else if(dueDate.getFullYear() === today.getFullYear()) {
    if(isOverdue(task,today))         return 'overdue';
    if(isDueToday(dueDate,today))     return 'today';
    if(isDueTomorrow(dueDate,today))  return 'tomorrow';
    if(isDueThisWeek(dueDate,today))  return 'thisWeek';
    if(isDueNextWeek(dueDate, today)) return 'nextWeek';
    if(isDueThisMonth(dueDate,today)) return 'thisMonth';
    if(isDueNextMonth(dueDate,today)) return 'nextMonth';  
  }
}

const isOverdue = (task,today) => {
  const now = today.getTime();
  const dueMinute = getDueMinute(task.dueDate, task.dueTime ? task.DueTime : null);
  return (now > dueMinute);
};
const isDueToday = (dueDate, today) => {
  return ( dueDate.getDate()  === today.getDate()  && 
           dueDate.getMonth() === today.getMonth() 
         );
};
const isDueTomorrow = (dueDate, today) => {
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return ( dueDate.getDate()  === tomorrow.getDate()  && 
           dueDate.getMonth() === tomorrow.getMonth() 
         );
};
const isDueThisWeek = (dueDate,today) => {
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  return ( dueDate >= startOfWeek && dueDate <= endOfWeek );
};
const isDueNextWeek = (dueDate,today) => {
  const startOfNextWeek = new Date(today);
  startOfNextWeek.setDate( (7-today.getDay()));
  const endOfNextWeek = new Date(startOfNextWeek);
  endOfNextWeek.setDate(startOfNextWeek.getDate() + 7);
  return ( dueDate >= startOfNextWeek && dueDate <= endOfNextWeek );
};
const isDueThisMonth = (dueDate,today) => {
  return ( dueDate.getMonth() === today.getMonth() );
};
const isDueNextMonth = (dueDate,today) => {
  return ( (dueDate.getMonth() + 1) === (today.getMonth() + 1) );
};
const getDueMinute = (dateString, timeString=null) => {
  let date = new Date(dateString);
  if(timeString) {
    let [hours, minutes] = timeString.splice(':').map(Number);
    date.setHours(hours, minutes, 0, 0);
  }
  return date.getTime();
};

export default checkDue