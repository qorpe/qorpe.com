import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { GateStack } from "@/components/gate-stack";

const STEPS = [
  {
    name: "Specify",
    text: "Requirements, rules and contracts land in a manifest and in specs. Nothing stays implied, and a disabled module does not exist in the build.",
  },
  {
    name: "Generate",
    text: "A deterministic engine turns the spec into code, migrations and tests. It never calls a model, so the same input gives the same output.",
  },
  {
    name: "Verify",
    text: "Every standard ships with its verifier. A failing gate blocks the merge, and a suppression without a written reason is itself a failure.",
  },
  {
    name: "Approve",
    text: "Maker-checker chains with configurable stages, quorums and distinct eyes. Each decision leaves an entry with who, what and on which revision.",
  },
  {
    name: "Release",
    text: "Pinned dependencies, an SBOM and signed provenance on every train. Air-gapped networks are a first-class target, not an afterthought.",
  },
];

const PRODUCTS = [
  {
    name: "Goldpath",
    text: "The golden path itself: a manifest-driven .NET accelerator with compile-time module composition, AI skills and guardrails.",
    status: "Open source",
    href: "https://github.com/qorpe/goldpath",
    link: "github.com/qorpe/goldpath",
  },
  {
    name: "specdrift",
    text: "Deterministic spec lint for manifest-driven golden paths. Validates invariants, detects drift between artifacts, speaks MCP.",
    status: "Open source",
    href: "https://specdrift.qorpe.com",
    link: "specdrift.qorpe.com",
  },
  {
    name: "Mockifyr",
    text: "A self-hosted, multi-protocol mock and integration sandbox in one container. The mock system behind every sandbox we ship.",
    status: "Open source",
    href: "https://mockifyr.qorpe.com",
    link: "mockifyr.qorpe.com",
  },
  {
    name: "Mediant",
    text: "A free CQRS mediator for .NET: Result pattern, pipeline behaviors, native AOT and OpenTelemetry. A drop-in alternative to MediatR.",
    status: "Open source",
    href: "https://mediant.qorpe.com",
    link: "mediant.qorpe.com",
  },
  {
    name: "specanchor",
    text: "Spec-anchored legacy modernization: rule extraction with source references, characterization tests and parity gates. Never touches application code.",
    status: "Open source",
    href: "https://github.com/qorpe/specanchor",
    link: "github.com/qorpe/specanchor",
  },
  {
    name: "API Portal",
    text: "A governed partner portal: catalogue and docs, an instant sandbox per application, and a maker-checker path to production.",
    status: "Private preview",
    href: "mailto:hello@qorpe.com?subject=API%20Portal",
    link: "Ask for a walkthrough",
  },
  {
    name: "Coexist",
    text: "Run the old system and its replacement side by side, prove they agree with independent reconciliation, and retire the source when you choose.",
    status: "Private preview",
    href: "mailto:hello@qorpe.com?subject=Coexist",
    link: "Ask for a walkthrough",
  },
];

const SECTORS = [
  {
    name: "Banking",
    text: "Core replacement, factoring, limits and collateral, regulatory reporting. The places where a wrong rule is a finding, not a bug.",
  },
  {
    name: "Insurance",
    text: "Policy, claims and the audit trail behind both. Products that change every quarter on a core that cannot.",
  },
  {
    name: "Telecom",
    text: "Order management, product catalogues and partner APIs at a scale where every exception becomes a process.",
  },
];

