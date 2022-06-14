import { render, RenderPosition } from "../helpers/render";
import { debounce } from "../helpers/utilities";
import { categories, CategoryType } from "../helpers/const";

import { Observer } from "../helpers/observer";

import { FilterView } from "../view/filter-view";

import { SelectController } from "./select-controller";
import { RangeController } from "./range-controller";
import { EstateController } from "./estate-controller";
import { LaptopController } from "./laptop-controller";
import { CameraController } from "./camera-controller";
import { CarController } from "./car-controller";

export class FilterController {
  constructor(container, model, position) {
    this.container = container;
    this.model = model;
    this.position = position;

    this.name = "filter";
    this.view = null;
    this.filters = null;

    this.selectController = null;
    this.rangeController = null;
    this.estateController = null;
    this.laptopController = null;
    this.cameraController = null;
    this.carController = null;

    this.onButtonClick = this.onButtonClick.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  initiate(parameters) {
    this.model.setCategory(CategoryType.ALL);
    this.filters = new Observer();

    this.view = new FilterView(parameters);
    render(this.container, this.view, this.position);
    this._setHandlers();

    this._renderSelect();
    this._renderRangeSlider(this.model.getAllProducts(), 1e5);
  }

  _setHandlers() {
    this.view.setButtonHandler(debounce(this.onButtonClick), 250);
  }

  _renderSelect() {
    const parameters = Object.assign(categories);
    parameters.parent = this.name;

    this.selectController = new SelectController(this.view.getButton(), parameters, RenderPosition.BEFORE);
    this.selectController.initiate(this.model.getCategory());
    this.selectController.setSelectChangeHandler(this.onSelectChange);
  }

  _renderRangeSlider(products, step) {
    this.rangeController = new RangeController(this.view.getButton(), RenderPosition.BEFORE, {parent: this.name});
    this.filters.subscribe(this.rangeController);
    this.rangeController.initiate(products, step);
  }

  _removeFilters() {
    this.filters.subscribers.forEach((item) => item.remove());
    this.filters.subscribers.forEach((item) => this.filters.unsubscribe(item));
  }

  _renderEstateFilter() {
    this.model.setCategory(CategoryType.ESTATE);

    this._removeFilters();
    this._renderRangeSlider(this.model.getEstate(), 1e5);
    this.estateController = new EstateController(this.view.getButton(), {parent: this.name}, RenderPosition.BEFORE);
    this.filters.subscribe(this.estateController);
    this.estateController.initiate();

    console.log(this.model.getEstate());
  }

  _renderLaptopsFilter() {
    this.model.setCategory(CategoryType.LAPTOPS);

    this._removeFilters();
    this._renderRangeSlider(this.model.getLaptops(), 1e3);
    this.laptopController = new LaptopController(this.view.getButton(), RenderPosition.BEFORE);
    this.filters.subscribe(this.laptopController);
    this.laptopController.initiate();

    console.log(this.model.getLaptops());
  }

  _renderCameraFilter() {
    this.model.setCategory(CategoryType.CAMERA);

    this._removeFilters();
    this._renderRangeSlider(this.model.getCamera(), 1e3);
    this.cameraController = new CameraController(this.view.getButton(), RenderPosition.BEFORE);
    this.filters.subscribe(this.cameraController);
    this.cameraController.initiate();

    console.log(this.model.getCamera());
  }

  _renderCarsFilter() {
    this.model.setCategory(CategoryType.CARS);

    this._removeFilters();
    this._renderRangeSlider(this.model.getCars(), 1e4);
    this.carController = new CarController(this.view.getButton(), {parent: this.name}, RenderPosition.BEFORE);
    this.filters.subscribe(this.carController);
    this.carController.initiate();

    console.log(this.model.getCars());
  }

  _renderAllFilter() {
    this.model.setCategory(CategoryType.ALL);

    this._removeFilters();
    this._renderRangeSlider(this.model.getAllProducts(), 1e5);

    console.log(this.model.getAllProducts());
  }

  onSelectChange(evt) {
    switch (evt.target.value) {
      case (CategoryType.ESTATE) :
        this._renderEstateFilter();
        break;
      case (CategoryType.LAPTOPS) :
        this._renderLaptopsFilter();
        break;
      case (CategoryType.CAMERA) :
        this._renderCameraFilter();
        break;
      case (CategoryType.CARS) :
        this._renderCarsFilter();
        break;
      case (CategoryType.ALL) :
      default:
        this._renderAllFilter();
    }
  }

  onButtonClick() {
    console.log("filter button click");
  }

}
