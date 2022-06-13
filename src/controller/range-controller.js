import { render } from "../helpers/render";

import { RangeView } from "../view/range-view";

export class RangeController {
  constructor(container, position, parameters) {
    this.contaienr = container;
    this.position = position;
    this.parameters = parameters;

    this.view = null;
    this.products = null;
    this.step = null;
    this.target = null;

    this.prices = [];
    this.data = {};
  }

  initiate(products, step) {
    this.products = products;
    this.step = step;

    this.view = new RangeView(this.parameters);
    this.target = this.view.getRangeInput();

    this._setPrices(this.products);
    this._setData(this.view.writeValues, this.step);

    render(this.contaienr, this.view, this.position);

    this.renderSlider();
  }

  _setPrices(products) {
    products.forEach((item) => this.prices.push(item["price"]));
  }

  _setData(callback, step) {
    this.data.target = this.target;
    this.data.values = {min: this._getMinPrice(), max: this._getMaxPrice()};
    this.data.step = step;
    this.data.onChange = (value) => {
      callback(value);
    };
  }

  _getMinPrice() {
    return Math.min.apply(this, this.prices);
  }

  _getMaxPrice() {
    return Math.max.apply(this, this.prices);
  }

  renderSlider() {
    this.view.initiateSlider(this.data);
  }

  disable() {
    this.view.slider.disable(true);
  }

  enable() {
    this.view.slider.disable(false);
  }

  remove() {
    this.view.slider.destroy();
    this.view.getElement().remove();
    this.view.removeElement();
  }
}
