export const SortingValue = {
  POPULAR: "popular",
  CHEAP: "cheap",
  NEW: "new",
};

export const RESULTS_FORM_NAME = "results-form";

export const RESULTS_SORTING = {
  "legend": "Показать сначала:",
  "name": "results-sorting",
  "items": [
    {"label": "Популярные", "value": "popular", "id": "sort-popular", "checked": true},
    {"label": "Дешёвые", "value": "cheap", "id": "sort-cheap"},
    {"label": "Новые", "value": "new", "id": "sort-new"},
  ],
};

const sortById = (a, b) => a["id"] - b["id"];
const sortByPrice = (a, b) => a["price"] - b["price"];
const sortByDate = (a, b) => b["publish-date"] - a["publish-date"];

export const sortProducts = (value, products) => {
  const results = Array.from(products);
  switch (value) {
    case SortingValue.POPULAR:
      return products.sort(sortById);
    case SortingValue.CHEAP:
      return results.sort(sortByPrice);
    case SortingValue.NEW:
      return results.sort(sortByDate);
  }
};
