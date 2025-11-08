"use client";
import { useState, useEffect } from "react";
import { User } from "@/types";
import { Product } from "@/types";
import Swal from "sweetalert2";

interface EmailModalProps {
  show: boolean;
  onClose: () => void;
  product: Product;
  user: User | null;
}

export default function EmailModal({
  show,
  onClose,
  product,
  user,
}: EmailModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && product) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        message: `Hi, I'm interested in your product "${product.name}".`,
      });
    }
  }, [user, product]);

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: product?.name,
          vendorEmail: product?.vendor?.contactInfo,
          ...form,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire("Success", data.message, "success");
        onClose();
      } else {
        Swal.fire("Error", data.error, "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Pay with Interac-e{" "}
          <span className="text-primary">{product?.name}</span>
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={form.name}
            readOnly
            placeholder="Your Name"
            className="border border-primary rounded-md p-2 bg-gray-100 cursor-not-allowed"
          />
          <input
            type="email"
            value={form.email}
            readOnly
            placeholder="Your Email"
            className="border rounded-md p-2 bg-gray-100 cursor-not-allowed"
          />
          <textarea
            placeholder="Your Message"
            value={form.message}
            readOnly
            className="border rounded-md p-2 h-24 bg-gray-100 cursor-not-allowed"
          />
          <div className="mb-3 text-sm text-gray-700">
            {" "}
            {product?.vendor?.contactInfo ? (
              <p className="text-[18px] text-[#252538] font-inter">
                Please send an Interac-e transfer to <br />
                <a
                  href={`mailto:${product.vendor.contactInfo}`}
                  className="text-primary underline">
                  {product.vendor.contactInfo}
                </a>{" "}
                within 30 mins.
              </p>
            ) : (
              <span className="text-gray-500">Not available</span>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white py-2 cursor-pointer rounded-md font-semibold hover:bg-primary/90 transition disabled:opacity-70">
            {loading ? "Sending..." : "Order Now"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-3 text-gray-600 underline text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
}
