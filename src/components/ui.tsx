export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Dot({ tone }: { tone: "ok" | "warn" | "idle" }) {
  const cls = { ok: "bg-ok", warn: "bg-warn", idle: "bg-gray-2" }[tone];
  return <span className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${cls}`} aria-hidden="true" />;
}

/** The reference's section head: a two-line heading left, a paragraph and a link right. */
export function SectionHead({ id, title, text, more }: { id?: string; title: React.ReactNode; text: string; more?: { label: string; href: string } }) {
  return (
    <div id={id} className="grid scroll-mt-24 gap-6 lg:grid-cols-2 lg:gap-16">
      <h2 className="text-h2 font-medium">{title}</h2>
      <div className="max-w-[34rem] lg:pt-1">
        <p className="text-md text-ink-2">{text}</p>
        {more ? (
          <a href={more.href} className="mt-5 inline-flex items-center gap-1.5 text-sm text-gray hover:text-ink">
            {more.label} <Arrow />
          </a>
        ) : null}
      </div>
    </div>
  );
}

/** The "Features" row that follows a visual: a label left, link lists right. */
export function FeatureRow({ groups }: { groups: string[][] }) {
  return (
    <div className="mt-10 grid gap-6 border-t border-edge pt-8 lg:grid-cols-[1fr_1fr_1fr]">
      <div className="text-sm text-gray">Features</div>
      {groups.map((g, i) => (
        <ul key={i} className="space-y-2 lg:border-l lg:border-edge lg:pl-8">
          {g.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-ink-2">
              {f}
              <span className="text-gray-2" aria-hidden="true">+</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
