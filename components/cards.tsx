import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Feature card                                                       */
/* ------------------------------------------------------------------ */

export function FeatureCard({
  index,
  icon,
  title,
  body,
  href,
  delay = 0,
}: {
  index: string;
  icon?: ReactNode;
  title: string;
  body: string;
  href?: string;
  delay?: number;
}) {
  const className = cn(
    "hx-reveal group relative flex h-full flex-col gap-4 border border-white/10 bg-[#080c12] p-6 transition-all duration-300",
    "hover:-translate-y-1 hover:border-[#4ec9ff]/40 hover:bg-[#0a111a]",
    href && "cursor-pointer"
  );
  const style = { "--hx-delay": `${delay}ms` } as CSSProperties;

  const content = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-0 w-px bg-gradient-to-b from-[#4ec9ff] to-transparent transition-all duration-500 group-hover:h-full"
      />

      <div className="flex items-start justify-between">
        <span className="hx-mono text-[10px] font-semibold tracking-[0.2em] text-[#4ec9ff]">
          {index}
        </span>
        {icon && (
          <span className="text-[#4ec9ff]/70 transition-colors group-hover:text-[#4ec9ff]">
            {icon}
          </span>
        )}
      </div>

      <h3 className="text-[1.15rem] leading-snug font-semibold tracking-[-0.02em] text-white">
        {title}
      </h3>

      <p className="text-[14px] leading-relaxed text-[#8593a6]">{body}</p>

      {href && (
        <span className="hx-mono mt-auto inline-flex items-center gap-2 pt-2 text-[11px] tracking-[0.14em] text-[#5d6b7e] uppercase transition-colors group-hover:text-[#4ec9ff]">
          Explore{" "}
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <div className={className} style={style}>
      {content}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Big explore card (routes into a capability page)                   */
/* ------------------------------------------------------------------ */

export function ExploreCard({
  index,
  title,
  blurb,
  points,
  href,
  accent = "cyan",
  delay = 0,
}: {
  index: string;
  title: string;
  blurb: string;
  points: string[];
  href: string;
  accent?: "cyan" | "green" | "blue";
  delay?: number;
}) {
  const accentText =
    accent === "green" ? "text-[#3fb950]" : accent === "blue" ? "text-[#4f8dff]" : "text-[#4ec9ff]";
  const accentLine =
    accent === "green"
      ? "from-[#3fb950]"
      : accent === "blue"
        ? "from-[#4f8dff]"
        : "from-[#4ec9ff]";

  return (
    <Link
      href={href}
      className="hx-reveal group relative flex h-full flex-col overflow-hidden border border-white/10 bg-[#080c12] transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
      style={{ "--hx-delay": `${delay}ms` } as CSSProperties}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-px bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          accentLine
        )}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-24 -right-20 size-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40",
          accent === "green" ? "bg-[#3fb950]" : accent === "blue" ? "bg-[#4f8dff]" : "bg-[#4ec9ff]"
        )}
      />

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between">
          <span className={cn("hx-mono text-[10px] font-semibold tracking-[0.2em]", accentText)}>
            {index}
          </span>
          <ArrowUpRight className="size-4 text-[#3f4c5c] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
        </div>

        <h3 className="hx-display mt-6 text-[clamp(1.5rem,2.4vw,1.95rem)] text-white">{title}</h3>
        <p className="mt-3 text-[14px] leading-relaxed text-[#8593a6]">{blurb}</p>

        <ul className="mt-6 flex flex-col gap-2 border-t border-white/8 pt-5">
          {points.map((p) => (
            <li key={p} className="hx-mono flex items-center gap-2.5 text-[11.5px] text-[#6f8296]">
              <span className={cn("size-1 rounded-full bg-current", accentText)} />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Numbered process step                                              */
/* ------------------------------------------------------------------ */

export function StepCard({
  n,
  title,
  body,
  meta,
  delay = 0,
}: {
  n: string;
  title: string;
  body: string;
  meta?: string;
  delay?: number;
}) {
  return (
    <article
      className="hx-reveal group relative flex flex-col gap-3 border-t border-white/12 pt-6"
      style={{ "--hx-delay": `${delay}ms` } as CSSProperties}
    >
      <span className="absolute -top-px left-0 h-px w-0 bg-[#4ec9ff] transition-all duration-500 group-hover:w-full" />
      <div className="flex items-center justify-between">
        <span className="hx-mono text-[11px] font-semibold tracking-[0.2em] text-[#4ec9ff]">
          {n}
        </span>
        {meta && (
          <span className="hx-mono text-[9.5px] tracking-[0.16em] text-[#3f4c5c] uppercase">
            {meta}
          </span>
        )}
      </div>
      <h3 className="text-[1.05rem] leading-snug font-semibold tracking-[-0.02em] text-white">
        {title}
      </h3>
      <p className="text-[13.5px] leading-relaxed text-[#7e8da3]">{body}</p>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Metric                                                             */
/* ------------------------------------------------------------------ */

export function Metric({
  value,
  label,
  sub,
  delay = 0,
}: {
  value: string;
  label: string;
  sub?: string;
  delay?: number;
}) {
  return (
    <div
      className="hx-reveal flex flex-col gap-2"
      style={{ "--hx-delay": `${delay}ms` } as CSSProperties}
    >
      <strong className="hx-display text-[clamp(2.2rem,4vw,3.4rem)] leading-none font-medium text-[#4ec9ff] [text-shadow:0_0_50px_rgba(78,201,255,0.35)]">
        {value}
      </strong>
      <span className="hx-mono text-[10.5px] leading-relaxed tracking-[0.14em] text-[#8593a6] uppercase">
        {label}
      </span>
      {sub && <span className="text-[13px] leading-relaxed text-[#5d6b7e]">{sub}</span>}
    </div>
  );
}
