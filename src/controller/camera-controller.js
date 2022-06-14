import { render } from "../helpers/render";

import { CameraView } from "../view/camera-view";
import { SelectController } from "./select-controller";

const FILTER = require("../template/filter.json");

export class CameraController {
  constructor(container, position) {
    this.container = container;
    this.position = position;

    this.view = null;
  }

  initiate() {
    this.view = new CameraView();
    render(this.container, this.view, this.position);

    this._renderSelect(FILTER.camera_matrix_resolution, FILTER.camera_matrix_resolution.items[0].value);
    this._renderSelect(FILTER.camera_video_resolution, FILTER.camera_video_resolution.items[0].value);
  }

  _renderSelect(parameters, selectedOption, position) {
    const data = Object.assign(parameters, {parent: "camera"});

    const selectController = new SelectController(this.view, data, position);
    selectController.initiate(selectedOption);
  }

  remove() {
    this.view.getElement().remove();
    this.view.removeElement();
  }
}
