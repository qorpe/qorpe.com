import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { ProductWindow } from "@/components/product-window";

const PRODUCT = "Qorpe Control Room";

const CAPABILITIES = [
  {
    name: "Specifications",
    text: "Requirements, rules and contracts are versioned records, not documents. A change starts from a specification revision and stays linked to it.",
  },
  {
    name: "Gates",
    text: "Deterministic checks run on every change: drift against the spec, analyzers, contract tests, security review. A failing gate blocks; a suppression needs a written reason.",
  },
  {
    name: "Approvals",
    text: "Maker-checker chains you configure per change type: stages, quorums, distinct eyes. Each decision records who, what and which revision.",
  },
  {
    name: "AI gateway",
    text: "Assistants and coding agents work through the same gates. Model calls pass a policy point, and every proposal is reviewed and logged like a human contribution.",
  },
];

const MODULES = [
  { name: "API Portal", text: "Partner onboarding with a governed catalogue, instant sandbox and a maker-checker path to production.", status: "Preview" },
  { name: "Coexist", text: "Run a legacy system and its replacement side by side, reconcile independently, retire on evidence.", status: "Preview" },
  { name: "Approvals", text: "The approval engine on its own: chains, stages, quorums and an audit record for any workflow.", status: "Available" },
  { name: "File Exchange", text: "Governed file rails for the batch and partner transfers regulated estates still run on.", status: "Available" },
  { name: "Idempotency", text: "Exactly-once semantics for payment-grade operations, with the evidence a reviewer asks for.", status: "Available" },
  { name: "Messaging", text: "A message bus seam that stays swappable, so the broker is a choice rather than a dependency.", status: "Available" },
];

const DEPLOY = [
  { k: "On-premises or your cloud", v: "Runs inside your estate. Air-gapped networks are a supported configuration, not an exception." },
  { k: "Your identity and your data", v: "Your identity provider, your databases, your key management. Nothing leaves the perimeter." },
  { k: "Pinned and signed", v: "Every release ships with pinned dependencies, an SBOM and signed provenance." },
  { k: "Sector-neutral core", v: "Banking, insurance and telecom rules live in configuration and content packs, not in forks." },
];

