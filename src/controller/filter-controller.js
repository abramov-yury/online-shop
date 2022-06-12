import { render, RenderPosition } from "../helpers/render";
import { debounce } from "../helpers/utilities";
import { categories, CategoryType } from "../helpers/const";

import { FilterView } from "../view/filter-view";

import { SelectController } from "./select-controller";

export class FilterController {
  constructor(container, model, position) {
    this.container = container;
    this.model = model;
    this.position = position;

    this.view = null;

    this.selectController = null;

    this.onButtonClick = this.onButtonClick.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  initiate(parameters) {
    this.model.setCategory(CategoryType.ALL);

    this.view = new FilterView(parameters);
    render(this.container, this.view, this.position);
    this._setHandlers();

    this._renderSelect();
  }

  _setHandlers() {
    this.view.setButtonHandler(debounce(this.onButtonClick), 250);
  }

  _renderSelect() {
    const parameters = Object.assign(categories);
    parameters.parent = "filter";

    this.selectController = new SelectController(this.view.getButton(), parameters, RenderPosition.BEFORE);
    this.selectController.initiate(this.model.getCategory());
    this.selectController.setSelectChangeHandler(this.onSelectChange);
  }

  onButtonClick() {
    console.log("filter button click");
  }

  onSelectChange(evt) {
    switch (evt.target.value) {
      case (CategoryType.ESTATE) :
        console.log(this.model.getEstate());
        break;
      case (CategoryType.LAPTOPS) :
        console.log(this.model.getLaptops());
        break;
      case (CategoryType.CAMERA) :
        console.log(this.model.getCamera());
        break;
      case (CategoryType.CARS) :
        console.log(this.model.getCars());
        break;
      case (CategoryType.ALL) :
      default:
        console.log(this.model.getAllProducts());
    }
  }

}
