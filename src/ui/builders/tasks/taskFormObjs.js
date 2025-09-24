import formObjs from "../general/formObjs";

const taskFormObjs = (() => {
  const context = "task";
  const formType = "dialog";

  const taskFormObj = () => {
    return formObjs.formObj(context, formType);
  };
  const taskFormPrioritySelectObj = (taskPriority = null) => {
    return formObjs.prioritySelectObj(
      context,
      formType,
      taskPriority,
      "priority",
      ["Urgent", "High", "Medium", "Low", "None"],
    );
  };
  const taskFormTitleInputObj = (taskTitle = null) => {
    return formObjs.textInputObj(
      context,
      formType,
      taskTitle,
      "title",
      "Task Title",
      true,
    );
  };
  const taskFormDescriptionInputObj = (taskDescription = null) => {
    return formObjs.textAreaObj(
      context,
      formType,
      taskDescription,
      5,
      30,
      "description",
      `Task Description`,
    );
  };
  const taskFormDueInputObj = (taskDue = null) => {
    const dueContainer = formObjs.containerObj(context, formType, "due");
    dueContainer.children.push(
      formObjs.datePickerObj(context, formType, taskDue, "due-date"),
      formObjs.timePickerObj(context, formType, taskDue, "due-time"),
    );
    return dueContainer;
  };
  const taskFormSubtaskInputObj = () =>
    formObjs.textInputWithBtnObj(context, formType, "subtask", "Subtask");

  const taskFormSubtaskContainerObj = (subtaskValues = null) => {
    const subtaskContainerObj = formObjs.containerObj(
      context,
      formType,
      "subtask",
    );
    const subtasks = [];
    if (subtaskValues) {
      subtaskValues.forEach((subtask) =>
        subtasks.push(
          formObjs.textWithBtnObj(
            context,
            formType,
            "subtask",
            subtask,
            "delete",
            "-",
          ),
        ),
      );
    }
    subtaskContainerObj.children = subtasks;
    return subtaskContainerObj;
  };

  const taskFormSubtaskEntryObj = (subtask) =>
    formObjs.textWithBtnObj(
      context,
      formType,
      "subtask",
      subtask,
      "delete",
      "-",
    );

  const taskFormMainButtonContainerObj = (formContext = null) => {
    const buttonContainerObj = formObjs.containerObj(
      context,
      formType,
      "main-button",
    );
    const buttons = [];
    buttons.push(
      formObjs.buttonObj(context, formType, "submit", "submit", "Submit"),
    );
    if (formContext.match(/edit/i))
      buttons.push(
        formObjs.buttonObj(
          context,
          formType,
          "delete",
          "delete",
          "Delete",
          true,
        ),
      );
    buttonContainerObj.children = buttons;
    return buttonContainerObj;
  };

  return {
    taskFormObj,
    prioritySelectObj: taskFormPrioritySelectObj,
    titleInputObj: taskFormTitleInputObj,
    descriptionInputObj: taskFormDescriptionInputObj,
    dueInputObj: taskFormDueInputObj,
    subtaskInputObj: taskFormSubtaskInputObj,
    subtaskContainerObj: taskFormSubtaskContainerObj,
    subtaskEntryObj: taskFormSubtaskEntryObj,
    mainButtonContainerObj: taskFormMainButtonContainerObj,
  };
})();

export default taskFormObjs;

// const taskFormObj = formObjs.formObj(context,formType);
// // (type, formType='dialog') => {
// //   return {
// //     type: 'form',
// //     attributes: {class: `task-${formType}-form ${type}-${formType}-form`}
// //   }
// // };

// const taskFormPrioritySelectObj = formObjs.customSelectObj(context, 'priority',['Urgent','High','Medium','Low','None'], formType)
// //  (value=null, formType='dialog') => {
// //   let valueText;
// //   if(value) valueText = value.slice(0,1).toUpperCase() + value.slice(1);
// //   return  createCustomSelectObj({
// //             section: `task-${formType}-form`,
// //             identifier: `task-${formType}-form-priority`,
// //             defaultSelectText: valueText ? valueText : 'Priority',
// //             options: ['Urgent', 'High', 'Medium', 'Low', 'None'],
// //             value
// //           }
// //   )
// // };

