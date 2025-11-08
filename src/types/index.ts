export interface IVendor {
  _id: string;
  contactType?: "whatsapp" | "email" | "phone";
  contactInfo?: string;
  whatsappNumber?: string; // optional if you use old data
}

export interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  contactType?: "whatsapp" | "email" | "phone";
  contactInfo?: string;
  productLimit?: number;
}
export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  vendorId: string; // ✅ vendorId is a string
  createdAt: string;
  updatedAt: string;
  rating?: number;
  vendor?: IVendor; // ✅ vendor is the actual object
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
