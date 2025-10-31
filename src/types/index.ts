export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  vendorId: string;
  createdAt: string;
  updatedAt: string;
  rating?: number;
}

export interface Category {
  id: number;
  category: string;
  subTitle: string;
  image: string;
  batch: string;
  bestSaleing: Product[];
  topRated: Product[];
  FetureProducts: Product[];
}

export interface ApiResponse {
  products: Product[];
}
