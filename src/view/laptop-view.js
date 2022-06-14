import {AbstractView } from "./abstract-view";

const template = require("../template/laptop.pug");
const createLaptopTemplate = () => template();

export class LaptopView extends AbstractView {
  getTemplate() {
    return createLaptopTemplate();
  }
}
