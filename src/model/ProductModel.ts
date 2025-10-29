import mongoose, { Document, Schema, Model } from "mongoose";

export type ProductCategory = "Nigerian" | "Ghanaian" | "AfricanGroceries";

export interface IProduct extends Document {
  name: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
  vendorId: mongoose.Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Nigerian", "Ghanaian", "AfricanGroceries"],
      required: true,
    },
    imageUrl: { type: String, required: true },
    vendorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, versionKey: false }
);

export const ProductModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;
