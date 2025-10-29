"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AuthCallback() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const userRole = (session?.user as { role?: string } | undefined)?.role;

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      });

      if (userRole === "vendor") {
        router.push("/vendor/create-product-vendor");
      } else {
        router.push("/");
      }
    } else if (status === "unauthenticated") {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Unable to authenticate your account.",
      });
      router.push("/");
    }
  }, [status, session, router]);

  return null;
}
