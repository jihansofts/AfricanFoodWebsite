"use client";
import React, { useState, useRef } from "react";
import { MdDone } from "react-icons/md";
import Image from "next/image";
import InputBox from "@/common/InputBox";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function RegisterPage() {
  const [accountType, setAccountType] = useState("customer");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checked, setChecked] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("Selected file:", e.target.files[0]);
    }
  };

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left: Form */}
          <div className="w-full  flex flex-col justify-center px-6 sm:px-12 lg:px-20 ">
            <h2 className="lg:text-[30px] md:text-[24px] text-[20px] font-sans font-semibold mb-2">
              Create Account
            </h2>
            <p className="text-[#4E4E4E] text-[16px] font-inter font-normal mb-6">
              Welcome Back! By click the sign up button, you&apos;re agree to
              AfroEats Terms and Service and acknowledge the{" "}
              <a href="#" className="text-primary underline">
                Privacy and Policy
              </a>
            </p>

            {/* Account Type */}
            <div className="flex gap-6 mb-4">
              {["customer", "vendor", "rider"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer">
                  {/* Hidden Radio */}
                  <input
                    type="radio"
                    value={type}
                    checked={accountType === type}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="hidden peer"
                  />

                  {/* Custom Box */}
                  <span
                    className={`w-[17px] h-[16px] flex items-center justify-center rounded-sm border transition-all
          ${
            accountType === type
              ? "bg-primary border-primary text-white"
              : "border-[#4E4E4E] bg-white text-transparent"
          }
        `}>
                    <MdDone />
                  </span>

                  {/* Label Text */}
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
            <form className="space-y-8">
              {/* Input Fields */}
              <InputBox
                id="username"
                label="Name"
                placeholder="@username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputBox
                id="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputBox
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputBox
                id="password"
                label="Confirm Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Terms */}
              <label className="flex items-center gap-2 cursor-pointer">
                {/* Hidden Checkbox */}
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="hidden peer"
                />

                {/* Custom Box */}
                <span
                  className={`w-[17px] h-[16px] flex items-center justify-center rounded-sm border transition-all
          ${
            checked
              ? "bg-primary border-primary text-white"
              : "border-[#4E4E4E] bg-white text-transparent"
          }`}>
                  <MdDone />
                </span>

                {/* Label Text */}
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
                {/* Upload Icon */}
                <div className="mx-auto w-12 h-12 mb-4 flex items-center justify-center bg-primary text-white rounded-full">
                  <FaCloudUploadAlt className="text-2xl" />
                </div>

                {/* Text */}
                <p className="text-primary font-normal font-inter mb-1">
                  Drag & drop or click to{" "}
                  <span className="underline font-bold">
                    Upload Profile Picture
                  </span>{" "}
                </p>

                {/* Hidden File Input */}
                <input
                  title="images only"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-2xl font-semibold hover:bg-text transition-colors cursor-pointer text-[16px] font-inter ">
                See All Cuisines
              </button>
            </form>

            <p className="text-center text-[16px] text-text font-normal font-inter mt-4">
              Already Have an Account?{" "}
              <a href="/login" className="text-primary underline font-medium">
                Log in
              </a>
            </p>
          </div>

          {/* Right: Illustration */}
          <div className="relative flex items-center justify-center rounded-l-3xl overflow-hidden">
            <Image
              src="/images/joinplatform.png"
              width={685}
              height={700}
              alt="Food Illustration"
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
