// lib/authGuard.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function requireRole(requiredRole: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    // Not logged in → redirect to login
    redirect("/auth/login");
  }

  if (session.user.role !== requiredRole) {
    // Wrong role → redirect to home or unauthorized page
    redirect("/");
  }

  return session; // authenticated & role matches
}
