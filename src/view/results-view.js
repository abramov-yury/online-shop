import { AbstractView } from "./abstract-view";

const template = require("../template/results.pug");
const createResultsTemplate = (obj) => template(obj);


export class ResultsView extends AbstractView {
  constructor(parameters) {
    super();

    this.parameters = parameters;

    this.cls = {
      favorite: {
        active: "results__favorite--active",
      },
    };
  }

  getTemplate() {
    return createResultsTemplate(this.parameters);
  }

  getFavoriteButton() {
    return this.getElement().querySelector(".js-results__favorite");
  }

  getResultsContainer() {
    return this.getElement().querySelector(".js-results__container");
  }

  getSortingElements() {
    return this.getElement().querySelector(".js-results__form").elements["results-sorting"];
  }

  setSortingHandler(callback) {
    this.getSortingElements().forEach((item) => item.addEventListener("change", callback));
  }

  setFavoriteButtonClickHandler(callback) {
    this.getFavoriteButton().addEventListener("click", callback);
  }
}
