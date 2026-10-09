import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CloudCog,
  GitBranch,
  Radar,
  ShieldCheck,
  Target,
} from "lucide-react";
import { Hero } from "@/components/hero";
import { PipelineDiagram } from "@/components/pipeline-diagram";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/section";
import { CTABand, Marquee } from "@/components/blocks";
import { ExploreCard, FeatureCard, Metric, StepCard } from "@/components/cards";

const CAPABILITIES = [
  {
    index: "01",
    icon: <BrainCircuit className="size-5" />,
    title: "Custom Model Development",
    body: "We fine-tune, distill and evaluate foundation models on your domain data until they beat generic ones where it actually matters — with the evals to prove it.",
    href: "/models",
  },
  {
    index: "02",
    icon: <Bot className="size-5" />,
    title: "Agentic Systems",
    body: "Plan, reason and act loops with tools, memory, policy gates and human checkpoints — designed to survive retries, handoffs and messy real workflows.",
    href: "/agents",
  },
  {
    index: "03",
    icon: <CloudCog className="size-5" />,
    title: "Enterprise Deployment",
    body: "Cloud, on-prem, hybrid or air-gapped. Shipped into your CI/CD, observability and security posture instead of living in a demo notebook.",
    href: "/deployments",
  },
  {
    index: "04",
    icon: <ShieldCheck className="size-5" />,
    title: "Evaluation & Governance",
    body: "Trace-level evaluations, red-teaming, provenance and audit trails. Every release ships with evidence, not vibes.",
    href: "/solutions",
  },
];

const PROCESS = [
  {
    n: "01",
    meta: "week 1–2",
    title: "Discover",
    body: "We map the workflow, the data you actually have, the failure modes that cost you, and the bar a system must clear to be trusted.",
  },
  {
    n: "02",
    meta: "week 2–5",
    title: "Prototype",
    body: "A thin vertical slice in your environment: a fine-tuned candidate or agent loop wired to real tools, measured against a baseline you agree on.",
  },
  {
    n: "03",
    meta: "week 5–10",
    title: "Harden",
    body: "Evals, guardrails, adversarial testing, latency and cost tuning, fallback paths and human review points until it holds under load.",
  },
  {
    n: "04",
    meta: "ongoing",
    title: "Operate",
    body: "Deployment pipelines, drift monitoring, retraining triggers and on-call runbooks — so the system keeps improving after launch.",
  },
];

