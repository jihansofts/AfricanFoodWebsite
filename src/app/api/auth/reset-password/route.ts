import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import {OTPModel} from "@/model/OTPModel";
import UserModel from "@/model/UserModel";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, otp, newPassword } = await req.json();
    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }
    if (newPassword.length < 5) {
      return NextResponse.json(
        { error: "Password must be at least 5 characters" },
        { status: 400 }
      );
    }

    await connectDB();

    const otpDoc = await OTPModel.findOne({ email, otp });
    if (!otpDoc)
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    if (otpDoc.expiresAt < new Date()) {
      await OTPModel.deleteMany({ email });
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await UserModel.updateOne({ email }, { password: hashed });

    await OTPModel.deleteMany({ email }); // single-use OTP

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
