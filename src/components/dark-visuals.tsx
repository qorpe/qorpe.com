"use client";

import { motion, useReducedMotion } from "motion/react";

/* One language for the three dark visuals: thin white lines at low alpha,
   small nodes, one cool accent, labels at 12px. Everything is orchestrated
   by time, nothing by chance. */
const LINE = "rgba(255,255,255,0.16)";
const LINE_STRONG = "rgba(255,255,255,0.32)";
const ACCENT = "#9db4ff";
const INK = "#f5f5f6";
const GRAY = "rgba(255,255,255,0.55)";
const EASE = [0.2, 0.7, 0.2, 1] as const;

function Label({ x, y, children, anchor = "middle", dim = false }: { x: number; y: number; children: React.ReactNode; anchor?: "start" | "middle" | "end"; dim?: boolean }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize="12" fontFamily="var(--font-sans)" fill={dim ? GRAY : INK} fontWeight={dim ? 400 : 500}>
      {children}
    </text>
  );
}

/* ---------- 1. The trail: six stages, filled in order, then read again. ---------- */

const STAGES = ["Extracted", "Proven", "Specified", "Implemented", "Re-proven", "Released"];

export function TrailFlow() {
  const reduce = useReducedMotion();
  const W = 1200, Y = 120, X0 = 90, X1 = W - 90;
  const xs = STAGES.map((_, i) => X0 + (i * (X1 - X0)) / (STAGES.length - 1));
  const seg = 1.1, hold = 2.2, total = STAGES.length * seg + hold;
  return (
    <svg viewBox={`0 0 ${W} 220`} className="h-auto w-full" aria-hidden="true">
      <line x1={X0} x2={X1} y1={Y} y2={Y} stroke={LINE} strokeWidth="1" />
      {!reduce ? (
        <motion.line x1={X0} x2={X1} y1={Y} y2={Y} stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: [0, 0, 1, 1, 1], opacity: [1, 1, 1, 1, 0] }}
          transition={{ duration: total, times: [0, 0.02, (STAGES.length * seg) / total, 0.92, 1], ease: "linear", repeat: Infinity }} />
      ) : <line x1={X0} x2={X1} y1={Y} y2={Y} stroke={ACCENT} strokeWidth="1.5" />}
      {STAGES.map((s, i) => {
        const t0 = (i * seg) / total;
        return (
          <g key={s}>
            <circle cx={xs[i]} cy={Y} r="12" fill="#101010" stroke={LINE} />
            <motion.circle cx={xs[i]} cy={Y} r="12" fill="none" stroke={ACCENT}
              initial={{ opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { opacity: [0, 0, 1, 1, 0], scale: [1, 1, 1, 1, 1] }}
              transition={{ duration: total, times: [0, t0, t0 + 0.02, 0.92, 1], ease: "linear", repeat: Infinity }} />
            <motion.circle cx={xs[i]} cy={Y} r="4" fill={INK}
              initial={{ opacity: 0.25 }}
              animate={reduce ? { opacity: 1 } : { opacity: [0.25, 0.25, 1, 1, 0.25] }}
              transition={{ duration: total, times: [0, t0, t0 + 0.02, 0.92, 1], ease: "linear", repeat: Infinity }} />
            {!reduce ? (
              <motion.circle cx={xs[i]} cy={Y} r="12" fill="none" stroke={ACCENT}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0, 0, 0.6, 0], scale: [1, 1, 1, 2.2] }}
                style={{ transformOrigin: `${xs[i]}px ${Y}px` }}
                transition={{ duration: total, times: [0, t0, t0 + 0.02, t0 + 0.1], ease: EASE, repeat: Infinity }} />
            ) : null}
            <Label x={xs[i]} y={Y + 40}>{s}</Label>
            <Label x={xs[i]} y={Y - 26} dim>0{i + 1}</Label>
          </g>
        );
      })}
      <Label x={X0} y={200} anchor="start" dim>a rule enters as evidence</Label>
      <Label x={X1} y={200} anchor="end" dim>and leaves as a signed, tested, released decision</Label>
    </svg>
  );
}

/* ---------- 2. The three actors: work moves around a triangle, in order. ---------- */

