import { render } from "../helpers/render";

import { LaptopView } from "../view/laptop-view";

export class LaptopController {
  constructor(container, position) {
    this.container = container;
    this.position = position;
    this.view = null;
  }

  initiate() {
    this.view = new LaptopView();
    render(this.container, this.view, this.position);
  }

  remove() {
    this.view.getElement().remove();
    this.view.removeElement();
  }

}
