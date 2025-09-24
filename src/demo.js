import {
  dateHelper,
  formatDateForTaskObj,
  formatDateForForm,
  mimicFormInput,
} from "./logic/utility/dateHelperFunctions";
import groupManager from "./logic/groups/groupManager";
import taskManager from "./logic/tasks/taskManager";

// Tests
//#region

// Calculate specific dates

let now = dateHelper.now;
let todayInOneHour = new Date(now.getTime() + 3600000);
let endOfToday = dateHelper.getEndOfDay(now);
let startOfToday = dateHelper.getStartOfDay(now);
// Overdue
let theOrigin = new Date(now);
theOrigin.setTime(now.getTime() - now.getTime());
let yesterday = dateHelper.yesterday;
let lastYear = new Date(now);
theOrigin.setFullYear(now.getFullYear() - 1);
let oneHourAgo = new Date();
oneHourAgo.setTime(now.getTime() - 3600000);

// Tomorrow
let tomorrowAtNow = new Date();
tomorrowAtNow.setDate(now.getDate() + 1);
let startOfTomorrow = dateHelper.tomorrow;
let endOfTomorrow = dateHelper.getEndOfDay(dateHelper.tomorrow);

// This Week
let startOfThisWeek = dateHelper.startOfThisWeek;
let middleOfThisWeek = dateHelper.startOfThisWeek;
middleOfThisWeek.setDate(middleOfThisWeek.getDate() + 3);
let endOfThisWeek = dateHelper.endOfThisWeek;

let startOfNextWeek = dateHelper.startOfNextWeek;
let middleOfNextWeek = dateHelper.startOfNextWeek;
middleOfNextWeek.setDate(middleOfThisWeek.getDate() + 3);
let endOfNextWeek = dateHelper.endOfNextWeek;

let startOfThisMonth = dateHelper.startOfThisMonth;
let middleOfThisMonth = dateHelper.startOfThisMonth;
middleOfThisMonth.setDate(15);
let endOfThisMonth = dateHelper.endOfThisMonth;

let startOfNextMonth = dateHelper.startOfNextMonth;
let middleOfNextMonth = dateHelper.startOfNextMonth;
middleOfNextMonth.setDate(15);
let endOfNextMonth = dateHelper.endOfNextMonth;

let nextYear = new Date(now);
nextYear.setFullYear(now.getFullYear() + 1);
let inFiveYears = new Date(now);
inFiveYears.setFullYear(now.getFullYear() + 5);
const dates = [
  now,
  todayInOneHour,
  endOfToday,
  startOfToday,
  theOrigin,
  lastYear,
  oneHourAgo,
  tomorrowAtNow,
  startOfTomorrow,
  endOfTomorrow,
  startOfThisWeek,
  middleOfThisWeek,
  endOfThisWeek,
  startOfNextWeek,
  middleOfNextWeek,
  endOfNextWeek,
  startOfThisMonth,
  middleOfThisMonth,
  endOfThisMonth,
  startOfNextMonth,
  middleOfNextMonth,
  endOfNextMonth,
  nextYear,
  inFiveYears,
];

