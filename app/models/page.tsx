import { Boxes, FileSearch, GitCompare, Layers3, ScanText, Waypoints } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/section";
import { CTABand, Marquee } from "@/components/blocks";
import { PageHero, TerminalPanel } from "@/components/page-hero";
import { FeatureCard, StepCard } from "@/components/cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MODEL_TYPES = [
  {
    index: "01",
    icon: <Waypoints className="size-5" />,
    title: "Domain assistants",
    body: "Chat and reasoning models that know your products, policies, tone and constraints — without being told twice.",
    href: "/contact",
  },
  {
    index: "02",
    icon: <Layers3 className="size-5" />,
    title: "Classifiers & routers",
    body: "Small, fast models that decide what a request is, who owns it and which path it should take before any LLM is invoked.",
    href: "/contact",
  },
  {
    index: "03",
    icon: <FileSearch className="size-5" />,
    title: "Extraction models",
    body: "Structured output from messy inputs: contracts, invoices, clinical notes, tickets, logs — schema-constrained and validated.",
    href: "/contact",
  },
  {
    index: "04",
    icon: <GitCompare className="size-5" />,
    title: "Retrieval & reranking",
    body: "Embedders and cross-encoders tuned on your corpus so retrieval precision stops being the bottleneck for everything downstream.",
    href: "/contact",
  },
  {
    index: "05",
    icon: <ScanText className="size-5" />,
    title: "Document & vision",
    body: "Layout-aware understanding for scans, forms, tables and screenshots where text-only pipelines quietly fail.",
    href: "/contact",
  },
  {
    index: "06",
    icon: <Boxes className="size-5" />,
    title: "Distilled specialists",
    body: "A large teacher's behaviour compressed into a small, cheap student you can run at volume, on-prem, or offline.",
    href: "/contact",
  },
];

const METHODS = [
  {
    value: "sft",
    label: "Supervised",
    title: "Supervised fine-tuning",
    body: "The workhorse. We build curated instruction data from your systems of record, filter it ruthlessly, and train until the held-out set moves.",
    points: [
      "Curriculum-ordered examples, not a dump of tickets",
      "Deduplicated, decontaminated and split by entity, not by row",
      "LoRA for iteration speed; full-parameter for the final model",
      "Loss tracked per capability, not just as one aggregate",
    ],
  },
  {
    value: "preference",
    label: "Preference",
    title: "Preference optimisation (DPO / RLHF)",
    body: "When the model is capable but not aligned with how your experts actually want answers written, ranked, or hedged.",
    points: [
      "Preference pairs sourced from real reviewer decisions",
      "Useful for refusal behaviour, tone, citation discipline",
      "Guarded against reward hacking with a frozen eval set",
      "Runs after SFT, never as a substitute for it",
    ],
  },
  {
    value: "lora",
    label: "PEFT",
    title: "LoRA, QLoRA & adapters",
    body: "Parameter-efficient training so you can ship weekly instead of quarterly, and keep many domain variants from one base model.",
    points: [
      "Train on a single modern GPU; serve by swapping adapters",
      "A/B multiple domain adapters against the same base",
      "Cheap ablation of data mixtures and hyperparameters",
      "Promotion to full fine-tune once the recipe is proven",
    ],
  },
  {
    value: "distill",
    label: "Distillation",
    title: "Distillation & right-sizing",
    body: "Make the cheap model behave like the expensive one. Usually the highest-leverage cost intervention available.",
    points: [
      "Teacher generates rationales and labels on unlabeled volume",
      "Student trained on reasoning traces, then pruned",
      "Typically 5–20× cost reduction at a fraction of the latency",
      "Measured against the teacher, not against nothing",
    ],
  },
];

