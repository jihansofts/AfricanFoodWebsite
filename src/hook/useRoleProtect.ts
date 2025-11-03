"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useRoleProtect(requiredRole?: string) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // ✅ Wait until client-side is ready
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // ⏳ Skip until client ready

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // 🚫 Redirect home if no token
    if (!token) {
      router.push("/");
      return;
    }

    // 🚫 Redirect home if role mismatch
    if (requiredRole && role !== requiredRole) {
      router.push("/");
    }
  }, [isClient, router, requiredRole]);
}
