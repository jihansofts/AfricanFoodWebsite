"use client";
import React, { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import InputBox from "@/common/InputBox";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      Swal.fire("Error", "Please enter your email", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send code");
      Swal.fire(
        "Check your inbox",
        "We sent a 6-digit code (check spam too).",
        "success"
      ).then(() =>
        router.push(`/verify-otp?email=${encodeURIComponent(email.trim())}`)
      );
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
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
              Forgot Password
            </h2>
            <p className="text-[#4E4E4E] text-[16px] font-inter font-normal mb-6">
              Enter your email and we’ll send you a 6-digit OTP to reset your
              password.
            </p>

            <form className="space-y-6" onSubmit={submit}>
              <InputBox
                id="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-2xl font-semibold hover:bg-primary/90 transition-colors cursor-pointer text-[16px] font-inter flex justify-center items-center disabled:opacity-50">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending code...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          </div>

          {/* Right: Illustration */}
          <div className="relative flex items-center justify-center rounded-l-3xl overflow-hidden">
            <Image
              src="/images/joinplatform.png"
              width={685}
              height={700}
              alt="Forgot Illustration"
              className="object-cover w-full h-full min-h-[600px]"
            />
            <div className="absolute bg-[#461500]/60 text-center text-white px-6 py-4 rounded-xl">
              <h3 className="text-[24px] font-sans font-semibold">
                <span className="text-primary">Reset Access</span> in a few
                steps
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
