const SVGNS = "http://www.w3.org/2000/svg";
const CHEVRONPATH =
  "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";

// Recursively build DOM element tree
function buildElementTree({
  type,
  attributes = {},
  text = null,
  children = [],
  nameSpace = null,
  listeners = {},
} = {}) {
  try {
    if ((type === "svg" || type === "path") && !nameSpace) nameSpace = SVGNS;
    let element =
      nameSpace === null
        ? document.createElement(type)
        : document.createElementNS(nameSpace, type);
    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
    }
    if (text) element.textContent = text;

    for (const [event, actions] of Object.entries(listeners)) {
      if (Array.isArray(actions)) {
        actions.forEach((action) => {
          if (typeof action === "function") {
            element.addEventListener(event, action);
          }
        });
      }
    }

    if (children && children.length > 0) {
      children.forEach((child) => {
        element.appendChild(buildElementTree(child));
      });
    }
    return element;
  } catch (e) {
    console.error(`Failed to build element: ${type}`, e);
  }
}

const eventHandler = (
  element,
  selector = null,
  ev,
  fn,
  args = null,
  preventDefault = false,
) => {
  let targetElement;
  if (selector) targetElement = element.querySelector(selector);
  else targetElement = element;
  targetElement.addEventListener(ev, function (e) {
    if (preventDefault) e.preventDefault();
    if (Array.isArray(args)) {
      fn(...args);
    } else if (args) {
      fn(args);
    } else {
      fn();
    }
  });
};

const scopedEventHandler = (element, selector, ev, fn, args = null) => {
  const targetElement = element.querySelector(selector);
  targetElement.addEventListener(ev, function (e) {
    if (Array.isArray(args)) {
      fn.apply(this, [e, ...args]);
    } else if (args) {
      fn.apply(this, [e, args]);
    } else {
      fn.call(this, e);
    }
  });
};

const buildIconButtonObj = ({
  iconPath,
  text = null,
  purpose = "fun",
  type = "button",
  viewBox = "0 0 24 24",
  section = null,
  listeners = {},
} = {}) => {
  const baseClass = section
    ? `${section}-icon-button ${section}-${purpose}-icon-button`
    : `${purpose}-icon-button`;
  const svgClass = section
    ? `${section}-icon ${section}-${purpose}-icon`
    : `${purpose}-icon`;
  return {
    type: "button",
    attributes: { class: baseClass, type },
    listeners,
    text,
    children: [
      {
        type: "svg",
        nameSpace: SVGNS,
        attributes: { class: svgClass, viewBox },
        children: [{ type: "path", attributes: { d: iconPath } }],
      },
    ],
  };
};

const changeSelectedBackground = (newPriority) => {
  const selectorHeader = document.querySelector(
    "div.custom-select-head-container",
  );
  if (selectorHeader) {
    Array.from(selectorHeader.classList).forEach((className) => {
      if (className.startsWith("priority-")) {
        selectorHeader.classList.remove(className);
      }
    });
  }
  selectorHeader.classList.add(`priority-${newPriority}`);
};

const createCustomSelectObj = (
  {
    section,
    options,
    value = null,
    identifier = "dropdown",
    defaultSelectText = null,
  },
  menuIconPath = CHEVRONPATH,
) => {
  let priorityClass;
  if (value) priorityClass = `priority-${value}`;
  const optionsObjArray = [];
  options.forEach((option) => {
    optionsObjArray.push({
      type: "div",
      text: option,
      attributes: { class: `${option.toLowerCase()} custom-select-element` },
      listeners: {
        click: [
          (e) => {
            document.querySelector(`div.selected-option`).textContent =
              `${option}`;
            changeSelectedBackground(option.toLowerCase());
          },
        ],
      },
    });
  });
  return {
    type: "div",
    attributes: { class: `custom-select ${section}-${identifier}-select` },
    listeners: {
      click: [
        (e) => {
          document
            .querySelector(
              `.${section}-${identifier}-select .options-container`,
            )
            .classList.toggle("show-list");
          document
            .querySelector(
              `.${section}-${identifier}-select .custom-select-head-container`,
            )
            .classList.toggle("active");
        },
      ],
    },
    children: [
      {
        type: "div",
        attributes: { class: `custom-select-head-container ${priorityClass}` },
        children: [
          {
            type: "div",
            text: defaultSelectText ? defaultSelectText : "Select",
            attributes: {
              class: `selected-option ${identifier}-selected-option`,
            },
          },
          {
            type: "svg",
            attributes: { class: "custom-select-chevron" },
            children: [{ type: "path", attributes: { d: menuIconPath } }],
          },
        ],
      },
      {
        type: "div",
        attributes: { class: "options-container" },
        children: optionsObjArray,
      },
    ],
  };
};

export {
  SVGNS,
  buildElementTree,
  eventHandler,
  scopedEventHandler,
  buildIconButtonObj,
  createCustomSelectObj,
};
