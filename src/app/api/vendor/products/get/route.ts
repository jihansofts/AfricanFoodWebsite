import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ProductModel from "@/model/ProductModel";
import UserModel, { IUser } from "@/model/UserModel";

// 🧠 Simple in-memory vendor cache (key = vendorId)
const vendorCache = new Map<string, Partial<IUser>>();

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const vendorId = searchParams.get("vendorId");
    const category = searchParams.get("category");

    // Build dynamic filter
    const filter: { vendorId?: string; category?: string } = {};
    if (vendorId) filter.vendorId = vendorId;
    if (category) filter.category = category;

    // Fetch products
    const products = await ProductModel.find(filter).lean();

    // Collect unique vendor IDs not already cached
    const vendorIdsToFetch = [
      ...new Set(products.map((p) => p.vendorId?.toString())),
    ].filter((id) => id && !vendorCache.has(id));

    // Fetch only new vendors from DB
    if (vendorIdsToFetch.length > 0) {
      const freshVendors = await UserModel.find(
        { _id: { $in: vendorIdsToFetch } },
        { contactType: 1, contactInfo: 1 }
      ).lean();

      // Store in cache
      freshVendors.forEach((v) =>
        vendorCache.set(v._id.toString(), v as unknown as Partial<IUser>)
      );

      // Optionally: keep cache small (prevent memory bloat)
      if (vendorCache.size > 1000) {
        vendorCache.clear();
        console.log("🧹 Vendor cache cleared to free memory");
      }
    }

    // Merge vendor info from cache
    const productsWithVendors = products.map((p) => ({
      ...p,
      vendor: vendorCache.get(p.vendorId?.toString()) || null,
    }));

    return NextResponse.json(
      { products: productsWithVendors },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details:
          error instanceof Error
            ? { message: error.message, stack: error.stack }
            : error,
      },
      { status: 500 }
    );
  }
}
