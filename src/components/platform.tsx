"use client";

import { useEffect, useRef, useState } from "react";
import { Container, Icon, Reveal, Tag, TwoTone } from "./ui";
import { ApprovalVisual, BoardVisual, DorVisual, FindingVisual, GatesVisual, LivingDocVisual, PrVisual, ReleaseVisual, RulesVisual, Screen, SpecTableVisual, VerdictVisual, WorkspaceVisual } from "./visuals";

const TABS = [
  {
    id: "specify", icon: "spec", rail: "Specify", hint: "Rules and specs, as records",
    lead: ["Rules and specifications live here, not in documents.", "A rule card carries its source reference, its confidence and its open questions. A spec is the signed answer: a decision table, a lifecycle or EARS sentences, every line compiling to a test."],
    second: ["Two artefacts, on purpose.", "The card may hold doubt and contradiction; the spec holds only answers. Investigation file and court verdict, and every line of the verdict cites the file."],
    screens: [["Rules", "Rules / Temlik", RulesVisual], ["Specifications", "Specifications / SPEC-LIM-07", SpecTableVisual]],
  },
  {
    id: "plan", icon: "board", rail: "Plan", hint: "Boards that know the spec",
    lead: ["Agile, with the spec on the card.", "Boards, sprints and tickets stay in Jira or Azure Boards. The platform adds what they lack: a Definition of Ready that checks the spec is signed and its questions are closed before work starts."],
    second: ["Dual-track, not waterfall.", "Discovery runs one slice ahead; delivery takes only work that passed the gate. The retro tracks one number: how many gates were bypassed."],
    screens: [["Boards", "Boards / Sprint 14", BoardVisual], ["Boards", "Boards / Definition of Ready", DorVisual]],
  },
  {
    id: "build", icon: "sparkle", rail: "Build", hint: "Develop with the assistant",
    lead: ["Build with the assistant, inside the gates.", "The workspace is where a developer, an analyst or a domain owner works with the model: ask the record, start a change, turn a red test green. Every proposal is checked by the same verifiers a person would face."],
    second: ["Source and tickets stay where they are.", "GitHub, GitLab, Azure DevOps, Jira: the platform opens the PR, links the ticket and writes the record. No second source of truth."],
    screens: [["Changes", "Changes / CR-2318 · workspace", WorkspaceVisual], ["Changes", "Changes / PR #412", PrVisual]],
  },
  {
    id: "verify", icon: "gate", rail: "Verify", hint: "Four gates that block",
    lead: ["Gates block, they do not warn.", "Touch, boundary, drift, parity. A failing gate closes the merge; a suppression without a written reason is itself a failure. The gates run headless in CI, identical to the local command."],
    second: ["The referee is a test, not an opinion.", "When code moves and the rule does not, the characterization test runs. Red means behaviour changed and the rule must move with it. Green means a refactor, and one recorded note closes it."],
    screens: [["Gates", "Gates / PR #412", GatesVisual], ["Gates", "Gates / finding SA0401", FindingVisual]],
  },
  {
    id: "approve", icon: "approve", rail: "Approve", hint: "Maker-checker, recorded",
    lead: ["Humans decide. The record remembers.", "Maker-checker chains per change type: stages, quorums, distinct eyes. Domain experts give verdicts on rules: keep, change, retire. No automation can skip a human gate."],
    second: ["A decision ledger, not a screenshot.", "Who said yes, in which role, on which revision, and why. The ledger is what the auditor reads, and what the next engineer reads three years later."],
    screens: [["Approvals", "Approvals / CR-2318", ApprovalVisual], ["Approvals", "Approvals / decision ledger", VerdictVisual]],
  },
  {
    id: "release", icon: "box", rail: "Release", hint: "Proof travels with the train",
    lead: ["Every release carries its proof.", "Pinned dependencies, an SBOM, signed provenance and the parity report travel with the train. Air-gapped estates install from the same artefacts, verified the same way."],
    second: ["The document stays alive.", "Extracted, proven, specified, implemented, re-proven, then watched on every PR. Nobody depends on the one person who remembers why; the page is the record."],
    screens: [["Trail", "Trail / release 0.1.0", ReleaseVisual], ["Specifications", "Specifications / SPEC-LIM-07 · lifecycle", LivingDocVisual]],
  },
] as const;

export function Platform() {
  const [active, setActive] = useState<string>(TABS[0].id);
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const railRef = useRef<HTMLDivElement>(null);
  const [marker, setMarker] = useState({ top: 0, height: 0 });

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

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const el = rail.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (el) setMarker({ top: el.offsetTop + 8, height: el.offsetHeight - 16 });
  }, [active]);

  return (
    <section id="platform" className="bg-band pt-24 pb-28 sm:pt-32">
      <Container>
        <Reveal className="max-w-[56rem]">
          <Tag>Platform</Tag>
          <h2 className="mt-5 text-h2 font-medium">
            One workspace for the whole life of a rule.
            <br />
            <span className="text-gray">From the line of legacy code it was found in, to the signed spec, the test, the approval and the release. And the next change, and the one after.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[250px_1fr] lg:gap-12">
          <div className="hidden lg:block">
            <div ref={railRef} className="rail sticky top-28">
              <div className="rail-marker" style={{ top: marker.top, height: marker.height }} aria-hidden="true" />
              {TABS.map((t) => (
                <a key={t.id} href={`#${t.id}`} className="rail-btn" data-active={active === t.id} data-id={t.id}>
                  <span className="ico"><Icon name={t.icon} size={15} /></span>
                  <span className="txt">{t.rail}<small>{t.hint}</small></span>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {TABS.map((t) => {
              const [[a1, t1, V1], [a2, t2, V2]] = t.screens;
              return (
                <article key={t.id} id={t.id} data-tab={t.id} ref={(el) => { refs.current[t.id] = el; }} className="min-w-0 scroll-mt-28 overflow-hidden rounded-2xl border border-line bg-white">
                  <div className="min-w-0 p-5 sm:px-8 sm:pt-11 sm:pb-10">
                    <div className="mb-4 text-xs text-gray-2 lg:hidden">{t.rail}</div>
                    <TwoTone as="h3" className="max-w-[560px] text-lead font-medium" strong={t.lead[0]} rest={t.lead[1]} />
                    <Reveal className="mt-8 min-w-0"><Screen active={a1} title={t1}><V1 /></Screen></Reveal>
                  </div>
                  <div className="min-w-0 border-t border-line-3 p-5 sm:px-8 sm:pt-11 sm:pb-10">
                    <TwoTone as="p" className="max-w-[560px] text-lead font-medium" strong={t.second[0]} rest={t.second[1]} />
                    <Reveal className="mt-8 min-w-0"><Screen active={a2} title={t2}><V2 /></Screen></Reveal>
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
