import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserModel from "@/model/UserModel";
import ProductModel from "@/model/ProductModel";
import cloudinary from "@/lib/cloudinary";
import { withRole } from "@/middleware/checkRole";

export async function POST(req: Request) {
  try {
    const session = await withRole(["vendor"])(req);
    console.log("session log", session);
    // ❌ session might be a NextResponse on error — handclgle that first
    if (session instanceof NextResponse) return session;

    await connectDB();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const vendorId = session.user.id;
    const body = await req.json();
    const { name, price, category, imageUrl } = body;

    // 1️⃣ Validate input
    if (!vendorId || !name || !price || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2️⃣ Find user
    const user = await UserModel.findById(vendorId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3️⃣ Check user’s product limit
    const currentCount = await ProductModel.countDocuments({
      vendorId: user._id,
    });
    if (currentCount >= user.productLimit) {
      return NextResponse.json(
        { error: "Product limit reached. Please upgrade your package." },
        { status: 403 }
      );
    }

    // 4️⃣ Upload image to Cloudinary (if needed)
    let uploadedImageUrl = imageUrl;
    if (imageUrl && !imageUrl.startsWith("http")) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
          folder: "product_images",
          transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
        });
        uploadedImageUrl = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload failed:", uploadError);
        return NextResponse.json(
          { error: "Image upload failed", details: uploadError },
          { status: 500 }
        );
      }
    }

    // 5️⃣ Create the product
    const product = await ProductModel.create({
      name,
      price,
      category,
      imageUrl: uploadedImageUrl,
      vendorId: user._id,
    });

    // 6️⃣ Decrease product limit (optional)
    if (user.productLimit > 0) {
      user.productLimit -= 1;
      await user.save();
    }

    // 7️⃣ Send response
    return NextResponse.json(
      {
        message: "Product created successfully",
        product,
        remainingLimit: user.productLimit,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json(
      { error: "Failed to create product", details: error },
      { status: 500 }
    );
  }
}
