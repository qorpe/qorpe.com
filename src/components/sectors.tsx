"use client";

import { useState } from "react";
import { Arrow, Container, Dot, Icon, Reveal, Tag } from "./ui";

const SECTORS = [
  {
    name: "Banking", icon: "bank",
    stat: "A wrong rule is a finding, not a bug.",
    label: "Core replacement, factoring, limits and collateral, regulatory reporting.",
    text: "Discovery that ends in a written plan; a pilot that ends in a running system and a record. Limits, collateral and reporting as specifications, with maker-checker chains that match the bank's own policy.",
    pack: ["Limits and collateral", "Factoring and assignment", "Regulatory reporting", "Partner API portal"],
    rule: ["RULE-0105", "Notice above 500K to the debtor; contract type 2 exempt", "TemlikYoneticisi.cs:45"],
    chain: ["Maker", "Checker (Credit risk)", "Release (Change advisory)"],
    facts: [["Approval chains", "maker-checker, 2 eyes"], ["Air-gapped", "supported"], ["Parity at cutover", "legacy = new"]],
  },
  {
    name: "Insurance", icon: "shield",
    stat: "Products change every quarter. The core cannot.",
    label: "Policy, claims and the audit trail behind both.",
    text: "Rules live in specifications, so the quarterly product change is a revision with its own gates and approvals, not a rewrite nobody can trace back to a decision.",
    pack: ["Policy lifecycle", "Claims decision tables", "Product configuration", "Actuarial sign-off"],
    rule: ["RULE-P031", "Claim above the deductible band pays the floor, never below", "Claims/Settle.cs:118"],
    chain: ["Product owner", "Actuary", "Compliance"],
    facts: [["Spec shape", "DMN tables"], ["Change cadence", "quarterly revisions"], ["Trail", "per product version"]],
  },
  {
    name: "Telecom", icon: "signal",
    stat: "Every exception becomes a process.",
    label: "Order management, catalogues and partner APIs.",
    text: "Partner onboarding through a governed portal with an instant sandbox; catalogue changes that carry their contract tests; a trail that explains why an order took the path it took.",
    pack: ["Order lifecycle", "Product catalogue", "Partner API portal", "Contract tests"],
    rule: ["RULE-O012", "An order with a pending port-in cannot activate before the port completes", "Orders/Activate.cs:67"],
    chain: ["Catalogue owner", "Partner manager", "Operations"],
    facts: [["Spec shape", "lifecycles"], ["Sandbox", "per partner application"], ["Exceptions", "recorded, not improvised"]],
  },
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
            Built for the rooms we have worked in. <span className="text-gray">The core is sector-neutral; the sector pack carries the rules, the chains and the spec shapes that fit.</span>
          </h2>
          <a href="mailto:hello@qorpe.com?subject=Sectors" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 hover:text-ink">Read more <Arrow /></a>
        </Reveal>
        <Reveal className="mt-14 overflow-hidden rounded-2xl border border-line">
          <div className="flex divide-x divide-line overflow-x-auto border-b border-line" role="tablist" aria-label="Sectors">
            {SECTORS.map((t, k) => (
              <button key={t.name} type="button" role="tab" aria-selected={i === k} className="sector-tab flex items-center justify-center gap-2" data-active={i === k} onClick={() => setI(k)}>
                <Icon name={t.icon} size={16} />{t.name}
              </button>
            ))}
          </div>
          <div key={s.name} className="grid min-w-0 lg:grid-cols-[1fr_1.25fr]" style={{ animation: "rise .35s cubic-bezier(.2,.8,.3,1)" }}>
            <div className="min-w-0 p-6 sm:p-10">
              <div className="text-xs font-medium text-gray-2">{s.name}</div>
              <p className="mt-5 text-h3 font-medium">{s.stat}</p>
              <p className="mt-4 text-lead text-gray">{s.label}</p>
              <p className="mt-6 text-sm text-gray">{s.text}</p>
              <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-line pt-6 sm:grid-cols-3">
                {s.facts.map((f) => (
                  <div key={f[0]}><dt className="text-xs text-gray-2">{f[0]}</dt><dd className="mt-1 text-sm font-medium">{f[1]}</dd></div>
                ))}
              </dl>
            </div>
            <div className="dark-zone min-w-0 bg-dark p-6 text-dark-ink sm:p-10">
              <div className="flex items-center justify-between text-xs text-dark-gray"><span>Sector pack · {s.name}</span><span>what the pack brings</span></div>
              <ul className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                {s.pack.map((p) => (
                  <li key={p} className="flex items-center gap-2 rounded-lg border border-dark-line bg-dark-2 px-3 py-2"><Dot tone="ok" />{p}</li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl border border-dark-line bg-dark-2 p-4">
                <div className="flex items-center justify-between text-xs text-dark-gray"><span>A rule card from this sector</span><span className="font-mono">{s.rule[0]}</span></div>
                <p className="mt-2 text-sm">{s.rule[1]}</p>
                <p className="mt-2 font-mono text-xs text-dark-gray">source: {s.rule[2]}</p>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-dark-gray">
                <span>Approval chain:</span>
                {s.chain.map((c, k) => (
                  <span key={c} className="flex items-center gap-2"><span className="rounded-md border border-dark-line px-2 py-0.5 text-dark-ink/90">{c}</span>{k < s.chain.length - 1 ? <span>→</span> : null}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
