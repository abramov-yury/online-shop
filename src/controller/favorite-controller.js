import { render } from "../helpers/render";

import { FavoriteView } from "../view/favorite-view";

export const FAVORITES = "favorites";

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
    this._initiateToggle();
    render(this.container, this.view, this.position);
  }

  _remove() {
    this.view.getElement().remove();
    this.view.removeElement();
  }

  _setHandlers() {
    this.view.setFavoriteCheckboxChangeHandler(this.onFavoriteCheckboxChange);
  }

  _initiateToggle() {
    if(!localStorage.getItem(FAVORITES)) return;
    if(!JSON.parse(localStorage.getItem(FAVORITES)).find(item => item === this.parameters.id)) return;

    this.view.getFavoriteCheckbox().checked = "true";
  }

  _checkToggles(evt) {
    const cbs = document.querySelectorAll(`input[name=${evt.target.name}]`);

    cbs.forEach(item => {
      if(item.checked !== evt.target.checked) item.checked = evt.target.checked;
    });
  }

  _shakeLocalStorage() {
    if(!localStorage.getItem(FAVORITES)) {
      localStorage.setItem(FAVORITES, JSON.stringify([this.parameters.id]));
      return;
    }

    let favorites = JSON.parse(localStorage.getItem(FAVORITES));

    if(favorites.find(item => item === this.parameters.id)) {
      favorites = favorites.filter(item => item !== this.parameters.id);
      localStorage.setItem(FAVORITES, JSON.stringify(favorites));
      return;
    }

    favorites.push(this.parameters.id);
    localStorage.setItem(FAVORITES, JSON.stringify(favorites));
  }

  onFavoriteCheckboxChange(evt) {
    this._shakeLocalStorage();
    this._checkToggles(evt);
  }

}
