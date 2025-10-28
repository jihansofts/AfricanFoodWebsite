// lib/authGuard.ts
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect to login page
    Swal.fire({
      icon: "warning",
      title: "Session Expired",
      text: "Your session has expired. Please log in again.",
    });

    redirect("/");
  }

  return session;
}

export async function requireRole(requiredRole: string | string[]) {
  const session = await requireAuth();
  const userRole = session.user.role;
  const requiredRoles = Array.isArray(requiredRole)
    ? requiredRole
    : [requiredRole];

  if (!requiredRoles.includes(userRole as string)) {
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      text: "You do not have permission to access this page.",
    });
    redirect("/");
  }

  return session;
}
// Higher-order function for server components
export function withServerAuth(requiredRole?: string | string[]) {
  return async function protectedComponent(
    Component: React.ComponentType<string>
  ) {
    const AuthWrapper = async (props: string) => {
      try {
        if (requiredRole) {
          await requireRole(requiredRole);
        } else {
          await requireAuth();
        }
        return React.createElement(Component, props);
      } catch (error) {
        // Redirect happens in requireAuth/requireRole

        return null;
      }
    };

    return AuthWrapper;
  };
}
