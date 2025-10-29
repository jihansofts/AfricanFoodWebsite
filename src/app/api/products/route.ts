import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserModel from "@/model/UserModel";
import ProductModel from "@/model/ProductModel";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { userId, name, description, price, category, imageUrl } =
      await req.json();

    const user = await UserModel.findById(userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Count user's current products
    const currentCount = await ProductModel.countDocuments({
      vendorId: userId,
    });
    if (currentCount >= user.productLimit) {
      return NextResponse.json(
        { error: "Product limit reached. Please upgrade your package." },
        { status: 403 }
      );
    }

    // ✅ Upload image to Cloudinary if it's a base64 or file URL
    let uploadedImageUrl = imageUrl;
    if (imageUrl && !imageUrl.startsWith("http")) {
      const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
        folder: "product_images", // you can rename this folder
      });
      uploadedImageUrl = uploadResponse.secure_url;
    }

    // ✅ Create the product
    const product = await ProductModel.create({
      name,
      description,
      price,
      category,
      imageUrl: uploadedImageUrl,
      vendorId: userId,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json(
      { error: "Failed to create product", details: error },
      { status: 500 }
    );
  }
}
