import { Code2, Workflow, Database, type LucideIcon } from "lucide-react";
import type { Service } from "@/lib/content";

export const serviceIconMap: Record<Service["icon"], LucideIcon> = {
  code: Code2,
  workflow: Workflow,
  database: Database,
};
