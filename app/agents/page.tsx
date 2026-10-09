import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CircleStop,
  Database,
  Hammer,
  LineChart,
  ListChecks,
  Lock,
  Repeat2,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/section";
import type { CSSProperties } from "react";
import { CTABand } from "@/components/blocks";
import { PageHero, TerminalPanel } from "@/components/page-hero";

const ANATOMY = [
  {
    key: "plan",
    n: "01",
    icon: <ListChecks className="size-5" />,
    title: "Plan",
    body: "Decomposes the goal into steps and states what it needs before it spends money or touches a system of record.",
    detail: "Task graphs · explicit preconditions · stop conditions",
  },
  {
    key: "reason",
    n: "02",
    icon: <Brain className="size-5" />,
    title: "Reason",
    body: "Selects evidence, weighs conflicting sources and records why it chose one path over another.",
    detail: "Evidence selection · conflict resolution · rationale logs",
  },
  {
    key: "tools",
    n: "03",
    icon: <Hammer className="size-5" />,
    title: "Use tools",
    body: "Calls your APIs, databases and internal services through typed contracts with timeouts, retries and idempotency keys.",
    detail: "Typed schemas · MCP · rate limits · idempotency",
  },
  {
    key: "act",
    n: "04",
    icon: <CircleStop className="size-5" />,
    title: "Take action",
    body: "Executes the change behind policy gates, with a human approval step wherever the blast radius justifies one.",
    detail: "Policy gates · approvals · rollback hooks · audit trail",
  },
  {
    key: "improve",
    n: "05",
    icon: <Repeat2 className="size-5" />,
    title: "Self-improve",
    body: "Turns traces into evaluations and corrected examples — reviewed by a human before anything is promoted.",
    detail: "Trace review · eval generation · gated promotion",
  },
];

const STACK_LAYERS = [
  {
    layer: "Experience",
    items: ["Chat / API", "Workflow triggers", "Human review console"],
    tone: "text-[#4ec9ff]",
  },
  {
    layer: "Orchestration",
    items: ["Planner", "Router", "State machine", "Retry & resume"],
    tone: "text-[#3fb950]",
  },
  {
    layer: "Capability",
    items: ["Tool registry", "MCP servers", "Retrieval", "Memory tiers"],
    tone: "text-[#4f8dff]",
  },
  {
    layer: "Control",
    items: ["Policy gates", "Permissions", "Budget & rate limits", "Approval steps"],
    tone: "text-[#f0b429]",
  },
  {
    layer: "Evidence",
    items: ["Traces", "Evaluations", "Cost & latency", "Audit log"],
    tone: "text-[#a78bfa]",
  },
];

const USE_CASES = [
  {
    index: "01",
    title: "Back-office operations",
    body: "Triage, enrich, route and resolve tickets across systems that were never designed to talk to each other.",
    tags: ["Email + ticket", "ERP / CRM", "Approval gates"],
  },
  {
    index: "02",
    title: "Document-heavy decisions",
    body: "Underwrite, review or assess a package of documents with every claim traceable to its source page.",
    tags: ["Contracts", "Claims", "Citations"],
  },
  {
    index: "03",
    title: "Engineering operations",
    body: "Investigate alerts, reproduce failures, draft the fix and open a PR — with a human merging, always.",
    tags: ["Observability", "CI/CD", "Code review"],
  },
  {
    index: "04",
    title: "Research & intelligence",
    body: "Continuously monitor sources, detect meaningful change and produce a brief with confidence and citations.",
    tags: ["Multi-source", "Dedup", "Scheduled"],
  },
  {
    index: "05",
    title: "Data quality loops",
    body: "Find anomalies across heterogeneous feeds, justify each flag and hand the ranked list to the people who act.",
    tags: ["Anomaly detection", "Ranking", "Evidence"],
  },
  {
    index: "06",
    title: "Internal knowledge",
    body: "Answer from your own corpus with permission-aware retrieval, refusal on out-of-scope, and links to the source.",
    tags: ["RAG", "ACL-aware", "Refusal"],
  },
];

