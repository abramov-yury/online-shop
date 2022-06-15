export const productsImagesPath = "https://raw.githubusercontent.com/abramov-yury/my-assets/main/online-shop/";

export const PRODUCTS_NAVIGATION_LIMIT = 5;

export const getImagesProduct = (arr) => {
  const images = [];
  for(let i = 0; i < arr.length; i++) {
    images.push(arr[i]);
    if(images.length >= PRODUCTS_NAVIGATION_LIMIT) break;
  }
  return images;
};
