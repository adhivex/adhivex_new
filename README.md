# ADHIVEX

Marketing site for ADHIVEX — a software studio offering website design &
development, AI automation, and data engineering & analytics.

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, with Framer Motion for
motion and shadcn/ui (Radix primitives) for accessible form controls.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `RESEND_API_KEY` — required for the contact form to actually send email
  (via [Resend](https://resend.com)). Without it, the form still validates
  and submits, but returns a clear "not configured" error instead of
  silently failing.
- `NEXT_PUBLIC_SITE_URL` — used in metadata, the sitemap, and OG images.
  On Vercel, if this is unset it falls back to the deployment's own
  `VERCEL_URL` (so preview deployments get correct URLs automatically),
  then to `https://adhivex.com` as a last resort. Set it explicitly to your
  real domain for production.

## Content

All copy, services, and case studies live in
[`src/lib/content.ts`](src/lib/content.ts) — nothing is hardcoded in JSX, so
updating the site rarely means touching component code.

**Placeholder data to replace before launch:** case study specifics
(`caseStudies` — client names, metrics) are structural placeholders marked
`isPlaceholder: true`. Swap them for real values whenever you have them.

If a headless CMS (e.g. Sanity) is added later for case studies, only
`lib/content.ts`'s `caseStudies` export needs to change to an async fetch —
every component that consumes it is already decoupled from where the data
comes from.

## Project structure

- `src/app/*` — routes (`/`, `/services`, `/work`, `/contact`) plus
  `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`
- `src/components/hero/*` — the hero section
- `src/components/motion/*` — reusable motion primitives (scroll reveals,
  magnetic buttons, cursor-spotlight cards)
- `src/components/ui/*` — shadcn/ui components
- `src/store/useUIStore.ts` — Zustand store for nav + work-filter UI state
- `src/lib/content.ts` — typed content layer (see above)

## Deployment

Deploy on [Vercel](https://vercel.com/new) (zero config for Next.js):

1. Push this repo to GitHub/GitLab/Bitbucket, then import it in Vercel — or
   run `npx vercel` from this directory to deploy straight from your machine.
2. In the Vercel project's Environment Variables settings, add
   `RESEND_API_KEY` (and `NEXT_PUBLIC_SITE_URL` once you have a production
   domain — see above).
3. Vercel Analytics and Speed Insights are already wired into
   [`layout.tsx`](src/app/layout.tsx); no extra setup needed beyond enabling
   them for the project in the Vercel dashboard if you want the data to
   populate (they no-op harmlessly if left disabled).

Any other Node host works too (`npm run build && npm run start`), as long as
it supports the Next.js server runtime — this app uses a server action for
the contact form, so it can't be exported as static HTML.

## Notes

- Respects `prefers-reduced-motion` throughout — scroll reveals and other
  motion are either skipped or reduced to instant states.
