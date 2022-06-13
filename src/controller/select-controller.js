import { render } from "../helpers/render";

import { SelectView } from "../view/select-view";

export class SelectController {
  constructor(container, parameters, position) {
    this.container = container;
    this.parameters = parameters;
    this.position = position;

    this.view = null;
  }

  initiate(option) {
    this.parameters.selectedOption = option ? option : false;

    this.view = new SelectView(this.parameters);
    render(this.container, this.view, this.position);
  }

  setSelectChangeHandler(callback) {
    this.view.optionsChangeHandler(callback);
  }
}
