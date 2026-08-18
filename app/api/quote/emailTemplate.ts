import type { Lang } from "@/app/types";
import { SITE_NAME } from "@/app/constants";
import { escapeHtml, formatAnswersHtml } from "./formatAnswers";

interface ContactInfo {
  name: string;
  method: string;
  phone?: string;
  email?: string;
}

const CONTACT_METHOD_LABELS: Record<string, string> = {
  whatsapp: "WhatsApp",
  "phone-call": "Phone Call",
  email: "Email",
};

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export function buildQuoteEmailHtml(
  contact: ContactInfo,
  answers: Record<string, string | string[]>,
  lang: Lang,
): string {
  const contactRows: Array<[string, string]> = [
    ["Name", contact.name],
    ["Contact Method", CONTACT_METHOD_LABELS[contact.method] ?? contact.method],
    ...(contact.phone ? [["Phone", contact.phone] as [string, string]] : []),
    ...(contact.email ? [["Email", contact.email] as [string, string]] : []),
  ];

  const contactRowsHtml = contactRows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:4px 14px 4px 0; font:600 13px/1.6 ${FONT_STACK}; color:#8A8375; white-space:nowrap; vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:4px 0; font:400 14px/1.6 ${FONT_STACK}; color:#24262B;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0; padding:0; background-color:#F3F1EC;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F1EC;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#FFFFFF; border-radius:12px; border:1px solid #E9E5DB;">
            <tr>
              <td style="padding:26px 32px; background-color:#1B1B1E; border-radius:12px 12px 0 0; border-bottom:3px solid #C9A227;">
                <p style="margin:0; font:700 11px/1 ${FONT_STACK}; color:#C9A227; text-transform:uppercase; letter-spacing:0.14em;">${escapeHtml(SITE_NAME)}</p>
                <p style="margin:8px 0 0; font:700 20px/1.3 ${FONT_STACK}; color:#FFFFFF;">New Project Questionnaire</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 4px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${contactRowsHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0;">
                <div style="height:1px; line-height:1px; font-size:1px; background-color:#E9E5DB;">&nbsp;</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${formatAnswersHtml(answers, lang)}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
