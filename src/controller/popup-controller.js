import { render } from "../helpers/render";
import { Options } from "../helpers/map";

import { PopupView } from "../view/popup-view";

export class PopupController {
  constructor(container, parameters, position) {
    this.container = container;
    this.parameters = parameters;
    this.position = position;

    this.view = null;
    this.map = null;

    this.onEscDown = this.onEscDown.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onButtonCrossClick = this.onButtonCrossClick.bind(this);
    this.onGalleryListClick = this.onGalleryListClick.bind(this);
  }

  initiate() {
    this.view = new PopupView(this.parameters);
    this._setHandlers();
    render(this.container, this.view, this.position);
    this._renderMap();
  }

  _remove() {
    this.view.getElement().remove();
    this.view.removeElement();

    document.removeEventListener("keydown", this.onEscDown);
    document.removeEventListener("click", this.onDocumentClick);
  }

  _setHandlers() {
    this.view.setButtonCross(this.onButtonCrossClick);
    this.view.setGalleryListHandler(this.onGalleryListClick);

    document.addEventListener("keydown", this.onEscDown);
    document.addEventListener("click", this.onDocumentClick);
  }

  _renderMap() {
    /* eslint-disable */
    this.map = L.map(this.view.getMap(), {
      center: this.parameters.coordinates,
      zoom: 11,
      zoomControl: false,
    });
    L.control.zoom({
      zoomInText: Options.CONTROL_ZOOM.zoomInText,
      zoomOutText: Options.CONTROL_ZOOM.zoomOutText,
      zoomInTitle: Options.CONTROL_ZOOM.zoomInTitle,
      zoomOutTitle: Options.CONTROL_ZOOM.zoomOutTitle,
    }).addTo(this.map)
    L.tileLayer(Options.TILE.img, {attribution: Options.TILE.attribution}).addTo(this.map);
    L.marker(this.parameters.coordinates, {icon: L.icon({iconUrl: Options.ICON.iconUrl, iconSize: Options.ICON.iconSize})}).addTo(this.map);
    L.control.zoom().remove()
    /* eslint-enable */
  }

  onEscDown(evt) {
    if(evt.key === "Escape" || evt.code === "Escape") this._remove();
  }

  onDocumentClick(evt) {
    if(!this.view.getPopupInner().contains(evt.target)) this._remove();
  }

  onButtonCrossClick() {
    this._remove();
  }

  onGalleryListClick(evt) {
    if(evt.target.tagName !== "IMG") return;
    if(this.view.getMainImage().dataset.imgName === evt.target.dataset.imgName) return;
    this.view.getMainPicture().querySelector("source").srcset = this.view.getSourceSrcsetTemplate(evt.target.dataset.imgName);
    this.view.getMainImage().srcset = this.view.getImgSrcsetTemplate(evt.target.dataset.imgName);
    this.view.getMainImage().src = this.view.getImgSrcTemplate(evt.target.dataset.imgName);
    this.view.getMainImage().dataset.imgName = evt.target.dataset.imgName;
  }
}
