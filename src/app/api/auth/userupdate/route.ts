import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserModel from "@/model/UserModel";

export async function PATCH(req: Request) {
  try {
    const { userId, whatsappNumber } = await req.json();
    if (!userId || !whatsappNumber)
      return NextResponse.json({ error: "Missing data" }, { status: 400 });

    await connectDB();
    const updated = await UserModel.findByIdAndUpdate(
      userId,
      { whatsappNumber },
      { new: true }
    );

    return NextResponse.json({ success: true, user: updated });
  } catch (err) {
    console.error("Error updating WhatsApp:", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
