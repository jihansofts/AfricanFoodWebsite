// /auth/password/otp/request/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserModel from "@/model/UserModel";
import { OTPModel } from "@/model/OTPModel";
import { sendOTPEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    console.log("email", email)
    if (!email)
      return NextResponse.json({ error: "Email required" }, { status: 400 });

    await connectDB();
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "If that email exists, OTP sent." });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Expire after 10 min
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Remove old OTPs for same email
    await OTPModel.deleteMany({ email });

    await OTPModel.create({ email, otp, expiresAt });

    await sendOTPEmail(email, otp);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
