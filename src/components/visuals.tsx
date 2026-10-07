import { Dot } from "./ui";

/* ---------- The product window in the hero ---------- */

const GATES = [
  { name: "Specification drift", note: "LIM-07 rev 14 · 0 findings", state: "Passed", tone: "ok" },
  { name: "Build and analyzers", note: "GP rules · 0 suppressed", state: "Passed", tone: "ok" },
  { name: "Contract tests", note: "41 of 41 · sandbox 2.3", state: "Passed", tone: "ok" },
  { name: "Security review", note: "assigned to Security", state: "Waiting", tone: "warn" },
] as const;

const APPROVALS = [
  { role: "Maker", who: "Product engineering", state: "Submitted", tone: "ok" },
  { role: "Checker", who: "Credit risk", state: "Pending", tone: "warn" },
  { role: "Release", who: "Change advisory", state: "Not yet", tone: "idle" },
] as const;

const TRAIL = [
  { t: "09:41", text: "Change opened from specification LIM-07, revision 14" },
  { t: "09:52", text: "AI proposal: migration 0042 and 3 tests, reviewed by Maker" },
  { t: "10:03", text: "Gate: specification drift passed" },
  { t: "10:11", text: "Gate: contract tests passed against sandbox 2.3" },
  { t: "10:12", text: "Approval requested from Checker (Credit risk)" },
] as const;

const NAV = ["Inbox", "Changes", "Specifications", "Gates", "Approvals", "AI gateway", "Audit trail"];

