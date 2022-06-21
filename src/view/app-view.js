import { AbstractView } from "./abstract-view";

const template = require("../template/app.pug");
const createAppTemplate = (obj) => template(obj);

export class AppView extends AbstractView {
  constructor(parameters) {
    super();

    this.parameters = parameters;
  }

  getTemplate() {
    return createAppTemplate(this.parameters);
  }
}
