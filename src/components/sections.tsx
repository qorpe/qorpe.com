import { Arrow, Chevron, Container, Reveal, Tag } from "./ui";
import { LineChart, ModulesVisual, ProductWindow } from "./visuals";
import { Newsletter } from "./newsletter";

/* ---------- Hero ---------- */

export function Hero() {
  return (
    <section className="pt-20 pb-16 sm:pt-28">
      <Container>
        <div className="mx-auto max-w-[56rem] text-center">
          <Reveal>
            <a href="#platform" className="inline-flex h-[30px] items-center gap-1.5 rounded-[13px] border border-line-3 px-3 text-base font-medium text-ink hover:bg-chip">
              Control Room 0.1, private preview <Chevron />
            </a>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="mt-7 text-h1 font-semibold">Welcome to governed delivery.</h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto mt-6 max-w-[30rem] text-base font-medium text-gray">
              Qorpe is the control room that specifies, verifies, approves and releases software changes in regulated estates.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
              <a href="mailto:hello@qorpe.com" className="btn btn-secondary">Talk to us</a>
              <a href="mailto:hello@qorpe.com?subject=Demo%20request" className="btn btn-primary">Request a demo</a>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-16 sm:mt-20"><ProductWindow /></Reveal>
      </Container>
    </section>
  );
}

/* ---------- Capability strip (the reference's logo grid) ---------- */

const STRIP = [
  "Maker-checker approvals", "Deterministic gates", "Specification registry", "Audit trail", "AI gateway",
  "Air-gapped install", "SBOM and provenance", "Pinned trains", "Verifiers over MCP", "Sector packs",
];

