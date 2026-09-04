import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { serviceIconMap } from "@/lib/icon-map";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website design & development, AI automation, and data engineering & analytics — built as one integrated engagement.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-24">
        <Reveal>
          <span className="text-sm font-medium text-accent">Services</span>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Everything a modern product needs to ship and stay reliable.
          </h1>
          <p className="mt-4 max-w-xl text-foreground-muted">
            Pick one track, or combine all three into a single engagement with one point of
            contact.
          </p>
        </Reveal>
      </section>

      {services.map((service, index) => {
        const Icon = serviceIconMap[service.icon];
        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`scroll-mt-24 border-t border-white/5 ${index % 2 === 1 ? "bg-surface/40" : ""}`}
          >
            <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1fr_1.2fr] md:items-start">
              <Reveal>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-6 font-display text-3xl font-medium tracking-tight">
                  {service.title}
                </h2>
                <p className="mt-4 text-foreground-muted">{service.description}</p>
                <div className="mt-8 border-t border-white/10 pt-4">
                  <span className="font-display text-2xl text-accent-light">
                    {service.stat.value}
                  </span>
                  <span className="ml-2 text-sm text-foreground-muted">{service.stat.label}</span>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-foreground-muted">Capabilities</h3>
                  <ul className="mt-4 space-y-3">
                    {service.capabilities.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground-muted">Deliverables</h3>
                  <ul className="mt-4 space-y-3">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}
    </>
  );
}
