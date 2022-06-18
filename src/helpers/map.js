import Marker from "../assets/img/icons/pin.svg";

const OSM_ATTRIBUTION = "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OSM</a>";

const tile = {
  img: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  attribution: OSM_ATTRIBUTION,
};

const icon = {
  iconUrl: Marker,
  iconSize: [34, 34],
};

const Color = {
  GRAY: "#666666",
};

const controlZoom = {
  zoomInText: (
    `<svg style="transform: translate(-1px, 1px)" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" role="presentation">
       <g>
        <rect width="16" height="4" fill=${Color.GRAY} transform="translate(0, 6)"/>
        <rect width="16" height="4" fill=${Color.GRAY} transform="rotate(90) translate(0, -10)"/>
      </g>
    </svg>`
  ),
  zoomOutText: (
    `<svg style="transform: translate(-1px, 1px)" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" role="presentation">
      <rect width="16" height="4" fill=${Color.GRAY} transform="translate(0, 6)"/>
    </svg>`
  ),
  zoomInTitle: "",
  zoomOutTitle: "",
};

export const Options = {
  ICON: icon,
  TILE: tile,
  CONTROL_ZOOM: controlZoom,
};
