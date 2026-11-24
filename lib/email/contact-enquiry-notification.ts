import { APP_NAME } from "@/constants";
import { isSmtpConfigured, sendMail } from "@/lib/email/mailer";
import { buildContactEnquiryEmail } from "@/lib/email/templates/contact-enquiry";
import prisma from "@/lib/db/prisma";
import { getSiteUrl } from "@/lib/i18n/config";
import { getAppUrl } from "@/lib/utils/app";
import { AdminRole, Permission } from "@prisma/client";

type EnquiryForEmail = {
  name: string;
  email: string;
  phoneNumber: string;
  company: string | null;
  country: string;
  message: string;
  createdAt: Date;
  service: {
    nameEn: string;
  };
};

function resolveLogoUrl(logoUrl: string | null | undefined, siteUrl: string) {
  const trimmed = logoUrl?.trim();
  if (!trimmed) return `${siteUrl}/logo.png`;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/")) return `${siteUrl}${trimmed}`;
  return `${siteUrl}/${trimmed}`;
}

export async function listContactEnquiryNotificationRecipients() {
  return prisma.admin.findMany({
    where: {
      isActive: true,
      OR: [
        { role: AdminRole.SUPER_ADMIN },
        { permissions: { has: Permission.MANAGE_CONTACT_ENQUIRIES } },
      ],
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function notifyAdminsOfContactEnquiry(enquiry: EnquiryForEmail) {
  if (!isSmtpConfigured()) {
    console.warn(
      "[email] SMTP is not configured; skipped contact enquiry notification",
    );
    return;
  }

  const [recipients, settings] = await Promise.all([
    listContactEnquiryNotificationRecipients(),
    prisma.websiteSettings.findUnique({
      where: { id: 1 },
      select: { logoUrl: true },
    }),
  ]);

  if (recipients.length === 0) {
    console.warn(
      "[email] No active Super Admin or contact-enquiry admins found; skipped notification",
    );
    return;
  }

  const siteUrl = getSiteUrl();
  const dashboardUrl = getAppUrl("/admin/contact-enquiries");
  const logoUrl = resolveLogoUrl(settings?.logoUrl, siteUrl);

  const results = await Promise.allSettled(
    recipients.map(async (recipient) => {
      const email = buildContactEnquiryEmail({
        recipientName: recipient.name || "Admin",
        logoUrl,
        dashboardUrl,
        siteUrl,
        enquiry: {
          name: enquiry.name,
          email: enquiry.email,
          phoneNumber: enquiry.phoneNumber,
          company: enquiry.company,
          country: enquiry.country,
          serviceName: enquiry.service.nameEn,
          message: enquiry.message,
          submittedAt: enquiry.createdAt,
        },
      });

      await sendMail({
        to: recipient.email,
        subject: email.subject,
        html: email.html,
        text: email.text,
      });
    }),
  );

  const failures = results.filter((result) => result.status === "rejected");
  if (failures.length > 0) {
    console.error(
      `[email] Failed to notify ${failures.length} of ${recipients.length} ${APP_NAME} admins about a contact enquiry`,
      failures.map((result) =>
        result.status === "rejected" ? result.reason : null,
      ),
    );
  }
}
