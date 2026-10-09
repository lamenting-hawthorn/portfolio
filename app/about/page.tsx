import Link from "next/link";
import { ArrowRight, ArrowUpRight, GitBranch, HeartHandshake, Lightbulb, BriefcaseBusiness, Users } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/section";
import type { CSSProperties } from "react";
import { CTABand } from "@/components/blocks";
import { PageHero, TerminalPanel } from "@/components/page-hero";
import { Metric, StepCard } from "@/components/cards";

const PRINCIPLES = [
  {
    n: "01",
    title: "Evidence over adjectives",
    body: "“It feels better” is not a result. Every change ships with a measured delta against a baseline both sides agreed on before the work started.",
    meta: "evaluations",
  },
  {
    n: "02",
    title: "Smallest model that clears the bar",
    body: "The largest available model is rarely the right answer. We size the model to the requirement, then make that model genuinely good at the task.",
    meta: "cost & latency",
  },
  {
    n: "03",
    title: "Autonomy is a dial",
    body: "Where an agent may act without a human is a decision we make explicitly, per action class, in writing — and enforce outside the model.",
    meta: "governance",
  },
  {
    n: "04",
    title: "Handover is part of the deliverable",
    body: "Architecture decisions, runbooks, eval harness and a recorded walkthrough. You should never need us to keep the system alive.",
    meta: "ownership",
  },
];

const TIMELINE = [
  {
    when: "Now",
    title: "Custom models & agentic systems for enterprises",
    body: "Building the data, model and deployment layers that turn a promising prototype into infrastructure a business can depend on.",
  },
  {
    when: "2025",
    title: "Multilingual voice evaluation & training",
    body: "Evaluation design and training data work for Hindi and English voice intelligence at frontier-lab scale — where a bad rubric silently ruins a model.",
  },
  {
    when: "2025",
    title: "142K-record anomaly detection, in production",
    body: "A multi-agent system across 600–700 collection centres. Two of three randomly audited, AI-flagged centres were confirmed in a secret audit.",
  },
  {
    when: "Ongoing",
    title: "Open source & community",
    body: "Published agent, memory and governance systems used by other builders — plus a 100K+ audience, a podcast with 2M+ listens, and large-scale hackathons.",
  },
];

