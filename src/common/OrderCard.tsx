"use client";
import React from "react";

import { OrderData } from "@/app/rider-order-accept/page";

interface OrderCardProps {
  orderData: OrderData[];
  updateStatus: (id: number, status: string) => void;
}

export default function OrderCard({ orderData, updateStatus }: OrderCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {orderData.map((order) => (
        <div
          key={order.id}
          className="border border-primary rounded-lg p-4 flex justify-between items-center bg-primary/5 shadow-md">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <p className="text-lg font-medium font-inter">Delivering To:</p>
              <p className="text-lg font-medium font-inter">Address:</p>
              <p className="text-lg font-medium font-inter">Product Type:</p>
            </div>
            <div className="space-y-3">
              <p className="text-lg font-normal">{order.deliveringTO}</p>
              <p className="text-lg font-normal">{order.address}</p>
              <p className="text-lg font-normal">{order.productType}</p>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-5">
            <p className="text-[32px] font-sans font-semibold text-primary">
              {order.price.toFixed(2)} CAD
            </p>
            {order.status === "Accept Order" ? (
              <button
                className="border border-primary text-primary text-lg font-inter px-4 py-2 rounded"
                onClick={() => updateStatus(order.id, "Pending")}>
                Accept Order
              </button>
            ) : order.status === "Pending" ? (
              <button
                className="bg-[#FF9D13] text-white px-8 py-2 text-lg font-inter rounded"
                onClick={() => updateStatus(order.id, "Delivered")}>
                Pending
              </button>
            ) : (
              <button
                className="bg-[#008136] text-white px-8 py-2 text-lg font-inter rounded"
                disabled>
                Delivered
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
