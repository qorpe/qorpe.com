"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Arrow, Container } from "./ui";

type Item = { title: string; desc?: string; href: string };
type Column = { heading: string; items: Item[] };
type Menu = { label: string; columns: Column[]; aside: Column[] };

const MENUS: Menu[] = [
  {
    label: "Platform",
    columns: [
      {
        heading: "Charter",
        items: [
          { title: "Rules and specifications", desc: "Cards with evidence, specs that sign", href: "#specify" },
          { title: "Boards", desc: "Agile with the spec on the card", href: "#plan" },
          { title: "Workspace", desc: "Build with the assistant, inside the gates", href: "#build" },
          { title: "Gates", desc: "Touch, boundary, drift, parity", href: "#verify" },
          { title: "Approvals", desc: "Maker-checker, verdicts, a ledger", href: "#approve" },
          { title: "Releases and trail", desc: "Proof travels with the train", href: "#release" },
        ],
      },
      {
        heading: "Method",
        items: [
          { title: "Three actors", desc: "AI produces, humans decide, the engine verifies", href: "#ai" },
          { title: "Six stages, four gates", desc: "Extracted to re-proven, touch to parity", href: "#verify" },
          { title: "Dual-track sprints", desc: "Discovery one slice ahead", href: "#plan" },
          { title: "Living documents", desc: "The page is the record", href: "#release" },
        ],
      },
      {
        heading: "Deployment",
        items: [
          { title: "On-premises", desc: "Inside your estate, your identity", href: "#scale" },
          { title: "Air-gapped", desc: "A supported configuration", href: "#scale" },
          { title: "Integrations", desc: "Git, Jira, identity, registries", href: "#ready" },
        ],
      },
    ],
    aside: [
      { heading: "Qorpe for", items: [{ title: "Banking", href: "#sectors" }, { title: "Insurance", href: "#sectors" }, { title: "Telecom", href: "#sectors" }] },
      { heading: "Get started", items: [{ title: "Request a demo", href: "mailto:hello@qorpe.com?subject=Demo%20request" }, { title: "Talk to us", href: "mailto:hello@qorpe.com" }] },
    ],
  },
  {
    label: "Modules",
    columns: [
      {
        heading: "Products",
        items: [
          { title: "API Portal", desc: "Governed partner onboarding and sandbox", href: "#modules" },
          { title: "Coexist", desc: "Old and new side by side, reconciled", href: "#modules" },
          { title: "Approvals", desc: "The approval engine for any workflow", href: "#modules" },
          { title: "File Exchange", desc: "Governed batch and partner transfers", href: "#modules" },
        ],
      },
      {
        heading: "The Goldpath train",
        items: [
          { title: "Ring A, the floor", desc: "Service and API defaults, data, messaging", href: "#modules" },
          { title: "Ring B, cross-cutting", desc: "Auth, idempotency, audit trail, tenancy, locking", href: "#modules" },
          { title: "Ring C, heavy duty", desc: "Jobs, bulk, archival, notification, campaign", href: "#modules" },
        ],
      },
    ],
    aside: [
      { heading: "Open foundations", items: [{ title: "Goldpath", href: "https://github.com/qorpe/goldpath" }, { title: "specdrift", href: "https://specdrift.qorpe.com" }, { title: "Mockifyr", href: "https://mockifyr.qorpe.com" }, { title: "Mediant", href: "https://mediant.qorpe.com" }] },
      { heading: "Company", items: [{ title: "Changelog", href: "#changelog" }, { title: "Contact", href: "mailto:hello@qorpe.com" }] },
    ],
  },
];

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Sectors", href: "#sectors" },
  { label: "Method", href: "#ai" },
];

