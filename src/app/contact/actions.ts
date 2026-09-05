"use server";

import { Resend } from "resend";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";
import { siteConfig } from "@/lib/content";

export type ContactActionState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<keyof ContactFormValues, string>> };

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

  try {
    const resend = new Resend(apiKey);
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

    return { status: "success" };
  } catch (error) {
    console.error("[contact] Failed to send email:", error);
    return { status: "error", message: "Something went wrong sending your message. Please try again." };
  }
}
