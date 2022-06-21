import { render } from "../helpers/render";

import { Mediator } from "../helpers/mediator";

import { PreloaderView } from "../view/preloader-view";

export class PreloaderController {
  constructor(container, parameters, position) {
    this.container = container;
    this.parameters = parameters;
    this.position = position;

    this.view = null;
  }

  initiate() {
    this.view = new PreloaderView(this.parameters);
    render(this.container, this.view, this.position);

    this._updateMediator();
  }

  remove() {
    this.view.getElement().remove();
    this.view.removeElement();
  }

  _updateMediator() {
    this.remove = this.remove.bind(this);

    Mediator.removePreloader = this.remove;
  }
}
