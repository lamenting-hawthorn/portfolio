import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type FooterLink = { label: string; href: string; external?: boolean };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Navigate",
    links: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { label: "Custom Models", href: "/models" },
      { label: "Agentic Systems", href: "/agents" },
      { label: "Deployments", href: "/deployments" },
      { label: "Engagement Models", href: "/solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "GitHub", href: "https://github.com/lamenting-hawthorn", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/raghwender-vasisth/", external: true },
      { label: "Book a call", href: "https://cal.com/hawthorn", external: true },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#05070c]">
      <div className="hx-noise" aria-hidden />

      {/* statement */}
      <div className="hx-container relative pt-16 pb-12 md:pt-24">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="hx-mono max-w-md text-[11px] leading-relaxed tracking-[0.16em] text-[#5d6b7e] uppercase">
            Custom models <span className="text-[#3fb950]">/</span> agentic workflows{" "}
            <span className="text-[#3fb950]">/</span> enterprise deployment
          </p>

          <div className="flex items-start gap-4 md:gap-6">
            <span
              aria-hidden
              className="hx-mono hidden self-stretch text-3xl leading-none font-light text-[#23303f] select-none md:block"
            >
              {"{"}
            </span>
            <h2 className="hx-mono text-right text-[clamp(1.1rem,2.2vw,1.75rem)] leading-[1.35] font-medium tracking-[-0.01em] text-[#7e8da3] uppercase md:text-right">
              Better models.
              <br />
              Smarter agents.
              <br />
              <span className="text-[#4ec9ff]">Lasting impact.</span>
            </h2>
            <span
              aria-hidden
              className="hx-mono hidden self-stretch text-3xl leading-none font-light text-[#23303f] select-none md:block"
            >
              {"}"}
            </span>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>

      {/* link columns */}
      <div className="hx-container relative grid grid-cols-2 gap-x-8 gap-y-10 pb-14 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-[9px] border border-[#4ec9ff]/40 bg-[#0a1017]">
              <span className="hx-mono text-[15px] leading-none font-bold text-[#4ec9ff]">
                /&gt;
              </span>
            </span>
            <span className="hx-mono text-[13px] leading-none font-semibold tracking-[0.14em]">
              <span className="text-white">HAWTHORN</span>
              <span className="text-[#5d6b7e]"> AI LABS</span>
            </span>
          </div>
          <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-[#7e8da3]">
            We build and fine-tune custom AI models and deploy agentic systems that work for your
            business — from research to production.
          </p>
          <Link
            href="/contact"
            className="hx-mono mt-6 inline-flex items-center gap-2 border-b border-[#4ec9ff]/40 pb-1 text-[11px] tracking-[0.14em] text-[#4ec9ff] uppercase transition-colors hover:border-[#4ec9ff] hover:text-white"
          >
            Start a project <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="hx-mono text-[10px] font-semibold tracking-[0.2em] text-[#4d5a6b] uppercase">
              {col.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group inline-flex items-center gap-1.5 text-[13.5px] text-[#9aa8ba] transition-colors hover:text-white"
                  >
                    {l.label}
                    {l.external && (
                      <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/8">
        <div className="hx-container flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between">
          <p className="hx-mono text-[10px] tracking-[0.16em] text-[#4d5a6b] uppercase">
            © {new Date().getFullYear()} Hawthorn AI Labs
          </p>
          <p className="hx-mono text-[10px] tracking-[0.16em] text-[#4d5a6b] uppercase">
            India · Working worldwide
          </p>
          <p className="hx-mono flex items-center gap-2 text-[10px] tracking-[0.16em] text-[#4d5a6b] uppercase">
            <span className="size-1.5 animate-pulse-glow rounded-full bg-[#3fb950]" />
            Systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
