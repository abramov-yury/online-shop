import { render } from "../helpers/render";

import { ResultsView } from "../view/results-view";

export class ResultsController {
  constructor(container, model, position) {
    this.container = container;
    this.model = model;
    this.position = position;

    this.view = null;

    this.onSortingChange = this.onSortingChange.bind(this);
    this.onFavoriteButtonClick = this.onFavoriteButtonClick.bind(this);
  }

  initiate(parameters) {
    this.view = new ResultsView(parameters);
    render(this.container, this.view, this.position);

    this._setHandlers();
  }

  onSortingChange(evt) {
    console.log(evt.target.value);
  }

  onFavoriteButtonClick() {
    this.view.getFavoriteButton().classList.toggle(this.view.cls.favorite.active);

    console.log("on favorite button click");
  }

  _setHandlers() {
    this.view.setSortingHandler(this.onSortingChange);
    this.view.setFavoriteButtonClickHandler(this.onFavoriteButtonClick);
  }
}
