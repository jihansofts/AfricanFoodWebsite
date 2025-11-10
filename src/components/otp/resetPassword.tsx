"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import {useSearchParams } from "next/navigation";
import Link from "next/link";
import InputBox from "@/common/InputBox";
import LoginModal from "@/common/LoginModel";

export default function ResetPasswordPage() {
  const [showModal, setShowModal] = useState(false);
  const params = useSearchParams();
  const [email, setEmail] = useState(params.get("email") || "");
  const [otp, setOtp] = useState(params.get("otp") || "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if user opens directly, allow them to paste OTP
    setEmail(params.get("email") || "");
    setOtp(params.get("otp") || "");
  }, [params]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !otp) {
      Swal.fire("Error", "Email and 6-digit OTP are required", "error");
      return;
    }
    if (!password || !confirm) {
      Swal.fire("Error", "Please fill both password fields", "error");
      return;
    }
    if (password !== confirm) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }
    if (password.length < 5) {
      Swal.fire("Error", "Password must be at least 5 characters", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim(),
          newPassword: password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to reset password");

      Swal.fire(
        "Success",
        "Password updated successfully. Please sign in.",
        "success"
      ).then(() => {
        setShowModal(true);
      } );
    } catch (err) {
      Swal.fire("Error",  "Something went wrong", "error");
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
              Set a New Password
            </h2>
            <p className="text-[#4E4E4E] text-[16px] font-inter font-normal mb-6">
              Enter your email, the 6-digit OTP, and your new password.
            </p>

            <form className="space-y-6" onSubmit={submit}>
              <InputBox
                id="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputBox
                id="otp"
                label="6-digit OTP"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOtp(v);
                }}
              />

              <InputBox
                id="password"
                label="New Password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputBox
                id="confirm"
                label="Confirm Password"
                type="password"
                placeholder="Repeat new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-2xl font-semibold hover:bg-primary/90 transition-colors cursor-pointer text-[16px] font-inter flex justify-center items-center disabled:opacity-50">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Updating...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>

            <p className="text-center text-[16px] text-text font-normal font-inter mt-6">
              Back to{" "}
              <Link
                href="/signin"
                className="text-primary cursor-pointer underline font-medium hover:text-primary/80">
                Log in
              </Link>
            </p>
          </div>

          {/* Right: Illustration */}
          <div className="relative flex items-center justify-center rounded-l-3xl overflow-hidden">
            <Image
              src="/images/joinplatform.png"
              width={685}
              height={700}
              alt="Reset Illustration"
              className="object-cover w-full h-full min-h-[600px]"
            />
            <div className="absolute bg-[#461500]/60 text-center text-white px-6 py-4 rounded-xl">
              <h3 className="text-[24px] font-sans font-semibold">
                <span className="text-primary">Almost there—</span> new password
                time
              </h3>
            </div>
          </div>
        </div>
      </div>
      <LoginModal showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
}
