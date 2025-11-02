import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function useRoleProtect(requiredRole: string) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // ✅ Only run on client
    if (typeof window === "undefined") return;

    if (!user) {
      router.push("/");
    } else if (user.role !== requiredRole) {
      router.push("/");
    }
  }, [user, router, requiredRole]);
}
