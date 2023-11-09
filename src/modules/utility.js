// Recursively build DOM element tree 
function buildElementTree({type, attributes={}, text=null, children=null, nameSpace=null}) {
  let element = nameSpace === null ? document.createElement(type) : document.createElementNS(nameSpace, type);
  for(const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key,value);
  }
  if(text) element.textContent = text;
  if(children && children.length > 0) {
    children.forEach(child => {
      element.appendChild(buildElementTree(child));
    });
  }
  return element;
}

const SVGNS = 'http://www.w3.org/2000/svg';


export { buildElementTree, SVGNS };