"use client";

import { useEffect, useRef, useState } from "react";
import { Container, FeatureRow, SectionHead } from "./ui";
import { Rings } from "./visuals";

const NOTES = [
  { t: "09:52", who: "Claude (agent)", text: "Proposed migration 0042 and 3 tests from LIM-07 rev 14" },
  { t: "09:58", who: "Maker", text: "Reviewed the proposal, kept 2 tests, rewrote 1" },
  { t: "10:03", who: "specdrift (MCP)", text: "Drift check passed · 0 findings" },
  { t: "10:04", who: "Gateway", text: "Model call allowed by policy limits-change · logged" },
];

export function AiSection() {
  const [turn, setTurn] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
        setTurn(p * 30 - 15);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <Container>
        <SectionHead
          id="ai"
          title={<>AI inside<br />the gates</>}
          text="Coding agents drive the cycle through skills and call the same verifiers a person would, over MCP. Their proposals are reviewed and recorded like any human contribution. A gateway puts the same policy and trail in front of model calls at runtime."
          more={{ label: "See how it works", href: "mailto:hello@qorpe.com?subject=AI%20in%20delivery" }}
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="frame flex items-center justify-center overflow-hidden p-6">
            <Rings turn={turn} />
          </div>
          <div className="frame overflow-hidden">
            <div className="flex items-center justify-between border-b border-edge px-4 py-2.5 text-xs">
              <span className="text-ink-2">Audit trail / CR-2318 · AI entries</span>
              <span className="text-gray-2">policy: limits-change</span>
            </div>
            <ul className="divide-y divide-edge text-sm">
              {NOTES.map((n) => (
                <li key={n.t} className="grid grid-cols-[48px_1fr] gap-3 px-4 py-3">
                  <span className="font-mono text-xs text-gray-2">{n.t}</span>
                  <span><span className="text-ink-2">{n.who}</span> <span className="text-gray">· {n.text}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <FeatureRow groups={[["Skills for the change cycle", "Verifiers over MCP"], ["AI gateway (roadmap)", "Reviewed proposals"]]} />
      </Container>
    </section>
  );
}