function Chev() {
  return (
    <svg className="menu-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Panel({ menu }: { menu: Menu }) {
  return (
    <div className="menu-panel absolute left-6 top-full mt-2 w-[min(1064px,calc(100vw-48px))] overflow-hidden" role="menu">
      <div className="grid" style={{ gridTemplateColumns: `repeat(${menu.columns.length}, minmax(0, 1fr)) 220px` }}>
        {menu.columns.map((col) => (
          <div key={col.heading} className="p-4">
            <div className="px-2.5 pb-2 text-xs text-gray-2">{col.heading}</div>
            {col.items.map((it) => (
              <a key={it.title} href={it.href} className="menu-item" role="menuitem">
                <div className="text-sm font-medium text-ink">{it.title}</div>
                {it.desc ? <div className="text-xs text-gray">{it.desc}</div> : null}
              </a>
            ))}
          </div>
        ))}
        <div className="bg-band p-4">
          {menu.aside.map((col) => (
            <div key={col.heading} className="mb-3 last:mb-0">
              <div className="px-2.5 pb-1.5 text-xs text-gray-2">{col.heading}</div>
              {col.items.map((it) => (
                <a key={it.title} href={it.href} className="menu-item py-1.5 text-sm text-ink-2 hover:bg-[#ededef]" role="menuitem">
                  {it.title}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Announcement() {
  const [gone, setGone] = useState(false);
  if (gone) return null;
  return (
    <div className="relative bg-dark text-dark-ink">
      <a href="mailto:hello@qorpe.com?subject=Charter%20preview" className="mx-auto flex h-12 max-w-[1168px] items-center justify-center gap-1.5 px-6 text-sm font-medium">
        <span className="hidden sm:inline">Charter is in private preview. Request access</span><span className="sm:hidden">Charter: private preview</span> <Arrow />
      </a>
      <button type="button" aria-label="Dismiss banner" onClick={() => setGone(true)} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-dark-gray hover:text-dark-ink">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [section, setSection] = useState<string | null>("Platform");
  const timer = useRef<number | null>(null);

  const show = (label: string) => { if (timer.current) window.clearTimeout(timer.current); setOpen(label); };
  const hide = () => { if (timer.current) window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(null), 120); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setMobile(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobile]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md">
      <Container className="relative flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Qorpe home">
          <span className="mark h-7 w-7 text-ink" aria-hidden="true" />
          <span className="text-[18px] font-semibold tracking-[-0.02em]">Qorpe</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {MENUS.map((m) => (
            <div
              key={m.label}
              className={`${open === m.label ? "menu-open" : ""}`}
              onMouseEnter={() => show(m.label)}
              onMouseLeave={hide}
              onFocus={() => show(m.label)}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) hide(); }}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[15px] font-medium text-ink-2 transition-colors duration-200 hover:bg-chip ${open === m.label ? "bg-chip" : ""}`}
                aria-haspopup="menu"
                aria-expanded={open === m.label}
                onClick={() => setOpen(open === m.label ? null : m.label)}
              >
                {m.label}
                <Chev />
              </button>
              <Panel menu={m} />
            </div>
          ))}
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="rounded-lg px-3 py-1.5 text-[15px] font-medium text-ink-2 transition-colors duration-200 hover:bg-chip">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a href="mailto:hello@qorpe.com" className="btn btn-secondary">Talk to us</a>
          <a href="mailto:hello@qorpe.com?subject=Demo%20request" className="btn btn-primary">Request a demo</a>
        </div>

        <button type="button" className="rounded-lg p-2 text-ink-2 hover:bg-chip md:hidden" aria-expanded={mobile} aria-controls="mobile-nav" aria-label={mobile ? "Close menu" : "Open menu"} onClick={() => setMobile((v) => !v)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {mobile ? <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /> : <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />}
          </svg>
        </button>
      </Container>

      {mobile ? (
        <nav id="mobile-nav" className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-line bg-white md:hidden" aria-label="Primary">
          <Container className="py-3">
            {MENUS.map((m) => (
              <div key={m.label} className="border-b border-line">
                <button type="button" className="flex w-full items-center justify-between py-3.5 text-[16px] font-medium" aria-expanded={section === m.label} onClick={() => setSection(section === m.label ? null : m.label)}>
                  {m.label}
                  <span className={section === m.label ? "menu-open" : ""}><Chev /></span>
                </button>
                {section === m.label ? (
                  <div className="grid gap-5 pb-4 sm:grid-cols-2">
                    {[...m.columns, ...m.aside].map((col) => (
                      <div key={col.heading}>
                        <div className="pb-1.5 text-xs text-gray-2">{col.heading}</div>
                        {col.items.map((it) => (
                          <a key={it.title} href={it.href} onClick={() => setMobile(false)} className="block py-1.5 text-[15px] text-ink-2">{it.title}</a>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobile(false)} className="block border-b border-line py-3.5 text-[16px] font-medium">{l.label}</a>
            ))}
            <div className="flex flex-col gap-2 pt-5">
              <a href="mailto:hello@qorpe.com?subject=Demo%20request" className="btn btn-primary btn-lg">Request a demo</a>
              <a href="mailto:hello@qorpe.com" className="btn btn-secondary btn-lg">Talk to us</a>
            </div>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
