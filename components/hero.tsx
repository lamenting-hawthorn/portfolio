"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { HeroScene } from "@/components/hero-scene";
import { ParallaxLayer } from "@/components/motion";

/* ------------------------------------------------------------------ */
/*  HUD chips — static panels that move with the scroll/pointer only    */
/* ------------------------------------------------------------------ */

function HudChip({
  className,
  speed,
  label,
  value,
  rows,
  tone = "cyan",
}: {
  className?: string;
  speed: number;
  label: string;
  value?: string;
  rows?: Array<{ k: string; v: string; ok?: boolean }>;
  tone?: "cyan" | "green";
}) {
  return (
    <ParallaxLayer speed={speed} pointer={0.3} className={className}>
      <div className="hx-panel hx-ticks bg-[var(--hx-surface)]/85 px-4 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span
            className={
              tone === "green"
                ? "size-1.5 rounded-full bg-[var(--hx-green)]"
                : "size-1.5 rounded-full bg-[var(--hx-cyan)]"
            }
          />
          <span className="hx-mono text-[9.5px] font-semibold tracking-[0.16em] whitespace-nowrap text-[var(--hx-muted-2)] uppercase">
            {label}
          </span>
          {value && (
            <span
              className={`hx-mono ml-auto text-[10px] font-semibold tracking-[0.06em] whitespace-nowrap ${
                tone === "green" ? "text-[var(--hx-green)]" : "text-[var(--hx-cyan)]"
              }`}
            >
              {value}
            </span>
          )}
        </div>

        {rows && (
          <ul className="mt-3 flex flex-col gap-1.5">
            {rows.map((r) => (
              <li
                key={r.k}
                className="hx-mono flex items-center justify-between gap-6 text-[10px] tracking-[0.06em] text-[var(--hx-muted-2)]"
              >
                <span>{r.k}</span>
                <span className={r.ok ? "text-[var(--hx-green)]" : "text-[var(--hx-cyan-soft)]"}>
                  {r.v}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ParallaxLayer>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

const EYEBROW = ["Fine-tuned Models", "Agentic Systems", "Production Deployments"];

const HEADLINE = [
  { text: "Your Data.", delay: "80ms", accent: false },
  { text: "Custom Models.", delay: "200ms", accent: false },
  { text: "Real Agents.", delay: "320ms", accent: true },
];

const STAGE_MASK =
  "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.45) 12%, #000 34%, #000 88%, transparent 100%)";

export function Hero() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const section = useRef<HTMLElement>(null);

  /* fade the stage out over the first screen of scrolling */
  useEffect(() => {
    const onScroll = () => {
      const h = section.current?.offsetHeight ?? window.innerHeight;
      setProgress(Math.min(1, Math.max(0, window.scrollY / (h * 0.8))));
      setVisible(window.scrollY < h + 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={section}
      className="relative min-h-[calc(100svh-68px)] overflow-hidden border-b border-[var(--hx-line)]"
    >
      {/* ---------- ambient backdrop ---------- */}
      <ParallaxLayer
        speed={0.08}
        className="pointer-events-none absolute inset-0"
        style={{ height: "118%" }}
      >
        <div className="hx-grid-bg" />
      </ParallaxLayer>

      <div
        aria-hidden
        className="hx-glow top-[-16rem] left-[16%] size-[40rem] bg-[var(--hx-glow)]"
        style={{ opacity: 0.5 }}
      />
      <div
        aria-hidden
        className="hx-glow bottom-[-14rem] right-[-6rem] size-[36rem] bg-[var(--hx-glow)]"
        style={{ opacity: 0.45 }}
      />
      <div className="hx-noise" aria-hidden />

      {/* ---------- 3D stage + HUD, aligned to the page grid ---------- */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ opacity: 1 - progress * 0.95, transition: "opacity .25s linear" }}
        aria-hidden
      >
        <div className="hx-gutter h-full">
          <div className="relative h-full">
            <div
              className="absolute inset-y-0 right-0 left-0 md:left-[36%]"
              style={{ maskImage: STAGE_MASK, WebkitMaskImage: STAGE_MASK }}
            >
              {visible && (
                <div className="absolute inset-0 max-md:opacity-45">
                  <HeroScene />
                </div>
              )}
            </div>

            <div className="absolute inset-0 hidden lg:block">
              <HudChip
                className="absolute right-0 top-[13%] w-[230px]"
                speed={-0.05}
                label="fine-tune job"
                value="eval 97.4"
                rows={[
                  { k: "domain", v: "finance" },
                  { k: "base", v: "llama-3.3-70b" },
                  { k: "delta", v: "+18.6 pts", ok: true },
                ]}
              />
              <HudChip
                className="absolute right-[27%] top-[20%] w-[210px]"
                speed={0.07}
                tone="green"
                label="agent loop"
                value="running"
                rows={[
                  { k: "plan", v: "ok", ok: true },
                  { k: "use tools", v: "ok", ok: true },
                  { k: "take action", v: "3 steps" },
                ]}
              />
              <HudChip
                className="absolute right-0 bottom-[15%] w-[224px]"
                speed={-0.08}
                label="deployment"
                value="live"
                rows={[
                  { k: "cloud", v: "healthy", ok: true },
                  { k: "on-prem", v: "healthy", ok: true },
                  { k: "p95 latency", v: "214 ms" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- copy ---------- */}
      <div className="hx-container relative z-20 flex min-h-[calc(100svh-68px)] flex-col justify-center py-16">
        <div className="max-w-[46rem]">
          {/* eyebrow */}
          <div className="hx-reveal flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="hx-mono text-[0.688rem] font-semibold tracking-[0.18em] text-[var(--hx-green)] uppercase">
              [
            </span>
            {EYEBROW.map((e, i) => (
              <span key={e} className="flex items-center gap-3">
                {i > 0 && <span className="text-[var(--hx-green)]/60">/</span>}
                <span className="hx-mono text-[0.688rem] font-semibold tracking-[0.18em] text-[var(--hx-green)] uppercase">
                  {e}
                </span>
              </span>
            ))}
            <span className="hx-mono text-[0.688rem] font-semibold tracking-[0.18em] text-[var(--hx-green)] uppercase">
              ]
            </span>
          </div>

          {/* headline — masked line reveal, no blur, no bounce */}
          <h1 className="hx-display mt-7 text-[clamp(2rem,5.6vw,4.75rem)] leading-[1.06] text-[var(--hx-heading)]">
            {HEADLINE.map((line) => (
              <span
                key={line.text}
                className="hx-rise"
                style={
                  {
                    "--hx-delay": line.delay,
                    color: line.accent ? "var(--hx-cyan)" : undefined,
                  } as CSSProperties
                }
              >
                <i>{line.text}</i>
              </span>
            ))}
          </h1>

          <p className="hx-lede hx-reveal mt-7 [--hx-delay:480ms]">
            We build and fine-tune custom AI models and deploy agentic systems that work for your
            business — from research to production.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="hx-btn hx-btn-primary hx-reveal [--hx-delay:560ms]">
              Build Your AI System
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/solutions"
              className="hx-btn hx-btn-ghost hx-reveal [--hx-delay:620ms]"
            >
              See Our Solutions
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          {/* status line */}
          <div className="hx-panel hx-reveal mt-11 max-w-xl bg-[var(--hx-surface)]/80 px-4 py-3.5 backdrop-blur-md [--hx-delay:700ms]">
            <p className="hx-mono text-[12.5px] leading-relaxed text-[var(--hx-green)]">
              <span className="mr-2 select-none text-[var(--hx-faint)]">&gt;</span>
              Building intelligent systems for what&apos;s next.
            </p>
          </div>
        </div>

        {/* bottom rail */}
        <div className="mt-auto pt-12">
          <div className="flex flex-col gap-5 border-t border-[var(--hx-line)] pt-6 md:flex-row md:items-center md:justify-between">
            <p className="hx-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] tracking-[0.16em] text-[var(--hx-faint)] uppercase">
              <span className="text-[var(--hx-muted-2)]">Custom Models</span>
              <span className="text-[var(--hx-faint-2)]">/</span>
              <span className="text-[var(--hx-muted-2)]">Agentic Workflows</span>
              <span className="text-[var(--hx-faint-2)]">/</span>
              <span className="text-[var(--hx-muted-2)]">Enterprise Deployment</span>
            </p>

            <div className="flex items-center gap-3">
              <span className="hx-mono text-[10px] tracking-[0.16em] text-[var(--hx-faint)] uppercase">
                Scroll to explore
              </span>
              <span className="grid size-7 place-items-center rounded-full border border-[var(--hx-line-strong)] text-[var(--hx-cyan)]">
                <ChevronDown className="size-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
