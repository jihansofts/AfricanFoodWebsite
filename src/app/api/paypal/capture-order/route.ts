// /app/api/paypal/capture-order/route.ts
import { paypalClient } from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";
import UserModel from "@/model/UserModel";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { orderId, userId, packageType } = await req.json();
    if (!orderId || !userId || !packageType)
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );

    const captureReq = new paypal.orders.OrdersCaptureRequest(orderId);
    captureReq.requestBody({ payment_source: { order_id: orderId } as never });
    const capture = await paypalClient().execute(captureReq);

    if (capture.result.status !== "COMPLETED")
      return NextResponse.json(
        { success: false, error: "Payment not completed" },
        { status: 400 }
      );

    // ✅ Update user safely
    const newLimits = {
      standard: 3,
      premium: 6,
      enterprise: 12,
    };

    // normalize and narrow the packageType so TS can safely index newLimits
    const pkg = String(packageType).toLowerCase() as
      | "standard"
      | "premium"
      | "enterprise";

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          packaged: pkg,
          productLimit: newLimits[pkg] ?? 3,
        },
      },
      { new: true, runValidators: true }
    );
    console.log(user, newLimits[pkg]);

    return NextResponse.json({ success: true, status: capture.result.status });
  } catch (err) {
    console.error("Capture error:", err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
