import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ProductModel from "@/model/ProductModel";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const vendorId = searchParams.get("vendorId"); // user filter
    const category = searchParams.get("category"); // category filter

    // Build dynamic filter
    const filter: { vendorId?: string; category?: string } = {};
    if (vendorId) filter.vendorId = vendorId;
    if (category) filter.category = category;

    // Fetch products
    const products = await ProductModel.find(filter);

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", details: error },
      { status: 500 }
    );
  }
}
