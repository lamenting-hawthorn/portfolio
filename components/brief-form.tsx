"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "cn";

const STAGES = ["Idea", "Prototype", "In production"] as const;

export function BriefForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [stage, setStage] = useState<(typeof STAGES)[number]>("Prototype");
  const [brief, setBrief] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !brief.trim()) {
      setError("Add your name and a short description so we can prepare.");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That email doesn't look right.");
      return;
    }
    setError("");

    const summary = [
      "Hawthorn AI Labs — project brief",
      "",
      `Name: ${name}`,
      email ? `Email: ${email}` : "Email: (not provided)",
      company ? `Company: ${company}` : "Company: (not provided)",
      `Stage: ${stage}`,
      "",
      "What we want to build:",
      brief.trim(),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setCopied(false);
    }

    window.open("https://cal.com/hawthorn", "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="hx-mono text-[10px] tracking-[0.16em] text-[#5d6b7e] uppercase">
            Name <span className="text-[#4ec9ff]">*</span>
          </span>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada Lovelace"
            className="h-11 rounded-lg border-white/12 bg-[#0a0e15] px-3.5 text-[14px] text-white placeholder:text-[#3f4c5c] focus-visible:border-[#4ec9ff]/60 focus-visible:ring-[#4ec9ff]/30"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="hx-mono text-[10px] tracking-[0.16em] text-[#5d6b7e] uppercase">
            Work email
          </span>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ada@company.com"
            className="h-11 rounded-lg border-white/12 bg-[#0a0e15] px-3.5 text-[14px] text-white placeholder:text-[#3f4c5c] focus-visible:border-[#4ec9ff]/60 focus-visible:ring-[#4ec9ff]/30"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="hx-mono text-[10px] tracking-[0.16em] text-[#5d6b7e] uppercase">
          Company
        </span>
        <Input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Where you work"
          className="h-11 rounded-lg border-white/12 bg-[#0a0e15] px-3.5 text-[14px] text-white placeholder:text-[#3f4c5c] focus-visible:border-[#4ec9ff]/60 focus-visible:ring-[#4ec9ff]/30"
        />
      </label>

      <div className="flex flex-col gap-2">
        <span className="hx-mono text-[10px] tracking-[0.16em] text-[#5d6b7e] uppercase">
          Where you are today
        </span>
        <div className="flex flex-wrap gap-2">
          {STAGES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStage(s)}
              aria-pressed={stage === s}
              className={cn(
                "hx-mono rounded-lg border px-3.5 py-2 text-[11px] tracking-[0.1em] uppercase transition-all",
                stage === s
                  ? "border-[#4ec9ff]/60 bg-[#4ec9ff]/10 text-[#4ec9ff]"
                  : "border-white/12 bg-[#0a0e15] text-[#8593a6] hover:border-white/25 hover:text-white"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-2">
        <span className="hx-mono text-[10px] tracking-[0.16em] text-[#5d6b7e] uppercase">
          What should exist? <span className="text-[#4ec9ff]">*</span>
        </span>
        <Textarea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          rows={5}
          placeholder="The workflow, the data you have, what's failing today, and what 'working' would look like."
          className="resize-y rounded-lg border-white/12 bg-[#0a0e15] px-3.5 py-3 text-[14px] leading-relaxed text-white placeholder:text-[#3f4c5c] focus-visible:border-[#4ec9ff]/60 focus-visible:ring-[#4ec9ff]/30"
        />
      </label>

      {error && (
        <p className="hx-mono text-[11.5px] text-[#f0b429]" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button className="hx-btn hx-btn-primary h-11 w-full px-6 sm:w-auto">
          {copied ? (
            <>
              Brief copied <Check className="size-4" />
            </>
          ) : (
            <>
              Copy brief & book a call <ArrowRight className="size-4" />
            </>
          )}
        </Button>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(window.location.href)}
          className="hx-mono inline-flex items-center gap-1.5 text-[11px] tracking-[0.12em] text-[#5d6b7e] uppercase transition-colors hover:text-[#8593a6]"
        >
          <Copy className="size-3.5" /> copy page link
        </button>
      </div>

      <p className="hx-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-[#4d5a6b]">
        {copied
          ? "Brief is on your clipboard — paste it into the call booking note."
          : "This builds a short brief, copies it to your clipboard and opens the scheduler. Nothing is sent to a server."}
      </p>
    </form>
  );
}
