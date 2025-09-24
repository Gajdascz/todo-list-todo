const taskSort = (() => {
  const priorityValues = { urgent: 4, high: 3, medium: 2, low: 1, none: 0 };

  const comparePriority = (taskPriority1, taskPriority2) => {
    if (priorityValues[taskPriority1] > priorityValues[taskPriority2])
      return -1;
    else if (priorityValues[taskPriority1] < priorityValues[taskPriority2])
      return 1;
    else return 0;
  };
  const compareDate = (taskDate1, taskDate2) => {
    const date1 = new Date(taskDate1);
    const date2 = new Date(taskDate2);
    if (date1.getTime() > date2.getTime()) return -1;
    else if (date1.getTime() < date2.getTime()) return 1;
    else return 0;
  };

  const byPriority = (tasks, highest = true) =>
    tasks.sort((task1, task2) =>
      highest
        ? comparePriority(task1.priority, task2.priority)
        : -comparePriority(task1.priority, task2.priority),
    );

  const byDate = (tasks, closest = true) =>
    tasks.sort((task1, task2) =>
      closest
        ? -compareDate(task1.due, task2.due)
        : compareDate(task1.due, task2.due),
    );

  return {
    byPriority,
    byDate,
  };
})();

export default taskSort;
