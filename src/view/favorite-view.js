import { AbstractView } from "./abstract-view";

const template = require("../template/favorite.pug");
const createFavoriteTemplate = (obj) => template(obj);

export class FavoriteView extends AbstractView {
  constructor(parameters) {
    super();

    this.parameters = parameters;
  }

  getTemplate() {
    return createFavoriteTemplate(this.parameters);
  }

  getFavoriteCheckbox() {
    return this.getElement().querySelector(".js-favorite__checkbox");
  }

  setFavoriteCheckboxChangeHandler(callback) {
    this.getFavoriteCheckbox().addEventListener("change", callback);
  }
}
