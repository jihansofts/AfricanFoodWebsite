"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function RegisterPage() {
  const [accountType, setAccountType] = useState("customer");

  return (
    <section className="flex min-h-screen">
      {/* Left: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 bg-white">
        <h2 className="text-2xl font-semibold mb-2">Create Account</h2>
        <p className="text-gray-600 text-sm mb-6">
          Welcome Back! By clicking the sign-up button, you agree to AfroEats{" "}
          <a href="#" className="text-orange-500 underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-orange-500 underline">
            Privacy Policy
          </a>
          .
        </p>

        {/* Account Type */}
        <div className="flex gap-4 mb-4">
          {["customer", "vendor", "rider"].map((type) => (
            <label
              key={type}
              className={`flex items-center gap-2 cursor-pointer ${
                accountType === type ? "text-orange-500 font-medium" : ""
              }`}>
              <input
                type="radio"
                value={type}
                checked={accountType === type}
                onChange={(e) => setAccountType(e.target.value)}
              />
              Become a {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="@username"
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="password"
            placeholder="Re-type password"
            className="w-full border rounded-lg px-4 py-2"
          />

          {/* Terms */}
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" /> Accept Terms of Service
          </label>

          {/* Upload */}
          <div className="border-2 border-dashed rounded-lg py-6 text-center">
            <p className="text-gray-500 mb-2">Drag & drop or click to</p>
            <a href="#" className="text-orange-500 font-medium">
              Upload Profile Picture
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600">
            See All Cuisines
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already Have an Account?{" "}
          <a href="/login" className="text-orange-500 font-medium">
            Log in
          </a>
        </p>
      </div>

      {/* Right: Illustration */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-100 items-center justify-center rounded-l-3xl overflow-hidden">
        <Image
          src="/images/food-illustration.png"
          alt="Food Illustration"
          fill
          className="object-cover"
        />
        <div className="absolute bg-black/50 text-white px-6 py-4 rounded-xl">
          <h3 className="text-lg font-semibold">Create Account</h3>
          <p>Welcome to our community!</p>
        </div>
      </div>
    </section>
  );
}

