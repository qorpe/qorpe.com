import { Dot, Icon, PRODUCT } from "./ui";

/* ---------- Primitives ---------- */

export function Frame({ title, right, children, className = "" }: { title: string; right?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`min-w-0 overflow-hidden rounded-xl border border-line bg-white ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-line-3 px-4 py-2.5 text-xs">
        <span className="font-medium text-ink-2">{title}</span>
        {right ? <span className="truncate text-gray-2">{right}</span> : null}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

const NAV: { name: string; icon: string }[] = [
  { name: "Home", icon: "home" },
  { name: "Specifications", icon: "spec" },
  { name: "Rules", icon: "rule" },
  { name: "Changes", icon: "change" },
  { name: "Boards", icon: "board" },
  { name: "Gates", icon: "gate" },
  { name: "Approvals", icon: "approve" },
  { name: "Trail", icon: "trail" },
  { name: "Integrations", icon: "plug" },
];

function Sidebar({ active, compact = false }: { active: string; compact?: boolean }) {
  return (
    <nav className={`hidden border-r border-line bg-band ${compact ? "p-2.5 text-xs" : "p-3 text-sm"} sm:block`} aria-hidden="true">
      <div className={`mb-3 flex items-center gap-2 px-2 ${compact ? "py-0.5" : "py-1"}`}>
        <span className={`mark text-ink ${compact ? "h-3.5 w-3.5" : "h-4 w-4"}`} />
        <span className="font-medium">{PRODUCT}</span>
        {!compact ? <span className="ml-auto text-gray-2">▾</span> : null}
      </div>
      {!compact ? (
        <div className="mb-2 flex items-center justify-between rounded-md border border-line bg-white px-2 py-1.5 text-xs text-gray">
          <span className="flex items-center gap-1.5"><Icon name="search" size={13} />Search</span>
          <span className="font-mono text-gray-2">⌘K</span>
        </div>
      ) : null}
      {NAV.map((n) => (
        <div key={n.name} className={`flex items-center gap-2 rounded-md px-2 ${compact ? "py-1" : "py-1.5"} ${n.name === active ? "bg-white font-medium text-ink shadow-[0_0_0_1px_rgb(20_20_22/0.06)]" : "text-ink-2"}`}>
          <Icon name={n.icon} size={compact ? 13 : 15} className={n.name === active ? "text-ink" : "text-gray"} />
          {n.name}
        </div>
      ))}
      {!compact ? (
        <>
          <div className="mt-4 px-2 text-xs text-gray-2">Workspaces</div>
          {["Limits", "Collateral", "Reporting", "Partner API"].map((w) => (
            <div key={w} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-ink-2"><span className="h-1.5 w-1.5 rounded-full bg-line-2" />{w}</div>
          ))}
        </>
      ) : null}
    </nav>
  );
}

/** A small app window around a visual. */
export function Screen({ children, active, title, right }: { children: React.ReactNode; active: string; title: string; right?: string }) {
  return (
    <div className="window overflow-hidden" aria-hidden="true">
      <div className="grid min-h-[400px] sm:grid-cols-[190px_1fr]">
        <Sidebar active={active} compact />
        <div className="min-w-0 p-4 sm:p-7">
          <div className="mb-4 flex items-center justify-between gap-3 text-xs text-gray">
            <span className="truncate">{title}</span>
            {right ? <span className="truncate text-gray-2">{right}</span> : null}
          </div>
          <div className="min-w-0 max-w-[760px]">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Hero: the home screen with the composer ---------- */

export function ProductWindow() {
  const decisions = [
    ["CR-2318", "Limit allocation: receivable pool", "Checker review", "11:00"],
    ["RULE-0105", "Notice threshold, two diverged copies", "Expert verdict", "today"],
    ["SPEC-LIM-07", "Commission decision table, rev 14", "Business sign-off", "Thu"],
  ];
  const today = [
    ["Gates run", "41", "ok"],
    ["Blocked", "1", "warn"],
    ["Open questions", "3", "warn"],
    ["Released", "3", "ok"],
  ];
  return (
    <div className="glow-frame">
      <div className="window overflow-hidden" role="img" aria-label={`Qorpe ${PRODUCT} home: a greeting, the composer, decisions waiting and today's gates`}>
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="grid sm:grid-cols-[230px_1fr]">
          <Sidebar active="Home" />
          <div className="min-h-[560px] min-w-0 px-5 py-6 sm:px-14 sm:py-12">
            <div className="flex items-center justify-between text-xs text-gray">
              <span>Home</span>
              <span className="hidden sm:inline">Tuesday, 7 October · eu-central · on-premises</span>
            </div>
            <h3 className="mt-10 text-h3 font-medium">Good morning.</h3>
            <div className="composer mt-5 p-3">
              <div className="px-1 pt-1 text-base text-gray-2">Ask the record, or start a change<span className="caret" aria-hidden="true" /></div>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-gray"><Icon name="plus" size={14} /></span>
                  <span className="seg">
                    <span data-on="true">Ask</span>
                    <span>Build</span>
                    <span>Review</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden text-xs text-gray-2 md:inline">Answers cite the entry they come from</span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white"><Icon name="send" size={14} /></span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Prepare the 11:00 Checker review", "Why are there two copies of RULE-0105?", "Open a change from SPEC-LIM-07 rev 14"].map((c) => (
                <span key={c} className="rounded-full border border-line px-2.5 py-1 text-xs text-ink-2">{c}</span>
              ))}
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Needs a human decision</span>
                  <span className="text-xs text-gray-2">3</span>
                </div>
                <ul className="mt-3 divide-y divide-line-3 rounded-xl border border-line text-sm">
                  {decisions.map((d) => (
                    <li key={d[0]} className="grid grid-cols-[88px_1fr_auto] items-center gap-3 px-4 py-3">
                      <span className="font-mono text-xs text-gray">{d[0]}</span>
                      <span className="truncate">{d[1]} <span className="text-xs text-gray-2">· {d[2]}</span></span>
                      <span className="text-xs text-gray">{d[3]}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Today</span>
                  <span className="text-xs text-gray-2">since 00:00</span>
                </div>
                <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  {today.map((t) => (
                    <li key={t[0]} className="rounded-xl border border-line px-4 py-3">
                      <div className="flex items-center gap-2 text-xs text-gray"><Dot tone={t[2] as "ok" | "warn"} />{t[0]}</div>
                      <div className="mt-2 text-[22px] font-medium leading-6">{t[1]}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Platform tab visuals ---------- */

export function RulesVisual() {
  const rows = [
    ["RULE-0101", "Commission tiered by amount band", "Temlik/Komisyon.cs:12", "evidenced", "keep"],
    ["RULE-0102", "250 floor, contract type 3 exempt", "Temlik/Komisyon.cs:31", "evidenced", "keep"],
    ["RULE-0103", "Two roundings in production", "SP_Komisyon:88", "disputed", "change"],
    ["RULE-0105", "Notice above 500K, diverged copy", "TemlikYoneticisi.cs:45", "disputed", "—"],
  ];
  const tone = (c: string) => (c === "evidenced" ? "text-ok" : c === "disputed" ? "text-[#d64545]" : "text-gray");
  return (
    <Frame title="Rule cards · Temlik" right="4 cards · 2 open questions">
      <ul className="divide-y divide-line-3 text-sm">
        {rows.map((r) => (
          <li key={r[0]} className="grid grid-cols-[88px_1fr_auto_auto] items-center gap-3 px-4 py-3">
            <span className="font-mono text-xs text-gray">{r[0]}</span>
            <span className="truncate">{r[1]} <span className="text-xs text-gray-2">· {r[2]}</span></span>
            <span className={`text-xs ${tone(r[3])}`}>{r[3]}</span>
            <span className="w-14 text-right text-xs text-gray">{r[4]}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-line-3 px-4 py-2.5 text-xs text-gray">A card without a source reference cannot exist. A verdict is written only by a person.</div>
    </Frame>
  );
}

export function SpecTableVisual() {
  const rows = [
    ["D1", "Domestic, with recourse", "0–90", "1.25%", "150"],
    ["D2", "Domestic, with recourse", "91–365", "1.75%", "150"],
    ["D3", "Domestic, no recourse", "0–90", "2.10%", "250"],
    ["D6", "Export", "0–365", "1.80%", "500"],
  ];
  return (
    <Frame title="SPEC-LIM-07 · Commission decision table" right="DMN · unique-hit · rev 14 · signed">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray">
            <th className="px-4 py-2 font-medium">#</th><th className="px-2 py-2 font-medium">Product</th><th className="px-2 py-2 font-medium">Tenor (d)</th><th className="px-2 py-2 font-medium">Rate</th><th className="px-4 py-2 text-right font-medium">Floor</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line-3">
          {rows.map((r) => (
            <tr key={r[0]} className={r[0] === "D6" ? "bg-[#f0fdf4]" : ""}>
              <td className="px-4 py-2.5 font-mono text-xs text-gray">{r[0]}</td><td className="px-2 py-2.5">{r[1]}</td><td className="px-2 py-2.5 text-gray">{r[2]}</td><td className="px-2 py-2.5">{r[3]}</td><td className="px-4 py-2.5 text-right">{r[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-line-3 px-4 py-2.5 text-xs text-gray">Every row compiles to a test. A row without a test is reported missing. Input outside the table throws.</div>
    </Frame>
  );
}

export function BoardVisual() {
  const cols: [string, string[]][] = [
    ["Ready", ["SPEC-LIM-07 D6 · export row", "RULE-0102 exemption test"]],
    ["In build", ["CR-2318 receivable pool"]],
    ["In review", ["CR-2311 revaluation window"]],
    ["Released", ["CR-2297 liquidity layout", "CR-2290 limit ceiling"]],
  ];
  return (
    <Frame title="Sprint 14 · Limits" right="Definition of Ready enforced">
      <div className="grid min-w-[620px] grid-cols-4 gap-2 p-3">
        {cols.map(([name, items]) => (
          <div key={name} className="rounded-lg bg-band p-2">
            <div className="mb-2 flex items-center justify-between px-1 text-xs text-gray"><span>{name}</span><span>{items.length}</span></div>
            {items.map((it) => (
              <div key={it} className="mb-2 rounded-md border border-line bg-white px-2.5 py-2 text-xs">
                <div>{it}</div>
                <div className="mt-1.5 flex gap-1"><span className="h-1.5 w-1.5 rounded-full bg-ok" /><span className="h-1.5 w-1.5 rounded-full bg-ok" /><span className="h-1.5 w-1.5 rounded-full bg-line-2" /></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function DorVisual() {
  const rows = [
    ["Spec signed by the business", "SPEC-LIM-07 rev 14", "ok"],
    ["Open questions on bound rules", "0", "ok"],
    ["Red test exists for each row", "4 of 4", "ok"],
    ["Owner and approval chain assigned", "limits-change", "ok"],
    ["Jira ticket linked", "LIM-412", "ok"],
  ];
  return (
    <Frame title="Definition of Ready · CR-2318" right="5 of 5">
      <ul className="divide-y divide-line-3 text-sm">
        {rows.map((r) => (
          <li key={r[0]} className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="flex items-center gap-2.5"><Dot tone="ok" />{r[0]}</span>
            <span className="font-mono text-xs text-gray-2">{r[1]}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function WorkspaceVisual() {
  return (
    <Frame title="Workspace · CR-2318" right="Claude · policy limits-change">
      <div className="space-y-3 p-4 text-sm">
        <div className="flex justify-end"><div className="max-w-[80%] rounded-2xl rounded-br-md bg-chip px-3.5 py-2">Implement row D6 of SPEC-LIM-07 and turn the red test green.</div></div>
        <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-line px-3.5 py-2.5">
          <div className="text-ink-2">Reading SPEC-LIM-07 rev 14 and the generated test <span className="font-mono text-xs">Commission_D6_Export</span>. It is red: no row for export, tenor 0–365.</div>
          <div className="mt-2 space-y-1 font-mono text-xs text-gray">
            <div><span className="text-ok">✓</span> specdrift validate · 0 findings</div>
            <div><span className="text-ok">✓</span> dotnet test · 4 of 4 passed (was 3 of 4)</div>
            <div><span className="text-ok">✓</span> opened PR #412 · linked LIM-412</div>
          </div>
        </div>
        <div className="composer p-2.5">
          <div className="px-1 text-gray-2">Reply<span className="caret" aria-hidden="true" /></div>
          <div className="mt-3 flex items-center justify-between">
            <span className="seg"><span>Ask</span><span data-on="true">Build</span><span>Review</span></span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink text-white"><Icon name="send" size={12} /></span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function PrVisual() {
  const rows = [
    ["src/Limits/Commission.cs", "+12 −2"],
    ["tests/Limits/CommissionTests.cs", "+18 −0"],
    ["docs/dmn/komisyon.dmn.md", "+1 −0"],
  ];
  return (
    <Frame title="PR #412 · export row D6" right="GitHub · linked LIM-412">
      <ul className="divide-y divide-line-3 text-sm">
        {rows.map((r) => (
          <li key={r[0]} className="flex items-center justify-between px-4 py-2.5">
            <span className="font-mono text-xs">{r[0]}</span>
            <span className="font-mono text-xs text-gray">{r[1]}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 border-t border-line-3 px-4 py-3 text-xs">
        <span className="rounded-full bg-[#f0fdf4] px-2 py-0.5 text-ok">checks passed</span>
        <span className="rounded-full bg-chip px-2 py-0.5 text-gray">commit carries RULE-P002</span>
        <span className="rounded-full bg-chip px-2 py-0.5 text-gray">reviewed by Maker</span>
      </div>
    </Frame>
  );
}

export function GatesVisual() {
  const gates = [
    ["touch", "Code changed, rule did not?", "Passed", "ok"],
    ["boundary", "Dependency crosses the context map?", "Passed", "ok"],
    ["drift", "Code deviates from the spec?", "Passed", "ok"],
    ["parity", "Legacy equals new?", "Blocked", "warn"],
  ];
  return (
    <Frame title="Gates · PR #412" right="3 of 4 passed">
      <ul className="divide-y divide-line-3 text-sm">
        {gates.map((g) => (
          <li key={g[0]} className="grid grid-cols-[80px_1fr_auto] items-center gap-3 px-4 py-3">
            <span className="flex items-center gap-2.5 font-mono text-xs"><Dot tone={g[3] as "ok" | "warn"} />{g[0]}</span>
            <span className="text-gray">{g[1]}</span>
            <span className={g[3] === "ok" ? "text-ok" : "text-warn"}>{g[2]}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-line-3 px-4 py-2.5 text-xs text-gray">A gate is never silenced quietly: record, owner and due date, or it stays red.</div>
    </Frame>
  );
}

export function FindingVisual() {
  return (
    <Frame title="Finding · SA0401 · touch" right="exit 1">
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-gray">
<span className="text-[#d64545]">SA0401 · touch · rules/RULE-0105.yaml</span>{"\n"}
<span className="text-ink-2">TemlikYoneticisi.cs</span> changed in this PR but neither the rule{"\n"}
nor its characterization test did. Update the rule and its test,{"\n"}
or record why behaviour is unchanged.{"\n"}
<span className="text-gray-2">→ the test ran: RED. Behaviour really changed.</span>
      </pre>
    </Frame>
  );
}

export function ApprovalVisual() {
  const chain = [
    ["Maker", "Product engineering", "Submitted", "ok"],
    ["Checker", "Credit risk, distinct eyes", "Pending", "warn"],
    ["Release", "Change advisory", "Not yet", "idle"],
  ];
  return (
    <Frame title="Approvals · CR-2318" right="chain: limits-change · policy v7">
      <ul className="divide-y divide-line-3 text-sm">
        {chain.map((a, i) => (
          <li key={a[0]} className="grid grid-cols-[20px_76px_1fr_auto] items-center gap-3 px-4 py-3">
            <span className="font-mono text-xs text-gray-2">{i + 1}</span>
            <span className="font-medium">{a[0]}</span>
            <span className="text-gray">{a[1]}</span>
            <span className="flex items-center gap-2 text-xs text-gray"><Dot tone={a[3] as "ok" | "warn" | "idle"} />{a[2]}</span>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 border-t border-line-3 px-4 py-3">
        <span className="btn btn-primary btn-sm px-3">Approve as Checker</span>
        <span className="btn btn-secondary btn-sm px-3">Request changes</span>
      </div>
    </Frame>
  );
}

export function VerdictVisual() {
  const rows = [
    ["RULE-0101", "keep", "Domain expert", "Mon 14:02"],
    ["RULE-0102", "keep · exemption was deliberate", "Domain expert", "Mon 14:05"],
    ["RULE-0103", "change · one policy, half-up", "Domain expert + Spec owner", "Tue 09:40"],
    ["RULE-0105", "open · two copies, which is right?", "—", "—"],
  ];
  return (
    <Frame title="Decision ledger · Temlik" right="verdicts are written by people">
      <ul className="divide-y divide-line-3 text-sm">
        {rows.map((r) => (
          <li key={r[0]} className="grid grid-cols-[88px_1fr_auto] items-center gap-3 px-4 py-3">
            <span className="font-mono text-xs text-gray">{r[0]}</span>
            <span className="truncate"><span className={r[1].startsWith("open") ? "text-warn" : ""}>{r[1]}</span> <span className="text-xs text-gray-2">· {r[2]}</span></span>
            <span className="text-xs text-gray-2">{r[3]}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function ReleaseVisual() {
  const rows = [
    ["Train", "0.1.0", "184 packages, all pinned"],
    ["SBOM", "CycloneDX 1.6", "1,212 components"],
    ["Provenance", "Signed", "verified at install"],
    ["Parity", "Legacy = new", "8 of 8 samples, 0 known differences"],
    ["Target", "eu-central, air-gapped", "offline mirror 2026-10-07"],
  ];
  return (
    <Frame title="Release · train 0.1.0" right="promotion gate">
      <ul className="divide-y divide-line-3 text-sm">
        {rows.map((r) => (
          <li key={r[0]} className="grid grid-cols-[96px_1fr] items-baseline gap-3 px-4 py-3">
            <span className="text-gray">{r[0]}</span>
            <span>{r[1]} <span className="text-xs text-gray-2">· {r[2]}</span></span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function LivingDocVisual() {
  const steps = [
    ["Extracted", "RULE-0103 · SP_Komisyon:88", "ok"],
    ["Proven", "CHAR-0002 · 8 of 8 on legacy", "ok"],
    ["Specified", "SPEC-LIM-07 rev 14 · signed", "ok"],
    ["Implemented", "PR #412 · commit carries the id", "ok"],
    ["Re-proven", "CHAR-0002 · 8 of 8 on new", "ok"],
    ["Steady state", "touch + drift on every PR", "accent"],
  ];
  return (
    <Frame title="Living document · SPEC-LIM-07" right="the page is the record">
      <ul className="divide-y divide-line-3 text-sm">
        {steps.map((s, i) => (
          <li key={s[0]} className="grid grid-cols-[20px_110px_1fr] items-center gap-3 px-4 py-2.5">
            <span className="font-mono text-xs text-gray-2">{i + 1}</span>
            <span className="flex items-center gap-2 font-medium"><Dot tone={s[2] as "ok" | "accent"} />{s[0]}</span>
            <span className="text-gray">{s[1]}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/* ---------- Integrations (ready section) ---------- */

export function IntegrationsVisual() {
  const groups: [string, string[]][] = [
    ["Source", ["GitHub", "GitLab", "Azure DevOps", "Bitbucket"]],
    ["Work", ["Jira", "Azure Boards", "Linear"]],
    ["Identity", ["Entra ID", "Keycloak", "Okta"]],
    ["Delivery", ["NuGet feed", "Container registry", "Sigstore"]],
    ["Assistants", ["Claude Code", "MCP servers", "Your agent"]],
  ];
  return (
    <div className="window overflow-hidden">
      <div className="grid sm:grid-cols-[230px_1fr]">
        <Sidebar active="Integrations" />
        <div className="p-6 sm:p-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray">Integrations</div>
              <h3 className="mt-1 text-lead font-medium">Connected to the estate</h3>
            </div>
            <span className="btn btn-secondary btn-sm px-3">Add connection</span>
          </div>
          <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {groups.flatMap(([g, items]) => items.map((it) => (
              <div key={it} className="flex items-center justify-between rounded-xl border border-line px-3.5 py-3 text-sm">
                <span className="flex items-center gap-2.5"><span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-band text-gray"><Icon name={g === "Source" ? "git" : g === "Work" ? "board" : g === "Identity" ? "lock" : g === "Delivery" ? "box" : "sparkle"} size={14} /></span>{it}</span>
                <span className="flex items-center gap-1.5 text-xs text-gray"><Dot tone="ok" />{g}</span>
              </div>
            )))}
          </div>
          <p className="mt-5 text-xs text-gray">The estate&apos;s tools stay where they are. {PRODUCT} reads from them and writes the record.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- The three actors (dark) ---------- */

export function Actors() {
  const f = (n: number) => n.toFixed(2);
  return (
    <svg viewBox="0 0 720 560" className="h-auto w-full" aria-hidden="true">
      <g transform="translate(360 280)">
        <g fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1">
          <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="70s" repeatCount="indefinite" />
          <ellipse rx="300" ry="120" />
          <ellipse rx="300" ry="120" transform="rotate(60)" />
          <ellipse rx="300" ry="120" transform="rotate(-60)" />
        </g>
        <g fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1">
          {[80, 140, 200].map((r) => <circle key={r} r={r} />)}
        </g>
        {[["AI produces", 0], ["Humans decide", 120], ["The engine verifies", 240]].map(([label, deg]) => {
          const a = ((deg as number) * Math.PI) / 180;
          const x = Math.cos(a) * 200, y = Math.sin(a) * 200;
          return (
            <g key={label as string} transform={`translate(${f(x)} ${f(y)})`}>
              <circle r="22" fill="#101010" stroke="rgba(255,255,255,0.35)" />
              <circle r="4" fill="#fff" />
              <text y="44" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="13" fontFamily="var(--font-sans)">{label as string}</text>
            </g>
          );
        })}
        <circle r="26" fill="none" stroke="rgba(255,255,255,0.5)" />
        <circle r="5" fill="#fff" />
        <circle r="3" fill="#fff">
          <animateMotion dur="10s" repeatCount="indefinite" path="M -300 0 a 300 120 0 1 0 600 0 a 300 120 0 1 0 -600 0" />
        </circle>
        <circle r="3" fill="#fff" opacity="0.7">
          <animateMotion dur="13s" begin="2s" repeatCount="indefinite" path="M -150 -259.8 a 300 120 0 1 0 300 519.6 a 300 120 0 1 0 -300 -519.6" />
        </circle>
      </g>
    </svg>
  );
}

export function Hex() {
  const pts = (r: number, cx: number, cy: number) => Array.from({ length: 6 }).map((_, i) => { const a = (Math.PI / 3) * i + Math.PI / 6; return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`; }).join(" ");
  return (
    <svg viewBox="0 0 520 360" className="draw h-auto w-full" aria-hidden="true">
      {[40, 80, 120, 160].map((r) => <polygon key={r} points={pts(r, 260, 180)} fill="none" stroke="rgba(255,255,255,0.2)" />)}
      {[0, 1, 2, 3, 4, 5].map((i) => { const a = (Math.PI / 3) * i + Math.PI / 6; return <line key={i} x1={(260 + 40 * Math.cos(a)).toFixed(2)} y1={(180 + 40 * Math.sin(a)).toFixed(2)} x2={(260 + 160 * Math.cos(a)).toFixed(2)} y2={(180 + 160 * Math.sin(a)).toFixed(2)} stroke="rgba(255,255,255,0.12)" />; })}
      <circle cx="260" cy="180" r="4" fill="#fff" />
    </svg>
  );
}

/* ---------- Line chart (scale section) ---------- */

export function LineChart() {
  const pts = [[20, 150], [78, 146], [136, 140], [194, 128], [252, 118], [310, 104], [368, 92], [426, 72], [484, 56], [542, 34], [580, 22]];
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ");
  return (
    <svg viewBox="0 0 600 180" className="h-auto w-full" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => <line key={i} x1="0" x2="600" y1={30 + i * 40} y2={30 + i * 40} stroke="var(--line)" />)}
      {[0, 1, 2, 3, 4, 5].map((i) => <line key={i} y1="0" y2="180" x1={i * 120} x2={i * 120} stroke="var(--line-3)" />)}
      <path d={d} fill="none" stroke="var(--ink)" strokeWidth="1.5" className="chart-line" />
      <circle cx="580" cy="22" r="4" fill="var(--ink)" />
      <circle cx="580" cy="22" r="9" fill="none" stroke="var(--ink)" opacity="0.25" />
    </svg>
  );
}
