"use client";

import { useId, useRef, useState } from "react";
import { concepts } from "@/lib/content";
import { Arrow } from "./hero";
import { Eyebrow } from "./section";

/**
 * Concept builds, not case studies. No results are claimed anywhere here —
 * each panel is a plan, shown in enough detail that a creator can judge the
 * thinking. That is the thing being sold.
 */
export function Concepts() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = concepts.items.length - 1;
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
    <section id="concepts" className="relative scroll-mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] py-[clamp(4.5rem,10vh,8.5rem)]">
        <div className="mb-[clamp(2rem,4vw,3.5rem)]" data-reveal>
          <Eyebrow index={concepts.index}>{concepts.eyebrow}</Eyebrow>
        </div>

        <div className="grid gap-[clamp(1.5rem,4vw,4rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="ms-display text-[clamp(2.2rem,5.4vw,4.2rem)]" data-reveal>
            <span className="block text-bone">{concepts.headline[0]}</span>
            <span className="ms-gold-sweep block">{concepts.headline[1]}</span>
          </h2>
          <p
            className="max-w-[54ch] text-[clamp(1rem,1.35vw,1.1875rem)] leading-[1.65] text-ash"
            data-reveal
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
          >
            {concepts.body}
          </p>
        </div>

        <div
          className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-px border border-[var(--rule)] bg-[var(--rule)] lg:grid-cols-[20rem_minmax(0,1fr)]"
          data-reveal
        >
          <div
            role="tablist"
            aria-label="Concept builds"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="ms-scroll-x flex min-w-0 overflow-x-auto bg-ink lg:block lg:overflow-visible"
          >
            {concepts.items.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.ref}
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
                  <span className="ms-mono block text-gold-400">Concept {item.ref}</span>
                  <span
                    className={`ms-display-soft mt-3 block text-[1.125rem] transition-colors duration-500 ${
                      selected ? "text-bone" : "text-ash"
                    }`}
                  >
                    {item.handle}
                  </span>
                  <span className="ms-mono mt-2 block text-[0.5625rem]">
                    {item.followers} · {item.platform}
                  </span>
                </button>
              );
            })}
          </div>

          {concepts.items.map((item, i) => (
            <div
              key={item.ref}
              role="tabpanel"
              id={`${baseId}-panel-${i}`}
              aria-labelledby={`${baseId}-tab-${i}`}
              hidden={i !== active}
              className="min-w-0 bg-ink"
            >
              {i === active ? <Sheet item={item} /> : null}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4" data-reveal>
          <p className="ms-mono max-w-[64ch] text-[0.5625rem] normal-case leading-[1.8] tracking-[0.12em]">
            {concepts.disclaimer}
          </p>
          <a href="#apply" className="ms-btn ms-btn-outline ms-sheen shrink-0">
            Get your own concept
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

type Item = (typeof concepts.items)[number];

function Sheet({ item }: { item: Item }) {
  return (
    <div key={item.ref} className="ms-rise">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-[var(--rule)] px-6 py-5 sm:px-9">
        <p className="ms-display flex flex-wrap items-baseline gap-3 text-[clamp(1.375rem,2.6vw,2rem)]">
          <span className="text-ash">{item.handle}</span>
          <span className="text-gold-600" aria-hidden="true">
            →
          </span>
          <span className="ms-gold">{item.after.brand}</span>
        </p>
        <p className="ms-mono text-[0.5625rem]">{item.field}</p>
      </div>

      <div className="grid sm:grid-cols-2">
        <div className="border-b border-[var(--rule)] px-6 py-7 sm:border-b-0 sm:border-r sm:px-9 sm:py-9">
          <p className="ms-mono">Where they are</p>
          <p className="mt-5 text-[0.9375rem] leading-[1.7] text-ash">{item.before.summary}</p>
          <ul className="mt-6 space-y-2.5">
            {item.before.points.map((point) => (
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

        <div className="px-6 py-7 sm:px-9 sm:py-9">
          <p className="ms-mono text-gold-400">What we'd build</p>
          <p className="ms-display mt-5 text-[1.5rem] text-bone">{item.after.brand}</p>
          <p className="ms-mono mt-1.5 text-[0.5625rem]">{item.after.line}</p>
          <p className="mt-5 text-[0.9375rem] leading-[1.7] text-bone">{item.after.summary}</p>

          <ul className="mt-6 space-y-2.5">
            {item.after.deliverables.map((d) => (
              <li key={d} className="flex items-baseline gap-3 text-[0.875rem] text-bone">
                <span className="block h-px w-3 shrink-0 bg-gold-500" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The design of the business, not a claimed outcome */}
      <dl className="grid border-t border-[var(--rule)] sm:grid-cols-3">
        <div className="border-b border-[var(--rule)] px-6 py-5 sm:border-b-0 sm:border-r sm:px-9">
          <dt className="ms-mono">Price ladder</dt>
          <dd className="mt-2 text-[0.875rem] leading-relaxed text-gold-200">{item.ladder}</dd>
        </div>
        <div className="border-b border-[var(--rule)] px-6 py-5 sm:border-b-0 sm:border-r sm:px-9">
          <dt className="ms-mono">Business model</dt>
          <dd className="mt-2 text-[0.875rem] leading-relaxed text-bone">{item.model}</dd>
        </div>
        <div className="px-6 py-5 sm:px-9">
          <dt className="ms-mono">Build horizon</dt>
          <dd className="mt-2 text-[0.875rem] leading-relaxed text-bone">{item.horizon}</dd>
        </div>
      </dl>
    </div>
  );
}
