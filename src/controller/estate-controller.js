import { render } from "../helpers/render";

import { EstateView } from "../view/estate-view";

export class EstateController {
  constructor(container, parameters, position) {
    this.container = container;
    this.position = position;
    this.parameters = parameters;

    this.view = null;
  }

  initiate() {
    this.view = new EstateView(this.parameters);
    render(this.container, this.view, this.position);
  }

  remove() {
    this.view.getElement().remove();
    this.view.removeElement();
  }
}
