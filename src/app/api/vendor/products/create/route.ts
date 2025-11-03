import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserModel from "@/model/UserModel";
import ProductModel from "@/model/ProductModel";
import cloudinary from "@/lib/cloudinary";
import { withRole } from "@/middleware/checkRole";

export async function POST(req: Request) {
  try {
    // ✅ Step 1: Verify session and role
    const session = await withRole(["vendor"])(req);
    if (session instanceof NextResponse) return session;
    await connectDB();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const vendorId = session.user.id;
    const body = await req.json();
    const { name, price, category, imageUrl } = body;

    // ✅ Step 2: Validate request body
    if (!vendorId || !name || !price || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Step 3: Find vendor
    const user = await UserModel.findById(vendorId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Step 4: Check user’s product limit
    if (user.productLimit <= 0) {
      return NextResponse.json(
        {
          error: "Product limit reached. Please upgrade your package.",
          limit: user.productLimit,
        },
        { status: 403 }
      );
    }

    // ✅ Step 5: Handle Cloudinary upload (if imageUrl is a base64 or local path)
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

    // ✅ Step 6: Create the product
    const product = await ProductModel.create({
      name,
      price,
      category,
      imageUrl: uploadedImageUrl,
      vendorId: user._id,
    });

    // ✅ Step 7: Decrease the user’s product limit by 1
    user.productLimit -= 1;
    await user.save();

    // ✅ Step 8: Return response
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
