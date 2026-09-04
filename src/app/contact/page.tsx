import type { Metadata } from "next";
import { Mail, Clock, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell ADHIVEX about your project — website, AI automation, or data engineering.",
};

const DETAILS = [
  { icon: Mail, label: "Email", value: siteConfig.email },
  { icon: Clock, label: "Response time", value: "Within 1 business day" },
  { icon: MapPin, label: "Availability", value: "Remote, worldwide" },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-16 md:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <span className="text-sm font-medium text-accent">Contact</span>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Let&apos;s build something.
          </h1>
          <p className="mt-4 max-w-sm text-foreground-muted">
            Tell us about your project and we&apos;ll get back to you with next steps — no
            automated sales funnel, a real reply from the team.
          </p>

          <div className="mt-10 space-y-5">
            {DETAILS.map((detail) => (
              <div key={detail.label} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-accent">
                  <detail.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs text-foreground-muted">{detail.label}</div>
                  <div className="text-sm">{detail.value}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
