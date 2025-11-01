import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id?: string;
      role?: string;
    };
  }

  interface User {
    id?: string;
    role?: string;
    _id?: string; // for Mongoose compatibility
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}
export interface IVendor {
  _id: string;
  whatsappNumber?: string;
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
