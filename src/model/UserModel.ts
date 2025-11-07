import mongoose, { Document, Model, Schema } from "mongoose";

export type UserRole = "vendor" | "customer";
export type PackageType = "free" | "standard" | "premium" | "enterprise";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  profileImage?: string;
  packaged: PackageType;
  contactInfo?: string;
  contactType?: "whatsapp" | "email" | "phone";
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
    profileImage: { type: String },
    productLimit: { type: Number, default: 3 },
    contactType: {
      type: String,
      enum: ["whatsapp", "email", "phone"],
      default: "whatsapp",
    },
    contactInfo: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;