const SERVICES = [
  { name: "Discovery", text: "Four to twelve weeks. We map the systems, rules and approvals you have, and end with a written plan you can act on without us." },
  { name: "Pilot", text: "One domain, delivered through the platform, with its gates and approvals in place. The outcome is a running system and a record." },
  { name: "Adoption", text: "Your team runs the platform; we stay until they no longer need us. Training, playbooks and the first audit cycle included." },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-16 pb-10 sm:pt-24 sm:pb-16">
          <Container>
            <div className="max-w-[46rem]">
              <h1 className="text-display font-semibold">
                Run regulated software delivery from one control room.
              </h1>
              <p className="mt-6 max-w-[36rem] text-lead text-muted-foreground">
                {PRODUCT} is an on-premises platform that governs how software changes move
                through a bank, an insurer or a telecom: specifications, gates, approvals and
                AI, with a trail your auditor can read.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:hello@qorpe.com?subject=Demo%20request"
                  className="rounded-md bg-primary px-4 py-2.5 text-body font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Request a demo
                </a>
                <a
                  href="#platform"
                  className="rounded-md px-4 py-2.5 text-body font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  See how it works
                </a>
              </div>
            </div>
          </Container>
          <div className="mt-14 px-4 sm:mt-20 sm:px-8">
            <ProductWindow />
          </div>
        </section>

        {/* Platform */}
        <section id="platform" className="py-16 sm:py-24">
          <Container>
            <div className="max-w-[40rem]">
              <h2 className="text-h2 font-semibold">What the platform governs</h2>
              <p className="mt-4 text-lead text-muted-foreground">
                Four things a regulated organisation has to prove about every change. The
                Control Room keeps them in one place, in one record.
              </p>
            </div>
            <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {CAPABILITIES.map((c) => (
                <div key={c.name}>
                  <h3 className="text-h3 font-semibold">{c.name}</h3>
                  <p className="mt-2 max-w-[30rem] text-body text-muted-foreground">{c.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Modules */}
        <section id="modules" className="py-16 sm:py-24">
          <Container>
            <div className="panel p-6 sm:p-10">
              <div className="max-w-[40rem]">
                <h2 className="text-h2 font-semibold">Qorpe Enterprise Modules</h2>
                <p className="mt-4 text-lead text-muted-foreground">
                  Product modules that deploy into your estate on the same platform. Each one
                  arrives with its gates and its approval chains already wired.
                </p>
              </div>
              <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {MODULES.map((m) => (
                  <li key={m.name}>
                    <div className="flex items-center gap-3">
                      <h3 className="text-body font-semibold">{m.name}</h3>
                      <span
                        className={`text-ui ${m.status === "Available" ? "text-ok" : "text-accent"}`}
                      >
                        {m.status}
                      </span>
                    </div>
                    <p className="mt-1.5 text-body text-muted-foreground">{m.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* Deployment */}
        <section id="deploy" className="py-16 sm:py-24">
          <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <h2 className="text-h2 font-semibold">Built for the room you deploy in</h2>
              <p className="mt-4 text-lead text-muted-foreground">
                Regulated estates do not get to choose their constraints. The platform is
                designed around them.
              </p>
            </div>
            <dl className="grid gap-8 sm:grid-cols-2">
              {DEPLOY.map((d) => (
                <div key={d.k}>
                  <dt className="text-body font-semibold">{d.k}</dt>
                  <dd className="mt-1.5 text-body text-muted-foreground">{d.v}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        {/* Services */}
        <section id="services" className="py-16 sm:py-24">
          <Container>
            <div className="max-w-[40rem]">
              <h2 className="text-h2 font-semibold">We put it in with you</h2>
              <p className="mt-4 text-lead text-muted-foreground">
                A small practice that takes on a few engagements a year. Every one ends in
                something your team keeps.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <div key={s.name} className="panel p-6">
                  <h3 className="text-h3 font-semibold">{s.name}</h3>
                  <p className="mt-2 text-body text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-[40rem] text-body text-muted-foreground">
              We say the unflattering half out loud: discovery gets faster with this approach;
              rule validation, cutover and regulatory sign-off do not. The platform exists to
              make those three defensible, not quick.
            </p>
          </Container>
        </section>

        {/* Open foundations + CTA */}
        <section className="py-16 sm:py-24">
          <Container>
            <div className="panel flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[36rem]">
                <h2 className="text-h2 font-semibold">See it on your own change</h2>
                <p className="mt-3 text-lead text-muted-foreground">
                  Bring one real change request. We will walk it through the Control Room
                  end to end, on a call.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3">
                <a
                  href="mailto:hello@qorpe.com?subject=Demo%20request"
                  className="rounded-md bg-primary px-5 py-3 text-body font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Request a demo
                </a>
                <a href="mailto:hello@qorpe.com" className="text-ui text-muted-foreground hover:text-foreground">
                  hello@qorpe.com
                </a>
              </div>
            </div>
            <p className="mt-8 text-ui text-faint">
              The platform core is built in the open.{" "}
              <a href="https://github.com/qorpe" className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                github.com/qorpe
              </a>
            </p>
          </Container>
        </section>
      </main>

      <footer className="border-t border-line py-10">
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="mark h-5 w-5" aria-hidden="true" />
            <span className="text-ui text-muted-foreground">© 2026 Qorpe</span>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-ui text-muted-foreground" aria-label="Footer">
            <a href="#platform" className="hover:text-foreground">Platform</a>
            <a href="#modules" className="hover:text-foreground">Modules</a>
            <a href="#services" className="hover:text-foreground">Services</a>
            <a href="https://github.com/qorpe" className="hover:text-foreground">GitHub</a>
            <a href="mailto:hello@qorpe.com" className="hover:text-foreground">hello@qorpe.com</a>
          </nav>
        </Container>
      </footer>
    </>
  );
}
