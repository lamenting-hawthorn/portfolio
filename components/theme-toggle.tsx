"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, type Theme } from "@/lib/theme";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("hx:theme", onStoreChange);
  return () => window.removeEventListener("hx:theme", onStoreChange);
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  /* Matches the pre-paint script's fallback when nothing is stored yet. */
  return "dark";
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;

  return (
    <button
      type="button"
      onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
      aria-label={label}
      title={label}
      data-theme={theme}
      className={
        className ??
        "grid size-9 place-items-center rounded-lg border border-[var(--hx-line)] bg-transparent text-[var(--hx-muted-2)] transition-colors duration-200 hover:border-[var(--hx-cyan-line)] hover:text-[var(--hx-heading)]"
      }
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
