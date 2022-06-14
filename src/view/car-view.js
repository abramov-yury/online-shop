import { AbstractView } from "./abstract-view";

const template = require("../template/car.pug");
const createCarTemplate = (obj) => template(obj);

export class CarView extends AbstractView {
  constructor(parameters) {
    super();

    this.parameters = parameters;
  }

  getTemplate() {
    return createCarTemplate(this.parameters);
  }
}
