import { render } from "../helpers/render";

import { ProductView } from "../view/product-view";

import { PopupController } from "./popup-controller";
import { FavoriteController } from "./favorite-controller";

export class ProductController {
  constructor(container, parameters, position) {
    this.container = container;
    this.parameters = parameters;
    this.position = position;

    this.view = null;

    this.popupController = null;
    this.favoriteController = null;

    this.showPopup = this.showPopup.bind(this);
  }

  initiate() {
    this.view = new ProductView(this.parameters);
    render(this.container, this.view, this.position);
    this._setHandlers();
    this._renderFavorite();
  }

  _setHandlers() {
    this.view.setNavigationClickHandler(this.showPopup);
    this.view.setTitleClickHandler(this.showPopup);
  }

  _renderFavorite() {
    const data = {parent : "product", id : this.parameters.id};
    this.favoriteController = new FavoriteController(this.view, data);
    this.favoriteController.initiate();
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
