import { cn } from "cn";
import type { ReactNode } from "react";

export function Section({
  id,
  className,
  children,
  bleed = false,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-x-clip",
        !bleed && "hx-section",
        className
      )}
    >
      {children}
    </section>
  );
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("hx-container", className)}>{children}</div>;
}

export function Eyebrow({
  children,
  tone = "cyan",
  bracket = false,
  className,
}: {
  children: ReactNode;
  tone?: "cyan" | "green" | "plain";
  bracket?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "hx-eyebrow hx-reveal",
        tone === "green" && "hx-eyebrow--green",
        tone === "plain" && "!text-[#7e8da3]",
        bracket && "hx-eyebrow--bracket",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  eyebrowTone = "cyan",
  bracket = false,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow: string;
  eyebrowTone?: "cyan" | "green" | "plain";
  bracket?: boolean;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Eyebrow tone={eyebrowTone} bracket={bracket}>
        {eyebrow}
      </Eyebrow>
      <h2 className="hx-title hx-reveal max-w-4xl text-[clamp(2.1rem,4.6vw,3.5rem)] text-white [--hx-delay:70ms]">
        {title}
      </h2>
      {lede && <p className="hx-lede hx-reveal [--hx-delay:150ms]">{lede}</p>}
    </div>
  );
}
