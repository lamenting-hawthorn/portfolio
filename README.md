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

- `:root` holds the **light** tokens, `.dark` holds the **dark** tokens — both the shadcn set
  (`--background`, `--foreground`, `--card`, `--muted-foreground`, `--border`, …) and the
  Hawthorn semantic set (`--hx-bg`, `--hx-surface`, `--hx-heading`, `--hx-muted`, `--hx-line`,
  `--hx-cyan`, `--hx-green`, `--hx-blue`, `--hx-btn-*`, …)
- `.hx-container` / `.hx-gutter` / `.hx-section` — page grid (1440px, fluid gutter) and section
  rhythm. `.hx-gutter` matches `.hx-container`'s content box so full-height layers (the hero
  stage) line up with the page grid.
- `.hx-eyebrow`, `.hx-display`, `.hx-title`, `.hx-lede` — typography scale (Geist Mono for
  display and labels, Geist Sans for body)
- `.hx-panel`, `.hx-ticks`, `.hx-rule`, `.hx-grid-bg`, `.hx-glow`, `.hx-noise`, `.hx-scanlines`
  — surface and backdrop primitives
- `.hx-btn-primary` / `.hx-btn-ghost` — button treatments
- `.hx-reveal` — fade + 18px rise for sections/cards
- `.hx-rise` — masked line reveal for display headlines (the line slides up from behind its own
  clip; no blur, no bounce)

### Theme

- `lib/theme.ts` exports `THEME_INIT_SCRIPT`, which runs as the first thing in `<body>` so the
  resolved theme is applied before anything paints (no flash).
- Resolution order: stored choice (`hawthorn-theme`) → `prefers-color-scheme` → dark.
- `components/theme-toggle.tsx` exposes a sun/moon button (header + mobile sheet). It reads state
  with `useSyncExternalStore` and broadcasts `hx:theme`, which `components/hero-scene.tsx` uses to
  re-read its WebGL palette from the same tokens.
- Every colour in the TSX is a `var(--hx-*)` reference, so both themes are driven from one place.

## Motion

- `components/hero-scene.tsx` — the 3D pipeline: four stations (data → model → agents →
  deployment) with travelling energy pulses, orbiting agent nodes, floating DOM labels and
  pointer/scroll parallax driven in `useFrame`. Its palette is read from the CSS tokens so it
  follows the theme. Falls back to a static status panel without WebGL and pauses when scrolled
  out of view.
- `components/motion.tsx` — `RevealObserver` (rAF-driven, immune to fast-scroll skips, handles
  both `.hx-reveal` and `.hx-rise`) and `ParallaxLayer` (scroll + pointer offsets; disabled under
  `prefers-reduced-motion`).
- `components/hero.tsx` — layered hero: parallax grid → contained 3D stage → HUD chips → copy,
  with a scroll-linked fade on the stage. Deliberately restrained: no typewriters, no bouncing
  cues, no floating cards.

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