export function ActorsFlow() {
  const reduce = useReducedMotion();
  const W = 720, H = 520;
  const A = { x: 360, y: 90, label: "AI produces", sub: "rule cards, specs, tests, code" };
  const B = { x: 110, y: 420, label: "Humans decide", sub: "verdicts, sign-off, merge, cutover" };
  const C = { x: 610, y: 420, label: "The engine verifies", sub: "index, gates, drift, parity" };
  const edges: [typeof A, typeof B, string][] = [[A, B, "proposal"], [B, C, "decision"], [C, A, "gate result"]];
  const leg = 2.4, total = leg * 3;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-[560px]" aria-hidden="true">
      {edges.map(([p, q]) => <line key={p.label + q.label} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={LINE} />)}
      {edges.map(([p, q, name], i) => {
        const t0 = (i * leg) / total, t1 = ((i + 1) * leg) / total;
        const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2;
        return (
          <g key={name}>
            {!reduce ? (
              <motion.line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 0, 1, 1], opacity: [0, 1, 1, 0] }}
                transition={{ duration: total, times: [0, t0, t1 - 0.02, t1 + 0.04], ease: "linear", repeat: Infinity }} />
            ) : null}
            {!reduce ? (
              <motion.circle r="4" fill={INK}
                initial={{ cx: p.x, cy: p.y, opacity: 0 }}
                animate={{ cx: [p.x, p.x, q.x, q.x], cy: [p.y, p.y, q.y, q.y], opacity: [0, 1, 1, 0] }}
                transition={{ duration: total, times: [0, t0, t1 - 0.02, t1], ease: "linear", repeat: Infinity }} />
            ) : null}
            <Label x={mx + (i === 0 ? -14 : i === 1 ? 0 : 14)} y={my + (i === 1 ? 22 : -8)} anchor={i === 0 ? "end" : i === 1 ? "middle" : "start"} dim>{name}</Label>
          </g>
        );
      })}
      {[A, B, C].map((n, i) => {
        const t0 = (i * leg) / total;
        return (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="22" fill="#101010" stroke={LINE_STRONG} />
            <motion.circle cx={n.x} cy={n.y} r="22" fill="none" stroke={ACCENT}
              initial={{ opacity: 0 }}
              animate={reduce ? { opacity: 0.6 } : { opacity: [0, 0, 1, 0.2, 0] }}
              transition={{ duration: total, times: [0, t0, t0 + 0.03, t0 + 0.3, 1], ease: "linear", repeat: Infinity }} />
            <circle cx={n.x} cy={n.y} r="5" fill={INK} />
            <Label x={n.x} y={n.y + (i === 0 ? -34 : 46)}>{n.label}</Label>
            <Label x={n.x} y={n.y + (i === 0 ? -50 : 64)} dim>{n.sub}</Label>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- 3. Three surfaces, one set of verifiers. ---------- */

export function SurfacesFlow() {
  const reduce = useReducedMotion();
  const W = 520, H = 360;
  const inputs = [["CLI", 60], ["MCP", 180], ["NuGet", 300]] as const;
  const core = { x: 260, y: 180 };
  const outs = [["your pipeline", 110], ["your agent", 250]] as const;
  const cyc = 6;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden="true">
      {inputs.map(([n, y], i) => (
        <g key={n}>
          <path d={`M 90 ${y} C 170 ${y}, 170 ${core.y}, ${core.x - 60} ${core.y}`} fill="none" stroke={LINE} />
          {!reduce ? (
            <motion.path d={`M 90 ${y} C 170 ${y}, 170 ${core.y}, ${core.x - 60} ${core.y}`} fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 0, 1, 1], opacity: [0, 1, 1, 0] }}
              transition={{ duration: cyc, times: [0, i * 0.12, 0.35 + i * 0.05, 0.5], ease: "linear", repeat: Infinity }} />
          ) : null}
          <circle cx="90" cy={y} r="4" fill={INK} />
          <Label x={78} y={y + 4} anchor="end">{n}</Label>
        </g>
      ))}
      <rect x={core.x - 60} y={core.y - 28} width="120" height="56" rx="10" fill="#101010" stroke={LINE_STRONG} />
      <motion.rect x={core.x - 60} y={core.y - 28} width="120" height="56" rx="10" fill="none" stroke={ACCENT}
        initial={{ opacity: 0 }} animate={reduce ? { opacity: 0.6 } : { opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: cyc, times: [0, 0.45, 0.5, 0.7, 0.8], ease: "linear", repeat: Infinity }} />
      <Label x={core.x} y={core.y - 2}>the same verifiers</Label>
      <Label x={core.x} y={core.y + 16} dim>specdrift · analyzers · tests</Label>
      {outs.map(([n, y], i) => (
        <g key={n}>
          <path d={`M ${core.x + 60} ${core.y} C 350 ${core.y}, 350 ${y}, 430 ${y}`} fill="none" stroke={LINE} />
          {!reduce ? (
            <motion.path d={`M ${core.x + 60} ${core.y} C 350 ${core.y}, 350 ${y}, 430 ${y}`} fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 0, 1, 1], opacity: [0, 1, 1, 0] }}
              transition={{ duration: cyc, times: [0, 0.62 + i * 0.05, 0.85, 0.95], ease: "linear", repeat: Infinity }} />
          ) : null}
          <circle cx="430" cy={y} r="4" fill={INK} />
          <Label x={442} y={y + 4} anchor="start">{n}</Label>
        </g>
      ))}
    </svg>
  );
}
