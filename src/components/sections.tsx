import { Arrow, Container, FeatureRow, SectionHead } from "./ui";
import { ProductWindow, ReleaseVisual, SpecifyVisual, VerifyVisual } from "./visuals";

export function Hero() {
  return (
    <section className="relative pt-20 sm:pt-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[48rem]">
            <h1 className="text-h1 font-medium">
              The delivery system for
              <br />
              regulated teams and agents
            </h1>
            <p className="mt-5 text-base text-gray">
              Purpose-built for banks, insurers and telecoms. Designed for the audit.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="mailto:hello@qorpe.com?subject=Demo%20request" className="btn btn-primary btn-lg">Request a demo</a>
              <a href="#specify" className="btn btn-secondary btn-lg">How it works</a>
            </div>
          </div>
          <a href="mailto:hello@qorpe.com?subject=Control%20Room%20preview" className="inline-flex items-center gap-2 text-sm text-gray hover:text-ink">
            <span className="font-medium text-ink">Preview</span> Control Room 0.1 <Arrow />
          </a>
        </div>
      </Container>
      <div className="hero-glow relative mt-14 sm:mt-20">
        <Container>
          <ProductWindow />
        </Container>
      </div>
    </section>
  );
}

const PILLARS = [
  { title: "Specification-first", text: "Every change starts from a versioned specification and stays linked to it. Nothing is implied." },
  { title: "Governed by gates", text: "Deterministic checks block the merge. A suppression without a written reason is itself a failure." },
  { title: "Built for agents", text: "AI works through the same gates a person does, and leaves the same kind of entry in the record." },
];

export function Statement() {
  return (
    <section className="border-t border-edge pt-20 sm:pt-28">
      <Container>
        <p className="caps">Built for the estates that cannot afford a wrong change</p>
        <h2 className="mt-6 max-w-[56rem] text-h2 font-medium">
          A new kind of delivery platform.{" "}
          <span className="text-gray">
            Purpose-built for regulated organisations, where every change must be specified, verified, approved and traceable before it reaches production.
          </span>
        </h2>
        <div className="mt-16 grid gap-10 border-t border-edge pt-10 sm:grid-cols-3 sm:gap-0">
          {PILLARS.map((p, i) => (
            <div key={p.title} className={`sm:px-8 ${i === 0 ? "sm:pl-0" : "sm:border-l sm:border-edge"} ${i === 2 ? "sm:pr-0" : ""}`}>
              <div className="mb-10 h-8 w-8 rounded-md border border-edge-2" aria-hidden="true">
                <span className="mark block h-full w-full scale-50 text-gray" />
              </div>
              <h3 className="text-sm font-medium">{p.title}</h3>
              <p className="mt-2 text-sm text-gray">{p.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Specify() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHead
          id="specify"
          title={<>Specify<br />and generate</>}
          text="Rules, contracts and requirements become versioned records. A change is opened from a revision, and a deterministic engine turns that revision into code, migrations and tests without calling a model."
          more={{ label: "Learn more", href: "mailto:hello@qorpe.com?subject=Specifications" }}
        />
        <div className="mt-14"><SpecifyVisual /></div>
        <FeatureRow groups={[["Specification registry", "Manifest as source of truth"], ["Deterministic engine", "Generated tests"]]} />
      </Container>
    </section>
  );
}

export function Verify() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHead
          id="verify"
          title={<>Verify<br />and approve</>}
          text="Drift against the spec, analyzers, contract tests, security review. A failing gate stops the merge. Approvals follow maker-checker chains you configure per change type, and every decision records who, what and which revision."
          more={{ label: "Learn more", href: "mailto:hello@qorpe.com?subject=Gates%20and%20approvals" }}
        />
        <div className="mt-14"><VerifyVisual /></div>
        <FeatureRow groups={[["Gates that block", "Written suppressions"], ["Maker-checker chains", "Quorums and distinct eyes"]]} />
      </Container>
    </section>
  );
}

export function Release() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHead
          id="release"
          title={<>Release<br />with proof</>}
          text="Pinned dependencies, an SBOM and signed provenance travel with every train. Air-gapped estates install from the same artefacts, verified the same way, and the trail closes with the promotion entry."
          more={{ label: "Learn more", href: "mailto:hello@qorpe.com?subject=Releases" }}
        />
        <div className="mt-14"><ReleaseVisual /></div>
        <FeatureRow groups={[["Pinned trains", "SBOM on every release"], ["Signed provenance", "Offline install"]]} />
      </Container>
    </section>
  );
}

