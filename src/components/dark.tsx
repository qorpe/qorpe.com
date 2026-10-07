"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow, Container, Reveal, Tag } from "./ui";
import { Hex, Rings } from "./visuals";

/* ---------- The trail island: horizon + five columns ---------- */

const TRAIL_COLS = [
  { strong: "Every gate writes.", rest: "What ran, on which revision, with what result." },
  { strong: "Every approval signs.", rest: "Who said yes, in which role, at which stage." },
  { strong: "Every AI proposal is reviewed.", rest: "Logged with the model, the prompt scope and the reviewer." },
  { strong: "Every release is signed.", rest: "SBOM and provenance attached to the train it shipped on." },
  { strong: "Every question has a source.", rest: "Ask the record, get the entry, not an opinion." },
];

function Icon({ i }: { i: number }) {
  const d = [
    "M3 12h4l2-6 3 12 2-6h5",
    "M5 12l4 4 10-10",
    "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z",
    "M4 7h16M4 12h16M4 17h10",
    "M12 21a9 9 0 110-18 9 9 0 010 18zM12 8v5l3 2",
  ][i];
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrailIsland() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { el.classList.add("is-in"); io.disconnect(); } }), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id="trail" className="dark-zone bg-dark text-dark-ink">
      <Container className="border-x border-dark-line">
        <div className="pt-24 text-center sm:pt-32">
          <p className="text-base font-medium text-dark-gray">The one thing a regulator asks for</p>
          <h2 className="mt-3 text-giant font-semibold">One trail.</h2>
        </div>
        <div ref={ref} className="horizon-wrap">
          <div className="horizon" aria-hidden="true" />
        </div>
        <ul className="grid grid-cols-1 border-t border-dark-line sm:grid-cols-5">
          {TRAIL_COLS.map((c, i) => (
            <li key={c.strong} className="border-b border-dark-line px-6 py-8 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <span className="text-dark-gray"><Icon i={i} /></span>
              <p className="mt-12 text-base font-medium">
                {c.strong} <span className="text-dark-gray">{c.rest}</span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------- The AI block: accordion that advances, rings that turn ---------- */

const PANES = [
  { title: "Skills", text: "Coding agents drive the nine-step change cycle through skills. They open the change, run the engine and ask for review, the same way a person does." },
  { title: "Verifiers over MCP", text: "The gates are MCP servers. An agent calls specdrift, the analyzers and the contract tests, and the result lands in the trail under the agent's name." },
  { title: "AI gateway", text: "A policy point in front of model calls at runtime: which model, which data, which approval. On the roadmap, designed on the same approval engine." },
];

export function AiIsland() {
  const [pane, setPane] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => { setPane((p) => (p + 1) % PANES.length); setTick((t) => t + 1); }, 7000);
    return () => window.clearTimeout(id);
  }, [pane, paused, tick]);

  return (
    <section id="ai" className="dark-zone bg-dark text-dark-ink">
      <Container className="grid border-x border-t border-dark-line lg:grid-cols-2">
        <div className="px-0 py-16 sm:px-8 lg:border-r lg:border-dark-line lg:py-24" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <Reveal>
            <Tag>AI in delivery</Tag>
            <h2 className="mt-5 text-h2 font-medium">
              AI inside the gates.
              <br />
              <span className="text-dark-gray">Not around them.</span>
            </h2>
            <a href="mailto:hello@qorpe.com?subject=AI%20in%20delivery" className="btn btn-primary btn-sm mt-6">See more <Arrow /></a>
          </Reveal>
          <div className="mt-20">
            {PANES.map((p, i) => (
              <div key={p.title}>
                <button type="button" className="w-full py-3.5 text-left text-base font-medium" aria-expanded={pane === i} onClick={() => { setPane(i); setTick((t) => t + 1); }}>
                  {p.title}
                </button>
                {pane === i ? (
                  <div className="pb-4">
                    <p className="max-w-[26rem] text-base font-medium text-dark-gray">{p.text}</p>
                    <div className="progress mt-4" aria-hidden="true"><span key={tick} /></div>
                  </div>
                ) : <div className="h-px bg-dark-line" />}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center px-0 py-8 sm:px-8 lg:py-24">
          <Rings className="max-w-[560px]" />
        </div>
      </Container>
    </section>
  );
}

/* ---------- Build on it ---------- */

export function BuildIsland() {
  return (
    <section className="dark-zone bg-dark text-dark-ink">
      <Container className="grid border-x border-t border-b border-dark-line lg:grid-cols-2">
        <div className="px-0 py-16 sm:px-8 lg:py-24">
          <Reveal>
            <h2 className="text-h2 font-medium">
              CLI. MCP. NuGet.
              <br />
              <span className="text-dark-gray">Build on the same train.</span>
            </h2>
            <a href="https://github.com/qorpe" className="btn btn-primary btn-sm mt-6">View the source <Arrow /></a>
          </Reveal>
        </div>
        <div className="flex items-center justify-center px-0 py-8 sm:px-8 lg:py-16">
          <div className="w-full max-w-[460px]"><Hex /></div>
        </div>
      </Container>
    </section>
  );
}
