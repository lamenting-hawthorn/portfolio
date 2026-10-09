"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
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
      <span className="relative grid size-9 place-items-center rounded-[9px] border border-[#4ec9ff]/40 bg-[#0a1017] transition-colors duration-300 group-hover:border-[#4ec9ff]/80 group-hover:bg-[#0d1a25]">
        <span className="hx-mono text-[15px] leading-none font-bold text-[#4ec9ff] transition-shadow duration-300 group-hover:[text-shadow:0_0_14px_rgba(78,201,255,0.9)]">
          /&gt;
        </span>
        <span className="absolute inset-0 rounded-[9px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 [box-shadow:0_0_22px_-4px_rgba(78,201,255,0.7)]" />
      </span>
      <span className="hx-mono hidden text-[13px] leading-none font-semibold tracking-[0.14em] sm:block">
        <span className="text-white">HAWTHORN</span>
        <span className="text-[#5d6b7e]"> AI LABS</span>
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
      <div className="absolute inset-x-0 top-0 h-[2px] bg-white/5">
        <div
          className="h-full origin-left bg-gradient-to-r from-[#4ec9ff] via-[#4f8dff] to-[#3fb950] transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-white/8 bg-[#05070c]/85 backdrop-blur-xl"
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
                    active ? "text-[#4ec9ff]" : "text-[#8593a6] hover:text-white"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-left transition-transform duration-300",
                      active ? "scale-x-100 bg-[#4ec9ff]" : "scale-x-0 bg-transparent"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto hidden items-center gap-5 xl:flex">
            <span className="hx-mono text-[11px] tracking-[0.1em] text-[#5d6b7e]">
              Custom AI. Real Impact.
            </span>
            <span className="h-4 w-px bg-white/10" />
          </div>

          <div className="ml-auto flex items-center gap-3 xl:ml-0">
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
                  className="size-9 border border-white/10 text-[#c3cdd9] lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[86vw] max-w-sm border-white/10 bg-[#070a10] p-0"
              >
                <SheetHeader className="border-b border-white/8 p-5">
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
                          "hx-mono flex items-center justify-between border-b border-white/5 px-3 py-4 text-[13px] tracking-[0.1em] uppercase transition-colors",
                          active ? "text-[#4ec9ff]" : "text-[#a9b6c6] hover:text-white"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-[10px] text-[#3f4c5c]">
                            0{i + 1}
                          </span>
                          {item.label}
                        </span>
                        {active ? (
                          <span className="size-1.5 rounded-full bg-[#4ec9ff] shadow-[0_0_10px_#4ec9ff]" />
                        ) : (
                          <X className="size-3.5 opacity-30" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
                <div className="p-5">
                  <Link href="/contact" onClick={() => setOpen(false)} className="block">
                    <Button className="hx-btn hx-btn-primary w-full">
                      Start a Project
                      <ArrowUpRight className="size-4" />
                    </Button>
                  </Link>
                  <p className="hx-mono mt-5 text-[10px] tracking-[0.14em] text-[#4d5a6b] uppercase">
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
