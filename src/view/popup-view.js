import { AbstractView } from "./abstract-view";

const template = require("../template/popup.pug");
const createPopupTemplate = (obj) => template(obj);

const productImagesPath = require("../helpers/product.js").productsImagesPath;

const createSourceSrcsetTemplate = (name) => {
  return (
    `${productImagesPath}${name}.webp,
    ${productImagesPath}${name}@2x.webp 2x,
    ${productImagesPath}${name}@3x.webp 3x,
    ${productImagesPath}${name}@4x.webp 4x`
  );
};

const createImgSrcsetTemplate = (name) => {
  return (
    `${productImagesPath}${name}@2x.jpg 2x,
    ${productImagesPath}${name}@3x.jpg 3x,
    ${productImagesPath}${name}@4x.jpg 4x,`
  );
};

const createImgSrcTemplate = (name) => {
  return (
    `${productImagesPath}${name}.jpg`
  );
};

export class PopupView extends AbstractView {
  constructor(parameters) {
    super();

    this.parameters = parameters;
  }

  getTemplate() {
    return createPopupTemplate(this.parameters);
  }

  getSourceSrcsetTemplate(name) {
    return createSourceSrcsetTemplate(name);
  }

  getImgSrcsetTemplate(name) {
    return createImgSrcsetTemplate(name);
  }

  getImgSrcTemplate(name) {
    return createImgSrcTemplate(name);
  }

  getPopupInner() {
    return this.getElement().querySelector(".js-popup__inner");
  }

  getButtonCross() {
    return this.getElement().querySelector(".js-popup__button-cross");
  }

  getGalleryList() {
    return this.getElement().querySelector(".js-popup__gallery-list");
  }

  getMainPicture() {
    return this.getElement().querySelector(".js-popup__main-picture");
  }

  getMainImage() {
    return this.getMainPicture().querySelector("img");
  }

  getMap() {
    return this.getElement().querySelector(`#map-${this.parameters.id}`);
  }

  setButtonCross(callback) {
    this.getButtonCross().addEventListener("click", callback);
  }

  setGalleryListHandler(callback) {
    this.getGalleryList().addEventListener("click", callback);
  }
}
