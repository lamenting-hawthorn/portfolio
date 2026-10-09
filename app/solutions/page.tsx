import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Layers, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import type { CSSProperties } from "react";
import { Container, Section, SectionHeading } from "@/components/section";
import { CTABand } from "@/components/blocks";
import { PageHero, TerminalPanel } from "@/components/page-hero";
import { FeatureCard, StepCard } from "@/components/cards";

const delay = (ms: number) => ({ "--hx-delay": `${ms}ms` }) as CSSProperties;

const ENTRY_POINTS = [
  {
    index: "01",
    icon: <Layers className="size-5" />,
    title: "Prototype purgatory",
    body: "A demo that impressed leadership eighteen months ago, still running on a laptop with no tests, no owner and no path to production.",
    href: "/deployments",
  },
  {
    index: "02",
    icon: <Sparkles className="size-5" />,
    title: "Generic model, generic answers",
    body: "Off-the-shelf models hallucinate your jargon, mishandle your formats and burn budget re-deriving things they should already know.",
    href: "/models",
  },
  {
    index: "03",
    icon: <Wrench className="size-5" />,
    title: "Operations held together by people",
    body: "Skilled staff spend their days copying fields between systems, triaging inboxes and re-checking work a supervised agent should own.",
    href: "/agents",
  },
  {
    index: "04",
    icon: <ShieldCheck className="size-5" />,
    title: "No way to prove it works",
    body: "Every change is a judgement call. Nobody can say whether the last release helped, hurt, or silently regressed on the edge cases.",
    href: "/models",
  },
  {
    index: "05",
    icon: <Clock className="size-5" />,
    title: "Runaway inference cost",
    body: "The largest available model is doing classification work, and the monthly bill grows faster than the value it returns.",
    href: "/models",
  },
  {
    index: "06",
    icon: <CheckCircle2 className="size-5" />,
    title: "Data that cannot leave",
    body: "Compliance says on-prem or air-gapped, so every promising vendor conversation ends at the security review.",
    href: "/deployments",
  },
];

const ENGAGEMENTS = [
  {
    n: "A",
    title: "Diagnostic sprint",
    meta: "2 weeks",
    price: "Fixed fee",
    body: "For teams who know something is broken but not what. We audit the workflow, the data, the model choices and the delivery path.",
    points: ["Architecture & risk review", "Eval baseline on your own data", "Prioritised build plan", "Go / no-go recommendation"],
  },
  {
    n: "B",
    title: "Build engagement",
    meta: "6–10 weeks",
    price: "Scoped milestone",
    body: "The default. A thin vertical slice first, then hardening until the system meets the bar we agreed in week one.",
    points: ["Working system in your environment", "Eval harness & regression gates", "Deployment pipeline & runbooks", "Handover with your team"],
    featured: true,
  },
  {
    n: "C",
    title: "Embedded partner",
    meta: "Ongoing",
    price: "Monthly retainer",
    body: "For organisations running several workstreams. We own a stream end-to-end and raise the bar on the ones you own.",
    points: ["Dedicated engineer(s)", "Quarterly model & agent roadmap", "On-call escalation path", "Team enablement & review"],
  },
];

