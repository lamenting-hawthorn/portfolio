"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  { n: "01", name: "SkillLoop", type: "LEARNING GOVERNOR", desc: "A local-first self-improvement harness that turns agent traces into governed evaluations, memories, skills, and fine-tuning exports.", tags: ["Python", "Evals", "Memory"], href: "https://github.com/lamenting-hawthorn/SkillLoop", color: "lime" },
  { n: "02", name: "Governed Agent Architecture", type: "AGENT RUNTIME", desc: "LangGraph orchestration with durable memory, hybrid retrieval, local embeddings, injection defense, and evidence-first execution.", tags: ["LangGraph", "RAG", "Governance"], href: "https://github.com/lamenting-hawthorn/governed-agent-architecture", color: "orange" },
  { n: "03", name: "SuperMem", type: "PERSISTENT MEMORY", desc: "Four-tier retrieval across SQLite FTS5, a knowledge graph, vectors, and an LLM agent—exposed through MCP.", tags: ["MCP", "FTS5", "Graph"], href: "https://github.com/lamenting-hawthorn/supermem", color: "blue" },
  { n: "04", name: "Recall", type: "MEMORY WITHOUT RAG", desc: "An agent-navigated local knowledge base for persistent memory across Claude Desktop, LM Studio, and ChatGPT.", tags: ["Local-first", "MCP", "Python"], href: "https://github.com/lamenting-hawthorn/recall", color: "cream" },
  { n: "05", name: "Oculie", type: "AUTONOMOUS MARKETS", desc: "A weather-market agent that fuses forecast sources, finds mispriced contracts, and sizes risk using the Kelly criterion.", tags: ["Agents", "Forecasting", "Trading"], href: "https://github.com/lamenting-hawthorn/oculie", color: "orange" },
];

type PanelKind = "memory" | "eval" | "governance";

function LivePanel({ kind, title, initial }: { kind: PanelKind; title: string; initial: { x: string; y: string } }) {
  const [position, setPosition] = useState<{x:number;y:number} | null>(null);
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const panel = event.currentTarget.parentElement as HTMLElement;
    drag.current = { x: event.clientX, y: event.clientY, px: panel.offsetLeft, py: panel.offsetTop };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const panel = event.currentTarget.parentElement as HTMLElement;
    const bounds = panel.parentElement as HTMLElement;
    const nextX = drag.current.px + event.clientX - drag.current.x;
    const nextY = drag.current.py + event.clientY - drag.current.y;
    setPosition({ x: Math.max(0, Math.min(nextX, bounds.clientWidth - panel.offsetWidth)), y: Math.max(0, Math.min(nextY, bounds.clientHeight - panel.offsetHeight)) });
  };
  const stop = () => { drag.current = null; };
  return <div className={`live-panel live-${kind}`} style={{ left: position?.x ?? initial.x, top: position?.y ?? initial.y }}>
    <div className="live-panel-head" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={stop} onPointerCancel={stop} title="Drag to move">
      <span><i/>{title}</span><b>⠿</b>
    </div>
    <div className="live-panel-body">
      {kind === "memory" && <svg className="memory-network" viewBox="0 0 240 120" aria-label="Animated memory network"><g className="memory-lines"><path d="M28 82L75 34L121 69L166 24L211 76"/><path d="M28 82L121 69L211 76M75 34L166 24"/></g>{[[28,82],[75,34],[121,69],[166,24],[211,76],[94,95],[190,101]].map((p,i)=><circle key={i} cx={p[0]} cy={p[1]} r={i===2?8:5} style={{animationDelay:`${i*.18}s`}}/>)}</svg>}
      {kind === "eval" && <svg className="eval-chart" viewBox="0 0 260 110" aria-label="Animated evaluation score"><path className="grid-line" d="M0 22H260M0 55H260M0 88H260"/><polyline points="0,90 22,76 43,82 66,40 88,64 110,29 132,58 154,50 176,71 198,33 222,39 260,12"/><circle cx="260" cy="12" r="6"/><text x="4" y="16">LIVE SCORE</text></svg>}
      {kind === "governance" && <div className="governance-list">{["POLICY GATE", "EVIDENCE LOG", "HUMAN REVIEW"].map((x,i)=><div key={x}><i style={{animationDelay:`${i*.35}s`}}>✓</i><span>{x}</span><b/></div>)}</div>}
    </div>
  </div>;
}