const STACK = [
  "Python",
  "PyTorch",
  "vLLM",
  "Hugging Face",
  "Ray",
  "MLflow",
  "Weights & Biases",
  "LangGraph",
  "Kubernetes",
  "Terraform",
  "Postgres",
  "pgvector",
  "Kafka",
  "AWS",
  "GCP",
  "Azure",
  "Modal",
  "FastAPI",
  "Redis",
  "Airflow",
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* ---------------------------------------------------------- */}
      {/*  Pipeline                                                    */}
      {/* ---------------------------------------------------------- */}
      <Section id="pipeline" className="border-b border-[var(--hx-line)] bg-[var(--hx-bg)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <SectionHeading
              eyebrow="How it works"
              eyebrowTone="green"
              title="Four stages, one delivery pipeline."
              lede="Most AI pilots die between the notebook and the org. We own the whole path — the data contract, the model, the agent runtime and the deployment target."
            />

            <div className="hx-panel hx-reveal relative overflow-hidden bg-[var(--hx-surface)] p-5 [--hx-delay:180ms]">
              <div className="hx-mono flex flex-col gap-2 text-[12px] leading-relaxed">
                <span className="text-[var(--hx-faint)]">
                  $ hawthorn deploy --pipeline production
                </span>
                <span className="text-[var(--hx-green)]">
                  ✓ data contract validated <span className="text-[var(--hx-faint)]">· 4 sources</span>
                </span>
                <span className="text-[var(--hx-green)]">
                  ✓ model candidate evaluated <span className="text-[var(--hx-faint)]">· +18.6 pts</span>
                </span>
                <span className="text-[var(--hx-green)]">
                  ✓ agent guardrails passing <span className="text-[var(--hx-faint)]">· 42 checks</span>
                </span>
                <span className="text-[var(--hx-cyan)]">
                  → shipping to 3 regions
                  <span className="hx-caret" />
                </span>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <PipelineDiagram />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- */}
      {/*  Capabilities                                                */}
      {/* ---------------------------------------------------------- */}
      <Section id="capabilities">
        <div className="hx-grid-bg opacity-60" aria-hidden />
        <Container className="relative">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="01 / Capabilities"
              title={
                <>
                  Four disciplines.
                  <br />
                  One accountable team.
                </>
              }
            />
            <p className="hx-lede hx-reveal max-w-sm [--hx-delay:200ms]">
              We are not a staffing shop and not a research lab. We are the engineering layer that
              turns a model into a system your business can depend on.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {CAPABILITIES.map((c, i) => (
              <FeatureCard key={c.index} {...c} delay={i * 80} />
            ))}
          </div>

          <div className="mt-16 grid gap-8 border-t border-[var(--hx-line)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <Metric value="142K" label="records analysed" sub="Anomaly detection across a national collection network" />
            <Metric value="+18.6" label="points over baseline" sub="Typical lift of a domain fine-tune vs. the base model" delay={90} />
            <Metric value="3" label="deployment targets" sub="Cloud, on-prem and hybrid from one artifact" delay={180} />
            <Metric value="24h" label="first response" sub="NDA-friendly scoping call with an engineer" delay={270} />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- */}
      {/*  Explore the workstreams                                     */}
      {/* ---------------------------------------------------------- */}
      <Section id="workstreams" className="border-y border-[var(--hx-line)] bg-[var(--hx-bg)]">
        <div className="hx-glow left-1/2 top-1/2 size-[38rem] -translate-x-1/2 -translate-y-1/2 bg-[var(--hx-glow)]" aria-hidden />
        <Container className="relative">
          <SectionHeading
            eyebrow="02 / Where we go deep"
            title="Pick the layer you need."
            lede="Each workstream is a full engagement on its own — and they compound when you run them together."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            <ExploreCard
              index="A"
              title="Custom Models"
              blurb="Domain-adapted models that know your terminology, your formats and your edge cases."
              points={["SFT, DPO, LoRA & distillation", "Private data pipelines", "Eval harness & baselines"]}
              href="/models"
              delay={0}
            />
            <ExploreCard
              index="B"
              title="Agentic Systems"
              blurb="Supervised agents that plan, call your tools, use memory and know when to stop."
              points={["Tool & MCP integration", "Memory & retrieval", "Policy gates and rollback"]}
              href="/agents"
              accent="green"
              delay={100}
            />
            <ExploreCard
              index="C"
              title="Deployments"
              blurb="The unglamorous part done properly: rollout, scaling, monitoring, cost and compliance."
              points={["Cloud, on-prem, hybrid, air-gapped", "Model CI/CD & canary releases", "Drift, latency and cost SLOs"]}
              href="/deployments"
              accent="blue"
              delay={200}
            />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- */}
      {/*  Case study                                                  */}
      {/* ---------------------------------------------------------- */}
      <Section id="proof">
        <Container>
          <div className="hx-panel hx-ticks relative overflow-hidden bg-[var(--hx-surface)]">
            <div className="hx-noise" aria-hidden />
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="flex flex-col gap-7 p-8 md:p-12">
                <Eyebrow tone="green" bracket>
                  Real-world signal / deployed
                </Eyebrow>

                <h2 className="hx-display hx-reveal text-[clamp(1.9rem,4vw,3.1rem)] text-[var(--hx-heading)]">
                  142K records.
                  <br />
                  <span className="text-[var(--hx-cyan)]">One hidden pattern.</span>
                </h2>

                <p className="max-w-xl text-[15px] leading-relaxed text-[var(--hx-muted)]">
                  A multi-agent anomaly detection system for a multimillion-dollar dairy company —
                  built to surface subtle quality anomalies hiding across a vast collection network
                  that manual sampling never caught.
                </p>

                <ul className="flex flex-col gap-3 border-t border-[var(--hx-line)] pt-6">
                  {[
                    "Fuses sensor, collection and quality signals across heterogeneous sources",
                    "Agents rank and justify every anomaly with traceable evidence",
                    "Findings surfaced to operations, not buried in a dashboard",
                  ].map((t) => (
                    <li key={t} className="flex gap-3 text-[14px] text-[var(--hx-muted-2)]">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--hx-green)]" />
                      {t}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/solutions"
                  className="hx-mono inline-flex w-fit items-center gap-2 border-b border-[var(--hx-cyan)]/40 pb-1 text-[11px] tracking-[0.14em] text-[var(--hx-cyan)] uppercase transition-colors hover:border-[var(--hx-cyan)] hover:text-[var(--hx-heading)]"
                >
                  Read how we approach it <ArrowRight className="size-3.5" />
                </Link>
              </div>

              <div className="relative border-t border-[var(--hx-line)] bg-[var(--hx-bg)] p-8 md:p-12 lg:border-t-0 lg:border-l">
                <div className="grid gap-8">
                  <div className="flex items-center gap-3">
                    <Radar className="size-4 text-[var(--hx-cyan)]" />
                    <span className="hx-mono text-[10px] tracking-[0.18em] text-[var(--hx-faint)] uppercase">
                      Evidence log
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <strong className="hx-display block text-[clamp(2rem,3.4vw,2.9rem)] leading-none font-medium text-[var(--hx-heading)]">
                        600–700+
                      </strong>
                      <span className="hx-mono mt-2 block text-[10px] leading-relaxed tracking-[0.14em] text-[var(--hx-faint)] uppercase">
                        collection centres monitored
                      </span>
                    </div>
                    <div>
                      <strong className="hx-display block text-[clamp(2rem,3.4vw,2.9rem)] leading-none font-medium text-[var(--hx-green)]">
                        2 of 3
                      </strong>
                      <span className="hx-mono mt-2 block text-[10px] leading-relaxed tracking-[0.14em] text-[var(--hx-faint)] uppercase">
                        AI-flagged centres confirmed in a secret audit
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-[var(--hx-line)] pt-6">
                    {[
                      { k: "signal", v: "confirmed", ok: true },
                      { k: "precision @ audit", v: "66.7%", ok: true },
                      { k: "false positives", v: "1 of 3", ok: false },
                      { k: "status", v: "in production", ok: true },
                    ].map((r) => (
                      <div
                        key={r.k}
                        className="hx-mono flex items-center justify-between gap-4 text-[11.5px] text-[var(--hx-muted-2)]"
                      >
                        <span>{r.k}</span>
                        <span className={r.ok ? "text-[var(--hx-green)]" : "text-[var(--hx-amber)]"}>{r.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- */}
      {/*  Process                                                     */}
      {/* ---------------------------------------------------------- */}
      <Section id="process" className="border-t border-[var(--hx-line)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="03 / Engagement"
                title={
                  <>
                    Research to
                    <br />
                    production.
                  </>
                }
                lede="A fixed-shape engagement with an engineer attached to every stage. No handoff cliff, no proof-of-concept graveyard."
              />
              <Link
                href="/solutions"
                className="hx-btn hx-btn-ghost hx-reveal mt-8 [--hx-delay:220ms]"
              >
                Engagement models
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {PROCESS.map((p, i) => (
                <StepCard key={p.n} {...p} delay={i * 90} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- */}
      {/*  Stack                                                       */}
      {/* ---------------------------------------------------------- */}
      <Section bleed className="border-y border-[var(--hx-line)] bg-[var(--hx-bg)] py-10">
        <div className="mb-7 flex items-center gap-4">
          <Container className="flex items-center gap-4">
            <GitBranch className="size-4 shrink-0 text-[var(--hx-cyan)]" />
            <span className="hx-mono text-[10px] tracking-[0.18em] text-[var(--hx-faint)] uppercase">
              Toolchain we ship with
            </span>
            <span className="h-px flex-1 bg-[var(--hx-line)]" />
            <Target className="size-4 shrink-0 text-[var(--hx-green)]" />
          </Container>
        </div>
        <Marquee
          items={STACK.map((s) => (
            <span
              key={s}
              className="hx-mono text-[13px] tracking-[0.1em] whitespace-nowrap text-[var(--hx-muted-2)] uppercase"
            >
              {s}
            </span>
          ))}
        />
        <Marquee
          reverse
          className="mt-4"
          items={["Custom models", "Agentic systems", "Production deployment", "Evaluation", "Governance", "Observability", "Cost control", "Security review"].map(
            (s) => (
              <span
                key={s}
                className="hx-mono text-[13px] tracking-[0.1em] whitespace-nowrap text-[var(--hx-faint)] uppercase"
              >
                {s}
              </span>
            )
          )}
        />
      </Section>

      {/* ---------------------------------------------------------- */}
      {/*  CTA                                                         */}
      {/* ---------------------------------------------------------- */}
      <CTABand
        title={
          <>
            Tell us the workflow.
            <br />
            We&apos;ll bring the system.
          </>
        }
        lede="Share the data, the tools and the bar for success. You get a scoped plan, a timeline and a named engineer — not a deck."
        primary={{ label: "Build Your AI System", href: "/contact" }}
        secondary={{ label: "See Our Solutions", href: "/solutions" }}
      />
    </>
  );
}
