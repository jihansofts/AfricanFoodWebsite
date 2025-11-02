"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import InputBox from "./InputBox";
import Link from "next/link";

export default function LoginModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter both email and password.",
      });
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.error || "Invalid credentials. Please try again.",
        });
        setIsLoading(false);
        return;
      }

      if (data.user) {
        login(data.user, data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      if (data.token) {
        localStorage.setItem("token", data?.token);
        localStorage.setItem("role", data?.user?.role);
      }
      console.log("role find", data.user.role);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${data.user?.name || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
        background: "#f8fafc",
        color: "#1e293b",
      });

      setShowModal(false);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 w-full max-w-md shadow-2xl relative border border-slate-200"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-all duration-200 cursor-pointer"
              >
                ✕
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl text-white font-bold">✓</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Welcome Back
                </h2>
                <p className="text-gray-500 text-sm">
                  Sign in to your account to continue
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <InputBox
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    label="Email Address"
                  />
                  <InputBox
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    label="Password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-3 rounded-2xl font-semibold hover:bg-text transition-colors cursor-pointer text-[16px] font-inter flex justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Login...
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Login</span>
                      <span className="text-lg">→</span>
                    </div>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-center text-gray-500 text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href={"/join-our-vendor"}
                    onClick={() => setShowModal(false)}
                    className="text-primary/90 hover:text-primary font-semibold underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
