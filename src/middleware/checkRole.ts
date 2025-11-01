// 📁 middleware/checkRole.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/model/UserModel";
import { connectDB } from "@/lib/db";

export function withRole(allowedRoles: string[]) {
  return async (req: Request) => {
    try {
      const token = req.headers.get("authorization")?.split(" ")[1];
      if (!token)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET!);

      await connectDB();
      const user = await UserModel.findById(decoded.id);
      if (!user)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

      if (!allowedRoles.includes(user.role)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      // ✅ return user directly for downstream use
      return { user };
    } catch (err) {
      console.error("Role check error:", err);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  };
}
