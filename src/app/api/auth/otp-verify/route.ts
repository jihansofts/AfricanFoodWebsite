import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { OTPModel }from "@/model/OTPModel";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp)
      return NextResponse.json(
        { error: "Email and OTP required" },
        { status: 400 }
      );

    await connectDB();

    const doc = await OTPModel.findOne({ email, otp });
    if (!doc)
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    if (doc.expiresAt < new Date()) {
      await OTPModel.deleteMany({ email });
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    return NextResponse.json({ message: "OTP valid" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
