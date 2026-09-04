import type { ProcessStep as ProcessStepType } from "@/lib/content";

export function ProcessStep({ step }: { step: ProcessStepType }) {
  return (
    <div className="relative border-l border-white/10 pl-8">
      <span className="font-display absolute -left-[1px] top-0 h-full w-px bg-gradient-to-b from-accent to-transparent" />
      <span className="font-display text-sm text-accent">{step.step}</span>
      <h3 className="mt-2 font-display text-xl font-medium">{step.title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-foreground-muted">
        {step.description}
      </p>
    </div>
  );
}
