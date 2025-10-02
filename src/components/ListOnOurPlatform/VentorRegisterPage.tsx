"use client";
import React, { useState, useRef } from "react";
import { MdDone } from "react-icons/md";
import Image from "next/image";
import InputBox from "@/common/InputBox";
import { FaCloudUploadAlt } from "react-icons/fa";
import Link from "next/link";

// Mapping account type to image, label, button text, and button URL
const accountData = {
  customer: {
    image: "/images/joinplatform.png",
    label: "Name",
    btnName: "See All Cuisines",
    buttonUrl: "/",
  },
  vendor: {
    image: "/images/listourplatform.png",
    label: "Name OF Your Store",
    btnName: "List Your Items",
    buttonUrl: "/listed-product-vendor",
  },
  rider: {
    image: "/images/delivering.png",
    label: "Name",
    btnName: "Start Delivering",
    buttonUrl: "/rider-order-accept",
  },
};

export default function VentorRegisterPage() {
  const [accountType, setAccountType] = useState<
    "customer" | "vendor" | "rider"
  >("vendor");
  const [checked, setChecked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Separate form data per account type
  const [formData, setFormData] = useState({
    customer: { username: "", email: "", password: "", confirmPassword: "" },
    vendor: { username: "", email: "", password: "", confirmPassword: "" },
    rider: { username: "", email: "", password: "", confirmPassword: "" },
  });

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("Selected file:", e.target.files[0]);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [accountType]: {
        ...formData[accountType],
        [field]: value,
      },
    });
  };

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left: Form */}
          <div className="w-full flex flex-col justify-center px-6 sm:px-12 lg:px-20">
            <h2 className="lg:text-[30px] md:text-[24px] text-[20px] font-sans font-semibold mb-2">
              Create Account
            </h2>
            <p className="text-[#4E4E4E] text-[16px] font-inter font-normal mb-6">
              Welcome Back! By clicking the sign up button, you&apos;re agreeing
              to AfroEats Terms and Service and acknowledge the{" "}
              <a href="#" className="text-primary underline">
                Privacy and Policy
              </a>
            </p>

            {/* Account Type Selector */}
            <div className="flex gap-6 mb-4">
              {["customer", "vendor", "rider"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={type}
                    checked={accountType === type}
                    onChange={(e) =>
                      setAccountType(
                        e.target.value as "customer" | "vendor" | "rider"
                      )
                    }
                    className="hidden peer"
                  />

                  <span
                    className={`w-[17px] h-[16px] flex items-center justify-center rounded-sm border transition-all ${
                      accountType === type
                        ? "bg-primary border-primary text-white"
                        : "border-[#4E4E4E] bg-white text-transparent"
                    }`}>
                    <MdDone />
                  </span>

                  <span
                    className={`${
                      accountType === type
                        ? "text-primary text-[15px] font-inter font-medium"
                        : "text-[#4E4E4E] text-[15px] font-inter font-medium"
                    }`}>
                    Become A {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </label>
              ))}
            </div>

            {/* Form */}
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <InputBox
                id="username"
                label={accountData[accountType].label}
                placeholder="@username"
                value={formData[accountType].username}
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
              <InputBox
                id="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={formData[accountType].email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              <InputBox
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={formData[accountType].password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
              <InputBox
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={formData[accountType].confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
              />

              {/* Terms */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="hidden peer"
                />
                <span
                  className={`w-[17px] h-[16px] flex items-center justify-center rounded-sm border transition-all ${
                    checked
                      ? "bg-primary border-primary text-white"
                      : "border-[#4E4E4E] bg-white text-transparent"
                  }`}>
                  <MdDone />
                </span>
                <span
                  className={`${
                    checked
                      ? "text-primary text-[15px] font-inter font-medium"
                      : "text-[#4E4E4E] text-[15px] font-inter font-medium"
                  }`}>
                  Accept Terms of Service
                </span>
              </label>

              {/* Upload */}
              <div
                onClick={handleClick}
                className="border-2 border-dashed border-primary bg-[#FFF7F4] rounded-lg py-10 px-6 text-center cursor-pointer hover:border-primary transition-colors">
                <div className="mx-auto w-12 h-12 mb-4 flex items-center justify-center bg-primary text-white rounded-full">
                  <FaCloudUploadAlt className="text-2xl" />
                </div>
                <p className="text-primary font-normal font-inter mb-1">
                  Drag & drop or click to{" "}
                  <span className="underline font-bold">
                    Upload Profile Picture
                  </span>{" "}
                </p>
                <input
                  title="Upload Profile Picture"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Button */}
              <Link
                href={accountData[accountType].buttonUrl}
                className="w-full bg-primary text-white py-3 rounded-2xl font-semibold hover:bg-text transition-colors cursor-pointer text-[16px] font-inter flex justify-center">
                {accountData[accountType].btnName}
              </Link>
            </form>

            <p className="text-center text-[16px] text-text font-normal font-inter mt-4">
              Already Have an Account?{" "}
              <Link
                href="/login"
                className="text-primary underline font-medium">
                Log in
              </Link>
            </p>
          </div>

          {/* Right: Illustration */}
          <div className="relative flex items-center justify-center rounded-l-3xl overflow-hidden">
            <Image
              src={accountData[accountType].image}
              width={685}
              height={700}
              alt={`${accountType} Illustration`}
              className="object-cover"
            />
            <div className="absolute bg-[#461500]/60 w-86 text-center h-auto text-white px-6 py-4 rounded-xl">
              <h3 className="text-[24px] font-sans font-semibold">
                <span className="text-primary">Create Account</span> Welcome to
                our community!
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
