import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import type { ReactNode } from "react";
import { ParallaxLayer } from "@/components/motion";

export function PageHero({
  index,
  eyebrow,
  title,
  lede,
  panel,
  stats,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  panel?: ReactNode;
  stats?: Array<{ label: string; value: string }>;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/8 pb-16 pt-14 md:pb-20 md:pt-20">
      {/* backdrops */}
      <ParallaxLayer speed={0.06} className="pointer-events-none absolute inset-0" zIndex={0}>
        <div className="hx-grid-bg" />
      </ParallaxLayer>
      <div
        aria-hidden
        className="hx-glow left-[-14rem] top-[-16rem] size-[34rem] bg-[#0f3f66]"
        style={{ opacity: 0.55 }}
      />
      <div
        aria-hidden
        className="hx-glow right-[-8rem] top-[10%] size-[26rem] bg-[#0b2f52]"
        style={{ opacity: 0.4 }}
      />
      <div className="hx-noise" aria-hidden />

      <div className="hx-container relative z-10">
        <nav aria-label="Breadcrumb" className="hx-reveal mb-7">
          <ol className="hx-mono flex items-center gap-2 text-[10.5px] tracking-[0.16em] text-[#4d5a6b] uppercase">
            <li>
              <Link href="/" className="transition-colors hover:text-[#4ec9ff]">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-[#2b3646]">
              /
            </li>
            <li className="text-[#8593a6]">{eyebrow}</li>
          </ol>
        </nav>

        <span className="hx-eyebrow hx-eyebrow--bracket hx-reveal">{eyebrow}</span>

        <h1 className="hx-display hx-reveal mt-6 text-[clamp(2.15rem,5.4vw,4.4rem)] leading-[1.03] text-white [--hx-delay:70ms]">
          {title}
        </h1>

        <div className="mt-9 grid gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-12">
          <div className="flex flex-col gap-7">
            <p className="hx-lede hx-reveal !text-[#93a2b6] [--hx-delay:150ms]">{lede}</p>

            <div className="hx-mono hx-reveal flex items-center gap-3 text-[10.5px] tracking-[0.18em] text-[#3f4c5c] uppercase [--hx-delay:210ms]">
              <span className="text-[#4ec9ff]">{index}</span>
              <span className="h-px w-16 bg-white/12" />
              <span>Hawthorn AI Labs</span>
            </div>
          </div>

          {panel && <div className="hx-reveal [--hx-delay:230ms]">{panel}</div>}
        </div>

        {stats && stats.length > 0 && (
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#070a10] px-5 py-5">
                <dt className="hx-mono text-[10px] tracking-[0.16em] text-[#5d6b7e] uppercase">
                  {s.label}
                </dt>
                <dd className="hx-mono mt-2 text-[clamp(1.15rem,1.7vw,1.5rem)] leading-tight font-medium tracking-[-0.03em] text-[#4ec9ff]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function TerminalPanel({
  title = "hawthorn@labs:~",
  lines,
  footer,
}: {
  title?: string;
  lines: Array<{ tone?: "muted" | "cyan" | "green" | "white"; text: string }>;
  footer?: string;
}) {
  const toneClass: Record<string, string> = {
    muted: "text-[#5d6b7e]",
    cyan: "text-[#4ec9ff]",
    green: "text-[#3fb950]",
    white: "text-[#c9d5e3]",
  };

  return (
    <div className="hx-panel hx-ticks hx-scanlines relative overflow-hidden bg-[#070a10]/90">
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
        <span className="size-2 rounded-full bg-[#ff5f57]/70" />
        <span className="size-2 rounded-full bg-[#febc2e]/70" />
        <span className="size-2 rounded-full bg-[#28c840]/70" />
        <span className="hx-mono ml-2 text-[10.5px] tracking-[0.1em] text-[#4d5a6b]">
          {title}
        </span>
      </div>
      <div className="flex flex-col gap-2.5 px-5 py-5">
        {lines.map((l, i) => (
          <p
            key={i}
            className={cn(
              "hx-mono flex gap-2 text-[12px] leading-relaxed break-words",
              toneClass[l.tone ?? "muted"]
            )}
          >
            <span className="shrink-0 select-none text-[#2f3c4c]">$</span>
            <span className="min-w-0">{l.text}</span>
          </p>
        ))}
        <p className="hx-mono mt-1 flex items-center gap-2 text-[12px] text-[#3fb950]">
          <ArrowRight className="size-3 shrink-0" />
          {footer ?? "ready"}
        </p>
      </div>
    </div>
  );
}