const priorities = ["urgent", "high", "medium", "low", "none"];
const verb = [
  "Complete",
  "Prepare",
  "Review",
  "Organize",
  "Plan",
  "Design",
  "Develop",
  "Implement",
  "Test",
  "Fix",
  "Update",
  "Create",
  "Research",
  "Analyze",
  "Write",
  "Edit",
  "Publish",
  "Report",
  "Collaborate",
  "Coordinate",
  "Schedule",
  "Arrange",
  "Clean",
  "Decorate",
  "Cook",
  "Shop",
  "Exercise",
  "Train",
  "Travel",
  "Call",
  "Meet",
  "Discuss",
  "Negotiate",
  "Present",
  "Teach",
  "Learn",
  "Study",
  "Read",
  "Watch",
  "Listen",
  "Practice",
  "Play",
  "Draw",
  "Craft",
  "Build",
  "Repair",
  "Check",
  "Inspect",
  "Visit",
  "Attend",
  "Host",
  "Participate",
  "Volunteer",
  "Donate",
  "Budget",
  "Calculate",
  "Assess",
  "Evaluate",
  "Audit",
  "Record",
  "Register",
  "Book",
  "Reserve",
  "Order",
  "Purchase",
  "Sell",
  "Trade",
  "Invest",
  "Negotiate",
  "Consult",
  "Advise",
  "Guide",
  "Counsel",
  "Tutor",
  "Coach",
  "Mentor",
  "Train",
  "Supervise",
  "Manage",
  "Direct",
  "Lead",
  "Govern",
  "Represent",
  "Lobby",
  "Campaign",
  "Vote",
  "Elect",
  "Serve",
  "Protect",
  "Defend",
  "Enforce",
  "Prosecute",
];
const adjective = [
  "Strategic",
  "Critical",
  "Creative",
  "Innovative",
  "Routine",
  "Challenging",
  "Complex",
  "Simple",
  "Major",
  "Minor",
  "Essential",
  "Optional",
  "Current",
  "Future",
  "Potential",
  "New",
  "Old",
  "Regular",
  "Special",
  "General",
  "Specific",
  "Detailed",
  "Brief",
  "Long-Term",
  "Short-Term",
  "Immediate",
  "Extended",
  "Comprehensive",
  "Focused",
  "Broad",
  "Narrow",
  "Dynamic",
  "Static",
  "Progressive",
  "Flexible",
  "Rigid",
  "Adaptive",
  "Original",
  "Standard",
  "Custom",
  "Traditional",
  "Modern",
  "Historical",
  "Contemporary",
  "Advanced",
  "Basic",
  "Professional",
  "Personal",
  "Public",
  "Private",
  "Corporate",
  "Individual",
  "Global",
  "Local",
  "National",
  "International",
  "Regional",
  "Virtual",
  "Physical",
  "Digital",
  "Manual",
  "Automated",
  "Interactive",
  "Passive",
  "Active",
  "Practical",
  "Theoretical",
  "Experimental",
  "Realistic",
  "Idealistic",
  "Optimistic",
  "Pessimistic",
];
const noun = [
  "Project",
  "Task",
  "Report",
  "Document",
  "Plan",
  "Meeting",
  "Design",
  "Website",
  "Proposal",
  "Analysis",
  "Strategy",
  "Campaign",
  "Budget",
  "Schedule",
  "Agenda",
  "Email",
  "Database",
  "Application",
  "System",
  "Tool",
  "Product",
  "Service",
  "Platform",
  "Course",
  "Workshop",
  "Event",
  "Presentation",
  "Article",
  "Blog",
  "Book",
  "Study",
  "Research",
  "Survey",
  "Interview",
  "Exercise",
  "Recipe",
  "Menu",
  "Diet",
  "Program",
  "Routine",
  "Procedure",
  "Policy",
  "Strategy",
  "Mission",
  "Goal",
  "Objective",
  "Target",
  "Outcome",
  "Result",
  "Solution",
  "Idea",
  "Concept",
  "Model",
  "Prototype",
  "Demo",
  "Sample",
  "Experiment",
  "Test",
  "Assessment",
  "Review",
  "Audit",
  "Analysis",
  "Forecast",
  "Estimate",
  "Plan",
  "Proposal",
  "Pitch",
  "Presentation",
  "Workshop",
  "Seminar",
  "Webinar",
  "Conference",
  "Forum",
  "Discussion",
  "Debate",
  "Dialogue",
  "Conversation",
  "Negotiation",
  "Agreement",
  "Contract",
  "Deal",
  "Partnership",
  "Collaboration",
  "Project",
  "Campaign",
  "Initiative",
];
const purpose = [
  "To destroy the world",
  "For me, myself, and I",
  "For no good reason at all",
  "For the betterment of humanity",
  "For the snails and eels",
  "To evade the IRS",
  "To avoid police capture",
  "To learn something new",
  "To explore uncharted territories",
  "For the thrill of adventure",
  "To make the impossible possible",
  "In pursuit of knowledge",
  "For the sake of art",
  "To challenge the status quo",
  "For a touch of mystery",
  "To find inner peace",
  "As a tribute to the forgotten",
  "In the spirit of curiosity",
  "For the love of discovery",
  "To leave a legacy",
  "As an act of rebellion",
  "To fulfill a childhood dream",
  "In honor of those who dared",
  "For the glory of the moment",
  "To capture the essence of joy",
  "As a quest for truth",
  "For the sheer joy of creation",
  "In defiance of the ordinary",
  "To embrace the unknown",
  "As a symbol of hope",
  "For the whispers of the wind",
  "In the pursuit of excellence",
  "To weave a tale of wonder",
  "For the melody of life",
  "In memory of a promise",
  "To dance with destiny",
  "For the echo of laughter",
  "As a leap of faith",
  "Because I can",
  "Because I shouldn't",
  "Because why not",
  "Don't worry about it",
];
const punctuation = ["!", ".", "?"];

const randomTitle = () =>
  `${randomPicker(verb)} the ${randomPicker(adjective)} ${randomPicker(noun)}`;
const randomDescription = () =>
  `${randomPicker(purpose)}${randomPicker(punctuation)}`;
const randomSubtasks = (numberOfSubtasks) =>
  Array.from(
    { length: numberOfSubtasks },
    () => `${randomPicker(verb)} ${randomPicker(noun)}`,
  );
const randomPriority = () => `${randomPicker(priorities)}`;

const randomPicker = (choices) =>
  choices[Math.floor(choices.length * Math.random())];

const getRandomNumber = (max) => Math.floor(Math.random() * max);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const generateTasks = () => {
  shuffleArray(dates);
  for (let date of dates) {
    date = mimicFormInput(date);
    taskManager.create({
      priority: randomPriority(),
      title: randomTitle(),
      dueDate: date.date,
      dueTime: date.time,
      description: randomDescription(),
      subtasks: randomSubtasks(getRandomNumber(6)),
    });
  }
};

const getRandomSubarray = (array, size) => {
  const clonedArr = array.slice();
  shuffleArray(clonedArr);
  return clonedArr.slice(0, size);
};

const generateGroups = () => {
  const allTasks = taskManager.getAllTaskObjs();
  groupManager.createUserGroup(
    `${randomPicker(adjective)}${randomPicker(noun)}`,
    [...allTasks].map((task) => task.taskID),
  );
  for (let i = 0; i < 2; i++) {
    const randomSize = getRandomNumber(allTasks.length);
    const randTasks = getRandomSubarray(allTasks, randomSize).map(
      (task) => task.taskID,
    );
    groupManager.createUserGroup(
      `${randomPicker(adjective)}${randomPicker(noun)}`,
      randTasks,
    );
  }
};

const initDemo = () => {
  generateTasks();
  generateGroups();
};

export default initDemo;
