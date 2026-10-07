"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Arrow, Container } from "./ui";

type Item = { title: string; desc?: string; href: string };
type Column = { heading?: string; items: Item[] };
type Menu = { label: string; columns: Column[]; aside: Item[]; strip: { tag: string; text: string; href: string } };

const MENUS: Menu[] = [
  {
    label: "Platform",
    columns: [
      {
        items: [
          { title: "Specifications", desc: "Versioned rules and contracts every change starts from", href: "#specify" },
          { title: "Gates", desc: "Deterministic checks that block, not warn", href: "#verify" },
        ],
      },
      {
        items: [
          { title: "Approvals", desc: "Maker-checker chains, recorded per revision", href: "#verify" },
          { title: "Release", desc: "Pinned, signed, with an SBOM on every train", href: "#release" },
        ],
      },
    ],
    aside: [
      { title: "AI in delivery", href: "#ai" },
      { title: "Deployment", href: "#deploy" },
      { title: "Sectors", href: "#deploy" },
      { title: "Request a demo", href: "mailto:hello@qorpe.com?subject=Demo%20request" },
    ],
    strip: { tag: "Preview", text: "Control Room 0.1 is in private preview", href: "mailto:hello@qorpe.com?subject=Control%20Room%20preview" },
  },
  {
    label: "Modules",
    columns: [
      {
        items: [
          { title: "API Portal", desc: "Governed partner onboarding with an instant sandbox", href: "#modules" },
          { title: "Coexist", desc: "Old and new side by side, reconciled independently", href: "#modules" },
        ],
      },
      {
        items: [
          { title: "Approvals", desc: "The approval engine for any workflow", href: "#modules" },
          { title: "File Exchange", desc: "Governed batch and partner transfers", href: "#modules" },
        ],
      },
    ],
    aside: [
      { title: "Idempotency", href: "#modules" },
      { title: "Messaging", href: "#modules" },
      { title: "Open foundations", href: "https://github.com/qorpe" },
    ],
    strip: { tag: "New", text: "File Exchange is available on the current train", href: "#modules" },
  },
];

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Contact", href: "mailto:hello@qorpe.com" },
];

function Chevron() {
  return (
    <svg className="menu-chevron" width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuPanel({ menu }: { menu: Menu }) {
  return (
    <div className="menu-panel absolute left-0 top-full mt-3 w-[min(940px,calc(100vw-48px))] overflow-hidden" role="menu">
      <div className="grid grid-cols-[1fr_1fr_220px]">
        {menu.columns.map((col, i) => (
          <div key={i} className="border-r border-edge p-3">
            {col.items.map((it) => (
              <a key={it.title} href={it.href} className="menu-item" role="menuitem">
                <div className="text-sm font-medium text-ink">{it.title}</div>
                {it.desc ? <div className="mt-0.5 text-xs leading-5 text-gray">{it.desc}</div> : null}
              </a>
            ))}
          </div>
        ))}
        <div className="p-3">
          {menu.aside.map((it) => (
            <a key={it.title} href={it.href} className="menu-item py-2 text-sm text-ink-2" role="menuitem">
              {it.title}
            </a>
          ))}
        </div>
      </div>
      <a href={menu.strip.href} className="flex items-center justify-between border-t border-edge bg-frame px-5 py-3 text-sm hover:bg-frame-2">
        <span className="flex items-center gap-2.5">
          <span className="font-medium text-ink">{menu.strip.tag}</span>
          <span className="text-gray">{menu.strip.text}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-gray">Learn more <Arrow /></span>
      </a>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [section, setSection] = useState<string | null>("Platform");
  const timer = useRef<number | null>(null);

  const show = (label: string) => {
    if (timer.current) window.clearTimeout(timer.current);
    setOpen(label);
  };
  const hide = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(null), 120);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-ground/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Qorpe home">
          <span className="mark h-6 w-6 text-ink" aria-hidden="true" />
          <span className="text-[17px] font-semibold tracking-[-0.02em]">qorpe</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {MENUS.map((m) => (
            <div
              key={m.label}
              className={`relative ${open === m.label ? "menu-open" : ""}`}
              onMouseEnter={() => show(m.label)}
              onMouseLeave={hide}
              onFocus={() => show(m.label)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) hide();
              }}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${open === m.label ? "bg-white/[0.06] text-ink" : "text-gray hover:text-ink"}`}
                aria-haspopup="menu"
                aria-expanded={open === m.label}
                onClick={() => setOpen(open === m.label ? null : m.label)}
              >
                {m.label}
                <Chevron />
              </button>
              <MenuPanel menu={m} />
            </div>
          ))}
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="rounded-md px-3 py-1.5 text-sm font-medium text-gray transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="mailto:hello@qorpe.com" className="text-sm font-medium text-gray hover:text-ink">Talk to us</a>
          <a href="mailto:hello@qorpe.com?subject=Demo%20request" className="btn btn-primary">Request a demo</a>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-gray hover:text-ink md:hidden"
          aria-expanded={mobile}
          aria-controls="mobile-nav"
          aria-label={mobile ? "Close menu" : "Open menu"}
          onClick={() => setMobile((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {mobile ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      {mobile ? (
        <nav id="mobile-nav" className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-edge bg-ground md:hidden" aria-label="Primary">
          <Container className="py-2">
            {MENUS.map((m) => (
              <div key={m.label} className="border-b border-edge">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-4 text-[16px] font-medium"
                  aria-expanded={section === m.label}
                  onClick={() => setSection(section === m.label ? null : m.label)}
                >
                  {m.label}
                  <span className={section === m.label ? "menu-open" : ""}><Chevron /></span>
                </button>
                {section === m.label ? (
                  <div className="grid gap-1 pb-4">
                    {[...m.columns.flatMap((c) => c.items), ...m.aside].map((it) => (
                      <a key={it.title} href={it.href} onClick={() => setMobile(false)} className="py-1.5 text-[15px] text-ink-2">
                        {it.title}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobile(false)} className="block border-b border-edge py-4 text-[16px] font-medium">
                {l.label}
              </a>
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
