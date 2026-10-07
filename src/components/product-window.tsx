/**
 * A still of the Control Room: one change, mid-flight, with its gates,
 * approvals and trail. Pure markup so it ships as HTML and reads in any
 * viewport; the data is illustrative.
 */

const GATES = [
  { name: "Specification drift", state: "Passed", tone: "ok", note: "spec rev 14 · 0 findings" },
  { name: "Build and analyzers", state: "Passed", tone: "ok", note: "GP rules · 0 suppressed" },
  { name: "Contract tests", state: "Passed", tone: "ok", note: "41 of 41 · sandbox 2.3" },
  { name: "Security review", state: "Waiting", tone: "warn", note: "assigned to Security" },
] as const;

const APPROVALS = [
  { role: "Maker", who: "Product engineering", state: "Submitted" },
  { role: "Checker", who: "Credit risk", state: "Pending" },
  { role: "Release", who: "Change advisory", state: "Not yet" },
] as const;

const TRAIL = [
  { t: "09:41", text: "Change opened from specification LIM-07, revision 14" },
  { t: "09:52", text: "AI proposal: migration 0042 and 3 tests, reviewed by Maker" },
  { t: "10:03", text: "Gate: specification drift passed" },
  { t: "10:11", text: "Gate: contract tests passed against sandbox 2.3" },
  { t: "10:12", text: "Approval requested from Checker (Credit risk)" },
] as const;

function Dot({ tone }: { tone: "ok" | "warn" | "idle" }) {
  const cls =
    tone === "ok" ? "bg-ok" : tone === "warn" ? "bg-warn" : "bg-faint";
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${cls}`} aria-hidden="true" />;
}

export function ProductWindow() {
  return (
    <div className="window-stage relative">
      <div className="window-glow pointer-events-none absolute inset-x-0 -top-24 h-[420px]" aria-hidden="true" />
      <div
        className="window relative mx-auto w-full max-w-[1120px] overflow-hidden rounded-2xl border border-line-strong bg-surface"
        role="img"
        aria-label="Qorpe Control Room: a change with its gates, approvals and audit trail"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="mark h-4 w-4 text-foreground" />
            <span className="text-ui font-medium">Control Room</span>
            <span className="text-ui text-faint">Changes / CR-2318</span>
          </div>
          <div className="hidden items-center gap-4 text-ui text-faint sm:flex">
            <span>Production: eu-central</span>
            <span>On-premises</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-[180px_1fr]">
          {/* Sidebar */}
          <nav className="hidden border-r border-line px-3 py-4 text-ui sm:block" aria-hidden="true">
            {["Changes", "Specifications", "Gates", "Approvals", "AI gateway", "Audit trail", "Settings"].map((item, i) => (
              <div
                key={item}
                className={`rounded-md px-3 py-1.5 ${i === 0 ? "bg-raised text-foreground" : "text-muted-foreground"}`}
              >
                {item}
              </div>
            ))}
          </nav>

          {/* Main */}
          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-mono text-ui text-faint">CR-2318</div>
                <h3 className="mt-1 text-h3 font-semibold">Limit allocation: add collateral type “receivable pool”</h3>
                <p className="mt-1 text-ui text-muted-foreground">
                  From specification LIM-07 rev 14 · Module: Limits · Train 0.1.0
                </p>
              </div>
              <span className="rounded-full border border-line-strong px-3 py-1 text-ui text-muted-foreground">
                In review
              </span>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
              <div className="rounded-xl bg-raised p-4">
                <div className="flex items-center justify-between">
                  <span className="text-ui font-medium">Gates</span>
                  <span className="text-ui text-faint">3 of 4 passed</span>
                </div>
                <ul className="mt-3 space-y-2.5">
                  {GATES.map((g) => (
                    <li key={g.name} className="flex items-center justify-between gap-3 text-ui">
                      <span className="flex items-center gap-2.5">
                        <Dot tone={g.tone} />
                        <span>{g.name}</span>
                      </span>
                      <span className="hidden font-mono text-faint md:inline">{g.note}</span>
                      <span className={g.tone === "ok" ? "text-ok" : "text-warn"}>{g.state}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-raised p-4">
                <div className="flex items-center justify-between">
                  <span className="text-ui font-medium">Approvals</span>
                  <span className="text-ui text-faint">chain: limits-change</span>
                </div>
                <ul className="mt-3 space-y-2.5">
                  {APPROVALS.map((a) => (
                    <li key={a.role} className="flex items-center justify-between gap-3 text-ui">
                      <span className="flex items-center gap-2.5">
                        <Dot tone={a.state === "Submitted" ? "ok" : a.state === "Pending" ? "warn" : "idle"} />
                        <span>{a.role}</span>
                        <span className="text-faint">{a.who}</span>
                      </span>
                      <span className="text-muted-foreground">{a.state}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex gap-2">
                  <span className="rounded-md bg-primary px-3 py-1.5 text-ui font-medium text-primary-foreground">Approve as Checker</span>
                  <span className="rounded-md border border-line-strong px-3 py-1.5 text-ui">Request changes</span>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-raised p-4">
              <div className="flex items-center justify-between">
                <span className="text-ui font-medium">Audit trail</span>
                <span className="text-ui text-faint">today</span>
              </div>
              <ul className="mt-3 space-y-2 text-ui">
                {TRAIL.map((e) => (
                  <li key={e.t} className="grid grid-cols-[48px_1fr] gap-3">
                    <span className="font-mono text-faint">{e.t}</span>
                    <span className="text-muted-foreground">{e.text}</span>
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
