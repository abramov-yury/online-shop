import { AbstractView } from "./abstract-view";

const template = require("../template/filter.pug");
const createFilterTemplate = (obj) => template(obj);

export class FilterView extends AbstractView {
  constructor(parameters) {
    super();

    this.parameters = parameters;
  }

  getTemplate() {
    return createFilterTemplate(this.parameters);
  }

  getButton() {
    return this.getElement().querySelector(".js-filter__button");
  }

  setButtonHandler(callback) {
    this.getButton().addEventListener("click", (evt) => {
      evt.preventDefault();
      callback();
    });
  }
}
