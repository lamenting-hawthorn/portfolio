export type Theme = "light" | "dark";

export const THEME_KEY = "hawthorn-theme";

/**
 * Runs before first paint so the correct theme (and its background) is in
 * place before anything is rendered — no flash of the wrong mode.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_KEY
)});var d=(t==="dark"||t==="light")?t:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.classList.toggle("dark",d==="dark");document.documentElement.style.colorScheme=d;}catch(e){}})();`;

export function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* storage unavailable — the class change still applies */
  }
  window.dispatchEvent(new CustomEvent<Theme>("hx:theme", { detail: theme }));
}

export function onThemeChange(fn: (theme: Theme) => void) {
  const handler = (e: Event) => fn((e as CustomEvent<Theme>).detail);
  window.addEventListener("hx:theme", handler);
  return () => window.removeEventListener("hx:theme", handler);
}
