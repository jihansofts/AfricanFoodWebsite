import { Suspense } from "react";
import VerifyOtpPage from "@/components/otp/otpVerify";

// prevent static prerender/export trying to run the client hook at build
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense
      fallback={<div className="p-8 text-sm text-gray-500">Loading…</div>}>
     <VerifyOtpPage />
    </Suspense>
  );
}