export function Strip() {
  return (
    <section className="bg-band">
      <Container className="py-10">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-5">
          {STRIP.map((s) => (
            <li key={s} className="flex items-center justify-center bg-band px-4 py-6 text-center text-sm font-medium text-ink-2">{s}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------- Ready from day one ---------- */

export function Ready() {
  return (
    <section className="bg-band pb-28">
      <Container>
        <Reveal className="mx-auto max-w-[44rem] text-center">
          <Tag>Ready from day one</Tag>
          <h2 className="mt-5 text-h2 font-medium">
            Live from your first change. <span className="text-gray">Connect a repository and an identity provider. The Control Room reads the manifest and imports your approval chains before the first review.</span>
          </h2>
          <a href="mailto:hello@qorpe.com?subject=Demo%20request" className="btn btn-primary mt-7">Request a demo</a>
        </Reveal>
        <Reveal className="mt-14"><ModulesVisual /></Reveal>
      </Container>
    </section>
  );
}

/* ---------- Quote ---------- */

export function Quote() {
  return (
    <section className="py-28">
      <Container className="text-center">
        <Reveal>
          <blockquote className="mx-auto max-w-[44rem] font-serif text-[clamp(28px,2.8vw,40px)] leading-[1.2] tracking-[-0.01em]">
            “Discovery gets faster with this approach. Rule validation, cutover and regulatory sign-off do not. The platform exists to make those three defensible, not quick.”
          </blockquote>
          <p className="mt-6 text-sm font-medium">Operating principle</p>
          <p className="text-xs text-gray">Qorpe</p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------- Production-grade ---------- */

const FACTS = [
  { big: "13", small: "architecture decisions, the constitution" },
  { big: "6", small: "golden manifests green on every merge" },
  { big: "100%", small: "of dependencies pinned, no floating versions" },
  { big: "0", small: "model calls inside the deterministic engine" },
];

export function Scale() {
  return (
    <section id="scale" className="border-t border-line py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <Reveal>
          <h2 className="text-h2 font-medium">
            Run inside your perimeter. <span className="text-gray">Production-grade for your estate and your agents.</span>
          </h2>
          <div className="mt-10 rounded-xl border border-line p-4"><LineChart /><div className="mt-2 flex justify-between text-xs text-gray-2"><span>Jul 2026</span><span>Oct 2026</span></div></div>
          <dl className="mt-8 grid grid-cols-2 gap-y-8">
            {FACTS.map((f) => (
              <div key={f.small} className="border-l border-line pl-6">
                <dt className="text-[32px] font-medium leading-8 tracking-[-0.01em]">{f.big}</dt>
                <dd className="mt-2 text-sm text-gray">{f.small}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={1} className="grid gap-4 sm:grid-cols-2">
          {[
            ["On-premises or your cloud", "Inside your estate, behind your identity provider, on your databases. Nothing leaves the perimeter."],
            ["Air-gapped by design", "A supported configuration, not an exception. Install from the same signed artefacts, verified offline."],
            ["Pinned and signed", "Every release ships with pinned dependencies, an SBOM and signed provenance, checked at install."],
            ["Sector-neutral core", "Banking, insurance and telecom rules live in configuration and content packs, never in forks."],
          ].map((f) => (
            <div key={f[0]} className="card rounded-2xl border border-line p-6">
              <h3 className="text-lead font-medium">{f[0]}</h3>
              <p className="mt-2 text-sm text-gray">{f[1]}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------- Modules ---------- */

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
    <section id="modules" className="border-t border-line py-28">
      <Container>
        <Reveal className="max-w-[56rem]">
          <Tag>Modules</Tag>
          <h2 className="mt-5 text-h2 font-medium">
            Enterprise modules on the same train. <span className="text-gray">Deploy into your estate with gates and approval chains already wired. Two in preview with design partners, four on the current train.</span>
          </h2>
          <a href="mailto:hello@qorpe.com?subject=Modules" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 hover:text-ink">Ask for a walkthrough <Arrow /></a>
        </Reveal>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m, i) => (
            <Reveal as="li" key={m.name} delay={(i % 3) as 0 | 1 | 2} className="card rounded-2xl border border-line p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lead font-medium">{m.name}</h3>
                <span className={`text-xs font-medium ${m.status === "Available" ? "text-ok" : "text-[#3b5bdb]"}`}>{m.status}</span>
              </div>
              <p className="mt-3 text-sm text-gray">{m.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------- Services ---------- */

const SERVICES = [
  { name: "Discovery", text: "Four to twelve weeks. We map the systems, rules and approvals you have, and end with a written plan you can act on without us." },
  { name: "Pilot", text: "One domain, delivered through the platform, with its gates and approvals in place. The outcome is a running system and a record." },
  { name: "Adoption", text: "Your team runs the platform; we stay until they no longer need us. Training, playbooks and the first audit cycle included." },
];

export function Services() {
  return (
    <section id="services" className="border-t border-line bg-band py-28">
      <Container>
        <Reveal className="max-w-[56rem]">
          <Tag>Services</Tag>
          <h2 className="mt-5 text-h2 font-medium">
            We put it in with you. <span className="text-gray">A small practice that takes on a few engagements a year. Every one ends in something your team keeps.</span>
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-4 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i as 0 | 1 | 2} className="card rounded-2xl border border-line bg-white p-6">
              <div className="font-mono text-xs text-gray-2">0{i + 1}</div>
              <h3 className="mt-6 text-lead font-medium">{s.name}</h3>
              <p className="mt-2 text-sm text-gray">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ---------- Changelog + newsletter ---------- */

const CHANGELOG = [
  { date: "September 7, 2026", title: "Train 0.1.0-preview.8", text: "Goldpath 0.1.0-preview.8 is on nuget.org with the campaign revision R2: asynchronous targets, shared ceilings, keyset takeover." },
  { date: "September 3, 2026", title: "File rails land", text: "File Exchange becomes the console's seventh module: governed batch and partner transfers with their own gates." },
  { date: "September 1, 2026", title: "The platform train", text: "Goldpath.Sdk, the adopter CLI verbs, Approvals and File Exchange on nuget for the first time, SBOM and provenance on every train." },
  { date: "August 27, 2026", title: "Mockifyr 1.19.1", text: "The mock system behind every sandbox we ship, released as a single container image." },
];

export function Changelog() {
  return (
    <section id="changelog" className="border-t border-line py-28">
      <Container>
        <Reveal className="max-w-[56rem]">
          <h2 className="text-h2 font-medium">
            Better as you grow. <span className="text-gray">A new train every few weeks, with the notes an auditor would want to read.</span>
          </h2>
          <a href="https://github.com/qorpe/goldpath/releases" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 hover:text-ink">View all <Arrow /></a>
        </Reveal>
        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {CHANGELOG.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 3) as 0 | 1 | 2}>
              <div className="text-xs font-medium text-gray">{c.date}</div>
              <h3 className="mt-3 text-lead font-medium">{c.title}</h3>
              <p className="mt-2 text-sm text-gray">{c.text}</p>
            </Reveal>
          ))}
        </ul>
        <div className="mt-20 flex flex-col gap-6 border-t border-line pt-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-h3 font-medium">Stay ahead of the audit.</h3>
            <p className="text-h3 font-medium text-gray">Train notes in your inbox.</p>
          </div>
          <Newsletter />
        </div>
      </Container>
    </section>
  );
}

/* ---------- CTA band ---------- */

export function CtaBand() {
  return (
    <section className="dark-zone ruled relative overflow-hidden bg-dark text-dark-ink">
      <svg className="ring-a pointer-events-none absolute -left-[8%] top-[-60%] h-[220%] w-auto" viewBox="0 0 600 600" fill="none" aria-hidden="true">
        {[90, 150, 210, 270].map((r) => <circle key={r} cx="300" cy="300" r={r} stroke="rgba(255,255,255,0.07)" />)}
      </svg>
      <svg className="ring-b pointer-events-none absolute -right-[10%] top-[-80%] h-[260%] w-auto" viewBox="0 0 600 600" fill="none" aria-hidden="true">
        {[120, 190, 260].map((r) => <circle key={r} cx="300" cy="300" r={r} stroke="rgba(255,255,255,0.06)" />)}
        <path d="M300 300 L470 470" stroke="rgba(255,255,255,0.09)" />
      </svg>
      <Container className="relative flex min-h-[417px] flex-col items-center justify-center text-center">
        <h2 className="text-cta font-medium">
          Governed delivery
          <br />
          runs on Qorpe.
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <a href="mailto:hello@qorpe.com" className="btn btn-secondary">Talk to us</a>
          <a href="mailto:hello@qorpe.com?subject=Demo%20request" className="btn btn-primary">Request a demo</a>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Footer ---------- */

const FOOTER: { heading: string; items: { label: string; href: string; ext?: boolean; tag?: string }[] }[] = [
  { heading: "Platform", items: [{ label: "Specify", href: "#specify" }, { label: "Verify", href: "#verify" }, { label: "Approve", href: "#approve" }, { label: "Release", href: "#release" }, { label: "AI in delivery", href: "#ai" }, { label: "Deployment", href: "#scale" }] },
  { heading: "Modules", items: [{ label: "API Portal", href: "#modules", tag: "Preview" }, { label: "Coexist", href: "#modules", tag: "Preview" }, { label: "Approvals", href: "#modules" }, { label: "File Exchange", href: "#modules" }, { label: "Idempotency", href: "#modules" }, { label: "Messaging", href: "#modules" }] },
  { heading: "Services", items: [{ label: "Discovery", href: "#services" }, { label: "Pilot", href: "#services" }, { label: "Adoption", href: "#services" }, { label: "Sectors", href: "#sectors" }] },
  { heading: "Open foundations", items: [{ label: "Goldpath", href: "https://github.com/qorpe/goldpath", ext: true }, { label: "specdrift", href: "https://specdrift.qorpe.com", ext: true }, { label: "Mockifyr", href: "https://mockifyr.qorpe.com", ext: true }, { label: "Mediant", href: "https://mediant.qorpe.com", ext: true }, { label: "GitHub", href: "https://github.com/qorpe", ext: true }] },
  { heading: "Company", items: [{ label: "Changelog", href: "#changelog" }, { label: "Talk to us", href: "mailto:hello@qorpe.com" }, { label: "Request a demo", href: "mailto:hello@qorpe.com?subject=Demo%20request" }, { label: "hello@qorpe.com", href: "mailto:hello@qorpe.com" }] },
];

export function Footer() {
  return (
    <footer className="dark-zone bg-dark text-dark-ink">
      <Container className="grid gap-12 py-20 lg:grid-cols-[1fr_3fr]">
        <div className="flex items-start gap-2.5">
          <span className="mark h-6 w-6" aria-hidden="true" />
          <span className="text-[18px] font-semibold tracking-[-0.02em]">qorpe</span>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {FOOTER.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-medium text-dark-gray">{col.heading}</h3>
              <ul className="mt-4 space-y-1">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href} className="inline-flex items-center gap-1.5 rounded-lg py-1 text-sm text-dark-ink/80 transition-colors duration-200 hover:text-dark-ink">
                      {it.label}
                      {it.ext ? <span className="text-dark-gray" aria-hidden="true">↗</span> : null}
                      {it.tag ? <span className="rounded-md bg-[#0f1d3d] px-1.5 text-[10px] font-medium text-[#c3d4f7]">{it.tag}</span> : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-dark-line py-6 text-xs text-dark-gray sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Qorpe. All rights reserved.</span>
        <span>Screens and data on this page are illustrative. Control Room is in private preview.</span>
      </Container>
    </footer>
  );
}
