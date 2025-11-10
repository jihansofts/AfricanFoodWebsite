"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyOtpPage() {
  const router = useRouter();
  const params = useSearchParams();
  const initialEmail = params.get("email") || "";

  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // OTP inputs refs
const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => setCountdown((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = d;
    setOtp(next);
    if (d && i < 5) refs.current[i + 1]?.focus();
  };

  const joinCode = () => otp.join("");

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = joinCode();
    if (!email) return Swal.fire("Error", "Email is required", "error");
    if (code.length !== 6)
      return Swal.fire("Error", "Enter the 6-digit code", "error");

    setLoading(true);
    try {
      // If you have a dedicated verify route:
      const res = await fetch("/api/auth/otp-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), otp: code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Invalid or expired OTP");

      Swal.fire(
        "Verified",
        "OTP is valid. Set a new password.",
        "success"
      ).then(() =>
        router.push(
          `/reset-password?email=${encodeURIComponent(email.trim())}&otp=${code}`
        )
      );
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (!email || countdown > 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otpverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to resend code");
      Swal.fire(
        "Sent",
        "We resent your code. Check your inbox (and spam).",
        "success"
      );
      setCountdown(60);
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
              Verify OTP
            </h2>
            <p className="text-[#4E4E4E] text-[16px] font-inter font-normal mb-6">
              Enter the 6-digit code we sent to your email.
            </p>

            <form className="space-y-6" onSubmit={verify}>
              <div>
                <label className="block text-xs font-medium text-gray-500">
                  Email
                </label>
                <input
                  type="email"
                  readOnly
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                />
              </div>

              {/* OTP inputs */}
              <div>
                <label className="block text-sm font-medium">
                  6-digit code
                </label>
                <div className="mt-2 grid grid-cols-6 gap-2">
                  {otp.map((d, i) => (
                    <input
                      title="otp"
                      key={i}
                      ref={(el) => {
                        refs.current[i] = el; // ✅ no cast needed
                      }}
                      type="text" // ✅ keep text; maxLength works on text, not number
                      inputMode="numeric" // ✅ shows numeric keypad on mobile
                      pattern="[0-9]*"
                      maxLength={1}
                      value={d}
                      onChange={(e) => setDigit(i, e.target.value)}
                      className="h-12 text-center text-lg rounded-xl border outline-none focus:ring-2 focus:ring-primary"
                    />
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {countdown > 0 ? (
                    <span>Resend available in {countdown}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={resend}
                      className="text-primary underline">
                      Resend code
                    </button>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-2xl font-semibold hover:bg-primary/90 transition-colors cursor-pointer text-[16px] font-inter flex justify-center items-center disabled:opacity-50">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </form>

            <p className="text-center text-[16px] text-text font-normal font-inter mt-6">
              Wrong email?{" "}
              <Link
                href="/forgot-password"
                className="text-primary underline font-medium hover:text-primary/80">
                Start over
              </Link>
            </p>
          </div>

          {/* Right: Illustration */}
          <div className="relative flex items-center justify-center rounded-l-3xl overflow-hidden">
            <Image
              src="/images/listourplatform.png"
              width={685}
              height={700}
              alt="Verify Illustration"
              className="object-cover w-full h-full min-h-[600px]"
            />
            <div className="absolute bg-[#461500]/60 text-center text-white px-6 py-4 rounded-xl">
              <h3 className="text-[24px] font-sans font-semibold">
                <span className="text-primary">Secure</span> your account
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
