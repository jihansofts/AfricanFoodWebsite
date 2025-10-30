"use client";
import { useState } from "react";

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
    if (!number.trim()) return alert("Please enter your WhatsApp number");
    setLoading(true);
    const res = await fetch("/api/auth/userupdate", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, whatsappNumber: number }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      onSaved(number);
      onClose();
      alert("WhatsApp number saved successfully!");
    } else {
      alert(data.error || "Error saving WhatsApp number");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Add your WhatsApp number
        </h2>
        <input
          type="text"
          placeholder="+234 000 000 0000"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-2 mb-4"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-400">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-60">
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
