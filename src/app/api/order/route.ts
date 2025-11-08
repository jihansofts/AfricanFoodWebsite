import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { productName, vendorEmail, name, email, message } = await req.json();

    if (!vendorEmail) {
      return NextResponse.json(
        { message: "Vendor email not provided" },
        { status: 400 }
      );
    }

    // ✅ Configure transporter (use your real credentials or environment variables)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL, // e.g. your Gmail or domain email
        pass: process.env.SMTP_PASS, // app password or SMTP password
      },
    });

    // ✅ Email content
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: vendorEmail,
      subject: `Food Inquiry: ${productName}`,
      html: `
        <h2>New Inquiry for ${productName}</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // ✅ Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { message: "Failed to send email", error },
      { status: 500 }
    );
  }
}
