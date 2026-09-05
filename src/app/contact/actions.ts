"use server";

import { Resend } from "resend";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";
import { siteConfig } from "@/lib/content";

export type ContactActionState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<keyof ContactFormValues, string>> };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Customer acknowledgment email content. Kept deliberately short — no
 * marketing copy, buttons, or project details — per the exact wording
 * this was specced with.
 */
function buildAcknowledgmentEmail(name: string) {
  const safeName = escapeHtml(name);

  const text = [
    `Hi ${name},`,
    "",
    "Thanks for reaching out.",
    "",
    "Your inquiry is with the ADHIVEX team. We'll be in touch soon.",
    "",
    "ADHIVEX",
    "hello@adhivex.com · adhivex.com",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background-color:#f5f5f3;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f3;padding:40px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;">
            <tr>
              <td style="padding:40px;font-size:15px;line-height:1.6;color:#1a1a1a;">
                <p style="margin:0 0 16px;">Hi ${safeName},</p>
                <p style="margin:0 0 16px;">Thanks for reaching out.</p>
                <p style="margin:0 0 28px;">Your inquiry is with the ADHIVEX team. We&rsquo;ll be in touch soon.</p>
                <p style="margin:0;font-size:13px;color:#6b6b6b;">
                  <span style="color:#ff5a00;font-weight:700;">ADHIVEX</span><br />
                  <a href="mailto:hello@adhivex.com" style="color:#6b6b6b;text-decoration:underline;">hello@adhivex.com</a>
                  &nbsp;&middot;&nbsp;
                  <a href="https://adhivex.com/" style="color:#6b6b6b;text-decoration:underline;">adhivex.com</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { text, html };
}

export async function submitContactForm(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactFormValues;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  // Honeypot tripped — silently report success without sending anything.
  if (parsed.data.website) {
    return { status: "success" };
  }

  const { name, email, company, service, budget, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY is not set — form submission was validated but no email was sent.",
      { name, email, service }
    );
    return {
      status: "error",
      message: "Messaging isn't configured on this deployment yet. Please email us directly.",
    };
  }

  const resend = new Resend(apiKey);

  // Internal notification — this is the email that must actually reach the
  // team, so its failure is the one that reports back to the visitor.
  try {
    await resend.emails.send({
      from: `${siteConfig.name} <hello@adhivex.com>`,
      to: siteConfig.email,
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        `Service: ${service}`,
        `Budget: ${budget}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (error) {
    console.error("[contact] Failed to send internal notification email:", error);
    return { status: "error", message: "Something went wrong sending your message. Please try again." };
  }

  // Customer acknowledgment — best-effort. The internal notification above
  // already succeeded, so the inquiry itself is safely received; a failure
  // here shouldn't tell the visitor their submission failed.
  try {
    const { text, html } = buildAcknowledgmentEmail(name);
    await resend.emails.send({
      from: `${siteConfig.name} <hello@adhivex.com>`,
      to: email,
      replyTo: ["hello@adhivex.com"],
      subject: "We received your inquiry — ADHIVEX",
      text,
      html,
    });
  } catch (error) {
    console.error("[contact] Failed to send customer acknowledgment email:", error);
  }

  return { status: "success" };
}
