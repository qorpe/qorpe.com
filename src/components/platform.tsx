"use client";

import { useEffect, useRef, useState } from "react";
import { Container, Reveal, Tag, TwoTone } from "./ui";
import { AnalyzerVisual, ApproveVisual, DriftVisual, GenerateVisual, PolicyVisual, ReleaseVisual, SpecifyVisual, TestsVisual, TrailVisual, VerifyVisual } from "./visuals";

const TABS = [
  {
    id: "specify", rail: "Specify",
    lead: ["Every change starts from a specification.", "Rules, contracts and requirements are versioned records. A change is opened from a revision and stays linked to it."],
    second: ["Nothing is implied, nothing drifts in silence.", "The manifest is the single source of truth; a module that is disabled does not exist in the build at all."],
    Visual: SpecifyVisual,
    Second: DriftVisual,
  },
  {
    id: "generate", rail: "Generate",
    lead: ["The engine is deterministic.", "Code, migrations and tests are produced from the spec by an engine that never calls a model."],
    second: ["Same input, same output.", "That is what a reviewer needs in order to trust it, and what an auditor needs in order to reproduce it."],
    Visual: GenerateVisual,
    Second: TestsVisual,
  },
  {
    id: "verify", rail: "Verify",
    lead: ["Gates block, they do not warn.", "Drift against the spec, analyzers, contract tests, security review. A failing gate stops the merge."],
    second: ["Every standard ships with its verifier.", "A suppression without a written reason is itself a failure, not a shortcut."],
    Visual: VerifyVisual,
    Second: AnalyzerVisual,
  },
  {
    id: "approve", rail: "Approve",
    lead: ["Maker-checker, the way your policy says.", "Chains per change type: stages, quorums, distinct eyes. Configured once, enforced every time."],
    second: ["Each decision records who, what and which revision.", "The record is the one your auditor reads, not a screenshot someone made later."],
    Visual: ApproveVisual,
    Second: PolicyVisual,
  },
  {
    id: "release", rail: "Release",
    lead: ["Every release carries its proof.", "Pinned dependencies, an SBOM and signed provenance travel with the train."],
    second: ["Air-gapped estates install from the same artefacts.", "Verified the same way, and the trail closes with the promotion entry."],
    Visual: ReleaseVisual,
    Second: TrailVisual,
  },
] as const;

export function Platform() {
  const [active, setActive] = useState<string>(TABS[0].id);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive((visible[0].target as HTMLElement).dataset.tab as string);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="platform" className="bg-band pt-24 pb-28 sm:pt-32">
      <Container>
        <Reveal className="max-w-[56rem]">
          <Tag>Platform</Tag>
          <h2 className="mt-5 text-h2 font-medium">
            The system of record that never looks away.
            <br />
            <span className="text-gray">Opens every change from a spec. Blocks what the spec forbids. Records who said yes, and why, before anything ships.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[232px_1fr] lg:gap-12">
          <div className="hidden lg:block">
            <div className="sticky top-28 space-y-1">
              {TABS.map((t) => (
                <a key={t.id} href={`#${t.id}`} className="rail-btn" data-active={active === t.id}>
                  {t.rail}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {TABS.map((t) => {
              const Second = t.Second;
              return (
                <article
                  key={t.id}
                  id={t.id}
                  data-tab={t.id}
                  ref={(el) => { refs.current[t.id] = el; }}
                  className="min-w-0 scroll-mt-28 overflow-hidden rounded-2xl border border-line bg-white"
                >
                  <div className="grid min-w-0 gap-8 p-5 sm:p-9 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
                    <div>
                      <div className="mb-4 text-xs text-gray-2 lg:hidden">{t.rail}</div>
                      <TwoTone as="h3" className="max-w-[28rem] text-lead font-medium" strong={t.lead[0]} rest={t.lead[1]} />
                    </div>
                    <Reveal className="min-w-0"><t.Visual /></Reveal>
                  </div>
                  <div className="grid min-w-0 gap-8 border-t border-line-3 p-5 sm:p-9 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
                    <TwoTone as="p" className="max-w-[28rem] text-lead font-medium" strong={t.second[0]} rest={t.second[1]} />
                    <Reveal className="min-w-0"><Second /></Reveal>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
