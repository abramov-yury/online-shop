import {render, RenderPosition} from "../helpers/render.js";

import {Model} from "../model/model.js";

import {AppView} from "../view/app-view.js";

export class AppController {
  constructor(container, parent) {
    this.container = container;
    this.parent = parent;

    this.view = null;
    this.model = null;
  }

  async initiate(url) {
    this.model = new Model();
    await this.model.setProducts(url).catch(err => console.log(err));

    if(!this.model.getAllProducts()) {
      console.log("404");
      return;
    }

    this.view = new AppView(this.parent);
    render(this.container, this.view, RenderPosition.AFTER);
  }
}
