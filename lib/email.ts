import nodemailer from "nodemailer";

import { serverEnv } from "@/lib/env";

type InquiryEmailPayload = {
  inquiryType: "CONTACT" | "QUOTE";
  name: string;
  email: string;
  company: string;
  country: string;
  phone: string;
  message: string;
  sourcePage: string;
  sourceProduct: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  referrer: string;
};

export async function sendInquiryNotification(payload: InquiryEmailPayload) {
  const mailConfigReady =
    Boolean(serverEnv.SMTP_HOST) &&
    Boolean(serverEnv.SMTP_PORT) &&
    Boolean(serverEnv.MAIL_FROM) &&
    Boolean(serverEnv.ADMIN_NOTIFICATION_EMAIL);

  if (!mailConfigReady) {
    return { delivered: false, reason: "missing_email_configuration" as const };
  }

  const transporter = nodemailer.createTransport({
    host: serverEnv.SMTP_HOST,
    port: Number(serverEnv.SMTP_PORT),
    secure: serverEnv.SMTP_SECURE === "true",
    auth:
      serverEnv.SMTP_USER && serverEnv.SMTP_PASS
        ? {
            user: serverEnv.SMTP_USER,
            pass: serverEnv.SMTP_PASS,
          }
        : undefined,
  });

  await transporter.sendMail({
    from: serverEnv.MAIL_FROM,
    to: serverEnv.ADMIN_NOTIFICATION_EMAIL,
    replyTo: payload.email,
    subject: `[${payload.inquiryType}] New inquiry from ${payload.name}`,
    text: [
      `Inquiry type: ${payload.inquiryType}`,
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company || "-"}`,
      `Country: ${payload.country || "-"}`,
      `Phone: ${payload.phone || "-"}`,
      `Source page: ${payload.sourcePage || "-"}`,
      `Source product: ${payload.sourceProduct || "-"}`,
      `UTM source: ${payload.utmSource || "-"}`,
      `UTM medium: ${payload.utmMedium || "-"}`,
      `UTM campaign: ${payload.utmCampaign || "-"}`,
      `Referrer: ${payload.referrer || "-"}`,
      "",
      "Message:",
      payload.message,
    ].join("\n"),
  });

  return { delivered: true as const };
}
