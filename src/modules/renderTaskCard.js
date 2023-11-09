import { buildElementTree, SVGNS } from "./utility";

const renderTaskCard = (task) => {

  let taskCardChildren = [
    createPriorityIndicatorObj(task.priority),
    createCardHeaderObj(task.title),
    createDueObj(task.due),
    createDescriptionObj(task.description),
    createChecklistObj(task.subtasks),
    createTimestampObj(task.timeStamp),
    createShowIconButtons()
  ];

  return buildElementTree(
    { type: 'div', attributes: { class: 'task-card'}, taskCardChildren }
  );
}

const createPriorityIndicatorObj = (priority) => {
  return { type: 'div', attributes: {class:`task-card-priority-container task-card-priority-${task.priority}` } };
}


const createCardHeaderObj = (title) => {
  let cardHeaderChildren = [
    createTitleObj(title),
    createHeaderButtonContainerObj()
  ];
  return buildElementTree(
    {type:'div', attributes: {class:'task-card-header'},}
  );
};

const createTitleObj = (title) => {
  return {type:'h4', text: title, attributes:{class:'task-card-title'}};
};


const createHeaderButtonContainerObj = () => {
  let viewBox = "0 0 24 24";
  let editIconPath = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";
  let completeIconPath = "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";
  let editButton = createIconButtonObj('edit', editIconPath, viewBox);
  let completeButton = createIconButtonObj('complete', completeIconPath, viewBox);
  let buttonChildren = [editButton,completeButton];
  return buildElementTree(
    { type: 'div', attributes: {class:'task-card-header-button-container'}, buttonChildren }
  );
};

const createIconButtonObj = (buttonAction, iconPath, viewBox) => {
  let icon = createIconObj(buttonAction, iconPath, viewBox);
  return buildElementTree( 
    { type: 'button', attributes: {class: `task-card-icon-button task-card-${buttonAction}-icon-button`}, icon }
  );
};

const createIconObj = (iconType, svgPath, viewBox) => {
  return buildElementTree(
    { type:'svg', nameSpace: SVGNS, attributes: {class: `task-card-icon task-card-${iconType}-icon`, viewBox: viewBox},
      children: [
        { type: 'path', attributes: {d: svgPath} }
      ] 
    }
  );
}

const createDueObj = (due) => {
  return { type: 'p', text: due, attributes: {class: 'task-card-due'} };
};

const createDescriptionObj = (description) => {
  return { type: 'p', text: description, attributes: {class: 'task-card-description'} };
};

const createChecklistObj = (subtasks) => {
  let subtaskList = []
  for(let i = 0; i < subtasks.length; i++) {
    subtaskList.push(createSubtaskObj(subtasks[i],i));
  }
  return buildElementTree(
    { type: 'div', attributes: {class: 'task-card-checklist'}, subtaskList }
  );
};

const createSubtaskObj = (subtask, subtaskNumber) => {
  let childInput = [{type:'input', attributes: {type:'checkbox', id:`subtask-${subtaskNumber}`}}];
  return { type:'label', text: subtask, attributes: {for:`subtask-${subtaskNumber}`}, childInput };
};

const createTimestampObj = (timeStamp) => {
  return {type: 'p', text: timeStamp, attributes: {class:'task-card-timestamp'} };
};

const createShowIconButtons = () => {
  let viewBox = "0 0 24 24";
  let showNextIconPath = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";
  let showAllIconPath = "M16.59,5.59L18,7L12,13L6,7L7.41,5.59L12,10.17L16.59,5.59M16.59,11.59L18,13L12,19L6,13L7.41,11.59L12,16.17L16.59,11.59Z";
  let showNextButton = createIconButtonObj('show-next',showNextIconPath,viewBox);
  let showAllButton = createIconButtonObj('show-all',showAllIconPath,viewBox);
  let buttonChildren = [showNextButton,showAllButton];
  return buildElementTree({type:'div', attributes: {class:'task-card-show-icon-button-container'}, buttonChildren});
};

export default renderTaskCard;
