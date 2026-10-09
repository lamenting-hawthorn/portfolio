# Hawthorn AI Labs

Marketing site for **Hawthorn AI Labs** — a company that builds custom fine-tuned AI models and
agentic systems, then deploys them into enterprise pipelines.

Multi-page Next.js site with a dark, terminal-flavoured design system, a WebGL hero scene
(three.js / react-three-fiber) and layered scroll + pointer parallax.

## Pages

| Route          | Contents                                                              |
| -------------- | --------------------------------------------------------------------- |
| `/`            | Hero (3D pipeline), delivery pipeline diagram, capabilities, case study, process, stack |
| `/solutions`   | Why companies call, engagement models, deliverables, 10-week timeline  |
| `/models`      | Model types, training methods, data pipeline, evaluation gates         |
| `/agents`      | Agent anatomy, architecture layers, use cases, guardrails              |
| `/deployments` | Deployment targets, model CI/CD, SLOs, security FAQ                    |
| `/about`       | Position, principles, track record, open source, culture               |
| `/contact`     | Project brief form, direct channels, what happens next                 |

## Stack

- React 19 · Next.js 16 (App Router, Turbopack)
- Tailwind CSS 4
- [shadcn/ui](https://ui.shadcn.com) components (Radix-based: button, card, tabs, table,
  accordion, sheet, input, textarea, tooltip, badge, separator)
- three.js · @react-three/fiber · @react-three/drei
- lucide-react icons
- Deployable to Cloudflare Workers via the `vinext` build in `vite.config.ts`

## Design system

Everything lives in `app/globals.css`:

- `:root` — shadcn tokens plus the Hawthorn palette (`--hx-cyan`, `--hx-green`, `--hx-blue`,
  `--hx-amber`, `--hx-violet`) and the shared line/dim/glow values
- `.hx-container` / `.hx-section` — page grid and section rhythm
- `.hx-eyebrow`, `.hx-display`, `.hx-title`, `.hx-lede` — typography scale (Geist Mono for
  display and labels, Geist Sans for body)
- `.hx-panel`, `.hx-ticks`, `.hx-rule`, `.hx-grid-bg`, `.hx-glow`, `.hx-noise`, `.hx-scanlines`
  — surface and backdrop primitives
- `.hx-btn-primary` / `.hx-btn-ghost` — button treatments
- `.hx-reveal` — scroll-reveal (driven once by `RevealObserver` in the root layout)

## Motion

- `components/hero-scene.tsx` — the 3D pipeline: four stations (data → model → agents →
  deployment) with travelling energy pulses, orbiting agent nodes, floating DOM labels and
  pointer/scroll parallax driven in `useFrame`. Falls back to a static status panel without WebGL
  and pauses when scrolled out of view.
- `components/motion.tsx` — `RevealObserver` (IntersectionObserver for every `.hx-reveal`) and
  `ParallaxLayer` (scroll + pointer offsets; disabled under `prefers-reduced-motion`).
- `components/hero.tsx` — layered hero: parallax grid → 3D canvas → HUD chips → copy, with a
  scroll-linked fade on the stage and a typed terminal line.

## Run locally

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build   # static export of all 7 routes
npm run lint
npx tsc --noEmit
```

## Structure

```
app/                route segments (one folder per nav item)
components/         shared UI: header, footer, hero, 3D scene, cards, sections, blocks
components/ui/      shadcn/ui primitives
lib/utils.ts        cn() helper (shadcn)
app/globals.css     the entire design system
```

## Live site

[raghwender-agentic-portfolio.hawthorn-creates.chatgpt.site](https://raghwender-agentic-portfolio.hawthorn-creates.chatgpt.site)
