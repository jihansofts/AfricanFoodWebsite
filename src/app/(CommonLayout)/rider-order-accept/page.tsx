"use client";

import OrderCard from "@/common/OrderCard";
import React, { useState } from "react";

export interface OrderData {
  id: number;
  deliveringTO: string;
  address: string;
  productType: string;
  price: number;
  status: string;
}

export default function Page() {
  const [orderData, setOrderData] = useState<OrderData[]>([
    {
      id: 2032012010,
      deliveringTO: "SK Rifat",
      address: "56 Anthony Enahoro St",
      productType: "Nigerian Food",
      price: 5,
      status: "Pending",
    },
    {
      id: 2032013010,
      deliveringTO: "Jane Doe",
      address: "120 Bourdillon Rd",
      productType: "Nigerian Food",
      price: 8,
      status: "Delivered",
    },
    {
      id: 2032213010,
      deliveringTO: "John Smith",
      address: "45 Ikoyi St",
      productType: "Nigerian Food",
      price: 7,
      status: "Accept Order",
    },
    {
      id: 2232013010,
      deliveringTO: "Mary Johnson",
      address: "12 Lagos Ave",
      productType: "Nigerian Food",
      price: 6,
      status: "Accept Order",
    },
    {
      id: 2232023010,
      deliveringTO: "Ali Khan",
      address: "78 Victoria Island",
      productType: "Nigerian Food",
      price: 10,
      status: "Accept Order",
    },
    {
      id: 2232033010,
      deliveringTO: "Fatima Yusuf",
      address: "34 Marina Rd",
      productType: "Nigerian Food",
      price: 9,
      status: "Accept Order",
    },
  ]);

  const acceptedOrders = orderData.filter(
    (order) => order.status !== "Accept Order"
  );
  const newOrders = orderData.filter(
    (order) => order.status === "Accept Order"
  );

  const updateStatus = (id: number, newStatus: string) => {
    setOrderData(
      orderData.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  
  return (
    <main className="bg-background p-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-[32px] font-bold mb-4 font-sans">
            Accepted Orders
          </h1>
          <OrderCard orderData={acceptedOrders} updateStatus={updateStatus} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-[32px] font-bold mb-4 font-sans">
            New Orders
          </h1>
          <OrderCard orderData={newOrders} updateStatus={updateStatus} />
        </div>
      </div>
    </main>
  );
}
