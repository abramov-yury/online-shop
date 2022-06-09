import {AbstractView} from "./abstract-view.js";

const template = require("../template/app.pug");
const createAppTemplate = (obj) => template(obj);

export class AppView extends AbstractView {
  constructor(parent) {
    super();

    this.parent = parent;
  }

  getTemplate() {
    return createAppTemplate({parent: this.parent});
  }
}
