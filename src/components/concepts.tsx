"use client";

import { useEffect, useId, useRef, useState } from "react";
import { concepts } from "@/lib/content";
import { Arrow } from "./hero";
import { Eyebrow } from "./section";

const money = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const count = new Intl.NumberFormat("en-US");

type Projection = (typeof concepts.items)[number]["projection"];

function project(p: Projection) {
  const engaged = Math.round(p.audience * (p.engagement / 100));
  const buyers = Math.round(engaged * p.conversion);
  return { engaged, buyers, revenue: buyers * p.price };
}

/**
 * Counts a figure up when its panel opens. People read a number that moves;
 * they skim one that is just sitting there.
 */
function useTicker(target: number, key: string) {
  const [shown, setShown] = useState(target);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / 900, 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setShown(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, key]);

  return shown;
}

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
      <div className="mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] py-[clamp(3.25rem,6.5vh,5rem)]">
        <div className="mb-[clamp(1.4rem,2.6vw,2.25rem)]" data-reveal>
          <Eyebrow index={concepts.index}>{concepts.eyebrow}</Eyebrow>
        </div>

        <div className="grid gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="ms-display text-[clamp(1.7rem,3.2vw,2.6rem)]" data-reveal>
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
          className="mt-[clamp(1.75rem,3.2vw,2.75rem)] grid gap-px border border-[var(--rule)] bg-[var(--rule)] lg:grid-cols-[20rem_minmax(0,1fr)]"
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
                  <span className="ms-figure ms-money mt-2.5 block text-[1.0625rem]">
                    {money.format(project(item.projection).revenue)}
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

/**
 * The money band. Every input is on screen next to the output, so the figure
 * is arguable rather than magic — same rule as the calculator.
 */
function ProjectionBand({ item }: { item: Item }) {
  const p = item.projection;
  const { engaged, buyers, revenue } = project(p);
  const shown = useTicker(revenue, item.ref);

  const workings = [
    { label: "Audience", value: count.format(p.audience) },
    { label: "Engaged", value: `${count.format(engaged)} · ${p.engagement}%` },
    { label: "Buyers", value: `${count.format(buyers)} · ${(p.conversion * 100).toFixed(1)}%` },
    { label: "Price", value: money.format(p.price) },
  ];

  return (
    <div className="grid border-b border-[var(--rule)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="border-b border-[var(--rule)] px-6 py-6 sm:px-9 lg:border-b-0 lg:border-r">
        <p className="ms-mono text-[0.5625rem]">Projected first launch</p>
        <p className="ms-figure ms-money mt-2 text-[clamp(1.9rem,3.8vw,2.9rem)]" aria-live="polite">
          {money.format(shown)}
        </p>
      </div>

      <dl className="grid grid-cols-2 sm:grid-cols-4">
        {workings.map((w, i) => (
          <div
            key={w.label}
            className={`px-6 py-5 sm:px-5 ${i < 2 ? "border-b border-[var(--rule)] sm:border-b-0" : ""} ${
              i % 2 === 0 ? "border-r border-[var(--rule)]" : "sm:border-r sm:border-[var(--rule)]"
            } sm:last:border-r-0`}
          >
            <dt className="ms-mono text-[0.5rem]">{w.label}</dt>
            <dd className="mt-1.5 font-mono text-[0.8125rem] tabular-nums text-bone">{w.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Sheet({ item }: { item: Item }) {
  return (
    <div key={item.ref} className="ms-rise">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-[var(--rule)] px-6 py-5 sm:px-9">
        <p className="ms-display flex flex-wrap items-baseline gap-3 text-[clamp(1.15rem,1.9vw,1.5rem)]">
          <span className="text-ash">{item.handle}</span>
          <span className="text-gold-600" aria-hidden="true">
            →
          </span>
          <span className="ms-gold">{item.after.brand}</span>
        </p>
        <p className="ms-mono text-[0.5625rem]">{item.field}</p>
      </div>

      <ProjectionBand item={item} />

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
          <dd className="ms-money mt-2 text-[0.875rem] font-medium leading-relaxed">{item.ladder}</dd>
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
