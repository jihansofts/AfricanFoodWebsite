import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import UserModel from "@/model/UserModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProductModel, { IProduct } from "@/model/ProductModel";
import cloudinary from "@/lib/cloudinary";

// ✅ Helper to unwrap params for Next.js 15 compatibility
async function getParams(context: { params: Promise<{ id: string }> }) {
  return await context.params;
}

// GET single product
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

// PATCH - Update product
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    await connectDB();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await getParams(context);
    const userId = session.user.id;
    const { name, price, category, imageUrl } = await req.json();

    const [user, product] = await Promise.all([
      UserModel.findById(userId),
      ProductModel.findById(id),
    ]);

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    if (product.vendorId.toString() !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    let newImageUrl: string | undefined = undefined;
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

// DELETE product
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    await connectDB();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await getParams(context);
    const userId = session.user.id;

    // Find the product
    const product = await ProductModel.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check ownership
    if (product.vendorId.toString() !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✅ Delete product image from Cloudinary (if exists)
    if (product.imageUrl) {
      try {
        // Cloudinary image URLs typically look like: https://res.cloudinary.com/.../upload/v12345/product_images/filename.jpg
        // We extract the public_id to delete it properly.
        const publicId = product.imageUrl
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0]; // e.g. "product_images/filename"
        await cloudinary.uploader.destroy(publicId);
        console.log("✅ Cloudinary image deleted:", publicId);
      } catch (cloudErr) {
        console.error("⚠️ Cloudinary image delete failed:", cloudErr);
      }
    }

    // Delete product from DB
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
// export async function DELETE(
//   req: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const session = await getServerSession(authOptions);
//     await connectDB();

//     if (!session || !session.user?.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { id } = await getParams(context);
//     const userId = session.user.id;

//     const product = await ProductModel.findById(id);
//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     if (product.vendorId.toString() !== userId) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const deletedProduct = await ProductModel.findByIdAndDelete(id);
//     return NextResponse.json(
//       { message: "Product deleted successfully", product: deletedProduct },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("Product delete error:", err);
//     return NextResponse.json(
//       { error: "Failed to delete product", details: err },
//       { status: 500 }
//     );
//   }
// }
