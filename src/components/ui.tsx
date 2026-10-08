"use client";

import { useEffect, useRef } from "react";

export const PRODUCT = "Charter";

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

export function Dot({ tone }: { tone: "ok" | "warn" | "idle" | "accent" | "err" }) {
  const cls = { ok: "bg-ok", warn: "bg-warn", idle: "bg-gray-2/70", accent: "bg-[#3b5bdb]", err: "bg-[#d64545]" }[tone];
  return <span className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${cls}`} aria-hidden="true" />;
}

/** One stroke icon set, 24-grid, 1.5px. Names are what the UI means, not what the glyph is. */
const ICONS: Record<string, string> = {
  home: "M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9z",
  spec: "M7 3h7l5 5v13H7V3zM14 3v5h5M10 13h6M10 17h6",
  rule: "M4 6h10M4 12h10M4 18h10M18 5l2 2-4 4-2-2",
  change: "M6 3v12a3 3 0 003 3h9M15 15l3 3-3 3M6 3a2 2 0 100-4 2 2 0 000 4z",
  approve: "M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z",
  gate: "M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01",
  board: "M4 4h4v16H4zM10 4h4v10h-4zM16 4h4v7h-4z",
  plug: "M9 2v5M15 2v5M6 7h12v4a6 6 0 01-12 0V7zM12 17v5",
  trail: "M12 22a10 10 0 110-20 10 10 0 010 20zM12 7v5l3 2",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z",
  users: "M16 19v-1a4 4 0 00-4-4H6a4 4 0 00-4 4v1M9 11a4 4 0 100-8 4 4 0 000 8zM22 19v-1a4 4 0 00-3-3.9M15 3.1a4 4 0 010 7.8",
  engine: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z",
  lock: "M5 11h14v10H5zM8 11V7a4 4 0 018 0v4",
  cloud: "M7 18a4 4 0 01-.5-8 6 6 0 0111.5-1 4.5 4.5 0 01-.5 9H7z",
  box: "M12 2l9 5v10l-9 5-9-5V7l9-5zM3 7l9 5 9-5M12 12v10",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  plus: "M12 5v14M5 12h14",
  send: "M12 19V5M5 12l7-7 7 7",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3",
  pin: "M12 2v6M8 8h8l-1 6H9L8 8zM12 14v8",
  doc: "M5 3h14v18H5zM8 8h8M8 12h8M8 16h5",
  bank: "M3 10l9-6 9 6M5 10v9M9 10v9M15 10v9M19 10v9M3 19h18",
  shield: "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z",
  signal: "M4 20h16M6 16v-4M10 16V8M14 16v-6M18 16V4",
  git: "M6 3a3 3 0 100 6 3 3 0 000-6zM6 15a3 3 0 100 6 3 3 0 000-6zM18 6a3 3 0 100 6 3 3 0 000-6zM6 9v6M18 12a6 6 0 01-6 6H9",
  check: "M5 12l4 4L19 6",
  flow: "M4 6h6v4H4zM14 14h6v4h-6zM10 8h2a2 2 0 012 2v4",
  clock: "M12 22a10 10 0 110-20 10 10 0 010 20zM12 7v5l3 2",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z",
};

export function Icon({ name, size = 18, className = "" }: { name: keyof typeof ICONS | string; size?: number; className?: string }) {
  const d = ICONS[name] ?? ICONS.doc;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Two-tone heading: the claim in ink, the rest in gray. */
export function TwoTone({ strong, rest, as: As = "h2", className = "" }: { strong: string; rest: string; as?: "h2" | "h3" | "p"; className?: string }) {
  return (
    <As className={className}>
      {strong} <span className="text-gray">{rest}</span>
    </As>
  );
}

/** Reveal on scroll, once. */
export function Reveal({ children, className = "", delay = 0, as: As = "div" }: { children: React.ReactNode; className?: string; delay?: 0 | 1 | 2; as?: "div" | "section" | "li" }) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
      el.classList.add("is-in");
      return;
    }
    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      el.classList.add("is-in");
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) show(); }), { rootMargin: "0px 0px -5% 0px", threshold: 0 });
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const b = el.getBoundingClientRect();
        if (b.top < window.innerHeight * 0.95 && b.bottom > 0) show();
      });
    };
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  const Comp = As as unknown as "div";
  return (
    <Comp ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${delay === 1 ? "reveal-2" : delay === 2 ? "reveal-3" : ""} ${className}`}>
      {children}
    </Comp>
  );
}