const GATES = [
  { metric: "Task accuracy", measures: "Does it do the job on held-out, entity-split data?", gate: "≥ baseline + 5 pts" },
  { metric: "Groundedness", measures: "Are claims supported by retrieved or supplied context?", gate: "≥ 95%" },
  { metric: "Schema validity", measures: "Does structured output parse and validate every time?", gate: "≥ 99.5%" },
  { metric: "Refusal precision", measures: "Does it decline out-of-scope asks without blocking valid ones?", gate: "≥ 98%" },
  { metric: "p95 latency", measures: "End-to-end response time under production load.", gate: "agreed per route" },
  { metric: "Cost / 1k runs", measures: "Fully-loaded inference cost including retrieval and tools.", gate: "budget ceiling" },
  { metric: "Safety suite", measures: "Injection, exfiltration, prompt-leak and jailbreak battery.", gate: "0 criticals" },
];

export default function ModelsPage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Models"
        title={
          <>
            Models trained on
            <br />
            your distribution.
          </>
        }
        lede="A foundation model has read the internet. It has never read your contracts, your tickets or your edge cases. We adapt it to your data and prove the difference with an evaluation harness you own."
        panel={
          <TerminalPanel
            title="hawthorn@labs:~/train"
            lines={[
              { tone: "muted", text: "hawthorn train --base llama-3.3-70b --method lora" },
              { tone: "muted", text: "shuffling 42,180 examples · 6 capability buckets" },
              { tone: "green", text: "epoch 3 · eval 71.2 → 89.8 (+18.6)" },
              { tone: "green", text: "safety suite 128/128 passed" },
              { tone: "cyan", text: "artifact → registry/models/finance-qa@v4" },
            ]}
            footer="candidate promoted"
          />
        }
        stats={[
          { label: "Typical lift", value: "+15–22 pts" },
          { label: "Iteration cycle", value: "Weekly" },
          { label: "Base options", value: "Open + frontier" },
          { label: "Serving", value: "vLLM / TGI" },
        ]}
      />

      {/* Model types */}
      <Section id="types">
        <Container>
          <SectionHeading
            eyebrow="01 / What we build"
            title="Not every problem needs a 70B."
            lede="We choose the smallest model class that clears your bar, then make that model genuinely good at the job."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {MODEL_TYPES.map((m, i) => (
              <FeatureCard key={m.index} {...m} delay={i * 60} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Methods */}
      <Section id="methods" className="border-y border-[var(--hx-line)] bg-[var(--hx-bg)]">
        <div className="hx-glow right-[-8rem] top-[10%] size-[30rem] bg-[var(--hx-glow)]" aria-hidden />
        <Container className="relative">
          <SectionHeading
            eyebrow="02 / How we train"
            bracket
            title="Four methods. Chosen on evidence."
            lede="We run the cheapest experiment that can answer the question. Full fine-tuning is a last resort, not a default."
          />

          <Tabs defaultValue="sft" className="mt-12">
            <TabsList className="hx-mono h-auto w-full flex-wrap justify-start gap-1 rounded-lg border border-[var(--hx-line)] bg-[var(--hx-surface)] p-1.5">
              {METHODS.map((m) => (
                <TabsTrigger
                  key={m.value}
                  value={m.value}
                  className="hx-mono rounded-md px-4 py-2 text-[11px] tracking-[0.14em] text-[var(--hx-muted-2)] uppercase data-[state=active]:bg-[var(--hx-surface-2)] data-[state=active]:text-[var(--hx-cyan)]"
                >
                  {m.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {METHODS.map((m) => (
              <TabsContent key={m.value} value={m.value} className="mt-6">
                <div className="hx-panel hx-ticks grid gap-8 bg-[var(--hx-surface)] p-7 lg:grid-cols-[0.9fr_1.1fr] lg:p-9">
                  <div className="flex flex-col gap-4">
                    <span className="hx-eyebrow">{m.label}</span>
                    <h3 className="hx-display text-[clamp(1.5rem,2.6vw,2.1rem)] text-[var(--hx-heading)]">
                      {m.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-[var(--hx-muted)]">{m.body}</p>
                  </div>
                  <ul className="flex flex-col gap-3 border-l-0 pt-2 lg:border-l lg:border-[var(--hx-line)] lg:pt-0 lg:pl-8">
                    {m.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[14px] leading-relaxed text-[var(--hx-muted-2)]">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--hx-cyan)]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Container>
      </Section>

      {/* Data pipeline */}
      <Section id="data-pipeline">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="03 / Data"
                title="The model is the easy part."
                lede="Almost every failed fine-tune is a data problem wearing a training problem's clothes. This is where the weeks actually go."
              />
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <StepCard n="01" meta="ingest" title="Source & contract" body="Pull from the systems of record with a documented contract: owner, refresh, retention, permitted use." delay={0} />
              <StepCard n="02" meta="clean" title="Filter & deduplicate" body="Remove near-duplicates, PII you are not allowed to train on, and the 40% of rows that teach nothing." delay={80} />
              <StepCard n="03" meta="split" title="Entity-level splitting" body="Split by customer, document or account — never by row — so the eval set cannot leak into training." delay={160} />
              <StepCard n="04" meta="label" title="Expert review loop" body="Your domain experts adjudicate the hard cases; their decisions become both training signal and the rubric." delay={240} />
              <StepCard n="05" meta="train" title="Train & ablate" body="Small, cheap runs across data mixtures and hyperparameters before any expensive commitment." delay={320} />
              <StepCard n="06" meta="gate" title="Evaluate & promote" body="The candidate must clear every gate below. It either promotes or it goes back with a diagnosis." delay={400} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Eval gates */}
      <Section id="evaluation" className="border-y border-[var(--hx-line)] bg-[var(--hx-bg)]">
        <Container>
          <SectionHeading
            eyebrow="04 / Evaluation"
            title="Every release has a gate."
            lede="A number nobody agreed on is not a metric. These are set with you before the first run and enforced automatically thereafter."
          />

          <div className="hx-reveal mt-12 overflow-x-auto rounded-xl border border-[var(--hx-line)] [&_td]:border-[var(--hx-line)] [&_th]:border-[var(--hx-line)]">
            <Table>
              <TableHeader>
                <TableRow className="bg-[var(--hx-surface)] hover:bg-[var(--hx-surface)]">
                  <TableHead className="hx-mono text-[10px] tracking-[0.16em] text-[var(--hx-faint)] uppercase">
                    Metric
                  </TableHead>
                  <TableHead className="hx-mono text-[10px] tracking-[0.16em] text-[var(--hx-faint)] uppercase">
                    What it measures
                  </TableHead>
                  <TableHead className="hx-mono text-right text-[10px] tracking-[0.16em] text-[var(--hx-faint)] uppercase">
                    Release gate
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {GATES.map((g) => (
                  <TableRow key={g.metric} className="hover:bg-[var(--hx-line-soft)]">
                    <TableCell className="font-medium text-[var(--hx-heading)]">{g.metric}</TableCell>
                    <TableCell className="text-[var(--hx-muted-2)]">{g.measures}</TableCell>
                    <TableCell className="hx-mono text-right text-[12px] text-[var(--hx-green)]">
                      {g.gate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Container>
      </Section>

      {/* Serving stack */}
      <Section bleed className="py-12">
        <Container className="mb-6 flex items-center gap-4">
          <span className="hx-mono text-[10px] tracking-[0.18em] text-[var(--hx-faint)] uppercase">
            Serving & training stack
          </span>
          <span className="h-px flex-1 bg-[var(--hx-line)]" />
        </Container>
        <Marquee
          items={["PyTorch", "TRL", "vLLM", "Hugging Face", "MLflow", "Weights & Biases", "Ray", "DeepSpeed", "ONNX", "TensorRT", "Airflow", "Postgres"].map(
            (s) => (
              <span
                key={s}
                className="hx-mono text-[13px] tracking-[0.1em] whitespace-nowrap text-[var(--hx-muted-2)] uppercase"
              >
                {s}
              </span>
            )
          )}
        />
      </Section>

      <CTABand
        eyebrow="Custom models"
        title={
          <>
            Bring a baseline.
            <br />
            We&apos;ll beat it.
          </>
        }
        lede="Send us a held-out sample and the metric you care about. You get a scored baseline before any contract is signed."
        primary={{ label: "Start a model engagement", href: "/contact" }}
        secondary={{ label: "See deployments", href: "/deployments" }}
      />
    </>
  );
}
