import { render } from "../helpers/render";
import { throttle } from "../helpers/utilities";

import { Observer } from "../helpers/observer";
import { Mediator } from "../helpers/mediator";

import { ResultsView } from "../view/results-view";

import { ProductController } from "./product-controller";

export class ResultsController {
  constructor(container, model, position) {
    this.container = container;
    this.model = model;
    this.position = position;

    this.view = null;
    this.controllers = null;

    this.productController = null;

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

    this.presentProducts(this.model.getAllProducts());
  }

  onSortingChange(evt) {
    console.log(evt.target.value);
  }

  onFavoriteButtonClick() {
    this.view.getFavoriteButton().classList.toggle(this.view.cls.favorite.active);

    console.log("on favorite button click");
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

    this.model.setCurrentProducts(products);
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
    if(this.controllers.subscribers) {
      this._removeProducts();
    }
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
