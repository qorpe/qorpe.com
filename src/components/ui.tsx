"use client";

import { useEffect, useRef } from "react";
import {
  ArrowUp, ChartLine, Check, ChevronDown, Clock, Cloud, Cpu, Eye, FileText, GitBranch, GitPullRequestArrow, Home, Kanban,
  Landmark, ListChecks, Lock, Milestone, Package, Play, Plug, Plus, RadioTower, ScrollText, Search, Shield, ShieldCheck,
  Sparkles, Users, Workflow, type LucideIcon,
} from "lucide-react";

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

/** Icons: Lucide, 1.5px stroke, named by what the UI means. */
const ICONS: Record<string, LucideIcon> = {
  home: Home, spec: FileText, rule: ListChecks, change: GitPullRequestArrow, approve: ShieldCheck, gate: Milestone,
  board: Kanban, plug: Plug, trail: ScrollText, sparkle: Sparkles, users: Users, engine: Cpu, lock: Lock, cloud: Cloud,
  box: Package, chart: ChartLine, plus: Plus, send: ArrowUp, search: Search, doc: FileText, bank: Landmark, shield: Shield,
  signal: RadioTower, git: GitBranch, check: Check, flow: Workflow, clock: Clock, eye: Eye, play: Play, chevronDown: ChevronDown,
};

export function Icon({ name, size = 18, className = "" }: { name: string; size?: number; className?: string }) {
  const C = ICONS[name] ?? FileText;
  return <C size={size} strokeWidth={1.5} className={className} aria-hidden="true" />;
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
    if (r.top < window.innerHeight * 0.95) {
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
        if (b.top < window.innerHeight * 0.95) show();
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
