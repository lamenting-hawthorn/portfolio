import { cn } from "cn";
import type { CSSProperties } from "react";

/* ------------------------------------------------------------------ */
/*  Line-art icons (drawn to match the blueprint aesthetic)            */
/* ------------------------------------------------------------------ */

function IconData() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="size-16" aria-hidden>
      <ellipse cx="32" cy="16" rx="18" ry="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 16v14c0 3.9 8.1 7 18 7s18-3.1 18-7V16" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 30v14c0 3.9 8.1 7 18 7s18-3.1 18-7V30" stroke="currentColor" strokeWidth="1.6" />
      <path d="M52 30v14c0 3.9-8.1 7-18 7" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" />
      <circle cx="24" cy="41" r="1.6" fill="currentColor" />
      <circle cx="30" cy="45" r="1.6" fill="currentColor" />
      <circle cx="37" cy="43" r="1.6" fill="currentColor" />
    </svg>
  );
}

function IconModel() {
  const nodes = [
    [16, 44],
    [16, 32],
    [16, 20],
    [48, 44],
    [48, 32],
    [48, 20],
  ];
  return (
    <svg viewBox="0 0 64 64" fill="none" className="size-16" aria-hidden>
      {nodes.slice(0, 3).map((a) =>
        nodes.slice(3).map((b) => (
          <path
            key={`${a[0]}${a[1]}${b[0]}${b[1]}`}
            d={`M${a[0]} ${a[1]}L${b[0]} ${b[1]}`}
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.5"
          />
        ))
      )}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4.6" fill="#05070c" stroke="currentColor" strokeWidth="1.6" />
          <circle cx={x} cy={y} r="1.6" fill="currentColor" />
        </g>
      ))}
      <path d="M16 32h32" stroke="currentColor" strokeWidth="1.6" opacity="0.9" />
    </svg>
  );
}

function IconAgent() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="size-16" aria-hidden>
      <path d="M32 8v6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="32" cy="6" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14" y="14" width="36" height="30" rx="6" stroke="currentColor" strokeWidth="1.6" />
      <rect x="22" y="24" width="8" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="34" y="24" width="8" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M24 38h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14 26H8M50 26h6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M32 44v6M22 56h20M32 50v6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M44 50c4 0 6-2 6-6" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" />
    </svg>
  );
}

function IconDeploy() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="size-16" aria-hidden>
      <path
        d="M20 44h26a9 9 0 0 0 .8-17.97A14 14 0 0 0 20.5 24 9.5 9.5 0 0 0 20 44Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M26 34l6-3.5 6 3.5v7L32 44.5 26 41v-7Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M32 30.5v7M26 34l6 3.5 6-3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 52h40" stroke="currentColor" strokeWidth="1.6" strokeDasharray="4 4" />
      <circle cx="16" cy="52" r="2" fill="currentColor" />
      <circle cx="48" cy="52" r="2" fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

const STAGES = [
  {
    id: "01",
    title: "Your Data",
    icon: <IconData />,
    items: ["text", "documents", "logs", "apis"],
    note: "private, governed, yours",
    accent: "text-[#4ec9ff]",
  },
  {
    id: "02",
    title: "Custom Fine-Tuned Models",
    icon: <IconModel />,
    items: ["domain specific", "higher accuracy", "better reasoning"],
    note: "trained on your distribution",
    accent: "text-[#4ec9ff]",
  },
  {
    id: "03",
    title: "Agentic Systems",
    icon: <IconAgent />,
    items: ["plan", "reason", "use tools", "take action", "self-improve"],
    note: "grounded, supervised, observable",
    accent: "text-[#3fb950]",
  },
  {
    id: "04",
    title: "Deployment",
    icon: <IconDeploy />,
    items: ["cloud", "on-prem", "hybrid", "scalable", "secure"],
    note: "inside your pipeline",
    accent: "text-[#4f8dff]",
  },
];

function Connector({ vertical = false }: { vertical?: boolean }) {
  return (
    <div
      className={cn(
        "relative shrink-0 items-center justify-center",
        vertical ? "flex h-14 w-full lg:hidden" : "hidden h-full w-14 lg:flex"
      )}
      aria-hidden
    >
      <svg
        className={cn(vertical ? "h-full w-6" : "h-6 w-full")}
        viewBox={vertical ? "0 0 24 56" : "0 0 64 24"}
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d={vertical ? "M12 2V50" : "M2 12H58"}
          stroke="#4ec9ff"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          opacity="0.55"
          className="hx-dash"
        />
        <path
          d={vertical ? "M7 44l5 7 5-7" : "M52 7l6 5-6 5"}
          stroke="#4ec9ff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

export function PipelineDiagram() {
  return (
    <div className="flex flex-col items-stretch gap-0 lg:flex-row lg:items-stretch">
      {STAGES.map((stage, i) => (
        <div key={stage.id} className="contents">
          <article
            className="hx-reveal hx-panel hx-ticks group relative flex flex-1 flex-col bg-[#070a10]/70 p-5 transition-colors duration-300 hover:border-[#4ec9ff]/35 hover:bg-[#0a1119]"
            style={{ "--hx-delay": `${i * 90}ms` } as CSSProperties}
          >
            <div className="flex items-start justify-between">
              <span className={cn("hx-mono text-[10px] font-semibold tracking-[0.2em]", stage.accent)}>
                {stage.id}
              </span>
              <span className="hx-mono text-[9px] tracking-[0.16em] text-[#3f4c5c] uppercase">
                stage
              </span>
            </div>

            <div className={cn("mt-4 transition-transform duration-500 group-hover:-translate-y-1", stage.accent)}>
              {stage.icon}
            </div>

            <h3 className="hx-mono mt-5 text-[12.5px] leading-snug font-semibold tracking-[0.1em] text-white uppercase">
              {stage.title}
            </h3>

            <ul className="mt-4 flex flex-col gap-1.5 border-t border-dashed border-white/12 pt-4">
              {stage.items.map((it) => (
                <li
                  key={it}
                  className="hx-mono flex items-center gap-2 text-[11.5px] text-[#8593a6]"
                >
                  <span className={cn("size-1 rounded-full", stage.accent, "bg-current")} />
                  {it}
                </li>
              ))}
            </ul>

            <p className="hx-mono mt-auto pt-5 text-[10px] tracking-[0.08em] text-[#4d5a6b] lowercase">
              {stage.note}
            </p>
          </article>

          {i < STAGES.length - 1 && <Connector />}
          {i < STAGES.length - 1 && <Connector vertical />}
        </div>
      ))}
    </div>
  );
}
