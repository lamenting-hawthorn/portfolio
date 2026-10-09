"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/models", label: "Models" },
  { href: "/agents", label: "Agents" },
  { href: "/deployments", label: "Deployments" },
  { href: "/about", label: "About" },
];

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Hawthorn AI Labs — home">
      <span className="relative grid size-9 place-items-center rounded-[9px] border border-[var(--hx-cyan)]/40 bg-[var(--hx-surface)] transition-colors duration-300 group-hover:border-[var(--hx-cyan)]/80 group-hover:bg-[var(--hx-surface-2)]">
        <span className="hx-mono text-[15px] leading-none font-bold text-[var(--hx-cyan)] transition-shadow duration-300 group-hover:[text-shadow:0_0_14px_var(--hx-cyan-line)]">
          /&gt;
        </span>
        <span className="absolute inset-0 rounded-[9px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 [box-shadow:0_0_22px_-4px_rgba(78,201,255,0.7)]" />
      </span>
      <span className="hx-mono hidden text-[13px] leading-none font-semibold tracking-[0.14em] sm:block">
        <span className="text-[var(--hx-heading)]">HAWTHORN</span>
        <span className="text-[var(--hx-faint)]"> AI LABS</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* scroll progress */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-[var(--hx-line-soft)]">
        <div
          className="h-full origin-left bg-gradient-to-r from-[var(--hx-cyan)] via-[var(--hx-blue)] to-[var(--hx-green)] transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-[var(--hx-line)] bg-[var(--hx-bg)]/85 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="hx-container flex h-[68px] items-center gap-6">
          <Logo />

          <nav className="hidden flex-1 items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "hx-mono relative px-3 py-2 text-[11px] font-medium tracking-[0.13em] uppercase transition-colors duration-200",
                    active ? "text-[var(--hx-cyan)]" : "text-[var(--hx-muted-2)] hover:text-[var(--hx-heading)]"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-left transition-transform duration-300",
                      active ? "scale-x-100 bg-[var(--hx-cyan)]" : "scale-x-0 bg-transparent"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto hidden items-center gap-5 xl:flex">
            <span className="hx-mono text-[11px] tracking-[0.1em] text-[var(--hx-faint)]">
              Custom AI. Real Impact.
            </span>
            <span className="h-4 w-px bg-[var(--hx-line)]" />
          </div>

          <div className="ml-auto flex items-center gap-2.5 sm:gap-3 xl:ml-0">
            <ThemeToggle />
            <Link href="/contact" className="hidden sm:block">
              <Button className="hx-btn hx-btn-primary h-9 px-4 text-[12px]">
                Start a Project
                <ArrowUpRight className="size-3.5" />
              </Button>
            </Link>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 border border-[var(--hx-line)] text-[var(--hx-fg)] lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[86vw] max-w-sm border-[var(--hx-line)] bg-[var(--hx-surface)] p-0"
              >
                <SheetHeader className="border-b border-[var(--hx-line)] p-5">
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                  <Logo />
                </SheetHeader>
                <nav className="flex flex-col p-3">
                  {NAV.map((item, i) => {
                    const active =
                      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "hx-mono flex items-center justify-between border-b border-[var(--hx-line-soft)] px-3 py-4 text-[13px] tracking-[0.1em] uppercase transition-colors",
                          active ? "text-[var(--hx-cyan)]" : "text-[var(--hx-fg)] hover:text-[var(--hx-heading)]"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-[10px] text-[var(--hx-faint-2)]">
                            0{i + 1}
                          </span>
                          {item.label}
                        </span>
                        {active ? (
                          <span className="size-1.5 rounded-full bg-[var(--hx-cyan)] shadow-[0_0_10px_var(--hx-cyan)]" />
                        ) : (
                          <X className="size-3.5 opacity-30" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
                <div className="flex items-center justify-between border-t border-[var(--hx-line)] px-5 py-4">
                  <span className="hx-mono text-[10px] tracking-[0.16em] text-[var(--hx-faint)] uppercase">
                    Appearance
                  </span>
                  <ThemeToggle />
                </div>
                <div className="p-5">
                  <Link href="/contact" onClick={() => setOpen(false)} className="block">
                    <Button className="hx-btn hx-btn-primary w-full">
                      Start a Project
                      <ArrowUpRight className="size-4" />
                    </Button>
                  </Link>
                  <p className="hx-mono mt-5 text-[10px] tracking-[0.14em] text-[var(--hx-faint)] uppercase">
                    Custom AI. Real Impact.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
