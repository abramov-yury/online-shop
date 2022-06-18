import { CategoryType } from "./const";

export const serverCategories = {
  [CategoryType.ESTATE] : "Недвижимость",
  [CategoryType.LAPTOPS] : "Ноутбук",
  [CategoryType.CAMERA] : "Фотоаппарат",
  [CategoryType.CARS] : "Автомобиль",
};

export const filtersNames = {
  [serverCategories[CategoryType.ESTATE]]: {
    "type": "Тип недвижимости",
    "area": "Площадь, м2",
    "rooms-count": "Количество комнат",
  },
  [serverCategories[CategoryType.LAPTOPS]]: {
    "type": "Тип ноутбука",
    "ram-value": "Объем оперативной памяти",
    "screen-size": "Диагональ экрана",
    "cpu-type": "Тип процессора",
  },
  [serverCategories[CategoryType.CAMERA]]: {
    "type": "Тип фотоаппарата",
    "matrix-resolution": "Разрешение матрицы",
    "supporting": "Разрешение видео",
  },
  [serverCategories[CategoryType.CARS]]: {
    "body-type": "Тип кузова",
    "transmission": "Коробка передач",
    "production-year": "Год выпуска",
  },
};

export const filtersValues = {
  [serverCategories[CategoryType.ESTATE]]: {
    flat: "Квартира",
    house: "Дом",
    apartment: "Апартаменты",
  },
  [serverCategories[CategoryType.LAPTOPS]]: {
    i3: "Intel Core i3",
    i5: "Intel Core i5",
    i7: "Intel Core i7",
    4: "4 Гб",
    8: "8 Гб",
    16: "16 Гб",
    ultrabook: "Ультрабук",
    home: "Домашний ноутбук",
    gaming: "Игровой ноутбук",
  },
  [serverCategories[CategoryType.CAMERA]]: {
    "slr": "Зеркальный",
    "digital": "Цифровой",
    "mirrorless": "Беззеркальный",
    "hd": "HD",
    "full-hd": "Full HD",
    "4k": "4K",
    "5k": "5K",
  },
  [serverCategories[CategoryType.CARS]]: {
    auto: "Автомат",
    mechanic: "Механическая",
    sedan: "Седан",
    universal: "Универсал",
    hatchback: "Хэтчбэк",
    suv: "Внедорожник",
    coupe: "Купе",
  },
};
