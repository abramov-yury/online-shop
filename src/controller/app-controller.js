import {render, RenderPosition} from "../helpers/render.js";

import {AppView} from "../view/app-view.js";

export class AppController {
  constructor(container, parent) {
    this.container = container;
    this.parent = parent;

    this.view = null;
    this.model = null;
  }

  initiate() {
    this.view = new AppView(this.parent);
    render(this.container, this.view, RenderPosition.AFTER);
  }
}
