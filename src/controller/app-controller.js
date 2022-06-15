import { render, RenderPosition } from "../helpers/render";

import { Model } from "../model/model";

import { AppView } from "../view/app-view";

import { LostPageController } from "./lost-page-controller";
import { FilterController } from "./filter-controller";
import { ResultsController } from "./results-controller";

export class AppController {
  constructor(container, parent) {
    this.container = container;
    this.parent = parent;

    this.view = null;
    this.model = null;

    this.pageNotFoundController = null;
    this.filterController = null;
    this.resultsController = null;
  }

  async initiate(url) {
    this.model = new Model();
    await this.model.setProducts(url).catch(err => console.log(err));

    if(!this.model.getAllProducts()) {
      this._renderLostPage();
      return;
    }

    this.view = new AppView(this.parent);
    render(this.container, this.view, RenderPosition.AFTER);

    this._renderFilter();
    this._renderResults();
  }

  _renderLostPage() {
    this.pageNotFoundController = new LostPageController(document.body);
    this.pageNotFoundController.initiate();
  }

  _renderFilter() {
    this.filterController = new FilterController(this.view, this.model);
    this.filterController.initiate({parent: "app"});
  }

  _renderResults() {
    this.resultsContoller = new ResultsController(this.view, this.model);
    this.resultsContoller.initiate({parent: "app"});
  }
}
