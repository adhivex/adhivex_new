import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(120),
  email: z.string().trim().email("Enter a valid email address"),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.enum(["web", "automation", "data", "not-sure"], {
    message: "Select a service",
  }),
  budget: z.enum(["under-10k", "10k-25k", "25k-plus", "not-sure"], {
    message: "Select a budget range",
  }),
  message: z.string().trim().min(20, "Tell us a bit more (20 characters min)").max(2000),
  // Honeypot field — real users never fill this in.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
