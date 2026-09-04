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
  Set it to your production domain before launch; it falls back to
  `https://adhivex.com` if unset.

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

## Deployment (Hostinger)

Deploy pipeline: **GitHub → Hostinger Node.js app (hPanel Git deploy) → live
site.** The host needs to run a persistent Node process (not static hosting)
— the contact form uses a server action, so this can't be exported as static
HTML.

Hostinger's Node.js hosting runs whatever file you set as the "Application
startup file" directly with `node`, not via an npm script — plain
`next start` doesn't work there. [`server.js`](server.js) exists for exactly
this: it wraps Next.js's programmatic server API and listens on the port
Hostinger assigns via `process.env.PORT`.

**One-time setup in hPanel:**

1. Under the domain → **Advanced → Node.js**, create an application:
   - Node.js version: 20.x or newer (matches `engines.node` in `package.json`)
   - Application root: the folder this repo is cloned into
   - **Application startup file: `server.js`**
2. In the same Node.js app's **Git** tab, connect this repository
   (`adhivex/adhivex_new`) and branch `main`.
3. Add environment variables on the Node.js app page: `RESEND_API_KEY` and
   `NEXT_PUBLIC_SITE_URL` (your real domain).

**On every deploy** (after hPanel pulls the latest commit), the app still
needs dependencies installed and a fresh build — hPanel's Git puller only
syncs files, it doesn't run `npm run build`. Check hPanel's Node.js app page
for a post-deploy/deployment-script field to automate this; if there isn't
one, run it manually over SSH after each pull:

```bash
npm install
npm run build
```

Then restart the app from hPanel's Node.js app page (or, if it uses
Passenger under the hood like other cPanel-style Node hosting, `touch
tmp/restart.txt` in the app root has the same effect).

## Notes

- Respects `prefers-reduced-motion` throughout — scroll reveals and other
  motion are either skipped or reduced to instant states.
