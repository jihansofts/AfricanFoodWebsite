"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Swal from "sweetalert2";
import InputBox from "./InputBox";

export default function LoginModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleLoginGoogle = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("google", { callbackUrl: "/auth/callback" });
    setShowModal(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter both email and password.",
      });
      return;
    }

    // Optional email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      localStorage.setItem("user", data.user);

      if (!res.ok || data.error) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.error || "Invalid credentials. Please try again.",
        });
        return;
      }

      // ✅ Save user info in AuthContext
      if (data.user) {
        login(data.user); // <-- this updates context + localStorage
      }

      // ✅ Optional: save token in localStorage for API requests
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${data.user?.name || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      setShowModal(false);

      // ✅ Redirect based on role
      if (data.user?.role === "vendor") {
        window.location.href = "/vendor/create-product-vendor";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  return (
    <>
      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <motion.div
              className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}>
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute cursor-pointer top-3 curosr-pointer right-3 text-gray-400 hover:text-gray-600">
                ✕
              </button>

              {/* Header */}
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Login Account
              </h2>

              {/* Google Sign-in */}
              <button
                onClick={handleLoginGoogle}
                className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition-all">
                <Image
                  src="/images/google.png"
                  alt="Google"
                  className="w-5 h-5"
                  width={20}
                  height={20}
                />
                <span className="font-medium text-gray-700">
                  Continue with Google
                </span>
              </button>

              <div className="flex items-center my-5">
                <hr className="flex-grow border-gray-300" />
                <span className="text-gray-400 text-sm mx-3">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              {/* Manual Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <InputBox
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id={"email"}
                  label={"Email"}
                />
                <InputBox
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  label="Password"
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-2xl font-semibold hover:bg-text transition-colors cursor-pointer text-[16px] font-inter flex justify-center">
                  Login
                </button>
              </form>
              <p className="text-center text-[16px] text-text font-normal font-inter mt-4">
                Don&apos;t have an account?{" "}
                <b
                  onClick={() => setShowModal(false)}
                  className="text-primary cursor-pointer underline font-medium">
                  Sign up
                </b>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
