import { Types } from "mongoose";

export type TProduct = {
  _id: Types.ObjectId;
  name: string;
  brand: string;
  price: number;
  category: string;
  frameMaterial: string;
  quantity: number;
  images: string[];
  specifications: any[]; // TODO: add type
  description: string;
  isDeleted?: boolean;
  totalQuantitySold: number;
  totalRevenue: number;
};
