"use client";

import { useCallback, useRef, useState } from "react";
import { results } from "@/lib/content";
import { Eyebrow, Lede } from "./section";
import { useCountUp } from "./scroll-effects";

export function Results() {
  return (
    <section id="results" className="relative scroll-mt-24 border-t border-[var(--rule)]">
      <MoneyTicker />

      <div className="mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] py-[clamp(4rem,9vh,7rem)]">
        <div className="mb-[clamp(2rem,4vw,3.5rem)]" data-reveal>
          <Eyebrow index={results.index}>{results.eyebrow}</Eyebrow>
        </div>

        <div className="grid gap-[clamp(1.5rem,4vw,4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="ms-display text-[clamp(2.2rem,5.6vw,4.6rem)]" data-reveal>
            <span className="text-bone">The numbers</span>{" "}
            <span className="ms-gold-sweep">we mint.</span>
          </h2>
          <Lede>{results.body}</Lede>
        </div>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-1 gap-px border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-4">
          {results.headlineStats.map((stat, i) => (
            <Figure key={stat.label} {...stat} delay={i * 80} />
          ))}
        </div>

        <p className="ms-mono mt-4 text-[0.5625rem] normal-case tracking-[0.14em] text-char" data-reveal>
          Figures are studio placeholders — replace in src/lib/content.ts before launch.
        </p>
      </div>
    </section>
  );
}

function Figure({
  value,
  prefix,
  suffix,
  label,
  note,
  decimals = 0,
  delay,
}: {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  note: string;
  decimals?: number;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const onTick = useCallback((v: number) => setShown(v), []);
  useCountUp(ref, value, onTick, decimals);

  return (
    <div
      ref={ref}
      className="ms-sheen group relative overflow-hidden bg-ink px-6 py-[clamp(2rem,3.6vw,3rem)] transition-colors duration-500 hover:bg-[rgba(20,17,16,0.9)]"
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <p className="ms-figure ms-gold text-[clamp(2.4rem,5.4vw,3.9rem)]">
        {prefix}
        {formatFigure(shown, decimals)}
        {suffix}
      </p>
      <p className="mt-3 text-[0.9375rem] text-bone">{label}</p>
      <p className="ms-mono mt-1.5 text-[0.625rem]">{note}</p>
    </div>
  );
}

function formatFigure(value: number, decimals: number): string {
  if (decimals > 0) return value.toFixed(decimals);
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (value >= 10_000) return `${Math.round(value / 1000)}K`;
  return value.toLocaleString("en-US");
}

/** The money ticker — a running tape of what partner launches returned. */
function MoneyTicker() {
  const run = [...results.ticker, ...results.ticker];

  return (
    <div className="ms-marquee relative overflow-hidden border-b border-[var(--rule)] bg-[rgba(14,12,10,0.6)] py-4">
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, var(--color-ink) 0%, transparent 10%, transparent 90%, var(--color-ink) 100%)",
        }}
        aria-hidden="true"
      />
      <p className="sr-only">
        Recent partner launch results: {results.ticker.map((t) => `${t.handle} ${t.amount}`).join(", ")}.
      </p>
      <div className="ms-marquee-track" aria-hidden="true">
        {run.map((item, i) => (
          <span key={`${item.handle}-${i}`} className="flex items-center gap-3 whitespace-nowrap px-6">
            <span className="ms-mono text-ash">{item.handle}</span>
            <span className="ms-figure ms-gold text-[1.25rem]">{item.amount}</span>
            <span className="ms-mono text-[0.5625rem] text-char">{item.note}</span>
            <span className="ml-3 text-gold-800" aria-hidden="true">
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
