"use client";
import { useState } from "react";
import Swal from "sweetalert2";

type ContactType = "whatsapp" | "email" | "phone";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSaved: (newNumber: string, contactType: ContactType) => void;
}

export default function ContactModal({
  isOpen,
  onClose,
  userId,
  onSaved,
}: Props) {
  const [contactValue, setContactValue] = useState("");
  const [contactType, setContactType] = useState<ContactType>("whatsapp");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!contactValue.trim())
      return Swal.fire("Error", `Enter a valid ${contactType}`, "error");

    let regex: RegExp;
    let errorMessage: string;

    switch (contactType) {
      case "whatsapp":
      case "phone":
        regex = /^[\+]?[1-9][\d]{0,15}$/;
        errorMessage = "Please enter a valid phone number";
        break;
      case "email":
        regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errorMessage = "Please enter a valid email address";
        break;
      default:
        regex = /^.+$/;
        errorMessage = "Please enter a valid value";
    }

    const cleanValue = contactValue.replace(/\s/g, "");

    if (!regex.test(cleanValue)) {
      return Swal.fire("Error", errorMessage, "error");
    }

    setLoading(true);
    const res = await fetch("/api/auth/userupdate", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        contactInfo: cleanValue,
        contactType,
      }),
    });
    const data = await res.json();
    console.log("data contact", data);
    setLoading(false);
    if (res.ok) {
      onSaved(cleanValue, contactType);
      onClose();
      Swal.fire("Success", "Contact information saved", "success");
    } else {
      Swal.fire(
        "Error",
        data.error || "Failed to save contact information",
        "error"
      );
    }
  };

  const getInputPlaceholder = () => {
    switch (contactType) {
      case "whatsapp":
      case "phone":
        return "+234 000 000 0000";
      case "email":
        return "example@email.com";
      default:
        return "";
    }
  };

  const getInputType = () => {
    switch (contactType) {
      case "email":
        return "email";
      case "whatsapp":
      case "phone":
        return "tel";
      default:
        return "text";
    }
  };

  // Prevent closing the modal by clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      Swal.fire(
        "Info",
        "Contact information is required to create products",
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
          Add your Contact Information
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Contact information is required to create products
        </p>

        {/* Contact Type Radio Buttons */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Type
          </label>
          <div className="flex gap-4">
            {[
              { value: "whatsapp", label: "WhatsApp" },
              { value: "phone", label: "Phone" },
              { value: "email", label: "Email" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  value={option.value}
                  checked={contactType === option.value}
                  onChange={(e) =>
                    setContactType(e.target.value as ContactType)
                  }
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dynamic Input Field */}
        <input
          type={getInputType()}
          placeholder={getInputPlaceholder()}
          value={contactValue}
          onChange={(e) => setContactValue(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-2 mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              Swal.fire(
                "Info",
                "Contact information is required to create products",
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
