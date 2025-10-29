// /app/api/paypal/create-order/route.ts
import { paypalClient } from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

const PACKAGES: Record<
  string,
  { price: number; listings: number; label: string }
> = {
  standard: { price: 4.99, listings: 3, label: "Standard" },
  premium: { price: 24.99, listings: 6, label: "Premium" },
  enterprise: { price: 49.99, listings: 12, label: "Enterprise" },
};

export async function POST(req: Request) {
  try {
    const { packageType } = await req.json();
    if (typeof packageType !== "string") {
      return NextResponse.json(
        { error: "packageType is required" },
        { status: 400 }
      );
    }

    const key = packageType.toLowerCase();
    const selected = PACKAGES[key];
    if (!selected) {
      return NextResponse.json(
        { error: "Invalid package type" },
        { status: 400 }
      );
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          description: `${selected.label} Package - ${selected.listings} Listings`,
          amount: {
            currency_code: "USD",
            value: selected.price.toFixed(2),
            // (optional itemization)
          },
          // optional line items if you want
          // items: [{ name: `${selected.label} Package`, quantity: "1", unit_amount: { currency_code: "USD", value: selected.price.toFixed(2) } }],
        },
      ],
      application_context: {
        brand_name: "Your Brand",
        user_action: "PAY_NOW",
      },
    });

    const order = await paypalClient().execute(request);
    return NextResponse.json({ id: order.result.id });
  } catch (err) {
    console.error("PayPal create-order error:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

// (optional) Reject other methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