const GUARDRAILS = [
  "Typed tool contracts — an agent can only call what the registry exposes",
  "Least-privilege credentials scoped per task, never a shared service key",
  "Budget, rate and blast-radius limits enforced outside the model",
  "Deterministic policy gates for anything irreversible",
  "Human approval at configurable risk thresholds",
  "Full trace capture: prompt, tools, outputs, latency and cost",
];

export default function AgentsPage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Agents"
        title={
          <>
            Agents that know
            <br />
            when to stop.
          </>
        }
        lede="An agent is only as good as the machinery around the model: the tools it may touch, the memory it keeps, the gates it must clear and the evidence it leaves behind. We build all five."
        panel={
          <TerminalPanel
            title="agent://run/8f21c"
            lines={[
              { tone: "muted", text: "goal: reconcile Q3 invoices against POs" },
              { tone: "cyan", text: "plan · 6 steps · 2 require approval" },
              { tone: "muted", text: "tool: erp.search_purchase_orders()" },
              { tone: "muted", text: "tool: ledger.match(line_items)" },
              { tone: "green", text: "3 exceptions found · evidence attached" },
              { tone: "cyan", text: "gate: write access → awaiting human" },
            ]}
            footer="paused at policy gate"
          />
        }
      />

      {/* Anatomy */}
      <Section id="anatomy">
        <Container>
          <SectionHeading
            eyebrow="01 / Anatomy"
            bracket
            title="Five capabilities, in order."
            lede="Most agent failures happen at step four. The design work is deciding exactly where autonomy stops."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {ANATOMY.map((a, i) => (
              <article
                key={a.key}
                className="hx-reveal group relative flex h-full flex-col gap-3 border border-white/10 bg-[#080c12] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#3fb950]/40 hover:bg-[#0a111a]"
                style={{ "--hx-delay": `${i * 70}ms` } as CSSProperties}
              >
                <div className="flex items-center justify-between">
                  <span className="hx-mono text-[10px] font-semibold tracking-[0.2em] text-[#3fb950]">
                    {a.n}
                  </span>
                  <span className="text-[#3fb950]/70 transition-colors group-hover:text-[#3fb950]">
                    {a.icon}
                  </span>
                </div>
                <h3 className="hx-mono text-[13px] font-semibold tracking-[0.1em] text-white uppercase">
                  {a.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-[#8593a6]">{a.body}</p>
                <p className="hx-mono mt-auto border-t border-dashed border-white/12 pt-3 text-[10px] leading-relaxed tracking-[0.06em] text-[#4d5a6b]">
                  {a.detail}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Architecture stack */}
      <Section id="architecture" className="border-y border-white/8 bg-[#06090f]">
        <div className="hx-grid-bg opacity-60" aria-hidden />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="02 / Architecture"
                title="The layer cake we deploy."
                lede="Each layer is independently testable and independently replaceable. Nothing depends on the model behaving perfectly."
              />
            </div>

            <div className="flex flex-col gap-3">
              {STACK_LAYERS.map((l, i) => (
                <div
                  key={l.layer}
                  className="hx-reveal group relative flex flex-col gap-3 border border-white/10 bg-[#080c12] p-5 transition-colors duration-300 hover:border-white/25 sm:flex-row sm:items-center sm:gap-6"
                  style={{ "--hx-delay": `${i * 70}ms` } as CSSProperties}
                >
                  <span className="hx-mono w-32 shrink-0 text-[10.5px] font-semibold tracking-[0.16em] uppercase">
                    <span className={l.tone}>{String(i + 1).padStart(2, "0")}</span>{" "}
                    <span className="text-[#8593a6]">{l.layer}</span>
                  </span>
                  <span className="h-px w-full bg-white/8 sm:w-px sm:self-stretch" />
                  <div className="flex flex-wrap gap-2">
                    {l.items.map((it) => (
                      <span
                        key={it}
                        className="hx-mono rounded-md border border-white/10 bg-[#0b1017] px-2.5 py-1 text-[11px] text-[#9aa8ba] transition-colors group-hover:border-white/20"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Use cases */}
      <Section id="use-cases">
        <Container>
          <SectionHeading
            eyebrow="03 / Where agents earn their keep"
            title="Boring, high-volume, rule-heavy work."
            lede="If a task is high-frequency, mostly routine and expensive to staff, it is a candidate. If it is rare and highly novel, it usually is not."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {USE_CASES.map((u, i) => (
              <article
                key={u.index}
                className="hx-reveal group flex h-full flex-col gap-3 border border-white/10 bg-[#080c12] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#4ec9ff]/35"
                style={{ "--hx-delay": `${i * 60}ms` } as CSSProperties}
              >
                <span className="hx-mono text-[10px] font-semibold tracking-[0.2em] text-[#4ec9ff]">
                  {u.index}
                </span>
                <h3 className="text-[1.1rem] leading-snug font-semibold tracking-[-0.02em] text-white">
                  {u.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#8593a6]">{u.body}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                  {u.tags.map((t) => (
                    <span
                      key={t}
                      className="hx-mono rounded-full border border-white/10 px-2.5 py-1 text-[10px] tracking-[0.08em] text-[#6f8296]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Guardrails */}
      <Section id="guardrails" className="border-t border-white/8 bg-[#06090f]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="04 / Control"
                title="Autonomy is a dial, not a switch."
                lede="We set the dial with you, per action class — and make it impossible for the model to move it on its own."
              />
              <Link href="/contact" className="hx-btn hx-btn-primary hx-reveal mt-8">
                Design the control plane
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <ul className="flex flex-col">
              {GUARDRAILS.map((g, i) => (
                <li
                  key={g}
                  className="hx-reveal group flex items-start gap-4 border-b border-white/10 py-4 first:border-t"
                  style={{ "--hx-delay": `${i * 55}ms` } as CSSProperties}
                >
                  <Lock className="mt-1 size-4 shrink-0 text-[#f0b429]" />
                  <span className="text-[15px] leading-relaxed text-[#a4b2c5] transition-colors group-hover:text-white">
                    {g}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            <div className="hx-reveal border border-white/10 bg-[#080c12] p-6">
              <LineChart className="size-5 text-[#4ec9ff]" />
              <strong className="hx-display mt-4 block text-[1.6rem] font-medium text-white">
                100%
              </strong>
              <span className="hx-mono mt-1 block text-[10px] tracking-[0.14em] text-[#5d6b7e] uppercase">
                of runs traced end to end
              </span>
            </div>
            <div className="hx-reveal border border-white/10 bg-[#080c12] p-6" style={{ "--hx-delay": "80ms" } as CSSProperties}>
              <Database className="size-5 text-[#3fb950]" />
              <strong className="hx-display mt-4 block text-[1.6rem] font-medium text-white">
                3 tiers
              </strong>
              <span className="hx-mono mt-1 block text-[10px] tracking-[0.14em] text-[#5d6b7e] uppercase">
                of memory: working, episodic, semantic
              </span>
            </div>
            <div className="hx-reveal border border-white/10 bg-[#080c12] p-6" style={{ "--hx-delay": "160ms" } as CSSProperties}>
              <CircleStop className="size-5 text-[#f0b429]" />
              <strong className="hx-display mt-4 block text-[1.6rem] font-medium text-white">
                Always
              </strong>
              <span className="hx-mono mt-1 block text-[10px] tracking-[0.14em] text-[#5d6b7e] uppercase">
                a defined stop condition and rollback path
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <CTABand
        eyebrow="Agentic systems"
        title={
          <>
            Give the busywork
            <br />
            to an agent.
          </>
        }
        lede="Start with one workflow, instrumented and supervised. Expand only when the evidence says it is safe to."
        primary={{ label: "Scope an agent workflow", href: "/contact" }}
        secondary={{ label: "See deployments", href: "/deployments" }}
      />
    </>
  );
}
