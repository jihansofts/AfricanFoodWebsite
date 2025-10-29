"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
  packageType: "standard" | "premium" | "enterprise";
  userId: string;
}

export default function PayPalButton({
  packageType,
  userId,
}: PayPalButtonProps) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
      }}>
      <PayPalButtons
        style={{ layout: "vertical", color: "gold", label: "pay" }}
        createOrder={async () => {
          const res = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ packageType }),
          });
          const data = await res.json();
          return data.id;
        }}
        onApprove={async (data) => {
          const res = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: data.orderID,
              userId,
              packageType,
            }),
          });

          const result = await res.json();
          if (result.success) {
            alert(`🎉 Successfully upgraded to ${packageType} plan!`);
          } else {
            alert("Payment failed. Please try again.");
          }
        }}
      />
    </PayPalScriptProvider>
  );
}
