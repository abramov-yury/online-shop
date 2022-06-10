import { render } from "../helpers/render";

import { LostPageView } from "../view/lost-page-view";

export class LostPageController {
  constructor(container, position) {
    this.container = container;
    this.position = position;

    this.view = null;
  }

  initiate() {
    this.view = new LostPageView();
    render(this.container, this.view.getElement(), this.position);
  }

  remove() {
    this.view.getElement().remove();
    this.view.removeElement();
  }
}
