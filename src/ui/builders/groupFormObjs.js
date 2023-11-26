import { buildElementTree, createCustomSelectObj, eventHandler } from '../../logic/utility/domHelperFunctions';
import { buildElementTre } from '../../logic/utility/domHelperFunctions';
import formObjs from './formObjs';



const groupsFormObjs = (() => {
  const context  = 'groups';
  const formType = 'dialog';

  const groupsUIContainer = (uiTitle) => formObjs.containerObj(context,formType,uiTitle);

  const groupNameInputObj = (groupName=null) => formObjs.textInputObj(context, formType, groupName, 'group-name', 'Group Name', true);

  const tasksListContainerObj = () => formObjs.containerObj(context,formType,'all-tasks');

  const taskListEntryObj = (taskID, taskTitle) => {
    const taskListEntryObj = formObjs.textWithBtnObj(context,formType,'task',taskTitle,'add-to-group','+')
    //eventHandler(taskListEntryObj,'button','click',)
    taskListEntryObj.attributes['data-taskid'] = taskID;
    return taskListEntryObj;
  };

  const submitButtonObj = () => formObjs.buttonObj(context,formType,'submit','submit','Submit');


  return {
    groupsUIContainer,
    groupNameInputObj,
    tasksListContainerObj,
    taskListEntryObj,
    submitButtonObj,
  }
})();


export default groupsFormObjs;
