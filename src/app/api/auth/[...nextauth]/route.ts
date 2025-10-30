// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions, Account, Profile, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/model/UserModel";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          scope: "openid email profile",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile | undefined;
    }) {
      try {
        await connectDB();

        // Extract role from multiple possible sources
        const role = extractRoleFromAccount(account) || "customer";

        if (!user.email) {
          console.error("No email provided by Google");
          return false;
        }

        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          // Create new user
          await UserModel.create({
            name: user.name,
            email: user.email,
            password: profile?.sub, // Using Google sub as password fallback
            role: role,
            googleId: profile?.sub,
            profileImage: user.image,
            productLimit: 3,
            whatsappNumber: "",
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        } else {
          // Update existing user if needed
          const updates: { [key: string]: string | Date } = {
            updatedAt: new Date(),
            lastLogin: new Date(),
          };

          // Update profile image if not set
          if (!existingUser.profileImage && user.image) {
            updates.profileImage = user.image;
          }

          // Update name if changed
          if (user.name && existingUser.name !== user.name) {
            updates.name = user.name;
          }

          // Role upgrade logic: customer can become vendor

          if (existingUser.role === "customer") {
            updates.role = "vendor";
            await UserModel.updateOne({ email: user.email }, { $set: updates });
          }
        }

        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },

    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
      profile?: Profile;
    }) {
      try {
        await connectDB();

        // Add user info to token on sign in
        if (user) {
          const dbUser = await UserModel.findOne({ email: user.email });
          if (dbUser) {
            token.role = dbUser.role;
            token.id = dbUser._id?.toString();
            token.email = dbUser.email;
          }
        }

        // Refresh user data on each JWT callback
        if (token.email) {
          const dbUser = await UserModel.findOne({ email: token.email });
          if (dbUser) {
            token.role = dbUser.role;
            token.id = dbUser._id?.toString();
          }
        }

        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },

    async session({ session, token }) {
      try {
        await connectDB();

        if (token.email) {
          const dbUser = await UserModel.findOne({ email: token.email });

          if (dbUser) {
            // Merge DB values into session.user and allow extra fields via casting
            Object.assign(session.user as User, {
              id: dbUser._id?.toString(),
              name: dbUser.name,
              email: dbUser.email,
              role: dbUser.role,
              image: dbUser.profileImage,
              productLimit: dbUser.productLimit,
              whatsappNumber: dbUser.whatsappNumber,
            });
          } else {
            // Fallback to token data if user not found in DB
            session.user.id = token.id;
            session.user.role = token.role;
          }
        }

        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },

    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      try {
        await connectDB();

        // Use provided baseUrl or fallback to environment variable
        const actualBaseUrl =
          baseUrl || process.env.NEXTAUTH_URL || "http://localhost:3000";

        // Allow callbackUrl to work for other redirects
        if (url.startsWith(`${actualBaseUrl}/`) && !url.includes("/auth/")) {
          return url;
        }

        // For auth-related redirects, determine based on user role
        if (url.includes("/api/auth/")) {
          // This is tricky because we don't have user context here
          // We'll handle role-based redirects in the signIn callback instead
          return `${actualBaseUrl}/`;
        }

        return `${actualBaseUrl}/`;
      } catch (error) {
        console.error("Redirect callback error:", error);
        return `${baseUrl}/`;
      }
    },
  },
  pages: {
    signIn: "/vendor/create-product-vendor",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  events: {
    async signIn({}: {
      user: User;
      account: Account | null;
      profile?: Profile;
      isNewUser?: boolean;
    }) {},
    async signOut({ token }: { token: JWT }) {
      console.log(`User signed out: ${token.email}`);
    },
  },
};

// Helper function to extract role from account object
function extractRoleFromAccount(account: Account | null): string | null {
  if (!account) return null;

  // Try to get role from custom parameters
  const customParams = account as { role?: string } as {
    role?: string;
    query?: { [key: string]: string };
    params?: { [key: string]: string };
  };

  // Check multiple possible locations for role parameter
  if (customParams.role) {
    return customParams.role;
  }

  if (customParams.query?.role) {
    return customParams.query.role;
  }

  if (customParams.params?.role) {
    return customParams.params.role;
  }

  // Extract from URL if available
  if (account.url) {
    try {
      const url = new URL(account.url as string);
      return url.searchParams.get("role");
    } catch (error) {
      console.error("Error parsing URL for role:", error);
    }
  }

  return null;
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
