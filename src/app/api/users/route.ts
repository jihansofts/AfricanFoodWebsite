import { NextResponse, NextRequest } from "next/server";
import UserModel from "@/model/UserModel";
import { connectDB } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id"); // ✅
    await connectDB();

    if (id) {
      // ✅ Fetch a single user
      const user = await UserModel.findById(id);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json({ user }, { status: 200 });
    } else {
      // ✅ Fetch all users
      const users = await UserModel.find({});
      return NextResponse.json({ users }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