const PROJECTS = [
  {
    name: "SkillLoop",
    kind: "Learning governor",
    desc: "Local-first harness that turns agent traces into governed evaluations, memories, skills and fine-tuning exports.",
    tags: ["Python", "Evals", "Memory"],
  },
  {
    name: "Governed Agent Architecture",
    kind: "Agent runtime",
    desc: "Orchestration with durable memory, hybrid retrieval, injection defence and evidence-first execution.",
    tags: ["LangGraph", "RAG", "Governance"],
  },
  {
    name: "SuperMem",
    kind: "Persistent memory",
    desc: "Four-tier retrieval across full-text search, a knowledge graph, vectors and an LLM agent — exposed over MCP.",
    tags: ["MCP", "FTS5", "Graph"],
  },
  {
    name: "Recall",
    kind: "Memory without RAG",
    desc: "An agent-navigated local knowledge base for persistent memory across desktop assistants.",
    tags: ["Local-first", "MCP", "Python"],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="05"
        eyebrow="About"
        title={
          <>
            Engineers first.
            <br />
            Consultancy second.
          </>
        }
        lede="Hawthorn AI Labs is a small, senior team that builds the machinery between a model and the real world — the context it receives, the tools it can touch, the evidence it leaves, and the lessons it is allowed to keep."
        panel={
          <TerminalPanel
            title="about --format json"
            lines={[
              { tone: "muted", text: "focus: custom models · agents · deployment" },
              { tone: "muted", text: "model: senior engineers, no pyramid" },
              { tone: "green", text: "every engagement: eval baseline first" },
              { tone: "cyan", text: "handover: code, weights, runbooks, you name it" },
            ]}
            footer="india · working worldwide"
          />
        }
        stats={[
          { label: "Founded", value: "2025" },
          { label: "Based", value: "India" },
          { label: "Reach", value: "Worldwide" },
          { label: "Open source", value: "Public repos" },
        ]}
      />

      {/* Mission */}
      <Section id="mission">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="01 / Position"
                title="The future isn't just bigger models."
                lede="It's smaller, sharper systems around them — the retrieval, the tool contracts, the policy gates and the evaluation loop that make a model trustworthy in one specific job."
              />
            </div>

            <div className="flex flex-col gap-6">
              <p className="hx-reveal text-[16px] leading-relaxed text-[#93a2b6]">
                Most organisations we meet have the same experience: an impressive demo, a growing
                pile of prototypes, and no reliable path from either to production. The model was
                never the hard part. The hard part is everything the model needs in order to be safe,
                measurable and affordable at volume.
              </p>
              <p className="hx-reveal text-[16px] leading-relaxed text-[#93a2b6] [--hx-delay:90ms]">
                That is the whole company. We take ownership of the data contract, the model, the
                agent runtime and the deployment target, and we do not consider the work finished
                until your team can run and extend it without us.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <Metric value="6 wks" label="median time to first production slice" />
                <Metric value="100%" label="of engagements start with a baseline" delay={90} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Principles */}
      <Section id="principles" className="border-y border-white/8 bg-[#06090f]">
        <div className="hx-grid-bg opacity-50" aria-hidden />
        <Container className="relative">
          <SectionHeading
            eyebrow="02 / Principles"
            bracket
            title="Four rules we don't bend."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <StepCard key={p.n} n={p.n} meta={p.meta} title={p.title} body={p.body} delay={i * 80} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Track record */}
      <Section id="track-record">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="03 / Track record"
                title="Built by people who have shipped."
                lede="Frontier-lab evaluation work, production anomaly detection at national scale, and open-source systems other builders rely on."
              />
              <Link href="/contact" className="hx-btn hx-btn-primary hx-reveal mt-8">
                Talk to an engineer
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="flex flex-col">
              {TIMELINE.map((t, i) => (
                <article
                  key={t.when}
                  className="hx-reveal group grid gap-3 border-t border-white/10 py-7 last:border-b sm:grid-cols-[110px_1fr] sm:gap-8"
                  style={{ "--hx-delay": `${i * 70}ms` } as CSSProperties}
                >
                  <span className="hx-mono text-[11px] font-semibold tracking-[0.16em] text-[#4ec9ff] uppercase">
                    {t.when}
                  </span>
                  <div>
                    <h3 className="text-[1.15rem] leading-snug font-semibold tracking-[-0.02em] text-white">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-[#8593a6]">{t.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Open source */}
      <Section id="open-source" className="border-t border-white/8 bg-[#06090f]">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="04 / Open source"
              title="We build in public."
              lede="The patterns above ship as reusable systems. Read the source before you hire us."
            />
            <a
              href="https://github.com/lamenting-hawthorn"
              target="_blank"
              rel="noreferrer"
              className="hx-btn hx-btn-ghost hx-reveal"
            >
              <GitBranch className="size-4" />
              View GitHub
            </a>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <a
                key={p.name}
                href="https://github.com/lamenting-hawthorn"
                target="_blank"
                rel="noreferrer"
                className="hx-reveal group flex flex-col gap-3 border border-white/10 bg-[#080c12] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#4ec9ff]/40"
                style={{ "--hx-delay": `${i * 70}ms` } as CSSProperties}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="hx-mono text-[10px] tracking-[0.16em] text-[#4ec9ff] uppercase">
                      {p.kind}
                    </span>
                    <h3 className="hx-display mt-2 text-[1.35rem] text-white">{p.name}</h3>
                  </div>
                  <ArrowUpRight className="size-4 text-[#3f4c5c] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </div>
                <p className="text-[14px] leading-relaxed text-[#8593a6]">{p.desc}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="hx-mono rounded-full border border-white/10 px-2.5 py-1 text-[10px] tracking-[0.08em] text-[#6f8296]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* Culture */}
      <Section id="culture">
        <Container>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { icon: <Lightbulb className="size-5" />, t: "Small senior teams", d: "The people designing the system are the people writing it. No handoff to a junior pod." },
              { icon: <Users className="size-5" />, t: "Direct access", d: "You talk to the engineer doing the work, in your timezone overlap, without a account manager relay." },
              { icon: <HeartHandshake className="size-5" />, t: "Long-term minded", d: "We would rather ship something modest you can operate than something impressive you cannot." },
            ].map((c, i) => (
              <div
                key={c.t}
                className="hx-reveal flex flex-col gap-3 border border-white/10 bg-[#080c12] p-6"
                style={{ "--hx-delay": `${i * 70}ms` } as CSSProperties}
              >
                <span className="text-[#4ec9ff]">{c.icon}</span>
                <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-white">{c.t}</h3>
                <p className="text-[14px] leading-relaxed text-[#8593a6]">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://www.linkedin.com/in/raghwender-vasisth/"
              target="_blank"
              rel="noreferrer"
              className="hx-mono inline-flex items-center gap-2 border-b border-white/15 pb-1 text-[11px] tracking-[0.14em] text-[#8593a6] uppercase transition-colors hover:border-[#4ec9ff] hover:text-white"
            >
              <BriefcaseBusiness className="size-3.5" /> LinkedIn
            </a>
            <a
              href="https://github.com/lamenting-hawthorn"
              target="_blank"
              rel="noreferrer"
              className="hx-mono inline-flex items-center gap-2 border-b border-white/15 pb-1 text-[11px] tracking-[0.14em] text-[#8593a6] uppercase transition-colors hover:border-[#4ec9ff] hover:text-white"
            >
              <GitBranch className="size-3.5" /> GitHub
            </a>
            <a
              href="https://cal.com/hawthorn"
              target="_blank"
              rel="noreferrer"
              className="hx-mono inline-flex items-center gap-2 border-b border-white/15 pb-1 text-[11px] tracking-[0.14em] text-[#8593a6] uppercase transition-colors hover:border-[#4ec9ff] hover:text-white"
            >
              Book a call <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </Container>
      </Section>

      <CTABand
        eyebrow="Work with us"
        title={
          <>
            Tell us what
            <br />
            should exist.
          </>
        }
        lede="If it can be specified and measured, it can be built. If it can't yet, that is exactly what a diagnostic sprint is for."
        primary={{ label: "Start a conversation", href: "/contact" }}
        secondary={{ label: "See our solutions", href: "/solutions" }}
      />
    </>
  );
}
