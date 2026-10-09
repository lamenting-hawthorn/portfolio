import type { CSSProperties } from "react";

/**
 * Stagger helper for `.hx-reveal` elements. Pass the delay in milliseconds so
 * siblings animate in sequence instead of all at once.
 */
export const delay = (ms: number) =>
  ({ "--hx-delay": `${ms}ms` }) as CSSProperties;
