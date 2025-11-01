import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import UserModel from "@/model/UserModel";
import ProductModel, { IProduct } from "@/model/ProductModel";
import cloudinary from "@/lib/cloudinary";
import { withRole } from "@/middleware/checkRole"; // ✅ our JWT-based role checker

// ✅ Helper to unwrap params for Next.js 15 compatibility
async function getParams(context: { params: Promise<{ id: string }> }) {
  return await context.params;
}

// ✅ GET - Fetch single product
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await getParams(context);
    await connectDB();

    const product = await ProductModel.findById(id);
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

// ✅ PATCH - Update product (vendor-only)
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 🔐 Validate vendor role
    const session = await withRole(["vendor"])(req);
    if (session instanceof NextResponse) return session;

    await connectDB();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await getParams(context);
    const vendorId = session.user.id;
    const { name, price, category, imageUrl } = await req.json();

    // ✅ Find user and product
    const [user, product] = await Promise.all([
      UserModel.findById(vendorId),
      ProductModel.findById(id),
    ]);

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    // ✅ Ownership check
    if (product.vendorId.toString() !== vendorId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✅ Handle image upload
    let newImageUrl: string | undefined;
    if (typeof imageUrl === "string" && imageUrl.length) {
      if (imageUrl.startsWith("data:image")) {
        const upload = await cloudinary.uploader.upload(imageUrl, {
          folder: "product_images",
        });
        newImageUrl = upload.secure_url;
      } else if (imageUrl.startsWith("http")) {
        newImageUrl = imageUrl;
      }
    }

    // ✅ Prepare update object
    const update: Partial<IProduct> = {};
    if (name !== undefined) update.name = name;
    if (price !== undefined) update.price = price;
    if (category !== undefined) update.category = category;
    if (newImageUrl !== undefined) update.imageUrl = newImageUrl;

    if (Object.keys(update).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    console.error("Product update error:", err);
    return NextResponse.json(
      { error: "Failed to update product", details: err },
      { status: 500 }
    );
  }
}

// ✅ DELETE - Remove product (vendor-only)
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 🔐 Validate vendor role
    const session = await withRole(["vendor"])(req);
    if (session instanceof NextResponse) return session;

    await connectDB();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await getParams(context);
    const vendorId = session.user.id;

    // ✅ Find product
    const product = await ProductModel.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // ✅ Ownership check
    if (product.vendorId.toString() !== vendorId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✅ Delete product image from Cloudinary
    if (product.imageUrl) {
      try {
        const publicId = product.imageUrl
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];
        await cloudinary.uploader.destroy(publicId);
        console.log("✅ Cloudinary image deleted:", publicId);
      } catch (cloudErr) {
        console.error("⚠️ Cloudinary image delete failed:", cloudErr);
      }
    }

    // ✅ Delete from DB
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

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
