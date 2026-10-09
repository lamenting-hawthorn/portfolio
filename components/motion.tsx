"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/*  Reveal — one observer for every .hx-reveal in the document         */
/* ------------------------------------------------------------------ */

export function RevealObserver() {
  useEffect(() => {
    const pending = new Set<Element>();
    let raf = 0;

    /* Reveal everything whose top has passed the trigger line. Runs on scroll,
       on IO callbacks and after DOM mutations, so nothing can be skipped by a
       fast scroll or a frame where the observer never fired. */
    const flush = () => {
      raf = 0;
      if (!pending.size) return;
      const line = window.innerHeight * 0.92;
      for (const el of [...pending]) {
        if (el.getBoundingClientRect().top <= line) {
          el.classList.add("is-visible");
          pending.delete(el);
        }
      }
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(flush);
    };

    const add = (el: Element) => {
      if (pending.has(el)) return;
      pending.add(el);
      schedule();
    };

    const scan = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(".hx-reveal:not(.is-visible)").forEach(add);
    };

    scan(document);

    const mo = new MutationObserver(() => {
      scan(document.body);
      schedule();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return null;
}

/* ------------------------------------------------------------------ */
/*  ParallaxLayer — moves slower (or faster) than the page             */
/* ------------------------------------------------------------------ */

type ParallaxProps = {
  children: ReactNode;
  /** 0 = pinned, 0.15 = gentle lag, negative = moves with the scroll */
  speed?: number;
  /** add a small pointer-driven offset on top of the scroll offset */
  pointer?: number;
  className?: string;
  style?: CSSProperties;
  zIndex?: number;
};

export function ParallaxLayer({
  children,
  speed = 0.14,
  pointer = 0,
  className,
  style,
  zIndex,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const raf = useRef(0);
  const ptr = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let ticking = false;

    const apply = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const centre = rect.top + rect.height / 2 - window.innerHeight / 2;
      const px = pointer ? ptr.current.x * pointer * 40 : 0;
      const py = pointer ? ptr.current.y * pointer * 40 : 0;
      el.style.transform = `translate3d(${px.toFixed(2)}px, ${(-centre * speed + py).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf.current = requestAnimationFrame(apply);
    };

    const onPointer = (e: PointerEvent) => {
      ptr.current.x = e.clientX / window.innerWidth - 0.5;
      ptr.current.y = e.clientY / window.innerHeight - 0.5;
      onScroll();
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [speed, pointer]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, willChange: "transform", ...(zIndex !== undefined ? { zIndex } : {}) }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  useScrolled — for header condensing                                */
/* ------------------------------------------------------------------ */

export function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
