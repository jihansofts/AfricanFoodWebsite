import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
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
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();

      // ✅ Get role directly from account.query if available
      const role =
        (account?.params as Record<string, string>)?.role ||
        (typeof account?.url === "string"
          ? new URL(account.url).searchParams.get("role")
          : undefined) ||
        "customer";

      const existingUser = await UserModel.findOne({ email: user.email });

      if (!existingUser) {
        await UserModel.create({
          name: user.name,
          email: user.email,
          password: profile?.sub,
          role,
          googleid: profile?.sub,
          profileImage: user.image,
        });
        console.log("New user created:", user.role);
      } else {
        if (existingUser.role === "customer") {
          existingUser.role = "vendor";
          await existingUser.updateOne({ role: "vendor" });
        }
      }

      return true;
    },

    async redirect({ url, baseUrl }) {
      try {
        const resolved = new URL(url, baseUrl);
        const role = resolved.searchParams.get("role");
        if (role === "vendor") return `${baseUrl}/create-product-vendor`;

        if (role === "customer") return `${baseUrl}/dashboard`;
      } catch (e) {
        console.error(e);
      }

      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
