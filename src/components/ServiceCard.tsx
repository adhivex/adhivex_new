import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { serviceIconMap } from "@/lib/icon-map";
import type { Service } from "@/lib/content";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIconMap[service.icon];

  return (
    <SpotlightCard className="h-full p-8">
      <Link href={`/services#${service.slug}`} className="flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent">
            <Icon className="h-5 w-5" />
          </div>
          <ArrowUpRight className="h-5 w-5 text-foreground-muted transition-all duration-300 group-hover/spotlight:-translate-y-0.5 group-hover/spotlight:translate-x-0.5 group-hover/spotlight:text-accent" />
        </div>

        <h3 className="mt-6 font-display text-xl font-medium">{service.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-muted">
          {service.shortDescription}
        </p>

        <div className="mt-6 border-t border-white/10 pt-4">
          <span className="font-display text-lg text-accent-light">{service.stat.value}</span>
          <span className="ml-2 text-xs text-foreground-muted">{service.stat.label}</span>
        </div>
      </Link>
    </SpotlightCard>
  );
}
