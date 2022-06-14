import {AbstractView} from "./abstract-view.js";

const template = require("../template/camera.pug");
const createCameraTemplate = () => template();

export class CameraView extends AbstractView {
  getTemplate() {
    return createCameraTemplate();
  }
}
