import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserModel from "@/model/UserModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import ProductModel from "@/model/ProductModel";
import cloudinary from "@/lib/cloudinary";

// Updates selected fields. If imageUrl is a base64 string, it's uploaded to Cloudinary.
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    await connectDB();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const productId = params.id;
    const { name, price, category, imageUrl } = await req.json();

    // 1) Validate user & product
    const [user, product] = await Promise.all([
      UserModel.findById(userId),
      ProductModel.findById(productId),
    ]);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    // Only the owner (vendor) can update
    if (product.vendorId.toString() !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2) If a new image is provided and it's not already a URL, upload to Cloudinary
    let newImageUrl: string | undefined = undefined;
    if (typeof imageUrl === "string" && imageUrl.length) {
      if (!imageUrl.startsWith("http")) {
        const upload = await cloudinary.uploader.upload(imageUrl, {
          folder: "product_images",
        });
        newImageUrl = upload.secure_url;
      } else {
        newImageUrl = imageUrl; // already a hosted URL
      }
    }

    // 3) Build an update object with only provided fields
    const update: Record<string, string> = {};
    if (typeof name !== "undefined") update.name = name;
    if (typeof price !== "undefined") update.price = price;
    if (typeof category !== "undefined") update.category = category;
    if (typeof newImageUrl !== "undefined") update.imageUrl = newImageUrl;

    if (Object.keys(update).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    const updated = await ProductModel.findByIdAndUpdate(productId, update, {
      new: true,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("Product update error:", err);
    return NextResponse.json(
      { error: "Failed to update product", details: err },
      { status: 500 }
    );
  }
}
