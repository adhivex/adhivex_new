/**
 * Typed content layer for the ADHIVEX site.
 *
 * This is the single source of truth for copy, services, and case studies.
 * It exists so nothing is hardcoded inside JSX — swapping this file for a
 * CMS-backed fetch (e.g. Sanity) later is a drop-in change, since pages only
 * ever import the shaped data below, never raw strings.
 *
 * Case studies (`caseStudies` below) are real, shipped client projects.
 * Any future placeholder entry should be marked `isPlaceholder: true`
 * so it's easy to find and swap out before it goes live.
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adhivex.com";

export const siteConfig = {
  name: "ADHIVEX",
  tagline: "Software, automation, and data — built to compound.",
  description:
    "ADHIVEX is a software studio designing and building websites, AI automation, and data infrastructure for teams that want to move faster than their headcount.",
  url: siteUrl,
  email: "hello@adhivex.com",
  social: {
    twitter: "https://twitter.com/adhivex",
    linkedin: "https://linkedin.com/company/adhivex",
    github: "https://github.com/adhivex",
  },
} as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
] as const;

export type ServiceSlug = "web" | "automation" | "data";

export interface Service {
  slug: ServiceSlug;
  icon: "code" | "workflow" | "database";
  title: string;
  shortDescription: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
  stat: { value: string; label: string };
}

export const services: Service[] = [
  {
    slug: "web",
    icon: "code",
    title: "Website Design & Development",
    shortDescription:
      "Fast, high-craft marketing sites and web apps built on modern frameworks.",
    description:
      "We design and engineer websites and web applications from scratch — no page builders, no template debt. Every project is a production-grade codebase with a component system, motion language, and performance budget built in from day one.",
    capabilities: [
      "Brand-driven design systems and component libraries",
      "Next.js / React web apps and marketing sites",
      "Headless CMS integration for editable content",
      "Motion and interaction design",
      "Core Web Vitals & performance engineering",
    ],
    deliverables: [
      "Design system + component library",
      "Production codebase (owned by you, not locked to us)",
      "CMS-editable content model",
      "Analytics & performance monitoring",
    ],
    stat: { value: "<1.5s", label: "typical LCP on shipped builds" },
  },
  {
    slug: "automation",
    icon: "workflow",
    title: "AI Automation",
    shortDescription:
      "Custom AI workflows and agents that remove repetitive work from your team.",
    description:
      "We build AI-powered automations that plug into the tools you already use — ingesting documents, triaging support, enriching CRM records, or orchestrating multi-step agent workflows — so your team spends time on judgment calls, not data entry.",
    capabilities: [
      "LLM-powered workflow automation and agents",
      "Internal tools and copilots for operational teams",
      "Document processing & extraction pipelines",
      "Integration with existing SaaS (CRM, support, ops)",
      "Evaluation harnesses so automations stay reliable",
    ],
    deliverables: [
      "Mapped workflow with defined automation boundary",
      "Production automation / agent service",
      "Monitoring & human-in-the-loop fallback",
      "Documentation & handoff for your team",
    ],
    stat: { value: "hours → minutes", label: "typical workflow runtime reduction" },
  },
  {
    slug: "data",
    icon: "database",
    title: "Data Engineering & Analytics",
    shortDescription:
      "Reliable data pipelines and dashboards that turn raw data into decisions.",
    description:
      "We build the data infrastructure underneath good decisions — pipelines that move and model your data correctly, warehouses that scale with you, and dashboards your team actually opens every day instead of exporting to a spreadsheet.",
    capabilities: [
      "ETL / ELT pipeline design and orchestration",
      "Data warehouse modeling",
      "Analytics dashboards & reporting",
      "Data quality monitoring & alerting",
      "Migration from spreadsheets to real infrastructure",
    ],
    deliverables: [
      "Documented data model & pipeline architecture",
      "Orchestrated, monitored pipelines",
      "Internal analytics dashboard",
      "Runbook for ongoing operation",
    ],
    stat: { value: "99.9%", label: "target pipeline reliability SLA" },
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "We map the problem, the constraints, and what success actually looks like before writing a line of code or copy.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Architecture and interface design happen together — system diagrams and UI concepts, reviewed with you at each checkpoint.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "We ship in weekly increments against a shared backlog, so you're watching the real product take shape, not waiting for a reveal.",
  },
  {
    step: "04",
    title: "Operate",
    description:
      "Launch includes monitoring, documentation, and a handoff plan — the system is built to run without us in the room.",
  },
];

export interface CaseStudy {
  slug: string;
  client: string;
  service: ServiceSlug;
  summary: string;
  metrics: { value: string; label: string }[];
  year: string;
  url?: string;
  isPlaceholder?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "sai-jagannath-engineering-construction",
    client: "Sai Jagannath Engineering & Construction",
    service: "web",
    summary:
      "Designed and built a corporate site for SJEC, an industrial electrical & instrumentation contractor — presenting their HT/LT electrical, instrumentation, and automation capabilities alongside a documented project portfolio across cement, steel, and DRI plants in Odisha and Jharkhand.",
    metrics: [
      { value: "7", label: "portfolio projects documented" },
      { value: "6", label: "industrial sectors covered" },
    ],
    year: "2026",
    url: "https://sjec.in/",
  },
  {
    slug: "routray-naturals",
    client: "Routray Naturals",
    service: "web",
    summary:
      "Designed and built a direct-to-consumer e-commerce store for Routray Naturals, a premium dry fruits and whole spices brand — covering the full shop experience from an origin-tagged product catalog to cart and checkout.",
    metrics: [
      { value: "4", label: "shop categories built" },
      { value: "7+", label: "sourcing origins featured" },
    ],
    year: "2026",
    url: "https://routraynaturals.in/",
  },
];