// const taskFormDescriptionInputObj = formObjs.textAreaObj(context, 5, 30, 'description', formType, `Task Description`, value=null);
// //(value=null, formType='dialog') => {
// //  return createTextAreaObj({
// //    id: `task-${formType}-form-description`,
// //    name: `task-${formType}-form-description`,
// //    rows: 5,
// //    cols: 30,
// //    placeholder: `Task Description`,
// //    value,
// //  });
// //};

// const taskFormTitleInputObj = formObjs.textInputObj(context, formType, 'title', null, 'Task Title', true)
// // (value=null, formType='dialog') => {
// //  return createTextInputObj({
// //    id: `task-${formType}-form-title`,
// //    placeholder: 'Task',
// //    identifier: 'title',
// //    required: true,
// //    value
// //  })
// //};

// const taskFormDueInputObj = (due) => {
//   return formObjs.inputContainerObj(context,formType,'due')
//                    .children[
//                      formObjs.datePickerObj(context,formType,due,'due-date'),
//                      formObjs.timePickerObj(context,formType,due,'due-time')
//                    ];

//   // if(due) due = formatDateForForm(due)
//   // else due = null;
//   // const taskDueDateObj = createDatePickerObj({
//   //                         id: 'due-date',
//   //                         name: 'due-date',
//   //                         value: due ? due.formDate : null
//   //                       });
//   // const taskDueTimeObj =  createTimePickerObj({
//   //                           id: 'due-time',
//   //                           name: 'due-time',
//   //                           value: due ? due.formTime : null
//   // });

//   // const taskDueContainer = { type: 'div',
//   //                               attributes: {class: `task-${formType}-form-due-container`},
//   //                               children: [
//   //                                 taskDueDateObj,
//   //                                 taskDueTimeObj
//   //                               ]
//   //                             }
// };
// const taskFormSubtaskInputObj = formObjs.textInputWithBtnObj(context, 'subtask', formType, 'Subtask',)
// // (formType='dialog') => {
// //   return { type: 'div',
// //            attributes: {class:'subtask-input-container'},
// //            children: [
// //             { type: 'label', attributes: { for: 'subtask-input'},
// //               children: [
// //                 { type: 'input',
// //                 attributes: { type: 'text', class: `task-${formType}-form-subtask-text-input`, id: 'subtask-input', placeholder: 'Subtask', maxlength: '18'},
// //               },
// //               ]},
// //             { type: 'button', text: '+', attributes: {type:'button', class: `task-${formType}-form-add-subtask-button`},
// //               listeners: { 'click': [
// //                 (e) => {
// //                   const subtaskContainer = document.querySelector(`.task-${formType}-form-subtask-container`);
// //                   const textInput = document.querySelector(`input.task-${formType}-form-subtask-text-input`);
// //                   let text = textInput.value.trim()
// //                   let subtaskEntry;
// //                   if(text !== ''){
// //                     subtaskEntry = createSubtaskEntryObj(text);
// //                     subtaskContainer.append(buildElementTree(subtaskEntry));
// //                   }
// //                   textInput.value = '';
// //                 }
// //               ]}}
// //            ]}
// //};

// const taskFormSubtaskContainerObj = (subtaskValues) => {
//   const subtasks = [];
//   if(subtaskValues) {
//     subtaskValues.forEach(subtask => subtasks.push(formObjs.removableTextObj(context,'subtask',formType,)))
//   }
//   return formObjs.inputContainerObj(context,formType,'subtask')
//                    .children = subtasks;
// };

// // (value=null, formType='dialog') => {
// //   const subtasks = [];
// //   if(value) {
// //     value.forEach(subtask => {
// //       subtasks.push(createSubtaskEntryObj(subtask));
// //     })
// //   }
// //   return { type:'div',
// //            attributes: {class: `task-${formType}-form-subtask-container`},
// //            children: subtasks
// //           }
// // };

// const taskFormMainButtonContainerObj = (type, formType='dialog') => {
//   const buttons = [];
//   buttons.push(formObjs.buttonObj(context,'submit',formType,'Submit'));
//   if(type.match(/edit/i)) buttons.push(formObjs.buttonObj(context,'delete',formType,'Delete'));
//   return formObjs.inputContainerObj(context,formType,'main-button').children = buttons;
//   // {
//   //   type: 'div',
//   //   attributes: {class: `task-${formType}-form-main-button-container`},
//   //   children: buttons,
//   // }
// };
