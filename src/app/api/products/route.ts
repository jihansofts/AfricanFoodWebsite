import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserModel from "@/model/UserModel";
import ProductModel from "@/model/ProductModel";

export async function POST(req: Request) {
  await connectDB();

  const { userId, name, description, price, category, imageUrl } =
    await req.json();

  const user = await UserModel.findById(userId);
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Count user's current products
  const currentCount = await ProductModel.countDocuments({ vendorId: userId });

  if (currentCount >= user.productLimit) {
    return NextResponse.json(
      { error: "Product limit reached. Please upgrade your package." },
      { status: 403 }
    );
  }

  const product = await ProductModel.create({
    name,
    description,
    price,
    category,
    imageUrl,
    vendorId: userId,
  });

  return NextResponse.json(product, { status: 201 });
}
