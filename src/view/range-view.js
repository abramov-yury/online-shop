import { AS } from "../plugins/aSlider/aSlider";

import { AbstractView } from "./abstract-view";

const template = require("../template/range.pug");
const createRangeTemplate = (obj) => template(obj);

export class RangeView extends AbstractView {
  constructor(parameters) {
    super();

    this.slider = null;
    this.parameters = parameters;

    this.writeValues = this.writeValues.bind(this);
    this.initiateSlider = this.initiateSlider.bind(this);
  }

  getTemplate() {
    return createRangeTemplate(this.parameters);
  }

  getRangeInput() {
    return this.getElement().querySelector(".range__input");
  }

  getRangeResults() {
    return this.getElement().querySelectorAll(".range__tooltip--result");
  }

  writeValues(str) {
    const values = str.split(", ");

    for(let i = 0; i < this.getRangeResults().length; i++) {
      this.getRangeResults()[i].innerText = Number(values[i]).toLocaleString();
    }
  }

  initiateSlider(obj) {
    this.slider = new AS(obj);
  }
}
