import taskManager from './taskManager';



function processTaskFormData(fieldSelectors, task=null) {
  const data = {};
  for(const [key,value] of Object.entries(fieldSelectors)) {
    if(Array.isArray(value)) {
      if(value.length === 0) {
        data[key] = null;
      } else {
        const valueArray = [];
        value.forEach(element => {
          let valuesNodeList = document.querySelectorAll(element);
          valuesNodeList.forEach(node => {
            valueArray.push(node.textContent.trim())
          })
        })
        data[key] = valueArray; 
      }
    } 
    else {
        let element = document.querySelector(value);
        if(!element) { data[key] = null}
        else {
          data[key] = (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') ? element.value.trim() : element.textContent.trim();
        }
      }
  }
  if(!task) return taskManager.create(data);
  else return taskManager.update(task.taskID, data);
};

export { processTaskFormData };