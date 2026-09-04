import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { services, type CaseStudy } from "@/lib/content";

export function WorkCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const service = services.find((s) => s.slug === caseStudy.service);

  return (
    <SpotlightCard className="h-full p-8">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between text-xs text-foreground-muted">
          <span className="rounded-full border border-white/10 px-3 py-1">{service?.title}</span>
          <span>{caseStudy.year}</span>
        </div>

        <h3 className="mt-6 font-display text-xl font-medium">{caseStudy.client}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-muted">
          {caseStudy.summary}
        </p>

        <div className="mt-6 flex gap-6 border-t border-white/10 pt-4">
          {caseStudy.metrics.map((metric) => (
            <div key={metric.label}>
              <div className="font-display text-lg text-accent-light">{metric.value}</div>
              <div className="text-xs text-foreground-muted">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
}
