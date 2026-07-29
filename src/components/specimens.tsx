"use client";

import { useId, useRef, useState } from "react";
import { specimens } from "@/lib/content";
import { Arrow } from "./hero";
import { Eyebrow } from "./section";

export function Specimens() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = specimens.items.length - 1;
    let next = active;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="specimens" className="relative scroll-mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] py-[clamp(4.5rem,10vh,8.5rem)]">
        <div className="mb-[clamp(2rem,4vw,3.5rem)]" data-reveal>
          <Eyebrow index={specimens.index}>{specimens.eyebrow}</Eyebrow>
        </div>

        <div className="grid gap-[clamp(1.5rem,4vw,4rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="ms-display text-[clamp(2.2rem,5.6vw,4.6rem)]" data-reveal>
            <span className="block text-bone">{specimens.headline[0]}</span>
            <span className="ms-gold-sweep block">{specimens.headline[1]}</span>
          </h2>
          <p
            className="max-w-[54ch] text-[clamp(1rem,1.35vw,1.1875rem)] leading-[1.65] text-ash"
            data-reveal
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
          >
            {specimens.body}
          </p>
        </div>

        <div
          className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-px border border-[var(--rule)] bg-[var(--rule)] lg:grid-cols-[19rem_minmax(0,1fr)]"
          data-reveal
        >
          <div
            role="tablist"
            aria-label="Case studies"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="ms-scroll-x flex overflow-x-auto bg-ink lg:block lg:overflow-visible"
          >
            {specimens.items.map((spec, i) => {
              const selected = i === active;
              return (
                <button
                  key={spec.ref}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`${baseId}-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${i}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`relative min-w-[15rem] shrink-0 border-b border-r border-[var(--rule)] px-6 py-6 text-left transition-colors duration-500 last:border-r-0 lg:w-full lg:min-w-0 lg:border-r-0 lg:last:border-b-0 ${
                    selected ? "bg-[rgba(26,21,15,0.95)]" : "hover:bg-[rgba(18,15,12,0.8)]"
                  }`}
                >
                  <span
                    className={`absolute inset-y-0 left-0 w-[2px] transition-colors duration-500 ${
                      selected ? "bg-gold-300" : "bg-transparent"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="ms-mono block text-gold-400">{spec.ref}</span>
                  <span
                    className={`ms-display-soft mt-3 block text-[1.25rem] transition-colors duration-500 ${
                      selected ? "text-bone" : "text-ash"
                    }`}
                  >
                    {spec.handle}
                  </span>
                  <span className="ms-mono mt-2 block text-[0.5625rem]">
                    {spec.followers} · {spec.platform}
                  </span>
                  <span className="ms-figure mt-3 block text-[1.125rem] text-gold-300">
                    {spec.after.revenue}
                  </span>
                </button>
              );
            })}
          </div>

          {specimens.items.map((spec, i) => (
            <div
              key={spec.ref}
              role="tabpanel"
              id={`${baseId}-panel-${i}`}
              aria-labelledby={`${baseId}-tab-${i}`}
              hidden={i !== active}
              className="bg-ink"
            >
              {i === active ? <Sheet spec={spec} /> : null}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4" data-reveal>
          <p className="ms-mono text-[0.5625rem]">{specimens.disclaimer}</p>
          <a href="#apply" className="ms-btn ms-btn-outline ms-sheen">
            Apply to work with us
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

type Spec = (typeof specimens.items)[number];

function Sheet({ spec }: { spec: Spec }) {
  return (
    <div key={spec.ref} className="ms-rise">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-[var(--rule)] px-6 py-5 sm:px-9">
        <p className="ms-display flex flex-wrap items-baseline gap-3 text-[clamp(1.5rem,2.8vw,2.25rem)]">
          <span className="text-ash">{spec.handle}</span>
          <span className="text-gold-600" aria-hidden="true">
            →
          </span>
          <span className="ms-gold">{spec.after.brand}</span>
        </p>
        <p className="ms-mono text-[0.5625rem]">{spec.field}</p>
      </div>

      <div className="grid sm:grid-cols-2">
        {/* BEFORE */}
        <div className="border-b border-[var(--rule)] px-6 py-7 sm:border-b-0 sm:border-r sm:px-9 sm:py-9">
          <div className="flex items-baseline justify-between gap-4">
            <p className="ms-mono">Before</p>
            <p className="ms-figure text-[1.5rem] text-char">{spec.before.revenue}</p>
          </div>
          <p className="ms-mono mt-1 text-right text-[0.5rem]">{spec.before.revenueLabel}</p>

          <p className="mt-6 text-[0.9375rem] leading-[1.7] text-ash">{spec.before.summary}</p>
          <ul className="mt-6 space-y-2.5">
            {spec.before.points.map((point) => (
              <li key={point} className="flex items-baseline gap-3 text-[0.875rem] text-ash">
                <span
                  className="block h-px w-3 shrink-0 bg-[rgba(226,122,106,0.5)]"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* AFTER */}
        <div className="relative px-6 py-7 sm:px-9 sm:py-9">
          <div className="flex items-baseline justify-between gap-4">
            <p className="ms-mono text-gold-400">After</p>
            <p className="ms-figure ms-gold text-[clamp(1.75rem,3vw,2.5rem)]">
              {spec.after.revenue}
            </p>
          </div>
          <p className="ms-mono mt-1 text-right text-[0.5rem]">{spec.after.revenueLabel}</p>

          <p className="ms-display mt-6 text-[1.5rem] text-bone">{spec.after.brand}</p>
          <p className="ms-mono mt-1.5 text-[0.5625rem]">{spec.after.line}</p>
          <p className="mt-5 text-[0.9375rem] leading-[1.7] text-bone">{spec.after.summary}</p>

          <ul className="mt-6 space-y-2.5">
            {spec.after.deliverables.map((item) => (
              <li key={item} className="flex items-baseline gap-3 text-[0.875rem] text-bone">
                <span className="block h-px w-3 shrink-0 bg-gold-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <dl className="grid border-t border-[var(--rule)] sm:grid-cols-2">
        <div className="border-b border-[var(--rule)] px-6 py-5 sm:border-b-0 sm:border-r sm:px-9">
          <dt className="ms-mono">Business model</dt>
          <dd className="mt-2 text-[0.9375rem] text-bone">{spec.model}</dd>
        </div>
        <div className="px-6 py-5 sm:px-9">
          <dt className="ms-mono">Build horizon</dt>
          <dd className="mt-2 text-[0.9375rem] text-bone">{spec.horizon}</dd>
        </div>
      </dl>
    </div>
  );
}
