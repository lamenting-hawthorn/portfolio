import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  Container as ContainerIcon,
  GitPullRequestArrow,
  Lock,
  Server,
  ShieldCheck,
  Split,
  Waypoints,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/section";
import type { CSSProperties } from "react";
import { CTABand, Marquee } from "@/components/blocks";
import { PageHero, TerminalPanel } from "@/components/page-hero";
import { FeatureCard, StepCard } from "@/components/cards";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const TARGETS = [
  {
    index: "01",
    icon: <Cloud className="size-5" />,
    title: "Cloud",
    body: "Managed inference on your AWS, GCP or Azure account. We build the Terraform, you keep the project and the bill.",
    href: "/contact",
  },
  {
    index: "02",
    icon: <Server className="size-5" />,
    title: "On-premise",
    body: "Runs inside your data centre on your hardware, with no outbound calls required for inference or evaluation.",
    href: "/contact",
  },
  {
    index: "03",
    icon: <Split className="size-5" />,
    title: "Hybrid",
    body: "Sensitive workloads stay private while burst capacity and non-sensitive traffic use managed capacity.",
    href: "/contact",
  },
  {
    index: "04",
    icon: <Lock className="size-5" />,
    title: "Air-gapped",
    body: "Fully offline delivery: signed artifacts, vendored dependencies, offline model registry and documented install.",
    href: "/contact",
  },
  {
    index: "05",
    icon: <Waypoints className="size-5" />,
    title: "Edge / embedded",
    body: "Quantised, distilled models running next to the process that needs them, where latency or connectivity forbids a call.",
    href: "/contact",
  },
  {
    index: "06",
    icon: <ContainerIcon className="size-5" />,
    title: "Your platform",
    body: "Kubernetes, ECS, Nomad or a VM. We fit the target you already operate rather than introducing a new one.",
    href: "/contact",
  },
];

const SLOS = [
  { metric: "Availability", target: "99.5% – 99.9%", note: "Agreed per route, measured externally" },
  { metric: "p95 latency", target: "route-specific", note: "Budgeted across retrieval, model and tools" },
  { metric: "Error budget", target: "tracked monthly", note: "Burn rate alerts before customers notice" },
  { metric: "Model drift", target: "weekly eval", note: "Auto-rollback if a rolling window regresses" },
  { metric: "Cost ceiling", target: "per 1k runs", note: "Hard limit with routing to cheaper models" },
  { metric: "Recovery", target: "RTO < 1h", note: "Last-known-good artifact retained and signed" },
];

const FAQ = [
  {
    q: "Can models run without any outbound internet access?",
    a: "Yes. We deliver signed weights and containers, vendor every dependency, run evaluation offline, and provide an install path that assumes no registry access. The trade-off is a longer update cycle, which we plan for up front.",
  },
  {
    q: "Which GPUs do we need?",
    a: "It depends on the model class and throughput. A single modern GPU handles LoRA-trained 8–14B models comfortably at moderate volume; larger models need sharding or tensor parallelism. We size it from your measured traffic, not a guess.",
  },
  {
    q: "How do releases get rolled back?",
    a: "Every artifact is content-addressed and signed. The previous known-good version is always one command away, and drift monitors can trigger the rollback automatically before a human is even paged.",
  },
  {
    q: "Who owns the infrastructure afterwards?",
    a: "You do — in your cloud account, under your naming, with your team's access. We hand over Terraform or Helm, runbooks and a recorded walkthrough, and stay available on an optional retainer.",
  },
  {
    q: "How is data handled in transit and at rest?",
    a: "TLS in transit, encryption at rest with keys you control, no training on your data unless explicitly contracted, and retention windows configured to your policy rather than a vendor default.",
  },
];

const PIPELINE = [
  { n: "01", meta: "build", title: "Reproducible build", body: "One command produces the model artifact, container and config from a pinned commit. No snowflake environments." },
  { n: "02", meta: "test", title: "Eval as CI", body: "The full evaluation suite runs on every candidate. Failing a gate blocks the merge, exactly like a unit test." },
  { n: "03", meta: "canary", title: "Canary rollout", body: "Traffic shifts in stages with live comparison against the incumbent. Regressions stop the rollout automatically." },
  { n: "04", meta: "observe", title: "Observe", body: "Traces, cost, latency, drift and failure taxonomy stream to the dashboard your team already watches." },
  { n: "05", meta: "iterate", title: "Close the loop", body: "Production failures become labelled evaluation cases, so the same mistake cannot ship twice." },
];

