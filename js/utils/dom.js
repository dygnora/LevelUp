// js/utils/dom.js

/**
 * Creates an HTML element with the given properties
 * @param {string} tag 
 * @param {object} attributes 
 * @param {string|Node|Array} children 
 * @returns {HTMLElement}
 */
export function createElement(tag, attributes = {}, children = null) {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'dataset') {
      for (const [dataKey, dataValue] of Object.entries(value)) {
        element.dataset[dataKey] = dataValue;
      }
    } else if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(key.substring(2).toLowerCase(), value);
    } else {
      if (typeof value === 'boolean') {
        if (value) element.setAttribute(key, '');
      } else {
        element.setAttribute(key, value);
      }
    }
  }

  if (children) {
    if (Array.isArray(children)) {
      children.forEach(child => {
        if (child instanceof Node) {
          element.appendChild(child);
        } else if (child !== null && child !== undefined) {
          element.appendChild(document.createTextNode(String(child)));
        }
      });
    } else if (children instanceof Node) {
      element.appendChild(children);
    } else {
      element.innerHTML = children;
    }
  }

  return element;
}

/**
 * Clears all children from a DOM element
 * @param {HTMLElement} element 
 */
export function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
