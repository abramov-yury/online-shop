import { AbstractView } from "./abstract-view";

const template = require("../template/lost-page.pug");
const createLostPageTemplate = () => template();

export class LostPageView extends AbstractView {
  getTemplate() {
    return createLostPageTemplate();
  }
}
