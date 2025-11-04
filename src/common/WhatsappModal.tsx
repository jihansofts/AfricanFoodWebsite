"use client";
import { useState } from "react";
import Swal from "sweetalert2";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSaved: (newNumber: string) => void;
}

export default function WhatsappModal({
  isOpen,
  onClose,
  userId,
  onSaved,
}: Props) {
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!number.trim())
      return Swal.fire("Error", "Enter a valid number", "error");
    // Basic validation for WhatsApp number format
    const whatsappRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanNumber = number.replace(/\s/g, "");

    if (!whatsappRegex.test(cleanNumber)) {
      return Swal.fire(
        "Error",
        "Please enter a valid WhatsApp number",
        "error"
      );
    }

    setLoading(true);
    const res = await fetch("/api/auth/userupdate", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, whatsappNumber: cleanNumber }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      onSaved(cleanNumber);
      onClose();
      Swal.fire("Success", "WhatsApp number saved", "success");
    } else {
      Swal.fire(
        "Error",
        data.error || "Failed to save WhatsApp number",
        "error"
      );
    }
  };

  // Prevent closing the modal by clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      // Optional: Show message that WhatsApp number is required
      Swal.fire(
        "Info",
        "WhatsApp number is required to create products",
        "info"
      );
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Add your WhatsApp number
        </h2>
        <p className="text-gray-600 text-center mb-4">
          WhatsApp number is required to create products
        </p>
        <input
          type="text"
          placeholder="+234 000 000 0000"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-2 mb-4"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              Swal.fire(
                "Info",
                "WhatsApp number is required to create products",
                "info"
              );
            }}
            className="px-4 cursor-pointer py-2 rounded-lg border border-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-primary cursor-pointer text-white px-4 py-2 rounded-lg disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
