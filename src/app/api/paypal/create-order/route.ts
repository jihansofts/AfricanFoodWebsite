import { paypalClient } from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { packageType } = await req.json();

  const packages: Record<string, { price: number; listings: number }> = {
    standard: { price: 4.99, listings: 3 },
    premium: { price: 24.99, listings: 6 },
    enterprise: { price: 49.99, listings: 12 },
  };

  const selectedPackage = packages[packageType.toLowerCase()];
  if (!selectedPackage)
    return NextResponse.json(
      { error: "Invalid package type" },
      { status: 400 }
    );

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: selectedPackage.price.toFixed(2),
        },
        description: `${packageType} Package - ${selectedPackage.listings} Listings`,
      },
    ],
  });

  const order = await paypalClient().execute(request);
  return NextResponse.json({ id: order.result.id });
}
