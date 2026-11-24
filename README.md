# OTHER/FORM®

A premium, original creative-studio website built with Next.js, TypeScript, Tailwind CSS, GSAP, Three.js, React Three Fiber, Motion, Lenis, and shadcn/ui primitives.

The visual direction combines oversized editorial typography, an off-black/signal-lime design system, an interactive sculptural hero, asymmetric project storytelling, and purposeful motion. It is inspired by the production quality of leading interactive studios, not by copied layouts or assets.

## Included

- Responsive single-page studio website
- Real-time React Three Fiber sculpture with particle orbit and mouse/scroll response
- Professional loading transition and cinematic section reveals
- Lenis smooth scrolling synchronized with GSAP ScrollTrigger
- Magnetic calls to action and animated scroll progress
- Touch-, button-, and keyboard-operable horizontal project slider
- Four complete case-study dialogs with Escape, backdrop, and close-button dismissal
- Accessible mobile navigation and capability accordion
- Interactive Canvas 2D particle playground with energy, density, and pause controls
- Validated project-brief form that prepares a real `mailto:` draft without pretending to send data
- Clipboard copy with a legacy fallback and error feedback
- Reduced-motion variants for scrolling, WebGL, Canvas, and interface animation
- Metadata, Open Graph image, icon, `robots.txt`, and `sitemap.xml`
- Playwright production-browser tests at 375, 768, 1024, and 1440 px
- Vercel configuration and private GitHub repository

## Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16.4.6, React 19.3, TypeScript |
| Styling | Tailwind CSS 4.3, OKLCH design tokens |
| UI | shadcn/ui patterns, Radix Dialog/Accordion/Slider, Lucide icons |
| 3D | Three.js, React Three Fiber, Drei |
| Motion | GSAP ScrollTrigger, Motion for React, Lenis |
| Fonts | Archivo Variable, Instrument Serif, IBM Plex Mono (self-hosted) |
| Verification | Playwright, ESLint, TypeScript, Next.js production build |

## Run locally

Requirements: Node.js 20.9 or newer. Verified with Node.js 24.21.0.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. To use the Kimi Work preview port:

```bash
npm run dev -- --hostname 127.0.0.1 --port 7100
```

The development script uses Next.js's supported Webpack path for consistent behavior on Windows. CLI host and port arguments are forwarded normally.

## Production

```bash
npm run lint
npm run build
npm run start
```

The home page, icon, Open Graph image, robots route, and sitemap are statically prerendered. See `TESTING.md` for the verified release report.

## Browser tests

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

Playwright starts and stops the production server automatically on port 7100. Reports are written to ignored `test-results/` and `playwright-report/` directories.

## Project structure

```text
src/
  app/                 App Router, metadata, global tokens and styles
  components/
    ui/                Reusable shadcn/Radix primitives
    hero-scene.tsx      Lazy-loaded React Three Fiber scene
    hero.tsx            Editorial hero and entrance choreography
    projects.tsx        Project slider and case-study dialogs
    playground.tsx      Interactive Canvas 2D particle system
    contact.tsx         Validated mailto brief and clipboard flow
    ...                 Navigation, sections, motion, footer
  data/projects.ts      Typed project content
  hooks/use-reveal.ts   Reusable GSAP reveal behavior
  lib/utils.ts          Class-name utility
 tests/site.spec.ts     Production browser verification
public/                 Static assets directory
vercel.json             Vercel build and region configuration
```

## SEO configuration

Set the public production origin when deploying:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

The value feeds canonical metadata, Open Graph URLs, robots, and sitemap generation. Replace the demonstration studio name, email address, project content, and results before using the site for a real business.

## Deploy to Vercel

The repository includes `vercel.json` with the Next.js framework, build command, and Paris region (`cdg1`).

### GitHub integration (recommended)

1. Import the GitHub repository into Vercel.
2. Keep the detected Next.js settings.
3. Add `NEXT_PUBLIC_SITE_URL` if a custom domain is configured.
4. Deploy and verify the generated URL.

### CLI

```bash
npx vercel login
npx vercel link
npx vercel --prod
```

An anonymous CLI deployment was attempted during development, but the Vercel builder hit a Windows symlink-permission error. No public deployment is claimed in this delivery; the verified project is deployment-ready through an authenticated Vercel account or GitHub integration.

## Accessibility and performance

- Semantic DOM content remains independent of the decorative canvases.
- Dialogs and menus use Radix focus management and keyboard dismissal.
- Controls have visible focus states and minimum 44 px touch targets.
- Reduced-motion mode removes smooth scrolling and ambient animation and disables the playground pause control.
- The 3D bundle is lazy-loaded, device pixel ratio is capped at 1.5, and the CSS poster remains visible if WebGL is unavailable.
- Fonts and project artwork are local; no remote image or font requests are required.
- The contact form stores nothing and sends nothing by itself. It creates an email draft for the visitor to review.

## Content and credits

All project names, case-study metrics, and studio details are demonstration content. Project artwork is original, procedurally constructed SVG. See `CREDITS.md` for font and reference notes.
