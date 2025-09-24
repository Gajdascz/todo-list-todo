function processFormData(fieldSelectors, obj = null) {
  const data = {};
  for (const [key, value] of Object.entries(fieldSelectors)) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        data[key] = null;
      } else {
        const values = {};
        value.forEach((element) => {
          let valuesNodeList = document.querySelectorAll(element);
          valuesNodeList.forEach((node, iterator) => {
            values[node.getAttribute("data-taskid") ?? iterator] =
              node.textContent.trim();
          });
        });
        data[key] = values;
      }
    } else {
      let element = document.querySelector(value);
      if (!element) {
        data[key] = null;
      } else {
        data[key] =
          element.tagName === "INPUT" || element.tagName === "TEXTAREA"
            ? element.value.trim()
            : element.textContent.trim();
      }
    }
  }
  return obj ? { data, obj } : { data };
}

export { processFormData };
