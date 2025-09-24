/* JavaScript Date Object Helper Functions
 *  Default:
 *  |-> Start of Day  = 00:00:00:000
 *  |-> End of Day    = 23:59:59:999
 *  |-> Start of Week = Monday = 1
 *  |-> End of Week   = Sunday = 0
 *  |---> Sunday=0, Monday=1, Tuesday=2, Wednesday=3, Thursday=4,Friday=5,Saturday=6
 *
 * All functions that accept arguments take a Date Object.
 * All Functions return a new Date Object and does not mutate input.
 *
 */
const dateHelper = (() => {
  const getStartOfDay = (date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    return startOfDay;
  };
  const getEndOfDay = (date) => {
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay;
  };
  const getNextDay = (date) => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    return nextDay;
  };
  const getNextWeek = (date) => {
    const nextWeek = new Date(date);
    nextWeek.setDate(date.getDate() + 7);
    return nextWeek;
  };
  // firstDayOfWeek Indicates The Day You'd Like The Week To Start On (Monday by default (1))
  const getStartOfWeek = (date, firstDayOfWeek = 1) => {
    const dayOfWeek = date.getDay();
    const difference =
      dayOfWeek < firstDayOfWeek
        ? 7 - firstDayOfWeek + dayOfWeek
        : dayOfWeek - firstDayOfWeek;
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - difference);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  };
  // lastDayOfWeek Indicates the Day You'd Like The Week To End On (Sunday by default (0))
  const getEndOfWeek = (date, lastDayOfWeek = 0) => {
    const dayOfWeek = date.getDay();
    const difference =
      dayOfWeek > lastDayOfWeek
        ? 7 - dayOfWeek + lastDayOfWeek
        : lastDayOfWeek - dayOfWeek;
    const endOfWeek = new Date(date);
    endOfWeek.setDate(date.getDate() + difference);
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek;
  };
  const getNextMonth = (date) => {
    const nextMonth = new Date(date);
    nextMonth.setDate(1);
    nextMonth.setMonth(date.getMonth() + 1);
    return nextMonth;
  };
  const getStartOfMonth = (date) => {
    const startOfMonth = new Date(
      date.setDate(date.getDate() - (date.getDate() - 1)),
    );
    startOfMonth.setHours(0, 0, 0, 0);
    return startOfMonth;
  };
  const getEndOfMonth = (date) => {
    const endOfMonth = new Date(date);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);
    return endOfMonth;
  };

  return {
    getStartOfDay,
    getEndOfDay,
    getNextDay,
    getNextWeek,
    getStartOfWeek,
    getEndOfWeek,
    getNextMonth,
    getStartOfMonth,
    getEndOfMonth,
    get now() {
      return new Date();
    },
    get today() {
      return this.getStartOfDay(new Date());
    },
    get tomorrow() {
      return this.getStartOfDay(this.getNextDay(new Date()));
    },
    get startOfThisWeek() {
      return this.getStartOfWeek(new Date(), 1);
    },
    get endOfThisWeek() {
      return this.getEndOfWeek(new Date(), 0);
    },
    get startOfNextWeek() {
      return this.getStartOfWeek(this.getNextWeek(new Date(), 1));
    },
    get endOfNextWeek() {
      return this.getEndOfWeek(this.getNextWeek(new Date(), 0));
    },
    get startOfThisMonth() {
      return this.getStartOfMonth(new Date());
    },
    get endOfThisMonth() {
      return this.getEndOfMonth(new Date());
    },
    get startOfNextMonth() {
      return this.getStartOfMonth(this.getNextMonth(new Date()));
    },
    get endOfNextMonth() {
      return this.getEndOfMonth(this.getNextMonth(new Date()));
    },
  };
})();

// Checks Task dueDate and Returns Array of the Task's Due Categories
// ex ['tomorrow','thisWeek','thisMonth',...]
const checkDue = (task) => {
  const dueDate = dateHelper.getStartOfDay(new Date(task.due));
  const today = dateHelper.now;
  const dueIn = [];

  const isThisYear = () => dueDate.getFullYear() === today.getFullYear();
  const isLaterYear = () => dueDate.getFullYear() > today.getFullYear();
  const isOlderYear = () => dueDate.getFullYear() < today.getFullYear();
  const isOverdue = () => today.getTime() > new Date(task.due).getTime();
  const isDueToday = () => dueDate.getTime() === dateHelper.today.getTime();
  const isDueTomorrow = () =>
    dueDate.getTime() === dateHelper.tomorrow.getTime();
  const isDueThisWeek = () =>
    dueDate >= dateHelper.startOfThisWeek &&
    dueDate <= dateHelper.endOfThisWeek;
  const isDueNextWeek = () =>
    dueDate >= dateHelper.startOfNextWeek &&
    dueDate <= dateHelper.endOfNextWeek;
  const isDueThisMonth = () => dueDate.getMonth() === dateHelper.now.getMonth();
  const isDueNextMonth = () =>
    dueDate.getMonth() === dateHelper.startOfNextMonth.getMonth();
  const isLaterThanNextMonth = () =>
    dueDate.getTime() > dateHelper.endOfNextMonth.getTime();

  if (isOlderYear()) dueIn.push("overdue");
  else if (
    isDueNextMonth() &&
    dateHelper.today.getFullYear() + 1 === dueDate.getFullYear()
  )
    dueIn.push("nextMonth");
  else if (isLaterYear() || isLaterThanNextMonth()) dueIn.push("later");
  else if (isThisYear()) {
    if (isOverdue()) dueIn.push("overdue");
    if (isDueToday()) dueIn.push("today");
    if (isDueTomorrow()) dueIn.push("tomorrow");
    if (isDueThisWeek()) dueIn.push("thisWeek");
    if (isDueNextWeek()) dueIn.push("nextWeek");
    if (isDueThisMonth()) dueIn.push("thisMonth");
    if (isDueNextMonth()) dueIn.push("nextMonth");
  }
  return dueIn;
};

const formatDateForTaskObj = (dueDate, dueTime = null) => {
  const [year, month, day] = dueDate.split("-").map(Number);
  const time = dueTime ? dueTime.split(":").map(Number) : [23, 59, 59, 999];
  const date = new Date(year, month - 1, day, ...time);
  return date.toISOString();
};
const formatDateForDisplay = (date) => {
  const displayDate = new Date(date);
  if (displayDate.getHours() === 23 && displayDate.getMinutes() === 59) {
    return `Due: ${displayDate.toLocaleDateString()}`;
  } else {
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    return `Due: ${displayDate.toLocaleDateString()} by ${displayDate.toLocaleTimeString([], timeOptions)}`;
  }
};
const formatDateForForm = (storedDate) => {
  const date = new Date(storedDate);
  return {
    formDate: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
    formTime: date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

const mimicFormInput = (date) => {
  if (typeof date === "string") date = new Date(date);
  const pad = (num) => (num < 10 ? "0" + num : num);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return { date: `${year}-${month}-${day}`, time: `${hours}:${minutes}` };
};

export {
  dateHelper,
  checkDue,
  formatDateForTaskObj,
  formatDateForDisplay,
  formatDateForForm,
  mimicFormInput,
};
