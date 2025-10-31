import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserModel from "@/model/UserModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import ProductModel from "@/model/ProductModel";
import cloudinary from "@/lib/cloudinary";

// GET single product
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const productId = params.id;

    const product = await ProductModel.findById(productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.error("Product fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch product", details: err },
      { status: 500 }
    );
  }
}

// PATCH - Update product
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

    // Validate user & product
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

    // Handle image upload if new image is provided
    let newImageUrl: string | undefined = undefined;
    if (typeof imageUrl === "string" && imageUrl.length) {
      if (imageUrl.startsWith("data:image")) {
        // It's a base64 image, upload to Cloudinary
        const upload = await cloudinary.uploader.upload(imageUrl, {
          folder: "product_images",
        });
        newImageUrl = upload.secure_url;
      } else if (imageUrl.startsWith("http")) {
        // It's already a URL, use as is
        newImageUrl = imageUrl;
      }
    }

    // Build update object
    const update: Record<string, any> = {};
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

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      update,
      { new: true }
    );

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    console.error("Product update error:", err);
    return NextResponse.json(
      { error: "Failed to update product", details: err },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(
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

    // Check if product exists and user owns it
    const product = await ProductModel.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.vendorId.toString() !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    return NextResponse.json(
      { message: "Product deleted successfully", product: deletedProduct },
      { status: 200 }
    );
  } catch (err) {
    console.error("Product delete error:", err);
    return NextResponse.json(
      { error: "Failed to delete product", details: err },
      { status: 500 }
    );
  }
}
