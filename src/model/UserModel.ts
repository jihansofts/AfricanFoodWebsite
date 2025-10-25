import mongoose, { Document, Model, Schema } from "mongoose";

export type UserRole = "Vendor" | "User";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  googleid: string;
}
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Vendor", "User"], default: "User" },
    googleid: { type: String, },
  },
  { timestamps: true, versionKey: false }
);

export const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;
