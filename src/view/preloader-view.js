import { AbstractView } from "./abstract-view";

const template = require("../template/preloader.pug");
const getPreloaderTemplate = (obj) => template(obj);

export class PreloaderView extends AbstractView {
  constructor(parameters) {
    super();

    this.parameters = parameters;
  }

  getTemplate() {
    return getPreloaderTemplate(this.parameters);
  }
}
