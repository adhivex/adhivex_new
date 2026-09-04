import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { WorkGrid } from "@/components/work/WorkGrid";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies from ADHIVEX across web, AI automation, and data engineering.",
};

export default function WorkPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <span className="text-sm font-medium text-accent">Work</span>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
          Selected projects across web, automation, and data.
        </h1>
        <p className="mt-4 max-w-xl text-foreground-muted">
          A sample of what we&apos;ve shipped. Filter by discipline to see relevant work.
        </p>
      </Reveal>

      <div className="mt-12">
        <WorkGrid />
      </div>
    </section>
  );
}
