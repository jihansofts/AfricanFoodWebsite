export interface Product {
  id: number;
  title: string;
  jerkImage: string;
  jerkTitle: string;
  image: string;
  rating: number;
  price: number;
}

export interface FoodCategory {
  id: number;
  title: string;
  subTitle: string;
  image: string;
  batch: string;
  bestSaleing: Product[];
  topRated: Product[];
  FetureProducts: Product[];
}

export interface FoodCategoryCardProps {
  datas: FoodCategory[];
}