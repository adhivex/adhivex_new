import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/hero/HeroSection";
import { ServiceCard } from "@/components/ServiceCard";
import { WorkCard } from "@/components/WorkCard";
import { ProcessStep } from "@/components/ProcessStep";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/MagneticButton";
import { Reveal, StaggerGroup } from "@/components/motion/Reveal";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { services, processSteps, caseStudies } from "@/lib/content";

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <span className="text-sm font-medium text-accent">What we do</span>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Three disciplines, one team, no handoffs lost in translation.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <span className="text-sm font-medium text-accent">How we work</span>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-medium tracking-tight sm:text-4xl">
              A process built to ship, not to stall in review.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.08}>
                <ProcessStep step={step} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-sm font-medium text-accent">Selected work</span>
              <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
                Recent projects
              </h2>
            </div>
            <Link href="/work" className="flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground">
              View all work <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {caseStudies.slice(0, 3).map((caseStudy) => (
              <StaggerItem key={caseStudy.slug}>
                <WorkCard caseStudy={caseStudy} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <Reveal>
            <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-foreground-muted">
              Tell us what you&apos;re building. We&apos;ll reply within one business day with
              next steps.
            </p>
            <div className="mt-8 flex justify-center">
              <Magnetic>
                <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90">
                  <Link href="/contact">
                    Start a project
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
