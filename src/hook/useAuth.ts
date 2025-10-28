// hooks/useAuth.ts
"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function useAuth(requiredRole?: string | string[]) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      // Not authenticated
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    if (requiredRole) {
      const userRole = session.user.role;
      const requiredRoles = Array.isArray(requiredRole)
        ? requiredRole
        : [requiredRole];

      if (!requiredRoles.includes(userRole as string)) {
        router.push("/unauthorized");
        return;
      }
    }
  }, [session, status, requiredRole, router, pathname]);

  return {
    user: session?.user,
    isAuthenticated: !!session,
    isLoading: status === "loading",
    isAuthorized: requiredRole
      ? session &&
        (Array.isArray(requiredRole)
          ? requiredRole.includes(session.user.role as string)
          : session.user.role === requiredRole)
      : !!session,
  };
}

// Higher-order component for client components
export function withAuth(
  Component: React.ComponentType<symbol>,
  requiredRole?: string | string[]
) {
  return function AuthenticatedComponent(
    props: React.ComponentProps<typeof Component>
  ) {
    const { isAuthenticated, isAuthorized, isLoading } = useAuth(requiredRole);

    if (isLoading) {
      return React.createElement("p", null, "Loading...");
    }

    if (!isAuthenticated || (requiredRole && !isAuthorized)) {
      return null; // Redirect happens in useAuth hook
    }

    return React.createElement(Component, props);
  };
}
