import { render } from "../helpers/render";

import { FavoriteView } from "../view/favorite-view";

export class FavoriteController {
  constructor(container, parameters, position) {
    this.container = container;
    this.parameters = parameters;
    this.position = position;

    this.view = null;

    this.onFavoriteCheckboxChange = this.onFavoriteCheckboxChange.bind(this);
  }

  initiate() {
    this.view = new FavoriteView(this.parameters);
    this._setHandlers();
    render(this.container, this.view, this.position);
  }

  _remove() {
    this.view.getElement().remove();
    this.view.removeElement();
  }

  _setHandlers() {
    this.view.setFavoriteCheckboxChangeHandler(this.onFavoriteCheckboxChange);
  }

  onFavoriteCheckboxChange(evt) {
    console.log(evt.target.name);
  }

}
