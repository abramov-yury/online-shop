import { filterCategory } from "../helpers/filter";
import { CategoryType } from "../helpers/const";

export class Model {
  constructor() {
    this.products = null;
    this.category = null;
  }

  async setProducts(url) {

    const response = await fetch(url);

    if(response.ok) {
      this.products = await response.json();
      return Array.from(this.products);
    } else {
      return response.status;
    }

  }

  setCategory(category) {
    this.category = category;
  }

  getCategory() {
    return this.category;
  }

  getAllProducts() {
    return Array.from(this.products);
  }

  getEstate() {
    return filterCategory(this.products, CategoryType.ESTATE);
  }

  getLaptops() {
    return filterCategory(this.products, CategoryType.LAPTOPS);
  }

  getCamera() {
    return filterCategory(this.products, CategoryType.CAMERA);
  }

  getCars() {
    return filterCategory(this.products, CategoryType.CARS);
  }

}
