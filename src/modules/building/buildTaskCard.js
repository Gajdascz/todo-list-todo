import { buildElementTree, buildIconButtonObj } from "../utility";



export const buildTaskCard = (task) => {
  let taskCardChildren = [
    createPriorityIndicatorObj(task.priority),
    createCardHeaderObj(task.title),
    createDueObj(task.dueDate, task.dueTime),
    createDescriptionObj(task.description),
    createChecklistObj(task.subtasks),
    createTimestampObj(task.timeStamp),
    createShowIconButtons()
  ];
  const taskCard = buildElementTree(
    { type: 'div', attributes: { class: 'task-card'}, 
      children: taskCardChildren 
    }
  );

  return taskCard;
}

const createPriorityIndicatorObj = (priority) => {
  return { type: 'div', attributes: {class:`task-card-priority-indicator priority-${priority}` } };
};

const createCardHeaderObj = (title) => {
  let cardHeaderChildren = [
    createTitleObj(title),
    createHeaderButtonContainerObj()
  ];
  return { type:'div', attributes: {class:'task-card-header'}, children: cardHeaderChildren };
};

const createTitleObj = (title) => {
  return {type:'h4', text: title, attributes:{class:'task-card-title'}};
};

const createHeaderButtonContainerObj = () => {
  let viewBox = "0 0 24 24";
  let editIconPath = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";
  let completeIconPath = "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";
  let editButton = buildIconButtonObj(
                      { iconPath: editIconPath, 
                        purpose: 'edit',
                        type: 'button',
                        viewBox,
                        section: 'task-card'
                      }
                    );
  let completeButton = buildIconButtonObj(
                          { iconPath: completeIconPath,
                            purpose: 'complete',
                            type: 'button',
                            viewBox,
                            section: 'task-card'
                          }       
                      );
  let buttonChildren = [editButton,completeButton];
  return { type: 'div', attributes: {class:'task-card-header-button-container'}, children: buttonChildren }
};

const createDueObj = (dueDate, dueTime) => {
  if(dueDate && dueTime) return { type: 'p', text: `${dueDate} by ${dueTime}`, attributes: {class: 'task-card-due'} };
  if(!dueTime) return { type: 'p', text: `${dueDate}`, attributes: {class: 'task-card-due'} };
};

const createDescriptionObj = (description) => {
  return { type: 'p', text: description, attributes: {class: 'task-card-description'} };
};

const createChecklistObj = (subtasks) => {
  console.log(subtasks);
  let subtaskList = []
  for(let i = 0; i < subtasks.length; i++) {
    subtaskList.push(createSubtaskObj(subtasks[i],i));
  }
  return { type: 'div', attributes: {class: 'task-card-checklist'}, children: subtaskList };
};

const createSubtaskObj = (subtask, subtaskNumber) => {
  let childInput = [{type:'input', attributes: {type:'checkbox', id:`subtask-${subtaskNumber}`}}];
  return { type:'label', text: subtask, attributes: {for:`subtask-${subtaskNumber}`}, children: childInput };
};

const createTimestampObj = (timeStamp) => {
  return {type: 'p', text: timeStamp, attributes: {class:'task-card-timestamp'} };
};

const createShowIconButtons = () => {
  let viewBox = "0 0 24 24";
  let showNextIconPath = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";
  let showAllIconPath = "M16.59,5.59L18,7L12,13L6,7L7.41,5.59L12,10.17L16.59,5.59M16.59,11.59L18,13L12,19L6,13L7.41,11.59L12,16.17L16.59,11.59Z";
  let hideAllIconPath = "M7.41,18.41L6,17L12,11L18,17L16.59,18.41L12,13.83L7.41,18.41M7.41,12.41L6,11L12,5L18,11L16.59,12.41L12,7.83L7.41,12.41Z";
  let hidePreviousIconPath = "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z";
  let showNextButton = buildIconButtonObj(
                         { iconPath: showNextIconPath,
                           purpose: 'show-next',
                           type: 'button',
                           viewBox,
                           section: 'task-card',
                           listeners: {
                            'click': [
                              function (e) {
                                let nextElement = this.parentElement.previousSibling
                                while(nextElement.previousSibling.classList.contains('hide') && !nextElement.previousSibling.classList.contains('task-card-header') ) {
                                    nextElement = nextElement.previousSibling;
                                }
                                nextElement.classList.remove('hide');
                              }
                            ]
                          }
                         }
                        );
  let showAllButton = buildIconButtonObj(
                        { iconPath: showAllIconPath,
                          purpose: 'show-all',
                          type: 'button',
                          viewBox,
                          section: 'task-card',
                          listeners: {
                            'click' : [
                              function (e) {
                                const thisTaskCardChildren = this.parentElement.parentElement.children;
                                const cardInfo = Array.from(thisTaskCardChildren).splice(2,4)
                                cardInfo.forEach(child => {
                                  child.classList.remove('hide');
                                })
                                console.log(cardInfo)
                              }
                            ]
                          }
                        }
                      );
  let hideAllButton = buildIconButtonObj(
                        {
                          iconPath: hideAllIconPath,
                          purpose: 'hide-all',
                          type: 'button',
                          viewBox,
                          section: 'task-card',
                          listeners: {
                            'click' : [
                              function (e) {
                                const thisTaskCardChildren = this.parentElement.parentElement.children;
                                const cardInfo = Array.from(thisTaskCardChildren).splice(2,4)
                                cardInfo.forEach(child => {
                                  child.classList.add('hide');
                                })
                                console.log(cardInfo)
                              }
                            ]
                          }
                        }
                      )
  let hidePreviousButton = buildIconButtonObj(
                        {
                          iconPath: hidePreviousIconPath,
                          purpose: 'hide-previous',
                          type: 'button',
                          viewBox,
                          section: 'task-card',
                          listeners: {
                            'click': [
                              function (e) {
                                let prevElement = this.parentElement.previousSibling;
                                if(prevElement.classList.contains('hide')) {
                                  while(prevElement.classList.contains('hide') && !(prevElement.previousSibling.classList.contains('task-card-header'))){
                                    prevElement = prevElement.previousSibling;
                                  }
                                }  
                                prevElement.classList.add('hide');
                              }
                            ]
                          }
                        }
                      )
  let buttonChildren = [showNextButton,hidePreviousButton,showAllButton,hideAllButton];
  return {type:'div', attributes: {class:'task-card-show-icon-button-container'}, children: buttonChildren};
};