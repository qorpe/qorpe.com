"use client";

import { useState } from "react";
import { Arrow, Container, Reveal, Tag } from "./ui";

const SECTORS = [
  { name: "Banking", label: "Core replacement, factoring, limits and collateral.", stat: "A wrong rule is a finding, not a bug.", text: "Discovery that ends in a written plan; a pilot that ends in a running system and a record. Limits, collateral and regulatory reporting as specifications, with maker-checker chains that match the bank's own policy." },
  { name: "Insurance", label: "Policy, claims and the audit trail behind both.", stat: "Products change every quarter. The core cannot.", text: "Rules live in specifications, so the quarterly product change is a revision with its own gates and approvals, not a rewrite that nobody can trace back to a decision." },
  { name: "Telecom", label: "Order management, catalogues and partner APIs.", stat: "Every exception becomes a process.", text: "Partner onboarding through a governed portal with an instant sandbox; catalogue changes that carry their contract tests; a trail that explains why an order took the path it took." },
];

export function Sectors() {
  const [i, setI] = useState(0);
  const s = SECTORS[i];
  return (
    <section id="sectors" className="border-t border-line py-28">
      <Container>
        <Reveal className="max-w-[56rem]">
          <Tag>Sectors</Tag>
          <h2 className="mt-5 text-h2 font-medium">
            Built for the rooms we have worked in. <span className="text-gray">The core is sector-neutral; the judgement about what a gate must check comes from these three.</span>
          </h2>
          <a href="mailto:hello@qorpe.com?subject=Sectors" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 hover:text-ink">Read more <Arrow /></a>
        </Reveal>
        <Reveal className="mt-14 overflow-hidden rounded-2xl border border-line">
          <div className="flex divide-x divide-line border-b border-line" role="tablist" aria-label="Sectors">
            {SECTORS.map((t, k) => (
              <button key={t.name} type="button" role="tab" aria-selected={i === k} className="sector-tab" data-active={i === k} onClick={() => setI(k)}>
                {t.name}
              </button>
            ))}
          </div>
          <div className="grid lg:grid-cols-[1fr_1.2fr]">
            <div className="p-8 sm:p-10">
              <div className="text-xs font-medium text-gray-2">{s.name}</div>
              <p className="mt-5 text-h3 font-medium">{s.stat}</p>
              <p className="mt-4 text-lead text-gray">{s.label}</p>
              <p className="mt-6 text-sm text-gray">{s.text}</p>
            </div>
            <div className="dark-zone relative min-h-[320px] overflow-hidden bg-dark p-8 text-dark-ink sm:p-10">
              <div className="ruled absolute inset-0" aria-hidden="true" />
              <div className="relative">
                <div className="text-xs font-medium text-dark-gray">What a change looks like here</div>
                <ul className="mt-5 space-y-2 text-sm">
                  {[
                    `${s.name} specification revised`,
                    "Gates: drift, analyzers, contract tests",
                    "Maker-checker chain from the sector pack",
                    "Release with SBOM and signed provenance",
                  ].map((line, k) => (
                    <li key={line} className="flex items-center gap-3 rounded-lg border border-dark-line bg-dark-2 px-3 py-2">
                      <span className="font-mono text-xs text-dark-gray">0{k + 1}</span>
                      <span className="text-dark-ink/90">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
