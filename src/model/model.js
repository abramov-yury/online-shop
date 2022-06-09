export class Model {
  constructor() {
    this.products = null;
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

  getAllProducts() {
    return this.products;
  }

}
