"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkCard } from "@/components/WorkCard";
import { useUIStore } from "@/store/useUIStore";
import { caseStudies, services } from "@/lib/content";

const FILTERS = [{ value: "all", label: "All" }, ...services.map((s) => ({ value: s.slug, label: s.title.split(" ")[0] }))];

export function WorkGrid() {
  const workFilter = useUIStore((s) => s.workFilter);
  const setWorkFilter = useUIStore((s) => s.setWorkFilter);

  const filtered =
    workFilter === "all" ? caseStudies : caseStudies.filter((c) => c.service === workFilter);

  return (
    <div>
      <Tabs value={workFilter} onValueChange={setWorkFilter}>
        <TabsList>
          {FILTERS.map((filter) => (
            <TabsTrigger key={filter.value} value={filter.value}>
              {filter.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((caseStudy) => (
            <motion.div
              key={caseStudy.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <WorkCard caseStudy={caseStudy} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-10 text-sm text-foreground-muted">No case studies in this category yet.</p>
      )}
    </div>
  );
}