export function ProductWindow() {
  return (
    <div className="frame overflow-hidden rounded-b-none border-b-0" role="img" aria-label="Qorpe Control Room: a change with its gates, approvals and audit trail">
      <div className="grid sm:grid-cols-[200px_1fr]">
        <nav className="hidden border-r border-edge p-3 text-sm sm:block" aria-hidden="true">
          <div className="mb-4 flex items-center gap-2 px-2 py-1 text-ink">
            <span className="mark h-4 w-4" />
            <span className="font-medium">Control Room</span>
            <span className="text-gray-2">▾</span>
          </div>
          {NAV.map((item, i) => (
            <div key={item} className={`rounded-md px-2 py-1.5 ${i === 1 ? "bg-white/[0.06] text-ink" : "text-gray"}`}>{item}</div>
          ))}
          <div className="mt-5 px-2 text-xs text-gray-2">Workspace</div>
          {["Limits", "Collateral", "Reporting"].map((w) => (
            <div key={w} className="rounded-md px-2 py-1.5 text-gray">{w}</div>
          ))}
        </nav>

        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between text-xs text-gray">
            <span className="flex items-center gap-2"><span className="font-mono text-ink-2">CR-2318</span> Limit allocation</span>
            <span className="hidden sm:inline">Production · eu-central · on-premises</span>
          </div>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-medium">Limit allocation: add collateral type “receivable pool”</h3>
              <p className="mt-1 text-sm text-gray">From specification LIM-07 rev 14 · Module: Limits · Train 0.1.0</p>
            </div>
            <span className="rounded-full border border-edge-2 px-2.5 py-1 text-xs text-ink-2">In review</span>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-[1.2fr_1fr]">
            <div className="frame-soft p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Gates</span>
                <span className="text-gray">3 of 4 passed</span>
              </div>
              <ul className="mt-3 space-y-2.5 text-sm">
                {GATES.map((g) => (
                  <li key={g.name} className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2.5 text-ink-2"><Dot tone={g.tone} />{g.name}</span>
                    <span className="hidden font-mono text-xs text-gray-2 md:inline">{g.note}</span>
                    <span className={g.tone === "ok" ? "text-ok" : "text-warn"}>{g.state}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="frame-soft p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Approvals</span>
                <span className="text-gray">limits-change</span>
              </div>
              <ul className="mt-3 space-y-2.5 text-sm">
                {APPROVALS.map((a) => (
                  <li key={a.role} className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2.5 text-ink-2"><Dot tone={a.tone} />{a.role}<span className="text-gray-2">{a.who}</span></span>
                    <span className="text-gray">{a.state}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex gap-2">
                <span className="btn btn-primary h-7 px-3 text-xs">Approve as Checker</span>
                <span className="btn btn-secondary h-7 px-3 text-xs">Request changes</span>
              </div>
            </div>
          </div>

          <div className="frame-soft mt-3 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Audit trail</span>
              <span className="text-gray">today</span>
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {TRAIL.map((e) => (
                <li key={e.t} className="grid grid-cols-[48px_1fr] gap-3">
                  <span className="font-mono text-xs text-gray-2">{e.t}</span>
                  <span className="text-ink-2">{e.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Section visuals: two frames side by side ---------- */

function FrameTitle({ children, right }: { children: React.ReactNode; right?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-edge px-4 py-2.5 text-xs">
      <span className="text-ink-2">{children}</span>
      {right ? <span className="text-gray-2">{right}</span> : null}
    </div>
  );
}

export function SpecifyVisual() {
  const specs = [
    ["LIM-07", "Limit allocation", "rev 14", "Frozen"],
    ["LIM-06", "Collateral valuation", "rev 9", "Frozen"],
    ["LIM-08", "Receivable pool haircut", "rev 2", "Draft"],
    ["RPT-03", "BRSA liquidity report", "rev 21", "Frozen"],
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <div className="frame overflow-hidden">
        <FrameTitle right="4 specifications">Specifications / Limits</FrameTitle>
        <ul className="divide-y divide-edge text-sm">
          {specs.map((r) => (
            <li key={r[0]} className="grid grid-cols-[72px_1fr_56px_60px] items-center gap-3 px-4 py-3">
              <span className="font-mono text-xs text-gray">{r[0]}</span>
              <span className="text-ink-2">{r[1]}</span>
              <span className="text-xs text-gray-2">{r[2]}</span>
              <span className={`text-right text-xs ${r[3] === "Frozen" ? "text-ok" : "text-gray"}`}>{r[3]}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="frame overflow-hidden">
        <FrameTitle right="deterministic">Engine run</FrameTitle>
        <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-gray">
<span className="text-gray-2">$</span> <span className="text-ink-2">goldpath generate --spec LIM-07@14</span>{"\n"}
manifest ok · 3 modules · engine 0.1.0{"\n"}
+ src/Limits/ReceivablePool.cs{"\n"}
+ migrations/0042_receivable_pool.sql{"\n"}
+ tests/Limits/ReceivablePoolTests.cs (3){"\n"}
<span className="text-ok">done</span> · no model call · hash 9f2c…e1
        </pre>
      </div>
    </div>
  );
}

export function VerifyVisual() {
  const gates = [
    ["Specification drift", "Passed", "ok", "specdrift 0.4 · 0 findings"],
    ["Build and analyzers", "Passed", "ok", "GP0412 · 0 suppressed"],
    ["Contract tests", "Passed", "ok", "41 of 41 · sandbox 2.3"],
    ["Security review", "Blocked", "warn", "needs reviewer"],
  ];
  const chain = [
    ["Maker", "Product engineering", "Submitted", "ok"],
    ["Checker", "Credit risk", "Pending", "warn"],
    ["Release", "Change advisory", "Not yet", "idle"],
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <div className="frame overflow-hidden">
        <FrameTitle right="3 of 4 passed">Gates / CR-2318</FrameTitle>
        <ul className="divide-y divide-edge text-sm">
          {gates.map((g) => (
            <li key={g[0]} className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="flex items-center gap-2.5 text-ink-2"><Dot tone={g[2] as "ok" | "warn"} />{g[0]}</span>
              <span className="hidden font-mono text-xs text-gray-2 md:inline">{g[3]}</span>
              <span className={g[2] === "ok" ? "text-ok" : "text-warn"}>{g[1]}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-edge px-4 py-3 text-xs text-gray">A suppression without a written reason fails the gate.</div>
      </div>
      <div className="frame overflow-hidden">
        <FrameTitle right="chain: limits-change">Approvals</FrameTitle>
        <ul className="divide-y divide-edge text-sm">
          {chain.map((a, i) => (
            <li key={a[0]} className="grid grid-cols-[20px_76px_1fr_auto] items-center gap-3 px-4 py-3">
              <span className="font-mono text-xs text-gray-2">{i + 1}</span>
              <span className="font-medium text-ink-2">{a[0]}</span>
              <span className="text-gray">{a[1]}</span>
              <span className="flex items-center gap-2 text-xs text-gray"><Dot tone={a[3] as "ok" | "warn" | "idle"} />{a[2]}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 border-t border-edge px-4 py-3">
          <span className="btn btn-primary h-7 px-3 text-xs">Approve as Checker</span>
          <span className="btn btn-secondary h-7 px-3 text-xs">Request changes</span>
        </div>
      </div>
    </div>
  );
}

export function ReleaseVisual() {
  const rows = [
    ["Train", "0.1.0", "184 packages, all pinned"],
    ["SBOM", "CycloneDX 1.6", "1,212 components"],
    ["Provenance", "Signed", "verified at install"],
    ["Target", "eu-central, air-gapped", "offline mirror 2026-10-07"],
  ];
  const trail = [
    ["10:12", "Approval requested from Checker (Credit risk)"],
    ["11:40", "Checker approved · 2 of 2 distinct eyes"],
    ["11:41", "Release gate: SBOM and provenance attached"],
    ["11:58", "Train 0.1.0 promoted to production"],
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
      <div className="frame overflow-hidden">
        <FrameTitle right="release">Train 0.1.0</FrameTitle>
        <ul className="divide-y divide-edge text-sm">
          {rows.map((r) => (
            <li key={r[0]} className="grid grid-cols-[96px_1fr] items-baseline gap-3 px-4 py-3">
              <span className="text-gray">{r[0]}</span>
              <span><span className="text-ink-2">{r[1]}</span> <span className="text-xs text-gray-2">· {r[2]}</span></span>
            </li>
          ))}
        </ul>
      </div>
      <div className="frame overflow-hidden">
        <FrameTitle right="today">Audit trail / CR-2318</FrameTitle>
        <ul className="divide-y divide-edge text-sm">
          {trail.map((e) => (
            <li key={e[0]} className="grid grid-cols-[48px_1fr] gap-3 px-4 py-3">
              <span className="font-mono text-xs text-gray-2">{e[0]}</span>
              <span className="text-ink-2">{e[1]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- The mark's rings as a wireframe ---------- */

export function Rings({ turn = 0 }: { turn?: number }) {
  const rings = [60, 110, 160, 210, 260, 310];
  const f = (n: number) => n.toFixed(2);
  return (
    <svg viewBox="0 0 720 560" className="h-auto w-full" aria-hidden="true">
      <g transform={`translate(360 300) rotate(${f(turn)}) scale(1 0.42)`} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1">
        {rings.map((r) => <circle key={r} r={r} />)}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return <line key={i} x1={f(Math.cos(a) * 60)} y1={f(Math.sin(a) * 60)} x2={f(Math.cos(a) * 310)} y2={f(Math.sin(a) * 310)} stroke="rgba(255,255,255,0.09)" />;
        })}
      </g>
      <g transform="translate(360 300)" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1">
        {rings.slice(0, 4).map((r, i) => <ellipse key={r} rx={r} ry={f(r * 0.42)} cy={-i * 46} />)}
      </g>
      <g transform="translate(360 300)">
        <circle r="4" cy="-150" fill="#fff" />
        <circle r="11" cy="-150" fill="none" stroke="rgba(255,255,255,0.3)" />
      </g>
    </svg>
  );
}
