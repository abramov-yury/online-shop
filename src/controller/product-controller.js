import { render } from "../helpers/render.js";

import { ProductView } from "../view/product-view.js";

import { PopupController } from "./popup-controller.js";

export class ProductController {
  constructor(container, parameters, position) {
    this.container = container;
    this.parameters = parameters;
    this.position = position;

    this.view = null;

    this.popupController = null;

    this.showPopup = this.showPopup.bind(this);
  }

  initiate() {
    this.view = new ProductView(this.parameters);
    render(this.container, this.view, this.position);
    this._setHandlers();
  }

  _setHandlers() {
    this.view.setNavigationClickHandler(this.showPopup);
    this.view.setTitleClickHandler(this.showPopup);
  }

  showPopup(evt) {
    evt.stopPropagation();
    this.popupController = new PopupController(document.body, this.parameters);
    this.popupController.initiate();
  }

  remove() {
    this.view.getElement().remove();
    this.view.removeElement();
  }
}
