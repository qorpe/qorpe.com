import { Arrow, Chevron, Container, Icon, Reveal, Tag } from "./ui";
import { PRODUCT } from "./product";
import { IntegrationsVisual, LineChart, ProductWindow } from "./visuals";
import { Newsletter } from "./newsletter";

/* ---------- Hero ---------- */

export function Hero() {
  return (
    <section className="pt-20 pb-16 sm:pt-28">
      <Container>
        <div className="mx-auto max-w-[68rem] text-center">
          <Reveal>
            <a href="#platform" className="inline-flex h-[30px] items-center gap-1.5 rounded-[9px] border border-line-3 px-3 text-base font-medium text-ink hover:bg-chip">
              {PRODUCT} 0.1, private preview <Chevron />
            </a>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="mt-7 text-h1 font-semibold">Welcome to governed delivery.</h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto mt-6 max-w-[34rem] text-base font-medium text-gray">
              Qorpe {PRODUCT} is the workspace where rules, specifications, approvals and AI-assisted development live together, on your premises, with a trail your auditor can read.
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

/* ---------- What Qorpe is, in three parts ---------- */

const TRIAD = [
  { icon: "spec", kicker: "The product", name: `Qorpe ${PRODUCT}`, text: "The on-premises workspace where rules, specifications, approvals and AI-assisted development live together, with one trail.", href: "#platform" },
  { icon: "box", kicker: "The foundation", name: "The Goldpath train", text: "The open-source platform and the enterprise modules it carries. Charter runs on it; so do the products you deploy.", href: "#modules" },
  { icon: "users", kicker: "The practice", name: "A small team that puts it in", text: "Discovery, pilot and adoption for banks, insurers and telecoms. Every engagement ends in something your team keeps.", href: "#services" },
];

export function Strip() {
  return (
    <section className="bg-band">
      <Container className="py-10">
        <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          {TRIAD.map((t) => (
            <li key={t.name} className="bg-band">
              <a href={t.href} className="flex h-full flex-col gap-3 p-6 transition-colors duration-300 hover:bg-white">
                <span className="flex items-center gap-2 text-xs text-gray"><Icon name={t.icon} size={14} />{t.kicker}</span>
                <span className="text-lead font-medium">{t.name}</span>
                <span className="text-sm text-gray">{t.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------- Ready: integrations ---------- */

export function Ready() {
  return (
    <section id="ready" className="bg-band pb-28">
      <Container>
        <Reveal className="mx-auto max-w-[44rem] text-center">
          <Tag>Ready from day one</Tag>
          <h2 className="mt-5 text-h2 font-medium">
            Live from your first change. <span className="text-gray">Connect the repository, the tracker and the identity provider. {PRODUCT} reads the manifest, discovers the modules and imports the approval chains before the first review.</span>
          </h2>
          <a href="mailto:hello@qorpe.com?subject=Demo%20request" className="btn btn-primary mt-7">Request a demo</a>
        </Reveal>
        <Reveal className="mt-14"><IntegrationsVisual /></Reveal>
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
            “A rule without a source never enters the catalog. A spec with open questions never enters a sprint. A gate is never silenced quietly.”
          </blockquote>
          <p className="mt-6 flex items-center justify-center gap-2 text-sm font-medium"><span className="mark h-4 w-4 text-ink" aria-hidden="true" />The three rules</p>
          <p className="text-xs text-gray">Qorpe method</p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------- Scale ---------- */

const FACTS = [
  { big: "13", small: "architecture decisions, the constitution" },
  { big: "6", small: "golden manifests green on every merge" },
  { big: "100%", small: "of dependencies pinned, no floating versions" },
  { big: "0", small: "model calls inside the deterministic engine" },
];

const DEPLOY = [
  { icon: "cloud", title: "On-premises or your cloud", text: "Inside your estate, behind your identity provider, on your databases. Nothing leaves the perimeter.", rows: ["Entra ID, Keycloak, Okta", "PostgreSQL, SQL Server", "Kubernetes or VMs"] },
  { icon: "lock", title: "Air-gapped by design", text: "A supported configuration, not an exception. Install from the same signed artefacts, verified offline.", rows: ["Offline package mirror", "Signature check at install", "No outbound calls"] },
  { icon: "box", title: "Pinned and signed", text: "Every release ships with pinned dependencies, an SBOM and signed provenance, checked at install.", rows: ["CycloneDX SBOM", "Sigstore provenance", "Reproducible trains"] },
  { icon: "users", title: "Sector-neutral core", text: "Banking, insurance and telecom rules live in configuration and content packs, never in forks.", rows: ["Sector packs", "Approval chain templates", "Spec shapes per domain"] },
];

export function Scale() {
  return (
    <section id="scale" className="border-t border-line py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <Reveal>
          <h2 className="text-h2 font-medium">
            Run inside your perimeter. <span className="text-gray">Production-grade for your estate and your agents.</span>
          </h2>
          <div className="mt-10 rounded-xl border border-line p-4">
            <div className="flex items-center justify-between text-xs text-gray"><span>Gates run per week</span><span>since the first train</span></div>
            <div className="mt-2"><LineChart /></div>
            <div className="mt-2 flex justify-between text-xs text-gray-2"><span>Jul 2026</span><span>Oct 2026</span></div>
          </div>
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
          {DEPLOY.map((f) => (
            <div key={f.title} className="card flex flex-col rounded-2xl border border-line p-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-band text-ink"><Icon name={f.icon} size={18} /></span>
              <h3 className="mt-4 text-lead font-medium">{f.title}</h3>
              <p className="mt-2 text-sm text-gray">{f.text}</p>
              <ul className="mt-auto space-y-1.5 pt-5 text-sm text-ink-2">
                {f.rows.map((r) => <li key={r} className="flex items-center gap-2"><Icon name="check" size={14} className="text-ok" />{r}</li>)}
              </ul>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------- Modules: the train, ring by ring ---------- */

const PRODUCTS = [
  { icon: "plug", name: "API Portal", status: "Preview", text: "Partner onboarding with a governed catalogue, an instant sandbox per application and a maker-checker path to production." },
  { icon: "flow", name: "Coexist", status: "Preview", text: "Run a legacy system and its replacement side by side, reconcile independently of the pipeline, retire the source on evidence." },
  { icon: "approve", name: "Approvals", status: "Available", text: "The approval engine on its own: chains, stages, quorums and an audit record for any workflow in your estate." },
  { icon: "doc", name: "File Exchange", status: "Available", text: "Governed file rails for the batch and partner transfers regulated estates still run on." },
];



const LAYERS: { name: string; kicker: string; items: string[]; dark?: boolean }[] = [
  { name: "Products", kicker: "Built on the train, bind the published packages", items: ["API Portal", "Coexist", "Approvals", "File Exchange"] },
  { name: "Ring C", kicker: "Heavy-duty modules and ops", items: ["Jobs", "Bulk", "Archival", "Notification", "Campaign", "Console"] },
  { name: "Ring B", kicker: "Cross-cutting capabilities", items: ["Auth", "Idempotency", "AuditTrail", "MultiTenancy", "SoftDelete", "Locking", "Caching", "DataProtection"] },
  { name: "Ring A", kicker: "The floor, always on", items: ["ServiceDefaults", "ApiDefaults", "Data with outbox", "Messaging seam", "Abstractions"] },
  { name: "Substrate", kicker: "The vendor platform, taken as-is. Configured, never wrapped.", items: ["Runtime", "Orchestration", "Data access", "Messaging", "Scheduling", "Telemetry"], dark: true },
];

export function Modules() {
  return (
    <section id="modules" className="border-t border-line py-28">
      <Container>
        <Reveal className="max-w-[68rem]">
          <Tag>Modules</Tag>
          <h2 className="mt-5 text-h2 font-medium">
            One train, three rings, and the products on top. <span className="text-gray">Each layer stands on the one below it. A disabled module does not exist in the application; composition is compile-time.</span>
          </h2>
          <a href="mailto:hello@qorpe.com?subject=Modules" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 hover:text-ink">Ask for a walkthrough <Arrow /></a>
        </Reveal>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((m, i) => (
            <Reveal as="li" key={m.name} delay={(i % 3) as 0 | 1 | 2} className="card flex flex-col rounded-2xl border border-line p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-band text-ink"><Icon name={m.icon} size={18} /></span>
                <span className={`text-xs font-medium ${m.status === "Available" ? "text-ok" : "text-[#3b5bdb]"}`}>{m.status}</span>
              </div>
              <h3 className="mt-4 text-lead font-medium">{m.name}</h3>
              <p className="mt-2 text-sm text-gray">{m.text}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-6 overflow-hidden rounded-2xl border border-line">
          {LAYERS.map((l, i) => (
            <div key={l.name} className={`grid gap-4 border-b border-line last:border-b-0 sm:grid-cols-[220px_1fr] ${l.dark ? "dark-zone bg-dark text-dark-ink" : i === 0 ? "bg-band" : "bg-white"}`}>
              <div className="px-6 pt-5 sm:py-5">
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-xs ${l.dark ? "text-dark-gray" : "text-gray-2"}`}>0{LAYERS.length - i}</span>
                  <h3 className="text-base font-medium">{l.name}</h3>
                </div>
                <p className={`mt-1 text-xs ${l.dark ? "text-dark-gray" : "text-gray"}`}>{l.kicker}</p>
              </div>
              <ul className={`grid grid-cols-2 px-6 pb-5 sm:grid-cols-4 sm:py-5 ${l.dark ? "divide-dark-line" : ""}`}>
                {l.items.map((it) => (
                  <li key={it} className={`flex items-center gap-2 py-1.5 text-sm ${l.dark ? "text-dark-ink/85" : "text-ink-2"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${l.dark ? "bg-dark-gray" : i === 0 ? "bg-[#3b5bdb]" : "bg-line-2"}`} />
                    <span className={l.dark ? "" : "font-mono text-xs"}>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-4 text-sm text-gray">
            <span>Goldpath 0.1.0-preview.8 is published. The console, the CLI and the analyzers ship on the same train.</span>
            <a href="https://github.com/qorpe/goldpath" className="inline-flex items-center gap-1.5 font-medium text-ink-2 hover:text-ink">Goldpath on GitHub <Arrow /></a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------- Services ---------- */

const SERVICES = [
  { icon: "search", name: "Discovery", when: "4 to 12 weeks", text: "We index the legacy, extract the rules with evidence, run the characterization tests and end with a written plan you can act on without us.", rows: ["Module inventory and slice order", "Rule catalogue with open questions", "Boundary candidates and a plan"] },
  { icon: "play", name: "Pilot", when: "One slice, one sprint cadence", text: "One domain, delivered through the platform, with its gates and approvals in place. The outcome is a running system and a record.", rows: ["Signed specs, red-first build", "Parity report at the review", "Approval chains that match policy"] },
  { icon: "users", name: "Adoption", when: "Until your team no longer needs us", text: "Your team runs the platform; we stay until they no longer need us. Training, playbooks and the first audit cycle included.", rows: ["Operating agreement and roles", "Playbooks for the three gates", "First audit cycle, together"] },
];

export function Services() {
  return (
    <section id="services" className="border-t border-line bg-band py-28">
      <Container>
        <Reveal className="max-w-[68rem]">
          <Tag>Services</Tag>
          <h2 className="mt-5 text-h2 font-medium">
            We put it in with you. <span className="text-gray">A small practice that takes on a few engagements a year. Every one ends in something your team keeps.</span>
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-4 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i as 0 | 1 | 2} className="card flex flex-col rounded-2xl border border-line bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-band text-ink"><Icon name={s.icon} size={18} /></span>
                <span className="font-mono text-xs text-gray-2">0{i + 1}</span>
              </div>
              <h3 className="mt-4 text-lead font-medium">{s.name}</h3>
              <p className="text-xs text-gray-2">{s.when}</p>
              <p className="mt-3 text-sm text-gray">{s.text}</p>
              <ul className="mt-auto space-y-1.5 pt-5 text-sm text-ink-2">
                {s.rows.map((r) => <li key={r} className="flex items-center gap-2"><Icon name="check" size={14} className="text-ok" />{r}</li>)}
              </ul>
            </Reveal>
          ))}
        </ol>
        <p className="mt-8 max-w-[44rem] text-sm text-gray">We say the unflattering half out loud: discovery gets faster with this approach; rule validation, cutover and regulatory sign-off do not. The platform exists to make those three defensible, not quick.</p>
      </Container>
    </section>
  );
}

/* ---------- Release notes + train notes ---------- */

const NOTES = [
  { date: "7 Sep 2026", tag: "Train", title: "0.1.0-preview.8", text: "Campaign revision R2: asynchronous targets, shared ceilings, keyset takeover." },
  { date: "3 Sep 2026", tag: "Module", title: "File Exchange", text: "Governed batch and partner transfers, the seventh module on the console." },
  { date: "1 Sep 2026", tag: "Train", title: "The platform train", text: "The SDK, the adopter CLI, Approvals and File Exchange published for the first time; SBOM and provenance on every train." },
  { date: "27 Aug 2026", tag: "Mock", title: "Mockifyr 1.19.1", text: "The mock system behind every sandbox we ship, one container image." },
];

export function Changelog() {
  return (
    <section id="changelog" className="border-t border-line py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <Reveal>
          <Tag>Release notes</Tag>
          <h2 className="mt-5 text-h2 font-medium">
            A new train every few weeks. <span className="text-gray">With the notes an auditor would want to read.</span>
          </h2>
          <a href="https://github.com/qorpe/goldpath/releases" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 hover:text-ink">All releases <Arrow /></a>
          <div className="mt-12 border-t border-line pt-8">
            <h3 className="text-lead font-medium">Train notes in your inbox.</h3>
            <p className="mt-1 text-sm text-gray">One mail per train. No marketing.</p>
            <div className="mt-4"><Newsletter /></div>
          </div>
        </Reveal>
        <Reveal delay={1} className="overflow-hidden rounded-2xl border border-line">
          <ul className="divide-y divide-line">
            {NOTES.map((n) => (
              <li key={n.title} className="grid gap-2 p-5 sm:grid-cols-[110px_1fr] sm:gap-6">
                <div className="text-xs text-gray">{n.date}</div>
                <div>
                  <div className="flex items-center gap-2"><h3 className="text-base font-medium">{n.title}</h3><span className="rounded-md bg-chip px-1.5 text-[11px] font-medium text-gray">{n.tag}</span></div>
                  <p className="mt-1 text-sm text-gray">{n.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------- CTA band ---------- */

export function CtaBand() {
  return (
    <section className="dark-zone bg-dark text-dark-ink">
      <Container className="flex min-h-[417px] flex-col items-center justify-center text-center">
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
  { heading: "Platform", items: [{ label: "Specify", href: "#specify" }, { label: "Plan", href: "#plan" }, { label: "Build", href: "#build" }, { label: "Verify", href: "#verify" }, { label: "Approve", href: "#approve" }, { label: "Release", href: "#release" }, { label: "Integrations", href: "#ready" }] },
  { heading: "Method", items: [{ label: "Three actors", href: "#ai" }, { label: "One trail", href: "#trail" }, { label: "Sectors", href: "#sectors" }, { label: "Deployment", href: "#scale" }] },
  { heading: "Modules", items: [{ label: "API Portal", href: "#modules", tag: "Preview" }, { label: "Coexist", href: "#modules", tag: "Preview" }, { label: "Approvals", href: "#modules" }, { label: "File Exchange", href: "#modules" }, { label: "The Goldpath train", href: "#modules" }] },
  { heading: "Open foundations", items: [{ label: "Goldpath", href: "https://github.com/qorpe/goldpath", ext: true }, { label: "specanchor", href: "https://github.com/qorpe/specanchor", ext: true }, { label: "specdrift", href: "https://specdrift.qorpe.com", ext: true }, { label: "Mockifyr", href: "https://mockifyr.qorpe.com", ext: true }, { label: "Mediant", href: "https://mediant.qorpe.com", ext: true }] },
  { heading: "Company", items: [{ label: "Services", href: "#services" }, { label: "Release notes", href: "#changelog" }, { label: "Talk to us", href: "mailto:hello@qorpe.com" }, { label: "Request a demo", href: "mailto:hello@qorpe.com?subject=Demo%20request" }, { label: "hello@qorpe.com", href: "mailto:hello@qorpe.com" }] },
];

export function Footer() {
  return (
    <footer className="dark-zone bg-dark text-dark-ink">
      <Container className="grid gap-12 py-20 lg:grid-cols-[1fr_3fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="mark h-6 w-6" aria-hidden="true" />
            <span className="text-[18px] font-semibold tracking-[-0.02em]">Qorpe</span>
          </div>
          <p className="mt-4 max-w-[16rem] text-sm text-dark-gray">Governed delivery for regulated industries. On your premises, with a trail your auditor can read.</p>
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
        <span>Screens and data on this page are illustrative. {PRODUCT} is in private preview.</span>
      </Container>
    </footer>
  );
}
