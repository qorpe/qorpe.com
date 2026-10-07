"use client";

import { useEffect, useRef } from "react";

/** The five gates a change clears, bottom to top, and the ledger line each one writes. */
const GATES = [
  { label: "Specify", entry: "spec frozen", detail: "rev 14 · manifest + contracts" },
  { label: "Generate", entry: "engine run", detail: "deterministic · no model call" },
  { label: "Verify", entry: "gate GP0412", detail: "passed · 0 suppressions" },
  { label: "Approve", entry: "maker-checker", detail: "2 of 2 · distinct eyes" },
  { label: "Release", entry: "train 0.1.0", detail: "sbom + signed provenance" },
] as const;

export function GateStack() {
  const sceneRef = useRef<HTMLDivElement>(null);

  // Pointer parallax: a few degrees, only while the pointer is over the hero,
  // never when the visitor asked for reduced motion.
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    const host = scene.closest("[data-parallax-host]") ?? scene;
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      scene.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
      scene.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
    };
    const onLeave = () => {
      scene.style.setProperty("--rx", "0deg");
      scene.style.setProperty("--ry", "0deg");
    };
    host.addEventListener("pointermove", onMove as EventListener);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove as EventListener);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-10">
      <div
        ref={sceneRef}
        className="stack-scene flex h-[330px] w-full items-center justify-center overflow-visible lg:h-[500px] lg:w-auto lg:flex-1"
        aria-hidden="true"
      >
        <div className="stack-space">
          <div className="axis" />
          {GATES.map((g, i) => (
            <div key={g.label} className="plate" style={{ "--i": i } as React.CSSProperties}>
              <div className="plate-ring" style={{ "--i": i } as React.CSSProperties} />
              <span className="plate-label">{g.label}</span>
            </div>
          ))}
          <div className="token" />
        </div>
      </div>

      <ol className="w-full max-w-[300px] lg:w-[260px]" aria-label="What each gate records">
        {GATES.map((g, i) => (
          <li
            key={g.label}
            className="ledger-row grid grid-cols-[88px_1fr] gap-x-3 border-t border-border py-2.5 last:border-b"
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className="text-ui font-medium">{g.label}</span>
            <span className="font-mono text-[12px] leading-5 text-muted-foreground">
              {g.entry}
              <br />
              {g.detail}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
