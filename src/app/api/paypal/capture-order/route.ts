import { paypalClient } from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserModel from "@/model/UserModel";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { orderId, userId, packageType } = await req.json();

    if (!orderId || !userId || !packageType) {
      return NextResponse.json(
        { error: "Missing orderId, userId, or packageType" },
        { status: 400 }
      );
    }

    // ✅ Create a new PayPal request and send an object body (payment_source required by type)
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    // The PayPal API requires a request body; provide a minimal payment_source and cast to any to satisfy TypeScript.
    request.requestBody({ payment_source: {} } as never);

    // ✅ Execute the capture request
    const capture = await paypalClient().execute(request);

    // ✅ Define package product limits
    const limits: Record<string, number> = {
      free: 3,
      standard: 3,
      premium: 6,
      enterprise: 12,
    };

    // ✅ Find the user
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Update the user package info
    user.packaged = packageType.toLowerCase();
    user.productLimit = limits[packageType.toLowerCase()] || 3;
    await user.save();

    // ✅ Return successful response
    return NextResponse.json({
      success: true,
      message: `Upgraded to ${packageType} package`,
      user,
      captureId: capture?.result?.id || null,
    });
  } catch (err) {
    console.error("PayPal capture error:", err);
    return NextResponse.json(
      { error: "Payment capture failed", details: err },
      { status: 500 }
    );
  }
}
