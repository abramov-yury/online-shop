import { productsImagesPath, getImagesProduct } from "../helpers/product";
import { debounce } from "../helpers/utilities";

import { AbstractView } from "./abstract-view";

const template = require("../template/product.pug");
const createProductTemplate = (obj) => template(obj);

const createWebpSet = (picture) => {
  return (
    `${productsImagesPath}${picture}.webp,
    ${productsImagesPath}${picture}@2x.webp 2x,
    ${productsImagesPath}${picture}@3x.webp 3x,
    ${productsImagesPath}${picture}@4x.webp 4x,`
  );
};

const createJpgSet = (picture) => {
  return (
    `${productsImagesPath}${picture}@2x.jpg 2x,
    ${productsImagesPath}${picture}@3x.jpg 3x,
    ${productsImagesPath}${picture}@4x.jpg 4x`
  );
};

export class ProductView extends AbstractView {
  constructor(parameters) {
    super();

    this.parameters = parameters;
    this.frames = getImagesProduct(parameters["photos"]);

    this._onNavigationItemsMouseEnter = this._onNavigationItemsMouseEnter.bind(this);
    this._onNavigationMouseLeave = this._onNavigationMouseLeave.bind(this);
    this._showMorePhotos = this._showMorePhotos.bind(this);
    this._hideMorePhotos = this._hideMorePhotos.bind(this);

    this.setMouseEventsHandler();
  }

  getTemplate() {
    return createProductTemplate(this.parameters);
  }

  getNavigation() {
    return this.getElement().querySelector(".js-product__navigation");
  }

  getPictureSource() {
    return this.getNavigation().querySelector(".js-product__picture > source");
  }

  getImage() {
    return this.getNavigation().querySelector(".js-product__image");
  }

  getNavigationItems() {
    return this.getNavigation().querySelectorAll(".js-product__navigation-item");
  }

  getNavigationLastItem() {
    return this.getNavigationItems()[this.getNavigationItems().length - 1];
  }

  getProductLink() {
    return this.getElement().querySelector(".js-product__link");
  }

  getMorePhotos() {
    return this.getNavigation().querySelector(".js-product__more-photos");
  }

  setMouseEventsHandler(delay=200) {
    this.getNavigationItems().forEach((element) => element.addEventListener("mouseenter", debounce(this._onNavigationItemsMouseEnter, delay)));
    this.getNavigation().addEventListener("mouseleave", debounce(this._onNavigationMouseLeave, delay));
    this.getNavigationLastItem().addEventListener("mouseenter", debounce(this._showMorePhotos, delay));
    this.getNavigationLastItem().addEventListener("mouseleave", debounce(this._hideMorePhotos, delay));
  }

  setNavigationClickHandler(callback) {
    this.getNavigation().addEventListener("click", callback);
  }

  setTitleClickHandler(callback) {
    this.getProductLink().addEventListener("click", (evt) => {
      evt.preventDefault();
      callback(evt);
    });
  }

  _onNavigationItemsMouseEnter(evt) {
    if(this.getImage().dataset.imgName === this.frames[evt.target.dataset.frame]) return;
    this.getImage().dataset.imgName = this.frames[evt.target.dataset.frame];

    this.getImage().src = `${productsImagesPath}${this.frames[evt.target.dataset.frame]}.jpg`;

    this.getPictureSource().setAttribute("srcset", createWebpSet(this.frames[evt.target.dataset.frame]));
    this.getImage().setAttribute("srcset", createJpgSet(this.frames[evt.target.dataset.frame]));
  }

  _onNavigationMouseLeave() {
    if(this.getImage().dataset.imgName === this.frames[0]) return;
    this.getImage().dataset.imgName = this.frames[0];

    this.getImage().src = `${productsImagesPath}${this.frames[0]}.jpg`;

    this.getPictureSource().setAttribute("srcset", createWebpSet(this.frames[0]));
    this.getImage().setAttribute("srcset", createJpgSet(this.frames[0]));
  }

  _showMorePhotos() {
    if(this.getMorePhotos() && !this.getMorePhotos().classList.contains("product__more-photos--shown")) {
      this.getMorePhotos().classList.add("product__more-photos--shown");
    }
  }

  _hideMorePhotos() {
    if(this.getMorePhotos() && this.getMorePhotos().classList.contains("product__more-photos--shown")) {
      this.getMorePhotos().classList.remove("product__more-photos--shown");
    }
  }
}
