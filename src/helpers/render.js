import {AbstractView} from "../view/abstract-view";

export const RenderPosition = {
  PREPEND: "prepend",
  APPEND: "append",
  BEFORE: "before",
  AFTER: "after",
};

const getElement = (object) => {
  if(object instanceof AbstractView) {
    return object.getElement();
  }

  return object;
};

export const render = (container, element, place = RenderPosition.APPEND) => {
  switch (place) {
    case RenderPosition.BEFORE:
      getElement(container).before(getElement(element));
      break;
    case RenderPosition.PREPEND:
      getElement(container).prepend(getElement(element));
      break;
    case RenderPosition.AFTER:
      getElement(container).after(getElement(element));
      break;
    case RenderPosition.APPEND:
    default:
      getElement(container).append(getElement(element));
  }
};

export const createElement = (template) => {
  const newElement = document.createElement("div");
  newElement.innerHTML = template;

  return newElement.firstChild;
};
