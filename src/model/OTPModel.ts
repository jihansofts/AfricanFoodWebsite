// /model/OTPModel.ts
import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IOTP extends Document {
    email: string;
    otp: string;
    purpose: string;
    expiresAt: Date;
}
const OTPSchema = new Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true }, // store plain text OTP
    purpose: { type: String, default: "password_reset" },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// TTL index — deletes expired OTP automatically
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OTPModel = models.OTP || model<IOTP>("OTP", OTPSchema);
 