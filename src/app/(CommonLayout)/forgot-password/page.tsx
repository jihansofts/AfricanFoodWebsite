import ForgotPasswordPage from "@/components/otp/ForgotPassword";
import { Suspense } from "react";


// prevent static prerender/export trying to run the client hook at build
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense
      fallback={<div className="p-8 text-sm text-gray-500">Loading…</div>}>
      <ForgotPasswordPage/>
    </Suspense>
  );
}
