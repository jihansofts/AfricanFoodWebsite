import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import UserModel from "@/model/UserModel";

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      password,
      role,
      profileImage,
      contactInfo,
      contactType,
    } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
      profileImage,
      productLimit: 3,
      contactInfo,
      contactType: contactType || "whatsapp",
    });
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          profileImage: newUser.profileImage,
          productLimit: newUser.productLimit,
          contactType: newUser.contactType,
          contactInfo: newUser.contactInfo,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
