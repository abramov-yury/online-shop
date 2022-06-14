import { render, RenderPosition } from "../helpers/render";

import { CarView } from "../view/car-view";
import { SelectController } from "./select-controller";

const FILTER = require("../template/filter.json");

export class CarController {
  constructor(container, parameters, position) {
    this.container = container;
    this.position = position;
    this.parameters = parameters;

    this.view = null;
    this.selectController = null;
  }

  initiate() {
    this.view = new CarView(this.parameters);
    render(this.container, this.view, this.position);

    this._renderSelect();
  }

  _renderSelect() {
    const data =  Object.assign(FILTER.car_year, {parent: "car"});

    this.selectController = new SelectController(this.view, data, RenderPosition.PREPEND);
    this.selectController.initiate(FILTER.car_year.items[0].value);
  }

  remove() {
    this.view.getElement().remove();
    this.view.removeElement();
  }
}
