import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/section";

/* ------------------------------------------------------------------ */
/*  Marquee                                                            */
/* ------------------------------------------------------------------ */

export function Marquee({
  items,
  reverse = false,
  className,
}: {
  items: ReactNode[];
  reverse?: boolean;
  className?: string;
}) {
  const row = (key: string) => (
    <div className="flex shrink-0 items-center" key={key} aria-hidden={key === "b"}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          {item}
          <span className="mx-6 text-[var(--hx-cyan)]/45 md:mx-8">/</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("hx-marquee-mask overflow-hidden", className)}>
      <div
        className={cn("hx-marquee", reverse && "hx-marquee--reverse")}
        style={{ animationDuration: reverse ? "64s" : "44s" }}
      >
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Call to action                                                     */
/* ------------------------------------------------------------------ */

export function CTABand({
  eyebrow = "Start a build",
  title,
  lede,
  primary = { label: "Build Your AI System", href: "/contact" },
  secondary = { label: "See Our Solutions", href: "/solutions" },
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden border-t border-[var(--hx-line)] bg-[var(--hx-bg)]">
      <div className="hx-grid-bg opacity-70" aria-hidden />
      <div
        aria-hidden
        className="hx-glow top-1/2 left-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 bg-[var(--hx-glow)]"
        style={{ opacity: 0.45 }}
      />
      <div className="hx-noise" aria-hidden />

      <div className="hx-container relative z-10 flex flex-col items-start gap-8 py-20 md:items-center md:py-28">
        <div className="flex w-full flex-col items-start gap-7 md:items-center">
          <Eyebrow bracket tone="green">
            {eyebrow}
          </Eyebrow>

          <h2 className="hx-display hx-reveal max-w-4xl text-[clamp(2rem,5vw,3.75rem)] text-[var(--hx-heading)] md:text-center">
            {title}
          </h2>

          {lede && (
            <p className="hx-lede hx-reveal max-w-2xl [--hx-delay:120ms] md:text-center">
              {lede}
            </p>
          )}
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:justify-center">
          <Link href={primary.href} className="hx-btn hx-btn-primary hx-reveal [--hx-delay:200ms]">
            {primary.label}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={secondary.href}
            className="hx-btn hx-btn-ghost hx-reveal [--hx-delay:260ms]"
          >
            {secondary.label}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <p className="hx-mono hx-reveal text-[10.5px] tracking-[0.16em] text-[var(--hx-faint)] uppercase [--hx-delay:320ms]">
          Typical first response within 24 hours · NDA-friendly
        </p>
      </div>
    </section>
  );
}
