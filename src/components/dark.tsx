"use client";

import { useEffect, useState } from "react";
import { Arrow, Container, Icon, Reveal, Tag } from "./ui";
import { Wire } from "./wire";

const TRAIL_COLS = [
  { icon: "gate", strong: "Every gate writes.", rest: "What ran, on which revision, with what result." },
  { icon: "approve", strong: "Every approval signs.", rest: "Who said yes, in which role, at which stage." },
  { icon: "sparkle", strong: "Every AI proposal is reviewed.", rest: "Logged with the model, the prompt scope and the reviewer." },
  { icon: "box", strong: "Every release is signed.", rest: "SBOM and provenance attached to the train it shipped on." },
  { icon: "search", strong: "Every question has a source.", rest: "Ask the record, get the entry, not an opinion." },
];

export function TrailIsland() {
  return (
    <section id="trail" className="dark-zone bg-dark text-dark-ink">
      <Container className="border-x border-dark-line">
        <div className="pt-24 text-center sm:pt-32">
          <p className="text-base font-medium text-dark-gray">The one thing a regulator asks for</p>
          <h2 className="mt-3 text-giant font-semibold">One trail.</h2>
          <p className="mx-auto mt-5 max-w-[34rem] text-base text-dark-gray">One line through everything that moves: a rule enters as evidence and leaves as a signed, tested, released decision. The same line is read again on every later change.</p>
        </div>
        <div className="h-[340px] sm:h-[440px]"><Wire variant="wave" /></div>
        <ul className="grid grid-cols-1 border-t border-dark-line sm:grid-cols-5">
          {TRAIL_COLS.map((c) => (
            <li key={c.strong} className="border-b border-dark-line px-6 py-8 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-dark-line bg-dark-2 text-dark-ink"><Icon name={c.icon} size={22} /></span>
              <p className="mt-10 text-base font-medium">
                {c.strong} <span className="text-dark-gray">{c.rest}</span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

const PANES = [
  { title: "AI produces", text: "Skills extract rules with source references, write specs and tests, implement red-first. They produce; they never decide. A rule without a source is rejected; what the model cannot explain becomes an open question, never an invention." },
  { title: "Humans decide", text: "Domain experts give verdicts: keep, change, retire. The spec owner closes open questions. The business signs the spec. Three human gates: contract sign-off, merge approval, cutover." },
  { title: "The engine verifies", text: "Indexers read the code at symbol level with the compiler, not a model. Gates run headless in CI. Parity replays legacy against new. Deterministic: same input, same output, every time." },
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
              AI produces. Humans decide.
              <br />
              <span className="text-dark-gray">The engine verifies.</span>
            </h2>
            <p className="mt-5 max-w-[26rem] text-base text-dark-gray">The claim is not that the model never errs. The claim is that unverified output cannot pass a gate, and no automation can skip a human one.</p>
            <a href="mailto:hello@qorpe.com?subject=AI%20in%20delivery" className="btn btn-primary btn-sm mt-6">See more <Arrow /></a>
          </Reveal>
          <div className="mt-16">
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
        <div className="h-[420px] lg:h-auto lg:min-h-[560px]"><Wire variant="globe" /></div>
      </Container>
    </section>
  );
}

export function BuildIsland() {
  return (
    <section className="dark-zone bg-dark text-dark-ink">
      <Container className="grid border-x border-t border-b border-dark-line lg:grid-cols-2">
        <div className="px-0 py-16 sm:px-8 lg:py-24">
          <Reveal>
            <h2 className="text-h2 font-medium">
              CLI. MCP. Packages.
              <br />
              <span className="text-dark-gray">Build on the same train.</span>
            </h2>
            <p className="mt-5 max-w-[26rem] text-base text-dark-gray">The same verifiers the platform runs are a command line, an MCP server and a package on your feed. Your own assistant can call them; your own pipeline can run them.</p>
            <a href="https://github.com/qorpe" className="btn btn-primary btn-sm mt-6">View the source <Arrow /></a>
          </Reveal>
        </div>
        <div className="h-[360px] lg:h-auto lg:min-h-[420px]"><Wire variant="train" /></div>
      </Container>
    </section>
  );
}