export default function DeploymentsPage() {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="Deployments"
        title={
          <>
            Shipped where
            <br />
            your data lives.
          </>
        }
        lede="The part that decides whether AI becomes infrastructure or a slide deck: rollout, scaling, monitoring, cost control and a security review you can pass the first time."
        panel={
          <TerminalPanel
            title="hawthorn@labs:~/deploy"
            lines={[
              { tone: "muted", text: "hawthorn deploy --target on-prem --canary 5%" },
              { tone: "green", text: "eval suite passed · 6/6 gates" },
              { tone: "green", text: "artifact signed · sha256:4f9c…e21b" },
              { tone: "cyan", text: "canary 5% · p95 214ms · error 0.03%" },
              { tone: "cyan", text: "promoting to 100% in 3 stages" },
            ]}
            footer="rollout healthy"
          />
        }
        stats={[
          { label: "Targets", value: "6 modes" },
          { label: "Rollback", value: "< 60s" },
          { label: "Offline capable", value: "Yes" },
          { label: "IaC", value: "Terraform / Helm" },
        ]}
      />

      {/* Targets */}
      <Section id="targets">
        <Container>
          <SectionHeading
            eyebrow="01 / Targets"
            title="One artifact, six places to run it."
            lede="Portability is a design decision made in week one, not a migration you discover in month six."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {TARGETS.map((t, i) => (
              <FeatureCard key={t.index} {...t} delay={i * 60} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Pipeline */}
      <Section id="delivery" className="border-y border-white/8 bg-[#06090f]">
        <div className="hx-grid-bg opacity-50" aria-hidden />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="02 / Model CI/CD"
                bracket
                title="Release engineering for models."
                lede="A model is a build artifact. It gets versioned, tested, canaried and rolled back like one."
              />
              <Link href="/contact" className="hx-btn hx-btn-ghost hx-reveal mt-8">
                Review your pipeline
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {PIPELINE.map((p, i) => (
                <StepCard key={p.n} {...p} delay={i * 70} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* SLOs */}
      <Section id="slos">
        <Container>
          <SectionHeading
            eyebrow="03 / Operating discipline"
            title="Numbers you can put in a review."
            lede="Targets are set with your platform team before launch and reviewed quarterly against real traffic."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SLOS.map((s, i) => (
              <div
                key={s.metric}
                className="hx-reveal group flex flex-col gap-2 border border-white/10 bg-[#080c12] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#4ec9ff]/35"
                style={{ "--hx-delay": `${i * 60}ms` } as CSSProperties}
              >
                <span className="hx-mono text-[10px] tracking-[0.16em] text-[#5d6b7e] uppercase">
                  {s.metric}
                </span>
                <strong className="hx-display text-[1.45rem] font-medium text-[#4ec9ff]">
                  {s.target}
                </strong>
                <p className="text-[13.5px] leading-relaxed text-[#8593a6]">{s.note}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Security */}
      <Section id="security" className="border-y border-white/8 bg-[#06090f]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionHeading
                eyebrow="04 / Security"
                title="Built to pass the review."
                lede="We treat the security questionnaire as a design input, not a document written at the end."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: <ShieldCheck className="size-4" />, t: "Signed artifacts" },
                  { icon: <Lock className="size-4" />, t: "Keys you control" },
                  { icon: <GitPullRequestArrow className="size-4" />, t: "Change-controlled" },
                  { icon: <Server className="size-4" />, t: "No data retention" },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="hx-reveal flex items-center gap-3 border border-white/10 bg-[#0b1017] px-4 py-3"
                  >
                    <span className="text-[#3fb950]">{x.icon}</span>
                    <span className="hx-mono text-[11.5px] tracking-[0.08em] text-[#9aa8ba]">
                      {x.t}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {FAQ.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`} className="border-white/10">
                  <AccordionTrigger className="py-5 text-left text-[15px] font-medium text-white hover:text-[#4ec9ff] hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[14px] leading-relaxed text-[#8593a6]">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>

      <Section bleed className="py-12">
        <Container className="mb-6 flex items-center gap-4">
          <span className="hx-mono text-[10px] tracking-[0.18em] text-[#5d6b7e] uppercase">
            Platforms we deploy to
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </Container>
        <Marquee
          reverse
          items={["AWS", "GCP", "Azure", "Kubernetes", "Terraform", "Helm", "Nomad", "vLLM", "Istio", "Prometheus", "Grafana", "OpenTelemetry", "ArgoCD", "Vault"].map(
            (s) => (
              <span
                key={s}
                className="hx-mono text-[13px] tracking-[0.1em] whitespace-nowrap text-[#8593a6] uppercase"
              >
                {s}
              </span>
            )
          )}
        />
      </Section>

      <CTABand
        eyebrow="Deployments"
        title={
          <>
            Out of the notebook.
            <br />
            Into the pipeline.
          </>
        }
        lede="Tell us the target environment and constraints. You get a reference architecture, a sizing estimate and a rollout plan."
        primary={{ label: "Plan a deployment", href: "/contact" }}
        secondary={{ label: "Read the FAQ", href: "/deployments#security" }}
      />
    </>
  );
}
