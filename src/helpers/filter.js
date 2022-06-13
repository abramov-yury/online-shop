import { serverCategories } from "./adapter";

export const Elements = {
  form: "filter-form",
  slider: "range",
};

export const filterCategory = (products, category) => {
  return Array.from(products).filter((item) => item.category === serverCategories[category]);
};
