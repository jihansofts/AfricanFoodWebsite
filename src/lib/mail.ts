// /lib/mail.ts
import nodemailer from "nodemailer";
import { otpEmailTemplate } from "./mailTemplate";

export const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL!,
    pass: process.env.SMTP_PASS!,
  },
});

export async function sendOTPEmail(to: string, otp: string) {
  await mailer.sendMail({
    to,
    subject: "Your Password Reset Code - African Food Zones",
    html: otpEmailTemplate(otp),
  });
}
