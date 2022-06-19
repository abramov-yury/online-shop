import { render } from "../helpers/render";
import { throttle } from "../helpers/utilities";
import { SortingValue, sortProducts } from "../helpers/sorting";

import { Observer } from "../helpers/observer";
import { Mediator } from "../helpers/mediator";

import { ResultsView } from "../view/results-view";

import { ProductController } from "./product-controller";
import { InfoController } from "./info-controller";

import { FAVORITES } from "./favorite-controller";

const INFO = require("../template/info.json");

const Mode = {
  favorite: false,
};

export class ResultsController {
  constructor(container, model, position) {
    this.container = container;
    this.model = model;
    this.position = position;

    this.view = null;
    this.controllers = null;

    this.productController = null;
    this.infoController = null;

    this.numberDefaultProducts = 7;
    this.numberLoadedProducts = 5;
    this.currentNumberProducts = 0;

    this.checkPosition = this.checkPosition.bind(this);
    this.onSortingChange = this.onSortingChange.bind(this);
    this.onFavoriteButtonClick = this.onFavoriteButtonClick.bind(this);
  }

  initiate(parameters) {
    this.view = new ResultsView(parameters);
    render(this.container, this.view, this.position);

    this.controllers = new Observer();
    this.view.getResultsContainer().addEventListener("scroll", throttle(this.checkPosition, 250));
    window.addEventListener("resize", throttle(this.checkPosition, 250));
    this._setHandlers();
    this._updateMediator();


    this.model.setSortingValue(SortingValue.POPULAR);
    this.presentProducts(this.model.getAllProducts());
  }

  onSortingChange(evt) {
    this.model.setSortingValue(evt.target.value);
    if(!this.model.currentProducts.length) return;

    this.presentProducts(this.model.getCurrentProducts());
  }

  onFavoriteButtonClick() {
    this.view.getFavoriteButton().classList.toggle(this.view.cls.favorite.active);

    if(!Mode.favorite) {
      Mediator.disableFilters();
      this.view.getSortingElements().forEach((item) => item.setAttribute("disabled", true));

      this._renderFavorites();

      Mode.favorite = true;
    } else {
      Mediator.enableFilters();
      this.view.getSortingElements().forEach((item) => item.removeAttribute("disabled"));

      this.presentProducts(this.model.getPreviousResults());

      Mode.favorite = false;
    }
  }

  _renderFavorites() {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES));
    this._cleanResults();
    this.model.setPreviousResults(this.model.getCurrentProducts());

    if(!favorites || !favorites.length) {
      this.model.setCurrentProducts([]);
      this.infoController = new InfoController(this.view.getResultsContainer(), INFO.favourites);
      this.infoController.initiate();
      return;
    }

    const results = [];
    favorites.forEach(favorite => {
      results.push(this.model.getAllProducts().find((product) => favorite === product.id));
    });

    this.model.setCurrentProducts(results);
    this._renderProducts();
  }

  checkPosition() {
    if(this.currentNumberProducts >= this.model.getCurrentProducts().length) return;

    const container = this.view.getResultsContainer();

    const scrollBottom = container.scrollHeight - (container.scrollTop + container.offsetHeight);
    const threshold = Math.floor(container.offsetHeight / 3);

    if(scrollBottom < threshold) this._renderProducts();
  }

  presentProducts(products) {
    this._cleanResults();
    this.model.setCurrentProducts(sortProducts(this.model.getSortingValue(), products));

    if(!products.length) {
      this.infoController = new InfoController(this.view.getResultsContainer(), INFO.common);
      this.infoController.initiate();
      return;
    }

    this._renderProducts();
  }

  _setHandlers() {
    this.view.setSortingHandler(this.onSortingChange);
    this.view.setFavoriteButtonClickHandler(this.onFavoriteButtonClick);
  }

  _updateMediator() {
    this.presentProducts = this.presentProducts.bind(this);

    Mediator.presentResults = this.presentProducts;
  }

  _cleanResults() {
    if(this.controllers.subscribers) this._removeProducts();
    if(this.infoController) this.infoController.remove();
  }

  _renderProducts() {
    let products;

    if(!this.currentNumberProducts) {
      products = this.model.getCurrentProducts().slice(0, this.numberDefaultProducts);
      this.currentNumberProducts = this.numberDefaultProducts;
    } else {
      products = this.model.getCurrentProducts().slice(this.currentNumberProducts, this.currentNumberProducts + this.numberLoadedProducts);
      this.currentNumberProducts += this.numberLoadedProducts;
    }

    products.forEach(item => this._renderProduct(item));
  }

  _removeProducts() {
    this.controllers.subscribers.forEach((item) => {
      item.remove();
      this.controllers.unsubscribe(item);
    });
    this.currentNumberProducts = 0;
  }

  _renderProduct(product) {
    this.productController = new ProductController(this.view.getResultsContainer(), Object.assign(product, {parent: "results"}));
    this.controllers.subscribe(this.productController);
    this.productController.initiate();
  }
}
