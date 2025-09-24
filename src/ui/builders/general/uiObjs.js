const uiObjs = (() => {
  const getContextStr = (context, objName) =>
    context ? ` ${context + "-" + objName}` : ``;

  const containerDivObj = (context = null, additionalAttributes = {}) => {
    return {
      type: "div",
      attributes: {
        class: `container-div` + getContextStr(context, "container-div"),
        ...additionalAttributes,
      },
    };
  };
  const textDivObj = (
    context = null,
    divText = null,
    additionalAttributes = {},
  ) => {
    return {
      type: "div",
      text: divText ?? "",
      attributes: {
        class: `text-div` + getContextStr(context, "text-div"),
        ...additionalAttributes,
      },
    };
  };
  const pObj = (context = null, pTxt = null, additionalAttributes = {}) => {
    return {
      type: "p",
      text: pTxt ?? "",
      attributes: {
        class: `p` + getContextStr(context, "p"),
        ...additionalAttributes,
      },
    };
  };

  const btnObj = (
    context = null,
    btnTxt = null,
    additionalAttributes = {},
    type = "button",
  ) => {
    return {
      type: "button",
      text: btnTxt ?? "",
      attributes: {
        type,
        class: `button` + getContextStr(context, "button"),
        ...additionalAttributes,
      },
    };
  };

  const headerObj = (
    context = null,
    headerTxt = null,
    headerLvl = 1,
    additionalAttributes = {},
  ) => {
    return {
      type: `h${headerLvl}`,
      text: headerTxt ?? "",
      attributes: {
        class: `header` + getContextStr(context, "header"),
        ...additionalAttributes,
      },
    };
  };

  const textWithBtnObj = (context = null, text = null, btnTxt = null) => {
    return {
      type: "div",
      attributes: {
        class:
          `text-with-button-container-div` +
          getContextStr(context, "text-with-button-container-div"),
      },
      children: [
        {
          type: "button",
          text: btnTxt,
          attributes: {
            type: "button",
            class:
              `text-with-button-button` +
              getContextStr(context, `text-with-button-button`),
          },
        },
        {
          type: "p",
          text,
          attributes: {
            class:
              `text-with-button-text` +
              getContextStr(context, `text-with-button-text`),
          },
        },
      ],
    };
  };

  return {
    containerDivObj,
    textDivObj,
    btnObj,
    headerObj,
    pObj,
    textWithBtnObj,
  };
})();

export default uiObjs;