const MODULES = [
  { name: "API Portal", status: "Preview", text: "Partner onboarding with a governed catalogue, an instant sandbox per application and a maker-checker path to production." },
  { name: "Coexist", status: "Preview", text: "Run a legacy system and its replacement side by side, reconcile independently of the pipeline, retire the source on evidence." },
  { name: "Approvals", status: "Available", text: "The approval engine on its own: chains, stages, quorums and an audit record for any workflow in your estate." },
  { name: "File Exchange", status: "Available", text: "Governed file rails for the batch and partner transfers regulated estates still run on." },
  { name: "Idempotency", status: "Available", text: "Exactly-once semantics for payment-grade operations, with the evidence a reviewer asks for." },
  { name: "Messaging", status: "Available", text: "A message bus seam that stays swappable, so the broker is a choice rather than a dependency." },
];

export function Modules() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHead
          id="modules"
          title={<>Enterprise<br />modules</>}
          text="Product modules that deploy into your estate on the same platform, with their gates and approval chains already wired. Two are in preview with design partners; four ship on the current train."
          more={{ label: "Ask for a walkthrough", href: "mailto:hello@qorpe.com?subject=Modules" }}
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => (
            <li key={m.name} className="frame p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium">{m.name}</h3>
                <span className={`text-xs ${m.status === "Available" ? "text-ok" : "text-gray"}`}>{m.status}</span>
              </div>
              <p className="mt-3 text-sm text-gray">{m.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

const DEPLOY = [
  { title: "On-premises or your cloud", text: "Inside your estate, behind your identity provider, on your databases. Nothing leaves the perimeter." },
  { title: "Air-gapped by design", text: "A supported configuration, not an exception. Install from the same signed artefacts, verified offline." },
  { title: "Sector-neutral core", text: "Banking, insurance and telecom rules live in configuration and content packs, never in forks." },
];

export function Deploy() {
  return (
    <section className="border-t border-edge py-24 sm:py-32">
      <Container>
        <SectionHead
          id="deploy"
          title={<>Built for the room<br />you deploy in</>}
          text="Regulated estates do not choose their constraints. The platform is designed around them, and the sectors we work in are the ones where a wrong rule is a finding, not a bug: banking, insurance and telecom."
        />
        <div className="mt-16 grid gap-10 border-t border-edge pt-10 sm:grid-cols-3 sm:gap-0">
          {DEPLOY.map((d, i) => (
            <div key={d.title} className={`sm:px-8 ${i === 0 ? "sm:pl-0" : "sm:border-l sm:border-edge"} ${i === 2 ? "sm:pr-0" : ""}`}>
              <h3 className="text-sm font-medium">{d.title}</h3>
              <p className="mt-2 text-sm text-gray">{d.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const SERVICES = [
  { name: "Discovery", text: "Four to twelve weeks. We map the systems, rules and approvals you have, and end with a written plan you can act on without us." },
  { name: "Pilot", text: "One domain, delivered through the platform, with its gates and approvals in place. The outcome is a running system and a record." },
  { name: "Adoption", text: "Your team runs the platform; we stay until they no longer need us. Training, playbooks and the first audit cycle included." },
];

export function Services() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHead
          id="services"
          title={<>We put it in<br />with you</>}
          text="A small practice that takes on a few engagements a year. We say the unflattering half out loud: discovery gets faster with this approach; rule validation, cutover and regulatory sign-off do not. The platform exists to make those three defensible."
          more={{ label: "Talk to us", href: "mailto:hello@qorpe.com" }}
        />
        <ol className="mt-14 grid gap-4 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <li key={s.name} className="frame p-6">
              <div className="font-mono text-xs text-gray-2">0{i + 1}</div>
              <h3 className="mt-6 text-base font-medium">{s.name}</h3>
              <p className="mt-2 text-sm text-gray">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function Closing() {
  return (
    <section className="relative overflow-hidden border-t border-edge">
      <svg className="ring-a pointer-events-none absolute -left-[8%] top-[-40%] h-[180%] w-auto" viewBox="0 0 600 600" fill="none" aria-hidden="true">
        {[90, 150, 210, 270].map((r) => <circle key={r} cx="300" cy="300" r={r} stroke="rgba(255,255,255,0.06)" />)}
      </svg>
      <svg className="ring-b pointer-events-none absolute -right-[10%] top-[-60%] h-[220%] w-auto" viewBox="0 0 600 600" fill="none" aria-hidden="true">
        {[120, 190, 260].map((r) => <circle key={r} cx="300" cy="300" r={r} stroke="rgba(255,255,255,0.05)" />)}
        <path d="M300 300 L470 470" stroke="rgba(255,255,255,0.08)" />
      </svg>
      <Container className="relative py-28 sm:py-40">
        <h2 className="max-w-[40rem] text-closing font-medium">Built for the audit. Available on-premises.</h2>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="mailto:hello@qorpe.com?subject=Demo%20request" className="btn btn-primary btn-lg">Request a demo</a>
          <a href="mailto:hello@qorpe.com" className="btn btn-secondary btn-lg">Talk to us</a>
        </div>
      </Container>
    </section>
  );
}

const FOOTER: { heading: string; items: { label: string; href: string; ext?: boolean }[] }[] = [
  { heading: "Platform", items: [{ label: "Specify and generate", href: "#specify" }, { label: "Verify and approve", href: "#verify" }, { label: "Release with proof", href: "#release" }, { label: "AI in delivery", href: "#ai" }, { label: "Deployment", href: "#deploy" }] },
  { heading: "Modules", items: [{ label: "API Portal", href: "#modules" }, { label: "Coexist", href: "#modules" }, { label: "Approvals", href: "#modules" }, { label: "File Exchange", href: "#modules" }, { label: "Idempotency", href: "#modules" }, { label: "Messaging", href: "#modules" }] },
  { heading: "Services", items: [{ label: "Discovery", href: "#services" }, { label: "Pilot", href: "#services" }, { label: "Adoption", href: "#services" }] },
  { heading: "Open foundations", items: [{ label: "Goldpath", href: "https://github.com/qorpe/goldpath", ext: true }, { label: "specdrift", href: "https://specdrift.qorpe.com", ext: true }, { label: "Mockifyr", href: "https://mockifyr.qorpe.com", ext: true }, { label: "Mediant", href: "https://mediant.qorpe.com", ext: true }, { label: "GitHub", href: "https://github.com/qorpe", ext: true }] },
  { heading: "Company", items: [{ label: "Talk to us", href: "mailto:hello@qorpe.com" }, { label: "Request a demo", href: "mailto:hello@qorpe.com?subject=Demo%20request" }, { label: "hello@qorpe.com", href: "mailto:hello@qorpe.com" }] },
];

export function Footer() {
  return (
    <footer className="border-t border-edge">
      <Container className="grid gap-10 py-16 lg:grid-cols-[1fr_3fr]">
        <div className="flex items-start gap-2.5">
          <span className="mark h-5 w-5 text-ink" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {FOOTER.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-medium">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href} className="inline-flex items-center gap-1 text-sm text-gray hover:text-ink">
                      {it.label}
                      {it.ext ? <span className="text-gray-2" aria-hidden="true">↗</span> : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-edge py-6 text-xs text-gray-2 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Qorpe</span>
        <span>Screens and data on this page are illustrative. Control Room is in private preview.</span>
      </Container>
    </footer>
  );
}
