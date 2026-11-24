import { APP_NAME } from "@/constants";
import { escapeHtml } from "@/lib/email/escape-html";

export interface ContactEnquiryEmailInput {
  recipientName: string;
  logoUrl: string;
  dashboardUrl: string;
  siteUrl: string;
  enquiry: {
    name: string;
    email: string;
    phoneNumber: string;
    company: string | null;
    country: string;
    serviceName: string;
    message: string;
    submittedAt: Date;
  };
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;width:34%;vertical-align:top;font-size:13px;font-weight:600;color:#60697b;letter-spacing:0.02em;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;vertical-align:top;font-size:14px;line-height:1.5;color:#1b1c1c;">
        ${value}
      </td>
    </tr>
  `;
}

export function buildContactEnquiryEmail(input: ContactEnquiryEmailInput) {
  const { enquiry } = input;
  const safeName = escapeHtml(enquiry.name);
  const safeEmail = escapeHtml(enquiry.email);
  const safePhone = escapeHtml(enquiry.phoneNumber);
  const safeCompany = enquiry.company ? escapeHtml(enquiry.company) : "—";
  const safeCountry = escapeHtml(enquiry.country);
  const safeService = escapeHtml(enquiry.serviceName);
  const safeMessage = escapeHtml(enquiry.message).replaceAll("\n", "<br />");
  const submittedAt = escapeHtml(formatDate(enquiry.submittedAt));
  const recipientName = escapeHtml(input.recipientName);
  const logoUrl = escapeHtml(input.logoUrl);
  const dashboardUrl = escapeHtml(input.dashboardUrl);
  const siteUrl = escapeHtml(input.siteUrl);

  const subject = `New contact enquiry from ${enquiry.name}`;

  const text = [
    `Hello ${input.recipientName},`,
    "",
    `A new contact enquiry was submitted on ${APP_NAME}.`,
    "",
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phoneNumber}`,
    `Company: ${enquiry.company ?? "—"}`,
    `Country: ${enquiry.country}`,
    `Service: ${enquiry.serviceName}`,
    `Submitted: ${formatDate(enquiry.submittedAt)}`,
    "",
    "Message:",
    enquiry.message,
    "",
    `Open the dashboard: ${input.dashboardUrl}`,
  ].join("\n");

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f6fe;font-family:Arial,Helvetica,sans-serif;color:#1b1c1c;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fe;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:#ffffff;padding:24px 28px 18px;border-bottom:1px solid #e2e8f0;">
                <img src="${logoUrl}" alt="${escapeHtml(APP_NAME)}" width="180" style="display:block;max-width:180px;height:auto;border:0;" />
              </td>
            </tr>
            <tr>
              <td style="height:4px;background:#27a8e1;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#27a8e1;">
                  New enquiry
                </p>
                <h1 style="margin:0 0 12px;font-size:24px;line-height:1.3;color:#1b1c1c;">
                  Contact form submission
                </h1>
                <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#60697b;">
                  Hello ${recipientName}, a visitor just submitted a message through the website contact form. Review the details below or open it in the dashboard.
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                  ${detailRow("Name", safeName)}
                  ${detailRow("Email", `<a href="mailto:${safeEmail}" style="color:#27a8e1;text-decoration:none;">${safeEmail}</a>`)}
                  ${detailRow("Phone", safePhone)}
                  ${detailRow("Company", safeCompany)}
                  ${detailRow("Country", safeCountry)}
                  ${detailRow("Service", safeService)}
                  ${detailRow("Submitted", submittedAt)}
                </table>

                <div style="margin:0 0 28px;padding:16px 18px;background:#f4f6fe;border:1px solid #e2e8f0;border-radius:10px;">
                  <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#faa628;">
                    Message
                  </p>
                  <p style="margin:0;font-size:14px;line-height:1.7;color:#1b1c1c;">
                    ${safeMessage}
                  </p>
                </div>

                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-radius:8px;background:#27a8e1;">
                      <a href="${dashboardUrl}" style="display:inline-block;padding:12px 22px;font-size:14px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#ffffff;text-decoration:none;">
                        Open dashboard
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;background:#2d3035;border-top:1px solid rgba(253,253,253,0.08);">
                <p style="margin:0;font-size:12px;line-height:1.6;color:#bdc8d0;">
                  ${escapeHtml(APP_NAME)}
                  <br />
                  <a href="${siteUrl}" style="color:#27a8e1;text-decoration:none;">${siteUrl}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  return { subject, html, text };
}
