import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import UserModel from "@/model/UserModel";
import ProductModel from "@/model/ProductModel";
import cloudinary from "@/lib/cloudinary";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    await connectDB();
    const products = await ProductModel.find({}).populate("vendorId");
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products", details: error },
      { status: 500 }
    );
  }
}
