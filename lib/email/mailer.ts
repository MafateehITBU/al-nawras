import { getEnv } from "@/lib/env";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

export function isSmtpConfigured(): boolean {
  const env = getEnv();
  return Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS && env.SMTP_FROM);
}

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const env = getEnv();

  if (!isSmtpConfigured()) {
    throw new Error("SMTP is not configured");
  }

  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT ?? 587,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  return transporter;
}

export async function sendMail(options: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
}) {
  const env = getEnv();
  const transport = getTransporter();

  return transport.sendMail({
    from: env.SMTP_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });
}
