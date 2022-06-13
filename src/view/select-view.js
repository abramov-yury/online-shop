import { AbstractView } from "./abstract-view";

const template = require("../template/select.pug");
const getSelectTemplate = (obj) => template(obj);

export class SelectView extends AbstractView {
  constructor(parameters) {
    super();

    this.parameters = parameters;
  }

  getTemplate() {
    return getSelectTemplate(this.parameters);
  }

  getSelectOptions() {
    return this.getElement().querySelector(".js-select__options");
  }

  optionsChangeHandler(callback) {
    this.getSelectOptions().addEventListener("change", callback);
  }
}
