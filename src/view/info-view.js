import { AbstractView } from "./abstract-view";

const template = require("../template/info.pug");
const createInfoTemplate = (obj) => template(obj);

export class InfoView extends AbstractView {
  constructor(parameters) {
    super();

    this.parameters = parameters;
  }

  getTemplate() {
    return createInfoTemplate(this.parameters);
  }
}
