import { ArrowUpRight, CalendarDays, GitBranch, Globe, BriefcaseBusiness, MessageSquare, ShieldCheck } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/section";
import type { CSSProperties } from "react";
import { PageHero, TerminalPanel } from "@/components/page-hero";
import { BriefForm } from "@/components/brief-form";
import { StepCard } from "@/components/cards";

const NEXT_STEPS = [
  {
    n: "01",
    meta: "day 0",
    title: "We read the brief",
    body: "An engineer — not a salesperson — reviews what you sent and comes back with the questions that actually matter.",
    delay: 0,
  },
  {
    n: "02",
    meta: "within 24h",
    title: "30-minute scoping call",
    body: "Workflow, data, constraints and the bar for success. We will tell you plainly if we think it isn't worth building.",
    delay: 90,
  },
  {
    n: "03",
    meta: "week 1–2",
    title: "Written plan & baseline",
    body: "Scope, approach, timeline, price, and the evaluation baseline we would measure success against.",
    delay: 180,
  },
];

const CHANNELS = [
  {
    icon: <CalendarDays className="size-5" />,
    label: "Book a call",
    value: "cal.com/hawthorn",
    href: "https://cal.com/hawthorn",
    note: "30 minutes · IST / worldwide",
  },
  {
    icon: <GitBranch className="size-5" />,
    label: "Code & systems",
    value: "github.com/lamenting-hawthorn",
    href: "https://github.com/lamenting-hawthorn",
    note: "Read before you hire us",
  },
  {
    icon: <BriefcaseBusiness className="size-5" />,
    label: "Professional",
    value: "Raghwender Vasisth",
    href: "https://www.linkedin.com/in/raghwender-vasisth/",
    note: "Background & recommendations",
  },
  {
    icon: <Globe className="size-5" />,
    label: "Where we work",
    value: "India · worldwide",
    href: "/about",
    note: "Overlap with EU, UK and US hours",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="06"
        eyebrow="Contact"
        title={
          <>
            Tell us what
            <br />
            should exist.
          </>
        }
        lede="The more specific the workflow, the faster the answer. Send a short brief and book a call — you'll be speaking to an engineer who could actually do the work."
        panel={
          <TerminalPanel
            title="hawthorn@labs:~/contact"
            lines={[
              { tone: "muted", text: "hawthorn contact --new" },
              { tone: "green", text: "inbox open · nda-friendly" },
              { tone: "green", text: "median first response · under 24h" },
              { tone: "cyan", text: "direct to an engineer, no relay" },
            ]}
            footer="waiting for your brief"
          />
        }
      />

      {/* Form + channels */}
      <Section id="start">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="hx-panel hx-ticks bg-[var(--hx-surface)] p-7 md:p-9">
              <div className="mb-7 flex items-center gap-3">
                <MessageSquare className="size-4 text-[var(--hx-cyan)]" />
                <span className="hx-mono text-[10px] tracking-[0.18em] text-[var(--hx-faint)] uppercase">
                  Project brief
                </span>
                <span className="h-px flex-1 bg-[var(--hx-line)]" />
              </div>
              <BriefForm />
            </div>

            <div className="flex flex-col gap-4">
              {CHANNELS.map((c, i) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="hx-reveal group flex items-start gap-4 border border-[var(--hx-line)] bg-[var(--hx-surface)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--hx-cyan)]/40 hover:bg-[var(--hx-surface-2)]"
                  style={{ "--hx-delay": `${i * 70}ms` } as CSSProperties}
                >
                  <span className="mt-0.5 text-[var(--hx-cyan)]">{c.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="hx-mono block text-[10px] tracking-[0.16em] text-[var(--hx-faint)] uppercase">
                      {c.label}
                    </span>
                    <span className="mt-1 block truncate text-[15px] font-medium text-[var(--hx-heading)]">
                      {c.value}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-[var(--hx-muted-2)]">{c.note}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-[var(--hx-faint-2)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--hx-heading)]" />
                </a>
              ))}

              <div className="hx-reveal mt-2 flex items-start gap-3 border border-[var(--hx-green)]/25 bg-[var(--hx-green)]/5 p-5">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[var(--hx-green)]" />
                <p className="text-[13.5px] leading-relaxed text-[var(--hx-muted)]">
                  We&rsquo;re happy to sign a mutual NDA before you share anything sensitive, and we never
                  use client data to train models unless that&rsquo;s explicitly contracted.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* What happens next */}
      <Section id="next" className="border-y border-[var(--hx-line)] bg-[var(--hx-bg)]">
        <div className="hx-grid-bg opacity-50" aria-hidden />
        <Container className="relative">
          <SectionHeading
            eyebrow="01 / What happens next"
            bracket
            title="No pipeline, no pressure."
            lede="Three steps, then a written plan you can take to anyone — including a different vendor."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {NEXT_STEPS.map((s) => (
              <StepCard key={s.n} {...s} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Good brief */}
      <Section id="brief-checklist">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeading
              eyebrow="02 / A useful brief"
              title="What makes the first call good."
            />
            <ul className="flex flex-col">
              {[
                "The workflow: what happens today, and who does it",
                "The data you have — formats, volume, where it lives",
                "The constraints: cloud, on-prem, compliance, budget",
                "What 'working' means, in a number if possible",
                "Who owns the outcome internally",
                "When it needs to be live, and why that date",
              ].map((t, i) => (
                <li
                  key={t}
                  className="hx-reveal flex items-start gap-4 border-b border-[var(--hx-line)] py-4 first:border-t"
                  style={{ "--hx-delay": `${i * 55}ms` } as CSSProperties}
                >
                  <span className="hx-mono mt-0.5 w-8 shrink-0 text-[11px] tracking-[0.12em] text-[var(--hx-cyan)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-relaxed text-[var(--hx-muted)]">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
