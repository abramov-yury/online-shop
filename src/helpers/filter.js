import { serverCategories } from "./adapter";

export const Elements = {
  form: "filter-form",
  slider: "range",
};

export const filterCategory = (products, category) => {
  return Array.from(products).filter((item) => item.category === serverCategories[category]);
};

const FILTER_DATA = require("../template/filter.json");
let FORM_DATA = null;
const setFormData = (form = document.forms[Elements.form]) => {
  FORM_DATA = new FormData(form);
};

const getProductsPriceRanges = () => {
  return FORM_DATA.get(Elements.slider).split(", ");
};

const checkPrice = (product) => {
  const price = product["price"];
  return (price >= getProductsPriceRanges()[0] && price <= getProductsPriceRanges()[1]);
};

const checkProductType = (type, arr) => {
  const isCheck = arr.some((item) => FORM_DATA.get(item.name));
  const check = (item) => FORM_DATA.get(item.name) && type === item.value;
  return !isCheck || arr.some(check);
};

const checkEstateArea = (area) => {
  return area >= FORM_DATA.get(FILTER_DATA.estate_area_name);
};

const checkEstateRoomsCount = (count) => {
  const value = FORM_DATA.get(FILTER_DATA.estate_rooms.name);
  if(!value || value === FILTER_DATA.estate_rooms.items[0].value) return true;
  if(value === FILTER_DATA.estate_rooms.items[5].value && count >= 5) return true;
  return Number(value) === count;
};

const checkRAMLaptop = (value) => {
  const ram = FORM_DATA.get(FILTER_DATA.laptop_ram.name);
  return !ram || ram === FILTER_DATA.laptop_ram.items[0].value || Number(ram) === value;
};

const checkDiagonalDisplay = (value) => {
  const diagonal = FORM_DATA.get(FILTER_DATA.laptop_screen_size.name);
  return !diagonal || diagonal === FILTER_DATA.laptop_screen_size.items[0].value || Number(diagonal) === Math.floor(value);
};

const checkCameraMatrix = (matrix) => {
  const value = FORM_DATA.get(FILTER_DATA.camera_matrix_resolution.name);
  return value === FILTER_DATA.camera_matrix_resolution.items[0].value || matrix >= Number(value);
};

const checkCameraVideo = (resolution) => {
  const value = FORM_DATA.get(FILTER_DATA.camera_video_resolution.name);
  return value === FILTER_DATA.camera_video_resolution.items[0].value || resolution === value;
};

const checkCarProductionYear = (year) => {
  const value = FORM_DATA.get(FILTER_DATA.car_year.name);
  return value === FILTER_DATA.car_year.items[0].value || year >= Number(value);
};

const checkCarTransmission = (transmission) => {
  const value = FORM_DATA.get(FILTER_DATA.car_transmission.name);
  return !value || value === FILTER_DATA.car_transmission.items[0].value || transmission === value;
};

//filters
export const filterByAll = (products) => {
  setFormData();

  return products.filter((item) => checkPrice(item));
};

export const filterByEstate = (products) => {
  setFormData();

  return products.filter((item) => (
    checkPrice(item)
    && checkProductType(item.filters["type"], FILTER_DATA.estate_type.items)
    && checkEstateArea(item.filters["area"])
    && checkEstateRoomsCount(item.filters["rooms-count"])
  ));
};

export const filterByLaptops = (products) => {
  setFormData();

  return products.filter((item) => (
    checkPrice(item)
    && checkProductType(item.filters["type"], FILTER_DATA.laptop_type.items)
    && checkProductType(item.filters["cpu-type"], FILTER_DATA.laptop_cpu.items)
    && checkRAMLaptop(item.filters["ram-value"])
    && checkDiagonalDisplay(item.filters["screen-size"])
  ));
};

export const filterByCamera = (products) => {
  setFormData();

  return products.filter((item) => (
    checkPrice(item)
    && checkProductType(item.filters["type"], FILTER_DATA.camera_type.items)
    && checkCameraMatrix(item.filters["matrix-resolution"])
    && checkCameraVideo(item.filters["supporting"])
  ));
};

export const filterByCars = (products) => {
  setFormData();

  return products.filter((item) => (
    checkPrice(item)
    && checkProductType(item.filters["body-type"], FILTER_DATA.car_body_type.items)
    && checkCarProductionYear(item.filters["production-year"])
    && checkCarTransmission(item.filters["transmission"])
  ));
};
