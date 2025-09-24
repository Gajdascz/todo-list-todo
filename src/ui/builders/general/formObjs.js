import { formatDateForForm } from "../../../logic/utility/dateHelperFunctions";
import { createCustomSelectObj } from "../../../logic/utility/domHelperFunctions";
const formObjs = (() => {
  const formObj = (context, formType, identifier = null) => {
    return {
      type: "form",
      attributes: {
        name: `${context}-${formType}-form${identifier ? "-" + identifier : ""}`,
        class: `${context}-${formType}-form ${identifier ? context + "-" + formType + "-" + identifier + "-" + "form" : ""}`,
      },
    };
  };
  const createContainerObj = (context, formType, descriptor) => {
    return {
      type: "div",
      attributes: {
        class: `${context}-${formType}-form-${descriptor}-container form-area-container`,
      },
      children: [],
    };
  };
  const createTextInputObj = (
    context,
    formType,
    value,
    descriptor = "",
    placeholder = "",
    required = false,
    maxlength = "50",
  ) => {
    const id = `${context}-${formType}-form-${descriptor}`;
    return {
      type: "label",
      attributes: { for: id },
      children: [
        {
          type: "input",
          attributes: {
            type: "text",
            id: id,
            name: id,
            class: `${context}-${formType}-form-${descriptor}-text-input form-text-input-element`,
            placeholder,
            required,
            value: value ? value : "",
            maxlength,
          },
        },
      ],
    };
  };
  const createTextAreaObj = (
    context,
    formType,
    value,
    rows,
    cols,
    descriptor = "",
    placeholder = "",
  ) => {
    const id = `${context}-${formType}-form-${descriptor}`;
    return {
      type: "label",
      attributes: { for: id },
      children: [
        {
          type: "textarea",
          text: value,
          attributes: {
            type: "text",
            id: id,
            name: id,
            class: `${context}-${formType}-form-${descriptor}-textarea-input form-textarea-input-element`,
            rows,
            cols,
            placeholder,
          },
        },
      ],
    };
  };
  const createButtonObj = (
    context,
    formType,
    value,
    descriptor,
    btnTxt = "",
    cautionBtn = false,
  ) => {
    return {
      type: "button",
      text: btnTxt,
      attributes: {
        type: "button",
        class: `button ${context}-${formType}-form-${descriptor}-button form-button-element ${cautionBtn ? "form-caution-button" : ""}`,
        id: `${context}-${formType}-form-${descriptor}-button`,
        value,
      },
    };
  };
  const createTextInputWithBtnObj = (
    context,
    formType,
    descriptor,
    placeholder = "",
    btnTxt = "+",
  ) => {
    return {
      type: "div",
      attributes: {
        class: `${context}-${descriptor}-input-container form-text-input-with-button-container`,
      },
      children: [
        {
          type: "label",
          attributes: {
            for: `${context}-${descriptor}-${formType}-text-input`,
          },
          children: [
            {
              type: "input",
              attributes: {
                type: "text",
                class: `${context}-${descriptor}-${formType}-form-text-input form-text-input-with-button-text-input-element`,
                id: `${context}-${descriptor}-${formType}-form-text-input`,
                placeholder,
                maxlength: "18",
              },
              listeners: {
                focus: [
                  function (e) {
                    this.parentElement.parentElement.classList.toggle(
                      "outline-toggle",
                    );
                  },
                ],
                focusout: [
                  function (e) {
                    this.parentElement.parentElement.classList.toggle(
                      "outline-toggle",
                    );
                  },
                ],
              },
            },
          ],
        },
        {
          type: "button",
          text: btnTxt,
          attributes: {
            type: "button",
            class: `${context}-${descriptor}-${formType}-form-text-input-button form-text-input-with-button-button-element`,
          },
        },
      ],
    };
  };
  const createCustomPrioritySelectObj = (
    context,
    formType,
    value,
    selectType,
    options,
  ) => {
    let selectedText;
    if (value) selectedText = value.slice(0, 1).toUpperCase() + value.slice(1);
    else
      selectedText = selectType.slice(0, 1).toUpperCase() + selectType.slice(1);
    return createCustomSelectObj({
      section: `${context}-${formType}-form`,
      options,
      value,
      identifier: `${context}-${formType}-form-${selectType}`,
      defaultSelectText: selectedText,
    });
  };
  const createDatePickerObj = (
    context,
    formType,
    value,
    descriptor = "date-input",
    required = false,
    min = "0000-01-01",
    max = "9999-01-01",
  ) => {
    const id = `${context}-${formType}-form-${descriptor}`;
    if (value) value = formatDateForForm(value);
    return {
      type: "label",
      attributes: { for: id },
      children: [
        {
          type: "input",
          attributes: {
            type: "date",
            id: id,
            name: id,
            class: `${context}-${formType}-form-datepicker-input form-datepicker-input-element`,
            min,
            max,
            value: value ? value.formDate : null,
          },
        },
      ],
    };
  };
  const createTimePickerObj = (
    context,
    formType,
    value,
    descriptor = "time-input",
    min = "",
    max = "",
    required = false,
  ) => {
    const id = `${context}-${formType}-form-${descriptor}`;
    if (value) value = formatDateForForm(value);
    return {
      type: "label",
      attributes: { for: id },
      children: [
        {
          type: "input",
          attributes: {
            type: "time",
            id,
            class: `${context}-${formType}-form-timepicker-input form-timepicker-input-element`,
            min,
            max,
            value: value ? value.formTime : null,
          },
        },
      ],
    };
  };
  const createTextWithBtnObj = (
    context,
    formType,
    descriptor,
    value,
    btnAction,
    btnTxt,
  ) => {
    return {
      type: "div",
      attributes: {
        class: `${context}-${descriptor}-entry-container form-text-with-button-container`,
      },
      children: [
        {
          type: "button",
          text: btnTxt,
          attributes: {
            type: "button",
            class: `${context}-${descriptor}-entry-${btnAction}-button form-text-with-button-button-element`,
          },
        },
        {
          type: "p",
          text: value,
          attributes: {
            class: `${context}-${formType}-form-${descriptor}-entry-text form-text-with-button-text-element`,
          },
        },
      ],
    };
  };

  return {
    formObj: formObj,
    containerObj: createContainerObj,
    textInputObj: createTextInputObj,
    textAreaObj: createTextAreaObj,
    buttonObj: createButtonObj,
    textInputWithBtnObj: createTextInputWithBtnObj,
    textWithBtnObj: createTextWithBtnObj,
    prioritySelectObj: createCustomPrioritySelectObj,
    datePickerObj: createDatePickerObj,
    timePickerObj: createTimePickerObj,
  };
})();

export default formObjs;