function StatusDot({ status }: { status: string }) {
  const open = status === "Open source";
  return (
    <span className="inline-flex items-center gap-2 text-ui text-muted-foreground">
      <span
        className={`h-1.5 w-1.5 rounded-full ${open ? "bg-ok" : "bg-accent"}`}
        aria-hidden="true"
      />
      {status}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section data-parallax-host className="pt-14 pb-16 sm:pt-20 sm:pb-24">
          <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
            <div className="max-w-[34rem]">
              <h1 className="text-display font-semibold text-foreground">
                Regulated software, delivered with a trail you can audit.
              </h1>
              <p className="mt-6 max-w-[30rem] text-lead text-muted-foreground">
                Qorpe builds a delivery platform for banks, insurers and telecoms.
                The specification is the source of truth, deterministic gates block
                what it forbids, and every decision, human or AI, is recorded where an
                auditor can read it.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:hello@qorpe.com"
                  className="rounded-md bg-primary px-4 py-2.5 text-body font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Talk to us
                </a>
                <a
                  href="https://github.com/qorpe"
                  className="rounded-md border border-border-strong px-4 py-2.5 text-body font-medium text-foreground transition-colors hover:bg-muted"
                >
                  See the code on GitHub
                </a>
              </div>
              <p className="mt-6 text-ui text-faint">
                Open-source core. Product modules in private preview. A small advisory practice.
              </p>
            </div>
            <GateStack />
          </Container>
        </section>

        {/* The cycle */}
        <section id="platform" className="border-t border-border py-16 sm:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
              <div>
                <h2 className="text-h2 font-semibold">What a change goes through</h2>
                <p className="mt-4 text-body text-muted-foreground">
                  Five gates, in this order, every time. The order is the product:
                  a step cannot be skipped, and each one writes its own line into the record.
                </p>
              </div>
              <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-1">
                {STEPS.map((s, i) => (
                  <li key={s.name} className="grid gap-2 bg-background p-5 sm:grid-cols-[48px_160px_1fr] sm:gap-4 sm:p-6">
                    <span className="font-mono text-ui text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-body font-semibold">{s.name}</h3>
                    <p className="text-body text-muted-foreground">{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        {/* Where AI fits */}
        <section className="border-t border-border py-16 sm:py-24">
          <Container className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
            <h2 className="text-h2 font-semibold">AI works inside the gates, not around them</h2>
            <div className="max-w-[40rem] space-y-5 text-lead text-muted-foreground">
              <p>
                Assistants and coding agents drive the cycle through skills, and they call the
                same verifiers a person would, over MCP. The engine&rsquo;s output is reproducible;
                the model&rsquo;s contribution is reviewed and recorded exactly like a human&rsquo;s.
              </p>
              <p>
                That is what makes AI usable in a regulated room: not a faster model, but a
                record that shows which spec a change came from, which gate it cleared, and who
                said yes. A gateway module that puts the same policy and trail in front of model
                calls at runtime is on the roadmap.
              </p>
            </div>
          </Container>
        </section>

        {/* Products ledger */}
        <section id="products" className="border-t border-border py-16 sm:py-24">
          <Container>
            <div className="max-w-[40rem]">
              <h2 className="text-h2 font-semibold">Products</h2>
              <p className="mt-4 text-body text-muted-foreground">
                One platform train; everything below binds the published packages the way an
                adopter does. The open-source line is on NuGet, npm and GitHub today.
              </p>
            </div>
            <ul className="mt-10 border-t border-border">
              {PRODUCTS.map((p) => (
                <li
                  key={p.name}
                  className="grid gap-2 border-b border-border py-5 sm:grid-cols-[160px_1fr_150px] sm:gap-6 sm:py-6"
                >
                  <div>
                    <h3 className="text-body font-semibold">{p.name}</h3>
                    <div className="mt-1 sm:hidden">
                      <StatusDot status={p.status} />
                    </div>
                  </div>
                  <p className="max-w-[44rem] text-body text-muted-foreground">{p.text}</p>
                  <div className="flex flex-col gap-1.5 sm:items-end sm:text-right">
                    <span className="hidden sm:block">
                      <StatusDot status={p.status} />
                    </span>
                    <a
                      href={p.href}
                      className="text-ui text-accent underline-offset-4 hover:underline"
                    >
                      {p.link}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Sectors */}
        <section id="sectors" className="border-t border-border py-16 sm:py-24">
          <Container className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
            <div>
              <h2 className="text-h2 font-semibold">Built for the rooms we have worked in</h2>
              <p className="mt-4 text-body text-muted-foreground">
                The platform is sector-neutral by construction. The judgement about what a gate
                must check is not, and it comes from these three.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {SECTORS.map((s) => (
                <div key={s.name} className="border-t border-border-strong pt-4">
                  <h3 className="text-body font-semibold">{s.name}</h3>
                  <p className="mt-2 text-body text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Advisory */}
        <section id="advisory" className="border-t border-border py-16 sm:py-24">
          <Container className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
            <h2 className="text-h2 font-semibold">A small practice, by design</h2>
            <div className="max-w-[40rem] space-y-5 text-lead text-muted-foreground">
              <p>
                We take on a few engagements a year. A discovery that ends in a written plan.
                A pilot that ends in a running system with its gates in place. Or an adoption of
                the platform by your own team, with us leaving when they no longer need us.
              </p>
              <p>
                We say the unflattering half out loud: discovery gets faster with this approach;
                rule validation, cutover and regulatory sign-off do not. The platform exists to
                make those three defensible, not quick.
              </p>
              <p className="text-body">
                <a href="mailto:hello@qorpe.com" className="font-medium text-foreground underline underline-offset-4">
                  hello@qorpe.com
                </a>
              </p>
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="mark h-5 w-5" aria-hidden="true" />
            <span className="text-ui text-muted-foreground">© 2026 Qorpe</span>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-ui text-muted-foreground" aria-label="Footer">
            <a href="https://github.com/qorpe" className="hover:text-foreground">GitHub</a>
            <a href="https://mockifyr.qorpe.com" className="hover:text-foreground">Mockifyr docs</a>
            <a href="https://specdrift.qorpe.com" className="hover:text-foreground">specdrift docs</a>
            <a href="https://mediant.qorpe.com" className="hover:text-foreground">Mediant docs</a>
            <a href="mailto:hello@qorpe.com" className="hover:text-foreground">hello@qorpe.com</a>
          </nav>
        </Container>
      </footer>
    </>
  );
}
