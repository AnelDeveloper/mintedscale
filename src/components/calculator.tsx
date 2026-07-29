"use client";

import { useMemo, useState } from "react";
import { calculator } from "@/lib/content";
import { Arrow } from "./hero";
import { Eyebrow, Lede } from "./section";

const money = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const count = new Intl.NumberFormat("en-US");

/**
 * The revenue calculator. Unlike the black-box version everyone else ships,
 * this one shows its working — the arithmetic is on screen, so the number is
 * arguable rather than magic.
 */
export function Calculator() {
  // Annotated because `content.ts` is `as const`, which would otherwise pin
  // each of these to its literal default value.
  const [followers, setFollowers] = useState<number>(calculator.defaults.followers);
  const [engagement, setEngagement] = useState<number>(calculator.defaults.engagement);
  const [price, setPrice] = useState<number>(calculator.defaults.price);

  const model = useMemo(() => {
    const engaged = Math.round(followers * (engagement / 100));
    const buyers = Math.round(engaged * calculator.launchConversion);
    const firstLaunch = buyers * price;
    return {
      engaged,
      buyers,
      firstLaunch,
      year: Math.round(firstLaunch * calculator.yearMultiple),
    };
  }, [followers, engagement, price]);

  return (
    <section id="calculator" className="relative scroll-mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] py-[clamp(3.25rem,6.5vh,5rem)]">
        <div className="mb-[clamp(1.4rem,2.6vw,2.25rem)]" data-reveal>
          <Eyebrow index={calculator.index}>{calculator.eyebrow}</Eyebrow>
        </div>

        <div className="grid gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="ms-display text-[clamp(1.7rem,3.2vw,2.6rem)]" data-reveal>
            <span className="block text-bone">{calculator.headline[0]}</span>
            <span className="ms-gold-sweep block">{calculator.headline[1]}</span>
          </h2>
          <Lede>{calculator.body}</Lede>
        </div>

        <div
          className="ms-panel ms-rim relative mt-[clamp(1.75rem,3.2vw,2.75rem)] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]"
          data-reveal
        >
          {/* Dials */}
          <div className="border-b border-[var(--rule)] p-6 sm:p-9 lg:border-b-0 lg:border-r">
            <p className="ms-mono mb-8">Your audience</p>

            <Dial
              id="calc-followers"
              label="Followers"
              display={count.format(followers)}
              value={followers}
              onChange={setFollowers}
              {...calculator.bounds.followers}
            />
            <Dial
              id="calc-engagement"
              label="Engagement rate"
              hint="Share of your followers who actually like, comment or watch — not your revenue share"
              display={`${engagement.toFixed(1)}%`}
              value={engagement}
              onChange={setEngagement}
              {...calculator.bounds.engagement}
            />
            <Dial
              id="calc-price"
              label="Product price"
              display={money.format(price)}
              value={price}
              onChange={setPrice}
              {...calculator.bounds.price}
            />

            <div className="mt-10 border-t border-[var(--rule)] pt-6">
              <p className="ms-mono">What moves this number</p>
              <ul className="mt-4 space-y-2.5">
                {calculator.levers.map((lever) => (
                  <li key={lever} className="flex items-baseline gap-3 text-[0.875rem] text-ash">
                    <span className="block h-px w-3 shrink-0 bg-gold-600" aria-hidden="true" />
                    {lever}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Output */}
          <div className="p-6 sm:p-9">
            <p className="ms-mono">Projected first launch</p>
            <p
              className="ms-figure ms-money mt-4 text-[clamp(2.25rem,5vw,3.75rem)]"
              aria-live="polite"
            >
              {money.format(model.firstLaunch)}
            </p>

            <div className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-[var(--rule)] pt-6">
              <p className="ms-mono">12-month potential</p>
              <p className="ms-figure ms-money text-[clamp(1.25rem,2.1vw,1.6rem)]">
                {money.format(model.year)}
              </p>
            </div>

            {/* Show the working — this is the part everyone else hides */}
            <dl className="mt-7 border-t border-[var(--rule)]">
              <Row label="Engaged audience" value={count.format(model.engaged)} />
              <Row
                label="Launch conversion"
                value={`${(calculator.launchConversion * 100).toFixed(0)}% of engaged`}
              />
              <Row label="Expected buyers" value={count.format(model.buyers)} />
              <Row label="Price each" value={money.format(price)} />
            </dl>

            <a href="#apply" className="ms-btn ms-btn-gold ms-sheen mt-8 w-full">
              I want this revenue
              <Arrow />
            </a>
          </div>
        </div>

        <p className="ms-mono mt-4 max-w-[70ch] text-[0.5625rem] normal-case leading-[1.8] tracking-[0.12em]" data-reveal>
          {calculator.disclaimer}
        </p>
      </div>
    </section>
  );
}

function Dial({
  id,
  label,
  hint,
  display,
  value,
  onChange,
  min,
  max,
  step,
}: {
  id: string;
  label: string;
  hint?: string;
  display: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-9 last:mb-0">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="ms-mono">
          {label}
        </label>
        <span className="ms-figure text-[1.375rem] text-gold-200">{display}</span>
      </div>
      {hint ? (
        <p className="ms-mono mb-3 text-[0.5rem] normal-case leading-[1.6] tracking-[0.1em] text-char">
          {hint}
        </p>
      ) : null}
      <input
        id={id}
        type="range"
        className="ms-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(90deg, var(--color-gold-400) 0%, var(--color-gold-200) ${pct}%, rgba(242,237,227,0.12) ${pct}%, rgba(242,237,227,0.12) 100%)`,
        }}
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--rule)] py-3">
      <dt className="text-[0.875rem] text-ash">{label}</dt>
      <dd className="font-mono text-[0.875rem] tabular-nums text-bone">{value}</dd>
    </div>
  );
}
