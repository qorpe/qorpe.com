import { Dot } from "./ui";

/* ---------- Hero product window (light) ---------- */

const NAV = ["Home", "Changes", "Specifications", "Gates", "Approvals", "AI gateway", "Audit trail", "Reports"];

function Frame({ title, right, children, className = "" }: { title: string; right?: string; children: React.ReactNode; className?: string }) {
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

export function ProductWindow() {
  const decisions = [
    ["CR-2318", "Limit allocation: receivable pool", "Checker review", "11:00"],
    ["CR-2311", "Collateral revaluation window", "Release approval", "today"],
    ["CR-2297", "Liquidity report, BRSA layout", "Specification sign-off", "Thu"],
  ];
  const today = [
    ["Gates run", "41", "ok"],
    ["Blocked", "1", "warn"],
    ["Approvals pending", "2", "warn"],
    ["Released", "3", "ok"],
  ];
  return (
    <div className="window overflow-hidden" role="img" aria-label="Qorpe Control Room home: a greeting, an ask box, decisions waiting and today's gates">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="grid sm:grid-cols-[220px_1fr]">
        <nav className="hidden border-r border-line bg-band p-3 text-sm sm:block" aria-hidden="true">
          <div className="mb-3 flex items-center gap-2 px-2 py-1">
            <span className="mark h-4 w-4 text-ink" />
            <span className="font-medium">Control Room</span>
            <span className="text-gray-2">▾</span>
          </div>
          <div className="mb-3 flex items-center justify-between rounded-md border border-line bg-white px-2 py-1.5 text-xs text-gray">
            Quick actions <span className="font-mono text-gray-2">⌘K</span>
          </div>
          {NAV.map((item, i) => (
            <div key={item} className={`rounded-md px-2 py-1.5 ${i === 0 ? "bg-white font-medium text-ink shadow-[0_0_0_1px_rgb(20_20_22/0.06)]" : "text-ink-2"}`}>{item}</div>
          ))}
          <div className="mt-5 px-2 text-xs text-gray-2">Workspace</div>
          {["Limits", "Collateral", "Reporting", "Partner API"].map((w) => <div key={w} className="rounded-md px-2 py-1.5 text-ink-2">{w}</div>)}
          <div className="mt-5 px-2 text-xs text-gray-2">Sector packs</div>
          {["Banking", "Insurance"].map((w) => <div key={w} className="rounded-md px-2 py-1.5 text-ink-2">{w}</div>)}
        </nav>
        <div className="min-h-[560px] px-6 py-6 sm:px-14 sm:py-12">
          <div className="flex items-center justify-between text-xs text-gray">
            <span>Home</span>
            <span className="hidden sm:inline">Tuesday, 7 October · eu-central · on-premises</span>
          </div>
          <h3 className="mt-10 text-h3 font-medium">Good morning.</h3>
          <div className="mt-5 rounded-xl border border-line p-4 shadow-[0_1px_2px_rgb(0_0_0/0.03)]">
            <div className="text-base text-gray-2">Ask the record<span className="caret" aria-hidden="true" /></div>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-xs text-gray-2">Answers cite the entry they come from</span>
              <span className="flex items-center gap-2 text-xs text-gray"><span className="rounded-md border border-line px-1.5 py-0.5">Auto</span><span className="rounded-md bg-ink px-2 py-0.5 text-white">↑</span></span>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Prepare the 11:00 Checker review", "What changed in LIM-07 since rev 12?", "Which gates block CR-2318?"].map((c) => (
              <span key={c} className="rounded-full border border-line px-2.5 py-1 text-xs text-ink-2">{c}</span>
            ))}
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Needs your decision</span>
                <span className="text-xs text-gray-2">3</span>
              </div>
              <ul className="mt-3 divide-y divide-line-3 rounded-xl border border-line text-sm">
                {decisions.map((d) => (
                  <li key={d[0]} className="grid grid-cols-[64px_1fr_auto] items-center gap-3 px-4 py-3">
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
  );
}

/* ---------- Screen: a small app window around a visual ---------- */

export function Screen({ children, active, title }: { children: React.ReactNode; active: string; title: string }) {
  const items = ["Home", "Changes", "Specifications", "Gates", "Approvals", "Audit trail", "Releases"];
  return (
    <div className="window overflow-hidden" aria-hidden="true">
      <div className="grid min-h-[380px] sm:grid-cols-[180px_1fr]">
        <nav className="hidden border-r border-line bg-band p-2.5 text-xs sm:block">
          <div className="mb-3 flex items-center gap-1.5 px-2 py-1"><span className="mark h-3.5 w-3.5 text-ink" /><span className="font-medium">Control Room</span></div>
          {items.map((it) => (
            <div key={it} className={`rounded-md px-2 py-1.5 ${it === active ? "bg-white font-medium text-ink shadow-[0_0_0_1px_rgb(20_20_22/0.06)]" : "text-ink-2"}`}>{it}</div>
          ))}
        </nav>
        <div className="p-4 sm:p-7">
          <div className="mb-4 text-xs text-gray">{title}</div>
          <div className="max-w-[720px]">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Platform tab visuals (light, inside white blocks) ---------- */

export function SpecifyVisual() {
  const specs = [
    ["LIM-07", "Limit allocation", "rev 14", "Frozen"],
    ["LIM-06", "Collateral valuation", "rev 9", "Frozen"],
    ["LIM-08", "Receivable pool haircut", "rev 2", "Draft"],
    ["RPT-03", "Liquidity report", "rev 21", "Frozen"],
  ];
  return (
    <Frame title="Specifications / Limits" right="4 records">
      <ul className="divide-y divide-line-3 text-sm">
        {specs.map((r) => (
          <li key={r[0]} className="grid grid-cols-[72px_1fr_56px_60px] items-center gap-3 px-4 py-3">
            <span className="font-mono text-xs text-gray">{r[0]}</span>
            <span>{r[1]}</span>
            <span className="text-xs text-gray-2">{r[2]}</span>
            <span className={`text-right text-xs ${r[3] === "Frozen" ? "text-ok" : "text-gray"}`}>{r[3]}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function GenerateVisual() {
  return (
    <Frame title="Engine run" right="deterministic">
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-gray">
<span className="text-gray-2">$</span> <span className="text-ink">goldpath generate --spec LIM-07@14</span>{"\n"}
manifest ok · 3 modules · engine 0.1.0{"\n"}
+ src/Limits/ReceivablePool.cs{"\n"}
+ migrations/0042_receivable_pool.sql{"\n"}
+ tests/Limits/ReceivablePoolTests.cs (3){"\n"}
<span className="text-ok">done</span> · no model call · hash 9f2c…e1
      </pre>
    </Frame>
  );
}

export function VerifyVisual() {
  const gates = [
    ["Specification drift", "Passed", "ok", "specdrift 0.4 · 0 findings"],
    ["Build and analyzers", "Passed", "ok", "GP0412 · 0 suppressed"],
    ["Contract tests", "Passed", "ok", "41 of 41 · sandbox 2.3"],
    ["Security review", "Blocked", "warn", "needs reviewer"],
  ];
  return (
    <Frame title="Gates / CR-2318" right="3 of 4 passed">
      <ul className="divide-y divide-line-3 text-sm">
        {gates.map((g) => (
          <li key={g[0]} className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="flex items-center gap-2.5"><Dot tone={g[2] as "ok" | "warn"} />{g[0]}</span>
            <span className="hidden font-mono text-xs text-gray-2 md:inline">{g[3]}</span>
            <span className={g[2] === "ok" ? "text-ok" : "text-warn"}>{g[1]}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-line-3 px-4 py-2.5 text-xs text-gray">A suppression without a written reason fails the gate.</div>
    </Frame>
  );
}

export function ApproveVisual() {
  const chain = [
    ["Maker", "Product engineering", "Submitted", "ok"],
    ["Checker", "Credit risk", "Pending", "warn"],
    ["Release", "Change advisory", "Not yet", "idle"],
  ];
  return (
    <Frame title="Approvals" right="chain: limits-change">
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

export function ReleaseVisual() {
  const rows = [
    ["Train", "0.1.0", "184 packages, all pinned"],
    ["SBOM", "CycloneDX 1.6", "1,212 components"],
    ["Provenance", "Signed", "verified at install"],
    ["Target", "eu-central, air-gapped", "offline mirror 2026-10-07"],
  ];
  return (
    <Frame title="Train 0.1.0" right="release">
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

export function TrailVisual() {
  const trail = [
    ["10:12", "Approval requested from Checker (Credit risk)"],
    ["11:40", "Checker approved · 2 of 2 distinct eyes"],
    ["11:41", "Release gate: SBOM and provenance attached"],
    ["11:58", "Train 0.1.0 promoted to production"],
  ];
  return (
    <Frame title="Audit trail / CR-2318" right="today">
      <ul className="divide-y divide-line-3 text-sm">
        {trail.map((e) => (
          <li key={e[0]} className="grid grid-cols-[48px_1fr] gap-3 px-4 py-3">
            <span className="font-mono text-xs text-gray-2">{e[0]}</span>
            <span className="text-ink-2">{e[1]}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function DriftVisual() {
  const rows = [
    ["LIM-07 §3.2", "haircut for receivable pools", "spec rev 14", "code 0042", "in sync"],
    ["LIM-07 §4.1", "limit ceiling per obligor", "spec rev 14", "code 0039", "in sync"],
    ["LIM-06 §2.4", "collateral revaluation window", "spec rev 9", "code 0031", "in sync"],
    ["LIM-08 §1.0", "pool eligibility", "spec rev 2", "none", "draft"],
  ];
  return (
    <Frame title="Drift check" right="spec ↔ code">
      <ul className="divide-y divide-line-3 text-sm">
        {rows.map((r) => (
          <li key={r[0]} className="grid grid-cols-[84px_1fr_auto] items-center gap-3 px-4 py-3">
            <span className="font-mono text-xs text-gray">{r[0]}</span>
            <span className="truncate">{r[1]} <span className="text-xs text-gray-2">· {r[2]} · {r[3]}</span></span>
            <span className={`text-xs ${r[4] === "in sync" ? "text-ok" : "text-gray"}`}>{r[4]}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function TestsVisual() {
  const rows = [
    ["ReceivablePool_Haircut_Applies", "generated from LIM-07 §3.2", "passed"],
    ["ReceivablePool_Ceiling_Holds", "generated from LIM-07 §4.1", "passed"],
    ["ReceivablePool_Rejects_Ineligible", "generated from LIM-08 §1.0", "passed"],
  ];
  return (
    <Frame title="Generated tests" right="3 of 3">
      <ul className="divide-y divide-line-3 text-sm">
        {rows.map((r) => (
          <li key={r[0]} className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3">
            <span><span className="font-mono text-xs">{r[0]}</span> <span className="text-xs text-gray-2">· {r[1]}</span></span>
            <span className="text-xs text-ok">{r[2]}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function AnalyzerVisual() {
  const rows = [
    ["GP0412", "Idempotency key required on payment operation", "src/Limits/Allocate.cs:41", "fixed"],
    ["GP0207", "Public API needs an XML summary", "src/Limits/ReceivablePool.cs:12", "fixed"],
    ["GP0901", "Suppression without justification", "—", "0"],
  ];
  return (
    <Frame title="Analyzers" right="0 open">
      <ul className="divide-y divide-line-3 text-sm">
        {rows.map((r) => (
          <li key={r[0]} className="grid grid-cols-[64px_1fr_auto] items-center gap-3 px-4 py-3">
            <span className="font-mono text-xs text-gray">{r[0]}</span>
            <span className="truncate">{r[1]} <span className="text-xs text-gray-2">· {r[2]}</span></span>
            <span className="text-xs text-ok">{r[3]}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function PolicyVisual() {
  const stages = [
    ["1", "Maker", "any engineer on the module", "1 of 1"],
    ["2", "Checker", "Credit risk, distinct from Maker", "1 of 2"],
    ["3", "Release", "Change advisory, business hours", "2 of 3"],
  ];
  return (
    <Frame title="Chain: limits-change" right="policy v7">
      <ul className="divide-y divide-line-3 text-sm">
        {stages.map((r) => (
          <li key={r[0]} className="grid grid-cols-[20px_76px_1fr_auto] items-center gap-3 px-4 py-3">
            <span className="font-mono text-xs text-gray-2">{r[0]}</span>
            <span className="font-medium">{r[1]}</span>
            <span className="truncate text-gray">{r[2]}</span>
            <span className="text-xs text-gray-2">quorum {r[3]}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/* ---------- Line chart for the scale section ---------- */

export function LineChart() {
  const pts = [[0, 150], [60, 146], [120, 140], [180, 128], [240, 118], [300, 104], [360, 92], [420, 72], [480, 56], [540, 34], [600, 18]];
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ");
  return (
    <svg viewBox="0 0 600 180" className="h-auto w-full" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => <line key={i} x1="0" x2="600" y1={30 + i * 40} y2={30 + i * 40} stroke="var(--line)" />)}
      {[0, 1, 2, 3, 4, 5].map((i) => <line key={i} y1="0" y2="180" x1={i * 120} x2={i * 120} stroke="var(--line-3)" />)}
      <path d={d} fill="none" stroke="var(--ink)" strokeWidth="1.5" className="chart-line" />
      <circle cx="600" cy="18" r="3.5" fill="var(--ink)" />
    </svg>
  );
}

/* ---------- Wide visual for the "ready" section: the modules view ---------- */

export function ModulesVisual() {
  const rows = [
    ["Limits", "LIM", "7 specs", "2 open changes", "chain: limits-change"],
    ["Collateral", "COL", "4 specs", "1 open change", "chain: risk-2-eyes"],
    ["Reporting", "RPT", "11 specs", "0 open changes", "chain: finance-release"],
    ["Partner API", "API", "3 specs", "1 open change", "chain: partner-portal"],
  ];
  return (
    <div className="window overflow-hidden">
      <div className="grid sm:grid-cols-[210px_1fr]">
        <nav className="hidden border-r border-line bg-band p-3 text-sm sm:block" aria-hidden="true">
          <div className="mb-3 flex items-center gap-2 px-2 py-1"><span className="mark h-4 w-4 text-ink" /><span className="font-medium">Control Room</span></div>
          {["Home", "Changes", "Specifications", "Gates", "Approvals", "AI gateway", "Audit trail", "Reports"].map((item, i) => (
            <div key={item} className={`rounded-md px-2 py-1.5 ${i === 2 ? "bg-white font-medium text-ink shadow-[0_0_0_1px_rgb(20_20_22/0.06)]" : "text-ink-2"}`}>{item}</div>
          ))}
        </nav>
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray">Specifications</div>
              <h3 className="mt-1 text-lead font-medium">Modules discovered from the manifest</h3>
            </div>
            <span className="btn btn-secondary btn-sm px-3">Import approval chains</span>
          </div>
          <div className="overflow-x-auto"><ul className="mt-5 min-w-[640px] divide-y divide-line-3 overflow-hidden rounded-xl border border-line text-sm">
            {rows.map((r) => (
              <li key={r[0]} className="grid grid-cols-[1fr_60px_90px_120px_1fr] items-center gap-3 px-4 py-3">
                <span className="font-medium">{r[0]}</span>
                <span className="font-mono text-xs text-gray-2">{r[1]}</span>
                <span className="text-gray">{r[2]}</span>
                <span className="text-gray">{r[3]}</span>
                <span className="text-right text-xs text-gray-2">{r[4]}</span>
              </li>
            ))}
          </ul></div>
          <p className="mt-3 text-xs text-gray">Chains imported from your policy document. Nothing was written by hand.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- The mark's rings as a wireframe (dark) ---------- */

export function Rings({ className = "" }: { className?: string }) {
  const rings = [60, 110, 160, 210, 260, 310];
  const f = (n: number) => n.toFixed(2);
  return (
    <svg viewBox="0 0 720 620" className={`h-auto w-full ${className}`} aria-hidden="true">
      <g transform="translate(360 330)" className="draw">
        <g className="rings-spin" transform="scale(1 0.42)" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1">
          {rings.map((r) => <circle key={r} r={r} />)}
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i / 16) * Math.PI * 2;
            return <line key={i} x1={f(Math.cos(a) * 60)} y1={f(Math.sin(a) * 60)} x2={f(Math.cos(a) * 310)} y2={f(Math.sin(a) * 310)} stroke="rgba(255,255,255,0.09)" />;
          })}
        </g>
        <g fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1">
          {rings.slice(0, 4).map((r, i) => <ellipse key={r} rx={r} ry={f(r * 0.42)} cy={-i * 46} />)}
        </g>
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={f(-rings[i] * 0.72)} y1={f(-i * 46 + rings[i] * 0.3)} x2={f(-rings[i] * 0.72)} y2={f(-(i + 1) * 46 + rings[i] * 0.3)} stroke="rgba(255,255,255,0.14)" />
        ))}
        <circle r="4" cy="-150" fill="#fff" />
        <circle r="11" cy="-150" fill="none" stroke="rgba(255,255,255,0.3)" />
        {[0, 1, 2].map((i) => (
          <circle key={i} r="2.5" fill="#fff">
            <animateMotion dur={`${9 + i * 3}s`} begin={`${i * 2}s`} repeatCount="indefinite" path={`M ${-210 + i * 50} 0 a ${210 - i * 50} ${(210 - i * 50) * 0.42} 0 1 0 ${(210 - i * 50) * 2} 0 a ${210 - i * 50} ${(210 - i * 50) * 0.42} 0 1 0 ${-(210 - i * 50) * 2} 0`} />
          </circle>
        ))}
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
