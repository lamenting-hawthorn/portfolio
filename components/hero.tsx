"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { HeroScene } from "@/components/hero-scene";
import { ParallaxLayer } from "@/components/motion";

/* ------------------------------------------------------------------ */
/*  Floating HUD chips (parallax over the 3D stage)                    */
/* ------------------------------------------------------------------ */

function HudChip({
  className,
  speed,
  delay = 0,
  label,
  value,
  rows,
  tone = "cyan",
}: {
  className?: string;
  speed: number;
  delay?: number;
  label: string;
  value?: string;
  rows?: Array<{ k: string; v: string; ok?: boolean }>;
  tone?: "cyan" | "green";
}) {
  return (
    <ParallaxLayer speed={speed} pointer={0.35} className={className}>
      <div
        className="hx-panel hx-ticks animate-float bg-[#070a10]/85 px-4 py-3.5 backdrop-blur-md"
        style={{ animationDelay: `${delay}s` }}
      >
        <div className="flex items-center gap-2">
          <span
            className={
              tone === "green"
                ? "size-1.5 animate-pulse-glow rounded-full bg-[#3fb950]"
                : "size-1.5 animate-pulse-glow rounded-full bg-[#4ec9ff]"
            }
          />
          <span className="hx-mono text-[9.5px] font-semibold tracking-[0.16em] whitespace-nowrap text-[#8593a6] uppercase">
            {label}
          </span>
          {value && (
            <span
              className={cnTone(
                "hx-mono ml-auto text-[10px] font-semibold tracking-[0.06em] whitespace-nowrap",
                tone
              )}
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
                className="hx-mono flex items-center justify-between gap-6 text-[10px] tracking-[0.06em] text-[#6f8296]"
              >
                <span>{r.k}</span>
                <span className={r.ok ? "text-[#3fb950]" : "text-[#9fd8ff]"}>{r.v}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ParallaxLayer>
  );
}

function cnTone(base: string, tone: "cyan" | "green") {
  return `${base} ${tone === "green" ? "text-[#3fb950]" : "text-[#4ec9ff]"}`;
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

const EYEBROW = ["Fine-tuned Models", "Agentic Systems", "Production Deployments"];

export function Hero() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [typed, setTyped] = useState("");
  const full = "Building intelligent systems for what's next.";
  const section = useRef<HTMLElement>(null);

  /* scroll progress across the hero → fades the stage out */
  useEffect(() => {
    const onScroll = () => {
      const h = section.current?.offsetHeight ?? window.innerHeight;
      const p = Math.min(1, Math.max(0, window.scrollY / (h * 0.8)));
      setProgress(p);
      setVisible(window.scrollY < h + 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* terminal typing */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const frame = requestAnimationFrame(() => setTyped(full));
      return () => cancelAnimationFrame(frame);
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) window.clearInterval(id);
    }, 42);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      ref={section}
      className="relative min-h-[calc(100svh-68px)] overflow-hidden border-b border-white/8"
    >
      {/* ---------- layer 0 : ambient backdrop ---------- */}
      <ParallaxLayer
        speed={0.1}
        className="pointer-events-none absolute inset-0"
        style={{ height: "120%" }}
      >
        <div className="hx-grid-bg" />
      </ParallaxLayer>

      <div
        aria-hidden
        className="hx-glow top-[-16rem] left-[18%] size-[40rem] bg-[#0e3c62]"
        style={{ opacity: 0.55 }}
      />
      <div
        aria-hidden
        className="hx-glow bottom-[-14rem] right-[-6rem] size-[36rem] bg-[#0a2745]"
        style={{ opacity: 0.5 }}
      />
      <div className="hx-noise" aria-hidden />

      {/* ---------- layer 1 : 3D stage ---------- */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden md:left-[30%]"
        style={{
          opacity: 1 - progress * 0.95,
          transition: "opacity .2s linear",
        }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent 0%, rgba(0,0,0,.35) 8%, #000 26%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, rgba(0,0,0,.35) 8%, #000 26%)",
          }}
        >
          {visible ? (
            <div className="absolute inset-0 max-md:opacity-40">
              <HeroScene />
            </div>
          ) : null}
        </div>
      </div>

      {/* ---------- layer 2 : HUD chips ---------- */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
        <HudChip
          className="absolute right-[5%] top-[13%] w-[230px]"
          speed={-0.06}
          label="fine-tune job"
          value="eval 97.4"
          rows={[
            { k: "domain", v: "finance" },
            { k: "base", v: "llama-3.3-70b" },
            { k: "delta", v: "+18.6 pts", ok: true },
          ]}
        />
        <HudChip
          className="absolute right-[26%] top-[20%] w-[210px]"
          speed={0.08}
          delay={1.4}
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
          className="absolute right-[5%] bottom-[16%] w-[224px]"
          speed={-0.1}
          delay={0.7}
          label="deployment"
          value="live"
          rows={[
            { k: "cloud", v: "healthy", ok: true },
            { k: "on-prem", v: "healthy", ok: true },
            { k: "p95 latency", v: "214 ms" },
          ]}
        />
      </div>

      {/* ---------- layer 3 : copy ---------- */}
      <div className="hx-container relative z-20 flex min-h-[calc(100svh-68px)] flex-col justify-center py-20">
        <div className="max-w-[42rem]">
          {/* eyebrow */}
          <div className="hx-reveal flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="hx-mono text-[0.688rem] font-semibold tracking-[0.18em] text-[#3fb950] uppercase">
              [
            </span>
            {EYEBROW.map((e, i) => (
              <span key={e} className="flex items-center gap-3">
                {i > 0 && <span className="text-[#3fb950]/60">/</span>}
                <span className="hx-mono text-[0.688rem] font-semibold tracking-[0.18em] text-[#3fb950] uppercase">
                  {e}
                </span>
              </span>
            ))}
            <span className="hx-mono text-[0.688rem] font-semibold tracking-[0.18em] text-[#3fb950] uppercase">
              ]
            </span>
          </div>

          {/* headline */}
          <h1 className="hx-display mt-7 text-[clamp(2rem,5.6vw,4.75rem)] leading-[1.06] text-white">
            {[
              { text: "Your Data.", delay: "60ms", accent: false },
              { text: "Custom Models.", delay: "170ms", accent: false },
              { text: "Real Agents.", delay: "280ms", accent: true },
            ].map((line) => (
              <span key={line.text} className="block py-[0.03em]">
                <span
                  className="hx-reveal block"
                  style={
                    {
                      "--hx-delay": line.delay,
                      color: line.accent ? "#4ec9ff" : undefined,
                      textShadow: line.accent
                        ? "0 0 70px rgba(78,201,255,0.5)"
                        : undefined,
                    } as CSSProperties
                  }
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <p className="hx-lede hx-reveal mt-7 !text-[#a4b2c5] [--hx-delay:420ms]">
            We build and fine-tune custom AI models and deploy agentic systems that work for your
            business — from research to production.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="hx-btn hx-btn-primary hx-reveal [--hx-delay:500ms]"
            >
              Build Your AI System
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/solutions"
              className="hx-btn hx-btn-ghost hx-reveal !border-transparent !bg-transparent hover:!border-[#4ec9ff]/45 [--hx-delay:560ms]"
            >
              See Our Solutions
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          {/* terminal */}
          <div
            className="hx-panel hx-reveal mt-11 max-w-xl bg-[#070a10]/80 px-4 py-3.5 backdrop-blur-md [--hx-delay:640ms]"
          >
            <p className="hx-mono text-[12.5px] leading-relaxed text-[#3fb950]">
              <span className="mr-2 select-none text-[#4d5a6b]">&gt;</span>
              {typed}
              {typed.length < full.length && <span className="hx-caret" />}
            </p>
          </div>
        </div>

        {/* bottom strip */}
        <div className="mt-auto pt-16">
          <div className="flex flex-col gap-5 border-t border-white/8 pt-6 md:flex-row md:items-center md:justify-between">
            <p className="hx-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] tracking-[0.16em] text-[#5d6b7e] uppercase">
              <span className="text-[#8593a6]">Custom Models</span>
              <span className="text-[#2b3646]">/</span>
              <span className="text-[#8593a6]">Agentic Workflows</span>
              <span className="text-[#2b3646]">/</span>
              <span className="text-[#8593a6]">Enterprise Deployment</span>
            </p>

            <div className="flex items-center gap-3">
              <span className="hx-mono text-[10px] tracking-[0.16em] text-[#4d5a6b] uppercase">
                Scroll to explore
              </span>
              <span className="grid size-7 place-items-center rounded-full border border-white/12 text-[#4ec9ff]">
                <ChevronDown className="size-3.5 animate-bounce" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
