import { render } from "../helpers/render";
import { debounce } from "../helpers/utilities";

import { FilterView } from "../view/filter-view";

export class FilterController {
  constructor(container, model, position) {
    this.container = container;
    this.model = model;
    this.position = position;

    this.view = null;

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  initiate(parameters) {
    this.view = new FilterView(parameters);
    this._setHandlers();
    render(this.container, this.view, this.position);
  }

  onButtonClick() {
    console.log("filter button click");
  }

  _setHandlers() {
    this.view.setButtonHandler(debounce(this.onButtonClick), 250);
  }
}
