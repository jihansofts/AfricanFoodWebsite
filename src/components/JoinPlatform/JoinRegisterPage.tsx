"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import InputBox from "@/common/InputBox";
// import { signIn } from "next-auth/react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoCheckmarkDoneCircle, IoCloseCircleSharp } from "react-icons/io5";
import { MdDone } from "react-icons/md";

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
};

export default function RegisterPage({
  setShowModal,
}: {
  setShowModal: (val: boolean) => void;
}) {
  const [accountType, setAccountType] = useState<"customer" | "vendor">(
    "customer"
  );
  const [checked, setChecked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [base64String, setBase64String] = React.useState<string>("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customer: { name: "", email: "", password: "", confirmPassword: "" },
    vendor: { name: "", email: "", password: "", confirmPassword: "" },
  });

  // File Upload Handler
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        Swal.fire("Error", "Please select an image file", "error");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire("Error", "Image size should be less than 5MB", "error");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64String(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove uploaded image
  const removeImage = () => {
    setBase64String("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Input Handler
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [accountType]: {
        ...prev[accountType],
        [field]: value,
      },
    }));
  };

  // Form Validation
  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData[accountType];

    if (!name || !email || !password || !confirmPassword) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return false;
    }

    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return false;
    }

    if (password.length < 5) {
      Swal.fire(
        "Error",
        "Password must be at least 6 characters long",
        "error"
      );
      return false;
    }

    if (!checked) {
      Swal.fire("Error", "Please accept the Terms of Service", "error");
      return false;
    }

    return true;
  };

  // ✅ Submit Handler (Main Registration Logic)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData[accountType].name,
          email: formData[accountType].email,
          password: formData[accountType].password,
          role: accountType,
          profileImage:
            base64String ||
            "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.error || "Registration failed", "error");
        return;
      }

      Swal.fire({
        title: "Success!",
        text: "Account created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        setShowModal(true);
      });
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    } finally {
      setLoading(false);
    }
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
            <div className="flex gap-6 mb-6">
              {["customer", "vendor"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={type}
                    checked={accountType === type}
                    onChange={(e) =>
                      setAccountType(e.target.value as "customer" | "vendor")
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

            {/* Google Signup - Uncomment if needed */}
            {/* <div className="space-y-8">
              <button
                onClick={handleGoogleSignIn}
                className="w-full border border-[#E7E7E7] rounded-[10px] px-4 py-3 my-4 font-semibold hover:bg-gray-100 transition-colors cursor-pointer text-[16px] font-inter flex justify-center items-center gap-2"
              >
                <Image
                  src="/images/google.png"
                  alt="Google Icon"
                  width={20}
                  height={20}
                />
                Sign Up with Google
              </button>
            </div> */}

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <InputBox
                id="username"
                label={accountData[accountType].label}
                placeholder="@username"
                value={formData[accountType].name}
                onChange={(e) => handleInputChange("name", e.target.value)}
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
              {/* Terms Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer mt-6">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="hidden peer"
                />

                <span
                  className={`w-[17px] h-[16px] flex items-center justify-center rounded-sm border transition-all flex-shrink-0 mt-0.5 ${
                    checked
                      ? "bg-primary border-primary text-white"
                      : "border-[#4E4E4E] bg-white text-transparent"
                  }`}>
                  <MdDone />
                </span>

                <span
                  className={`text-left ${
                    checked
                      ? "text-primary text-[14px] font-inter font-medium"
                      : "text-primary text-[14px] font-inter font-medium"
                  }`}>
                  Accept Terms of Service
                </span>
              </label>

              {/* Profile Picture Upload with Preview */}
              <div className="space-y-4">
                {/* <label className="block text-lg font-inter font-medium text-gray-700">
                  Profile Picture {base64String && "✓"}
                </label> */}

                {base64String ? (
                  // Image Preview
                  <div className="border-2 border-dashed border-primary bg-[#FFF7F4] rounded-lg p-4">
                    <div className="relative w-full max-w-xs mx-auto">
                      <div className="relative aspect-square w-full max-w-[200px] mx-auto rounded-lg overflow-hidden border-2 border-primary">
                        <Image
                          src={base64String}
                          alt="Profile preview"
                          fill
                          className="object-cover"
                        />
                        {/* Remove image button */}
                        <button
                          title="button"
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors">
                          <IoCloseCircleSharp size={16} />
                        </button>
                      </div>
                      <div className="mt-3 text-center">
                        <button
                          type="button"
                          onClick={handleClick}
                          className="text-primary hover:text-primary/80 font-medium text-sm underline">
                          Change Image
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Upload Area
                  <div
                    onClick={handleClick}
                    className="border-2 border-dashed border-primary bg-[#FFF7F4] rounded-lg py-8 px-6 text-center cursor-pointer hover:border-primary/70 transition-colors">
                    <div className="mx-auto w-12 h-12 mb-4 flex items-center justify-center bg-primary text-white rounded-full">
                      <FaCloudUploadAlt className="text-xl" />
                    </div>
                    <p className="text-primary font-normal font-inter mb-1">
                      Click to{" "}
                      <span className="underline font-bold">
                        Upload Profile Picture
                      </span>
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Supports: JPG, PNG, WEBP • Max: 5MB
                    </p>
                  </div>
                )}

                <input
                  title="Upload Profile Picture"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-2xl font-semibold hover:bg-primary/90 transition-colors cursor-pointer text-[16px] font-inter flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Registation...
                  </>
                ) : (
                  "Registation"
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-[16px] text-text font-normal font-inter mt-6">
              Already Have an Account?{" "}
              <button
                onClick={() => setShowModal(true)}
                className="text-primary cursor-pointer underline font-medium hover:text-primary/80">
                Log in
              </button>
            </p>
          </div>

          {/* Right: Illustration */}
          <div className="relative flex items-center justify-center rounded-l-3xl overflow-hidden">
            <Image
              src={accountData[accountType].image}
              width={685}
              height={700}
              alt={`${accountType} Illustration`}
              className="object-cover w-full h-full min-h-[500px]"
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
