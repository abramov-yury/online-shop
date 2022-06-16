import { render } from "../helpers/render";

import { InfoView } from "../view/info-view";

export class InfoController {
  constructor(container, parameters, position) {
    this.container = container;
    this.parameters = parameters;
    this.position = position;

    this.view = null;
  }

  initiate() {
    this.view = new InfoView(this.parameters);
    render(this.container, this.view, this.position);
  }

  remove() {
    this.view.getElement().remove();
    this.view.removeElement();
  }
}
