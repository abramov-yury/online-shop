import { AbstractView } from "./abstract-view";

const template = require("../template/estate.pug");
const createEstateTemplate = (obj) => template(obj);

export class EstateView extends AbstractView {
  constructor(parameters) {
    super();

    this.parameters = parameters;

    this.setEstateAreaFieldHandler();
  }

  getTemplate() {
    return createEstateTemplate(this.parameters);
  }

  getEstateAreaField() {
    return this.getElement().querySelector(".js-estate__area-field");
  }

  setEstateAreaFieldHandler() {
    this.getEstateAreaField().addEventListener("input", this._onEstateAreaFieldInput);
  }

  _onEstateAreaFieldInput(evt) {
    evt.target.value = evt.target.value.replace(/^0|\D/g, "");
  }
}
