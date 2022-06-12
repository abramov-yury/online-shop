export const CategoryType = {
  ALL: "all",
  ESTATE: "estate",
  LAPTOPS: "laptops",
  CAMERA: "camera",
  CARS: "cars",
};

export const categories = {
  header: "Категории товаров",
  id: "categories",
  name: "categories",
  items: [
    {value: CategoryType.ALL, title: "Все"},
    {value: CategoryType.ESTATE, title: "Недвижимость"},
    {value: CategoryType.LAPTOPS, title: "Ноутбуки"},
    {value: CategoryType.CAMERA, title: "Фотоаппараты"},
    {value: CategoryType.CARS, title: "Автомобили"},
  ],
};
