"use client";

import React, { useState, useCallback, useEffect } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

type PackageKey = "standard" | "premium" | "enterprise";

const PLANS: Array<{
  key: PackageKey;
  name: string;
  listings: number;
  price: number;
  cta: string;
}> = [
  {
    key: "standard",
    name: "Standard",
    listings: 3,
    price: 4.99,
    cta: "Buy This Package",
  },
  {
    key: "premium",
    name: "Premium",
    listings: 6,
    price: 24.99,
    cta: "Buy This Package",
  },
  {
    key: "enterprise",
    name: "Enterprice",
    listings: 12,
    price: 49.99,
    cta: "Buy This Package",
  },
];

export default function PackageCard({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<PackageKey | null>(null);

  const openFor = (pkg: PackageKey) => {
    setSelected(pkg);
    setIsOpen(true);
  };
  const close = useCallback(() => setIsOpen(false), []);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: "USD",
      }}>
      <div className=" w-full bg-white text-neutral-900 flex items-center justify-center ">
        <div className="w-full max-w-6xl px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl text-[#222222] lg:text-[32px] font-sans font-bold mb-3">
              Upgrade Package
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.key}
                className="bg-[#F7F7F7] lg:min-h-[400px] rounded-2xl flex flex-col justify-center items-center  ring-1 ring-black/5 p-6 md:p-8 text-center hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)] transition-shadow">
                <h4 className="text-xl font-semibold mb-6">{plan.name}</h4>

                <div className="mb-6">
                  <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
                    {plan.listings}{" "}
                    <span className="font-extrabold">Listings</span>
                  </div>
                </div>

                <div className="text-3xl md:text-4xl font-extrabold mb-6">
                  ${plan.price.toFixed(2)}
                </div>

                <button
                  onClick={() => openFor(plan.key)}
                  className="mx-auto inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200">
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <button
            aria-label="Close"
            onClick={close}
            className="absolute inset-0 bg-black/50"
          />
          {/* Dialog */}
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-lg font-semibold">Complete your purchase</h5>
              <button
                onClick={close}
                className="text-neutral-500 hover:text-neutral-800">
                ✕
              </button>
            </div>
            <p className="text-sm text-neutral-600 mb-4">
              Package:{" "}
              <span className="capitalize font-medium">{selected}</span>
            </p>

            <PayPalButtons
              style={{ layout: "vertical", color: "gold", label: "pay" }}
              createOrder={async () => {
                const res = await fetch("/api/paypal/create-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ packageType: selected }),
                });
                const data = await res.json();
                if (!res.ok)
                  throw new Error(data?.error || "Create order failed");
                return data.id;
              }}
              onApprove={async (data) => {
                const res = await fetch("/api/paypal/capture-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    orderId: data.orderID,
                    userId,
                    packageType: selected,
                  }),
                });
                const result = await res.json();

                if (result.success) {
                  alert(`🎉 Successfully upgraded to ${selected} plan!`);
                  close();
                } else {
                  alert("Payment failed. Please try again.");
                }
              }}
              onError={(err) => {
                console.error(err);
                alert("Payment could not be completed.");
              }}
            />

            <p className="text-xs text-neutral-500 mt-4">
              You may be redirected by PayPal if additional steps are required.
            </p>
          </div>
        </div>
      )}
    </PayPalScriptProvider>
  );
}
