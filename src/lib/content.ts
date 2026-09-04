/**
 * Typed content layer for the ADHIVEX site.
 *
 * This is the single source of truth for copy, services, and case studies.
 * It exists so nothing is hardcoded inside JSX — swapping this file for a
 * CMS-backed fetch (e.g. Sanity) later is a drop-in change, since pages only
 * ever import the shaped data below, never raw strings.
 *
 * PLACEHOLDER DATA: case-study specifics (client names, metrics,
 * testimonials) are marked `isPlaceholder: true` and use illustrative
 * values. Swap these for real values before launch.
 */

// Falls back to Vercel's auto-populated preview URL (no scheme) so preview
// deployments get correct metadata/OG/sitemap URLs instead of the production
// domain, then to the production domain for local dev and other hosts.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://adhivex.com");

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
  isPlaceholder: true;
}

// TODO(placeholder): replace with real client names, results, and copy
// once case studies are available — these are structural placeholders.
export const caseStudies: CaseStudy[] = [
  {
    slug: "placeholder-fintech-platform",
    client: "Placeholder Fintech Co.",
    service: "web",
    summary:
      "Redesigned and rebuilt a customer-facing platform on Next.js, cutting load times and unifying the design system.",
    metrics: [
      { value: "—", label: "load time improvement" },
      { value: "—", label: "conversion lift" },
    ],
    year: "2025",
    isPlaceholder: true,
  },
  {
    slug: "placeholder-support-automation",
    client: "Placeholder Ops Team",
    service: "automation",
    summary:
      "Built an AI triage agent that classifies and routes inbound support requests before a human ever sees them.",
    metrics: [
      { value: "—", label: "tickets auto-resolved" },
      { value: "—", label: "response time reduction" },
    ],
    year: "2025",
    isPlaceholder: true,
  },
  {
    slug: "placeholder-data-warehouse",
    client: "Placeholder Retail Group",
    service: "data",
    summary:
      "Migrated fragmented spreadsheet reporting into a governed warehouse with a live analytics dashboard.",
    metrics: [
      { value: "—", label: "reports automated" },
      { value: "—", label: "pipeline reliability" },
    ],
    year: "2024",
    isPlaceholder: true,
  },
];
