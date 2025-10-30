import mongoose, { Document, Model, Schema } from "mongoose";

export type UserRole = "vendor" | "customer";
export type PackageType = "free" | "standard" | "premium" | "enterprise";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  googleid?: string;
  profileImage?: string;
  packaged: PackageType;
  whatsappNumber?: string;
  productLimit: number;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    packaged: {
      type: String,
      enum: ["free", "standard", "premium", "enterprise"],
      default: "free",
    },
    role: { type: String, enum: ["vendor", "customer"], default: "customer" },
    googleid: { type: String },
    profileImage: { type: String },
    productLimit: { type: Number, default: 3 },
    whatsappNumber: { type: String, unique: true },
  },
  { timestamps: true, versionKey: false }
);

export const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;