const DELIVERABLES = [
  "A working system deployed in your environment, not a notebook",
  "A reproducible evaluation harness with a documented baseline",
  "Data contracts and provenance for everything the system consumes",
  "Deployment pipeline: staging, canary, rollback",
  "Observability: traces, cost, latency, drift and failure taxonomy",
  "Runbooks, architecture decision records and a team handover",
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="Solutions"
        title={
          <>
            AI that survives
            <br />
            contact with production.
          </>
        }
        lede="We are brought in when the demo works but the business case does not yet. One team owns the data, the model, the agent runtime and the deployment target — so nothing falls through the gap between them."
        panel={
          <TerminalPanel
            lines={[
              { tone: "muted", text: "hawthorn scope --problem \"pilot never shipped\"" },
              { tone: "green", text: "workflow mapped · 4 human bottlenecks found" },
              { tone: "green", text: "baseline set · 71.2% on your own held-out set" },
              { tone: "cyan", text: "plan ready · 6-week path to production" },
            ]}
            footer="scoped in 2 weeks"
          />
        }
      />

      {/* Entry points */}
      <Section id="entry-points">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="01 / Why we get called"
                title="Six problems with one shape."
                lede="Different industries, same underlying failure: nobody owns the path between a model and a working system."
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {ENTRY_POINTS.map((e, i) => (
                <FeatureCard key={e.index} {...e} delay={i * 60} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Engagement models */}
      <Section id="engagements" className="border-y border-white/8 bg-[#06090f]">
        <div className="hx-grid-bg opacity-50" aria-hidden />
        <Container className="relative">
          <SectionHeading
            eyebrow="02 / Engagement models"
            bracket
            title="Three ways to start."
            lede="Every engagement produces something you can ship, measure and keep — even if we stop after the first one."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {ENGAGEMENTS.map((e, i) => (
              <article
                key={e.n}
                className="hx-reveal group relative flex flex-col overflow-hidden border bg-[#080c12] p-7 transition-all duration-300 hover:-translate-y-1"
                style={{
                  ...delay(i * 90),
                  borderColor: e.featured ? "rgba(78,201,255,0.45)" : "rgba(255,255,255,0.1)",
                }}
              >
                {e.featured && (
                  <span className="absolute top-0 right-0 bg-[#4ec9ff] px-3 py-1 text-[9px] font-semibold tracking-[0.16em] text-[#04141f] uppercase">
                    Most chosen
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <span className="hx-mono text-[11px] font-semibold tracking-[0.2em] text-[#4ec9ff]">
                    {e.n}
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="hx-mono text-[10px] tracking-[0.16em] text-[#5d6b7e] uppercase">
                    {e.meta}
                  </span>
                </div>

                <h3 className="hx-display mt-6 text-[1.6rem] text-white">{e.title}</h3>
                <p className="hx-mono mt-1 text-[11px] tracking-[0.14em] text-[#4ec9ff] uppercase">
                  {e.price}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-[#8593a6]">{e.body}</p>

                <ul className="mt-6 flex flex-col gap-2.5 border-t border-white/10 pt-5">
                  {e.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[13.5px] text-[#9aa8ba]">
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#3fb950]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Deliverables */}
      <Section id="deliverables">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="03 / What you keep"
                title="Everything is yours at handover."
                lede="No black boxes, no proprietary runtime you have to licence from us forever."
              />
              <Link href="/contact" className="hx-btn hx-btn-primary hx-reveal mt-8">
                Scope an engagement
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <ul className="flex flex-col">
              {DELIVERABLES.map((d, i) => (
                <li
                  key={d}
                  className="hx-reveal group flex items-start gap-5 border-b border-white/10 py-5 first:border-t"
                  style={delay(i * 60)}
                >
                  <span className="hx-mono mt-0.5 w-8 shrink-0 text-[11px] tracking-[0.12em] text-[#3f4c5c]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-relaxed text-[#a4b2c5] transition-colors group-hover:text-white">
                    {d}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section id="timeline" className="border-t border-white/8 bg-[#06090f]">
        <Container>
          <SectionHeading
            eyebrow="04 / The first 10 weeks"
            title="What the calendar looks like."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <StepCard
              n="01"
              meta="week 1–2"
              title="Discover"
              body="Stakeholder interviews, data audit, workflow mapping and an eval baseline built from your own held-out samples."
              delay={0}
            />
            <StepCard
              n="02"
              meta="week 2–5"
              title="Prototype"
              body="A thin vertical slice wired to real tools in a staging environment, measured against the baseline."
              delay={90}
            />
            <StepCard
              n="03"
              meta="week 5–10"
              title="Harden"
              body="Guardrails, adversarial testing, latency and cost tuning, fallbacks and human review points."
              delay={180}
            />
            <StepCard
              n="04"
              meta="week 10+"
              title="Operate"
              body="Canary rollout, monitoring, drift alerts, retraining triggers and a runbook your team can follow."
              delay={270}
            />
          </div>
        </Container>
      </Section>

      <CTABand
        eyebrow="Start here"
        title={
          <>
            Bring the problem.
            <br />
            We&apos;ll scope the system.
          </>
        }
        lede="A two-week diagnostic gives you a baseline, a build plan and a clear go / no-go — whether or not you build it with us."
        primary={{ label: "Book a scoping call", href: "/contact" }}
        secondary={{ label: "See the capabilities", href: "/models" }}
      />
    </>
  );
}
