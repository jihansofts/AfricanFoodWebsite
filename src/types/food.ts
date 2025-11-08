export interface IVendor {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  contactInfo?: string;
  productLimit?: number;
}
export interface Product {
  id: number;
  title: string;
  jerkImage: string;
  jerkTitle: string;
  image: string;
  vendorId: IVendor;
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
