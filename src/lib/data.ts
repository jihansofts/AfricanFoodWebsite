export interface Product {
  id: number;
  title: string;
  jerkImage: string;
  jerkTitle: string;
  image: string;
  rating: number;
  price: number;
}

export interface Category {
  id: number;
  title: string;
  subTitle: string;
  image: string;
  batch: string;
  bestSaleing: Product[];
  topRated: Product[];
  FetureProducts: Product[];
}

export const datas: Category[] = [
  {
    id: 1,
    title: "Nigerian",
    subTitle:
      "Nigerian food is rich, colorful, and deeply tied to tradition, offering bold flavors and hearty meals.",
    image: "/images/foodcategory/category1.png",
    batch: "100+ Dishes",
    bestSaleing: [
      {
        id: 1,
        title: "Egusi Soup",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c1best1.png",
        rating: 5,
        price: 5.0,
      },
      {
        id: 2,
        title: "Nigerian Jollof Rice",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c1best2.jpg",
        rating: 5,
        price: 5.0,
      },
      {
        id: 3,
        title: "Ayamase",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c1best3.jpg",
        rating: 5,
        price: 5.0,
      },
    ],
    topRated: [
      {
        id: 1,
        title: "Egusi Soup",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c1best1.png",
        rating: 5,
        price: 5.0,
      },
      {
        id: 2,
        title: "Nigerian Jollof Rice",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c1best2.jpg",
        rating: 5,
        price: 5.0,
      },
      {
        id: 3,
        title: "Ayamase",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c1best3.jpg",
        rating: 5,
        price: 5.0,
      },
    ],
    FetureProducts: [
      {
        id: 1,
        title: "Egusi Soup",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c1best1.png",
        rating: 5,
        price: 5.0,
      },
      {
        id: 2,
        title: "Nigerian Jollof Rice",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c1best2.jpg",
        rating: 5,
        price: 5.0,
      },
      {
        id: 3,
        title: "Ayamase",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c1best3.jpg",
        rating: 5,
        price: 5.0,
      },
    ],
  },
  {
    id: 2,
    title: "Ghanaian",
    subTitle:
      "Ghanaian food is rich, colorful, and deeply tied to tradition, offering bold flavors and hearty meals. ",
    image: "/images/foodcategory/category2.jpg",
    batch: "100+ Dishes",
    bestSaleing: [
      {
        id: 1,
        title: "Ghanaian Jollof Rice",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c2best1.png",
        rating: 5,
        price: 5.0,
      },
      {
        id: 2,
        title: "Waakye",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c2best2.jpg",
        rating: 5,
        price: 5.0,
      },
      {
        id: 3,
        title: "Banku & Palm Soup",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c2best3.jpg",
        rating: 5,
        price: 5.0,
      },
    ],
    topRated: [
      {
        id: 1,
        title: "Ghanaian Jollof Rice",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c2best1.png",
        rating: 5,
        price: 5.0,
      },
      {
        id: 2,
        title: "Waakye",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c2best2.jpg",
        rating: 5,
        price: 5.0,
      },
      {
        id: 3,
        title: "Banku & Palm Soup",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c2best3.jpg",
        rating: 5,
        price: 5.0,
      },
    ],
    FetureProducts: [
      {
        id: 1,
        title: "Ghanaian Jollof Rice",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c2best1.png",
        rating: 5,
        price: 5.0,
      },
      {
        id: 2,
        title: "Waakye",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c2best2.jpg",
        rating: 5,
        price: 5.0,
      },
      {
        id: 3,
        title: "Banku & Palm Soup",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c2best3.jpg",
        rating: 5,
        price: 5.0,
      },
    ],
  },
  {
    id: 3,
    title: "African Groceries",
    subTitle:
      "African groceries bring you authentic spices, staples, and flavors straight from the continent.",
    image: "/images/foodcategory/category3.jpg",
    batch: "100+ Dishes",
    bestSaleing: [
      {
        id: 1,
        title: "Garri",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c3best1.png",
        rating: 5,
        price: 5.0,
      },
      {
        id: 2,
        title: "Yams",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c3best2.jpg",
        rating: 5,
        price: 5.0,
      },
      {
        id: 3,
        title: "Banku & Palm Soup",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c3best3.jpg",
        rating: 5,
        price: 5.0,
      },
    ],
    topRated: [
      {
        id: 1,
        title: "Garri",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c3best1.png",
        rating: 5,
        price: 5.0,
      },
      {
        id: 2,
        title: "Yams",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c3best2.jpg",
        rating: 5,
        price: 5.0,
      },
      {
        id: 3,
        title: "Banku & Palm Soup",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c3best3.jpg",
        rating: 5,
        price: 5.0,
      },
    ],
    FetureProducts: [
      {
        id: 1,
        title: "Garri",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c3best1.png",
        rating: 5,
        price: 5.0,
      },
      {
        id: 2,
        title: "Yams",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c3best2.jpg",
        rating: 5,
        price: 5.0,
      },
      {
        id: 3,
        title: "Banku & Palm Soup",
        jerkImage: "/images/foodcategory/pandg.png",
        jerkTitle: "59 Jerk",
        image: "/images/foodcategory/bestsale/c3best3.jpg",
        rating: 5,
        price: 5.0,
      },
    ],
  },
];
