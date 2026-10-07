"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "./container";

const NAV = [
  { href: "#platform", label: "Platform" },
  { href: "#modules", label: "Modules" },
  { href: "#deploy", label: "Deployment" },
  { href: "#services", label: "Services" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-app/80 backdrop-blur-md transition-[border-color] ${
        scrolled ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Qorpe home">
          <span className="mark h-7 w-7" aria-hidden="true" />
          <span className="text-[17px] font-semibold tracking-[-0.02em]">qorpe</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-ui text-muted-foreground transition-colors hover:bg-raised hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href="mailto:hello@qorpe.com?subject=Demo%20request"
            className="ml-3 rounded-md bg-primary px-3.5 py-1.5 text-ui font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Request a demo
          </a>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-muted-foreground hover:bg-raised hover:text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      {open ? (
        <nav id="mobile-nav" className="border-t border-line md:hidden" aria-label="Primary">
          <Container className="flex flex-col py-2">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-body text-foreground hover:bg-raised"
              >
                {item.label}
              </a>
            ))}
            <a
              href="mailto:hello@qorpe.com?subject=Demo%20request"
              className="mt-2 mb-2 rounded-md bg-primary px-3.5 py-2.5 text-center text-body font-medium text-primary-foreground"
            >
              Request a demo
            </a>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
