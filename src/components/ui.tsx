"use client";

import { useEffect, useRef } from "react";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1168px] px-6 ${className}`}>{children}</div>;
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>;
}

export function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Dot({ tone }: { tone: "ok" | "warn" | "idle" | "accent" }) {
  const cls = { ok: "bg-ok", warn: "bg-warn", idle: "bg-gray-2/70", accent: "bg-[#3b5bdb]" }[tone];
  return <span className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${cls}`} aria-hidden="true" />;
}

/** Two-tone heading: the claim in ink, the rest in gray. */
export function TwoTone({ strong, rest, as: As = "h2", className = "" }: { strong: string; rest: string; as?: "h2" | "h3" | "p"; className?: string }) {
  return (
    <As className={className}>
      {strong} <span className="text-gray">{rest}</span>
    </As>
  );
}

/** Reveal on scroll, once. Children get the rise; `delay` staggers siblings. */
export function Reveal({ children, className = "", delay = 0, as: As = "div" }: { children: React.ReactNode; className?: string; delay?: 0 | 1 | 2; as?: "div" | "section" | "li" }) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already on screen at mount (or after a jump): show it now, no observer wait.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Comp = As as unknown as "div";
  return (
    <Comp ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${delay === 1 ? "reveal-2" : delay === 2 ? "reveal-3" : ""} ${className}`}>
      {children}
    </Comp>
  );
}
