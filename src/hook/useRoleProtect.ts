"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRoleProtect(requiredRole?: string) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.push("/");
      return;
    }

    if (requiredRole && role !== requiredRole) {
      router.push("/");
      return;
    }
  }, [router, requiredRole]);
}