function HeroStage() {
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const rect = stage.current?.getBoundingClientRect(); if (!rect) return;
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      stage.current?.style.setProperty("--mx", `${x * 22}px`);
      stage.current?.style.setProperty("--my", `${y * 14}px`);
    };
    addEventListener("pointermove", onMove); return () => removeEventListener("pointermove", onMove);
  }, []);
  return <div className="hero-stage" ref={stage}>
    <div className="garden-art"><img src="/art/agent-garden-complete.png" alt="Surreal Agent Garden of connected memory, governance, and evaluation modules"/></div>
    <div className="live-panels"><LivePanel kind="memory" title="MEMORY ONLINE" initial={{x:"52%",y:"9%"}}/><LivePanel kind="eval" title="EVAL LOOP 97.4%" initial={{x:"76%",y:"68%"}}/><LivePanel kind="governance" title="GOVERNANCE ACTIVE" initial={{x:"48%",y:"69%"}}/></div>
  </div>;
}

export default function Home() {
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setLoaded(true),450); return()=>clearTimeout(t)},[]);
  return <main className={loaded?"loaded":""}>
    <div className="boot"><span>HAWTHORN.OS</span><b>CONNECTING AGENTS</b></div>
    <section className="hero" id="top">
      <div className="machine-shell">
        <header><a className="wordmark" href="#top">RAGHWENDER</a><nav><a href="#systems">SYSTEMS</a><a href="#projects">PROJECTS</a><a href="#about">ABOUT</a><a className="nav-cta" href="https://cal.com/hawthorn" target="_blank">BOOK A CALL ↗</a></nav><span className="power-light"/></header>
        <div className="screen">
          <div className="noise"/><div className="hero-copy"><p className="eyebrow">AGENTIC AI ENGINEER // SYSTEM ONLINE</p><h1><span className="cinematic-line"><i>I BUILD BRAINS</i></span><span className="cinematic-line"><i>FOR AI</i></span><span className="cinematic-line"><i>AGENTS<b>.</b></i></span></h1><p className="lede">Memory, governance and self-improving systems for agents that work in the real world.</p><div className="actions"><a className="button primary" href="#projects">EXPLORE THE SYSTEM →</a><a className="button ghost" href="https://cal.com/hawthorn" target="_blank">BOOK A CALL ↗</a></div></div>
          <HeroStage/>
          <div className="scroll-hint">SCROLL TO ENTER ↓</div>
        </div>
        <div className="machine-foot"><div className="meter"><span>SYSTEM STATUS</span><b>ALL AGENTS OPERATIONAL</b><em/></div><i/><i/></div>
      </div>
    </section>

    <section className="ticker"><div>MEMORY ✦ GOVERNANCE ✦ EVALS ✦ MULTI-AGENT SYSTEMS ✦ RETRIEVAL ✦ EVIDENCE ✦ MEMORY ✦ GOVERNANCE ✦ EVALS ✦</div></section>

    <section className="systems section" id="systems"><div className="section-label">01 / SYSTEM ARCHITECTURE</div><div className="systems-heading"><h2>AGENTS SHOULD<br/><em>REMEMBER.</em><br/>PROVE. IMPROVE.</h2><p>I design the machinery between a model and the real world—the context it receives, the tools it can touch, the evidence it leaves, and the lessons it is allowed to keep.</p></div><div className="capability-grid">{[
      ["MEMORY", "Episodic, semantic, graph and working memory—retrieved with purpose, not dumped into context."], ["GOVERNANCE", "Policy gates, approval boundaries, provenance, and review-before-apply learning."], ["EVALUATION", "Trace-level evidence, deterministic checks, failure taxonomies, and improvement loops."], ["ORCHESTRATION", "Multi-agent workflows that survive long tasks, retries, handoffs, and real infrastructure."],
    ].map((x,i)=><article key={x[0]}><span>0{i+1}</span><div className="orb"/><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div></section>

    <section className="case-study section"><div className="case-kicker">REAL-WORLD SIGNAL / 2026</div><div className="case-title"><h2>142K RECORDS.<br/><span>ONE HIDDEN PATTERN.</span></h2><p>A multi-agent anomaly detection system for a multimillion-dollar dairy company—built to find where subtle quality anomalies were hiding across a vast collection network.</p></div><div className="evidence-panel"><div className="radar">{Array.from({length:12},(_,i)=><i key={i} style={{transform:`rotate(${i*30}deg) translateY(-82px)`}}/>)}<b>02/03</b><span>CONFIRMED</span></div><div className="evidence-copy"><strong>600–700+</strong><span>COLLECTION CENTERS</span><strong>2 OF 3</strong><span>AI-FLAGGED CENTERS CONFIRMED IN A SECRET AUDIT</span></div></div></section>

    <section className="projects section" id="projects"><div className="section-label">02 / SELECTED SYSTEMS</div><div className="project-intro"><h2>SOFTWARE WITH<br/><em>A MEMORY.</em></h2><p>Selected open-source systems from my GitHub. Each begins with the same question: what does an agent need around the model to become reliable?</p></div><div className="project-list">{projects.map((p,i)=><a href={p.href} target="_blank" className={`project-row ${p.color}`} key={p.name}><span className="project-num">{p.n}</span><div><small>{p.type}</small><h3>{p.name}</h3></div><p>{p.desc}</p><div className="tags">{p.tags.map(t=><i key={t}>{t}</i>)}</div><b>↗</b></a>)}</div></section>

    <section className="about section" id="about"><div className="about-sticky"><div className="section-label">03 / HUMAN IN THE LOOP</div><h2>ENGINEER.<br/>BUILDER.<br/><em>STORYTELLER.</em></h2></div><div className="timeline"><article><span>NOW</span><h3>AGENTIC AI ENGINEER</h3><p>Building persistent memory, governed learning, and multi-agent infrastructure for enterprise systems.</p></article><article><span>2026</span><h3>xAI · GROK AUDIO</h3><p>Worked on Hindi and English evaluation and training for multilingual voice intelligence.</p></article><article><span>PROOF</span><h3>FROM DATA TO AUDIT</h3><p>Built an anomaly-detection system across 142K+ dairy records; two of three randomly audited flagged centers were confirmed.</p></article><article><span>BEYOND CODE</span><h3>COMMUNITIES & MEDIA</h3><p>Helped grow a 100K+ YouTube audience, produced a podcast with 2M+ listens, and hosted large-scale hackathons.</p></article></div></section>

    <section className="manifesto"><p>THE FUTURE ISN’T JUST<br/>BIGGER MODELS.</p><h2>IT’S SMALLER, SHARPER<br/><em>SYSTEMS AROUND THEM.</em></h2></section>

    <section className="contact section" id="contact"><div className="contact-copy"><div className="section-label">04 / OPEN A PORTAL</div><h2>LET’S BUILD<br/>SOMETHING THAT<br/><em>REMEMBERS.</em></h2><p>Have an agent system that needs memory, governance, evaluation—or a path out of prototype purgatory?</p><div className="socials"><a href="https://github.com/lamenting-hawthorn" target="_blank">GITHUB ↗</a><a href="https://www.linkedin.com/in/raghwender-vasisth/" target="_blank">LINKEDIN ↗</a></div></div><div className="observatory"><div className="observatory-top"><span><i/> CALENDAR ONLINE</span><b>IST / WORLDWIDE</b></div><iframe title="Schedule a meeting with Raghwender" src="https://cal.com/hawthorn?embed=true&theme=light" loading="lazy"/><a href="https://cal.com/hawthorn" target="_blank" className="book-big">OPEN CAL.COM <span>↗</span></a></div></section>
    <footer><span>RAGHWENDER VASISTH © 2026</span><span>AGENTIC AI ENGINEER · INDIA / WORLDWIDE</span><a href="#top">REBOOT ↑</a></footer>
  </main>;
}
