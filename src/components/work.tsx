"use client";

import { useId, useRef, useState } from "react";
import { clients } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";
import { Arrow } from "./hero";
import { Eyebrow, Lede } from "./section";

/**
 * Prior work, shown properly rather than as a row of names.
 *
 * The company facts are public and checkable — sector, location, what they do,
 * a live link. The "what I built" list comes from config and is simply omitted
 * when empty, so the panel never shows a hole and never claims work that has
 * not been written up.
 */
export function Work({ t }: { t: Dictionary }) {
  const w = t.work;
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = clients.length - 1;
    let next = active;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = active === last ? 0 : active + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = active === 0 ? last : active - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="work" className="relative scroll-mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] py-[clamp(3.25rem,6.5vh,5rem)]">
        <div className="mb-[clamp(1.4rem,2.6vw,2.25rem)]" data-reveal>
          <Eyebrow index={w.index}>{w.eyebrow}</Eyebrow>
        </div>

        <div className="grid gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="ms-display text-[clamp(1.7rem,3.2vw,2.6rem)]" data-reveal>
            <span className="block text-bone">{w.headline[0]}</span>
            <span className="ms-gold-sweep block">{w.headline[1]}</span>
          </h2>
          <Lede>{w.body}</Lede>
        </div>

        {/* Selector */}
        <p className="ms-mono mt-[clamp(1.75rem,3.2vw,2.75rem)]" data-reveal>
          {w.selectLabel}
        </p>

        <div
          role="tablist"
          aria-label={w.eyebrow}
          onKeyDown={onKeyDown}
          className="ms-scroll-x mt-4 grid min-w-0 grid-cols-2 gap-3 lg:grid-cols-4"
          data-reveal
        >
          {clients.map((client, i) => {
            const selected = i === active;
            return (
              <button
                key={client.key}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`${baseId}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`ms-card ms-gloss ms-sheen flex min-w-0 items-center gap-3 p-4 text-left ${
                  selected
                    ? "!border-[var(--rule-gold-strong)] bg-[rgba(26,21,15,0.95)]"
                    : ""
                }`}
              >
                <Badge client={client} size={38} />
                <span className="min-w-0">
                  <span
                    className={`ms-display-soft block truncate text-[0.9375rem] transition-colors duration-500 ${
                      selected ? "text-bone" : "text-ash"
                    }`}
                  >
                    {client.label}
                  </span>
                  <span className="ms-mono mt-1 block truncate text-[0.5rem]">
                    {w.items[i].sector}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        {clients.map((client, i) => (
          <div
            key={client.key}
            role="tabpanel"
            id={`${baseId}-panel-${i}`}
            aria-labelledby={`${baseId}-tab-${i}`}
            hidden={i !== active}
            className="mt-4 min-w-0"
          >
            {i === active ? <Panel index={i} t={t} /> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

type Client = (typeof clients)[number];

function Badge({ client, size }: { client: Client; size: number }) {
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-full border border-[var(--rule-gold)] ${
        client.logo ? "bg-bone" : "bg-ink"
      }`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {client.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={client.logo} alt="" className="h-full w-full object-cover" />
      ) : (
        <span className="ms-mono text-[0.5rem] tracking-[0.06em] text-gold-200">
          {client.initials}
        </span>
      )}
    </span>
  );
}

function Panel({ index, t }: { index: number; t: Dictionary }) {
  const w = t.work;
  const client = clients[index];
  const copy = w.items[index];

  return (
    <div className="ms-panel ms-gloss ms-rise relative">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--rule)] p-6 sm:p-7">
        <div className="flex min-w-0 items-center gap-4">
          <Badge client={client} size={52} />
          <div className="min-w-0">
            <p className="ms-display text-[clamp(1.15rem,2vw,1.6rem)] text-bone">{client.label}</p>
            <p className="ms-mono mt-1.5 text-[0.5625rem]">{copy.sector}</p>
          </div>
        </div>

        <a
          href={client.href}
          target="_blank"
          rel="noreferrer noopener"
          className="ms-btn ms-btn-outline ms-sheen shrink-0 px-4 py-2.5"
        >
          {client.domain}
          <Arrow />
        </a>
      </div>

      <div className="grid sm:grid-cols-2">
        <div className="border-b border-[var(--rule)] p-6 sm:border-b-0 sm:border-r sm:p-7">
          <p className="ms-mono">{w.doesLabel}</p>
          <p className="mt-4 text-[0.9375rem] leading-[1.7] text-bone">{copy.does}</p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--rule)] pt-5">
            <div>
              <dt className="ms-mono text-[0.5rem]">{w.sectorLabel}</dt>
              <dd className="mt-1.5 text-[0.8125rem] text-ash">{copy.sector}</dd>
            </div>
            <div>
              <dt className="ms-mono text-[0.5rem]">{w.placeLabel}</dt>
              <dd className="mt-1.5 text-[0.8125rem] text-ash">{copy.place}</dd>
            </div>
          </dl>
        </div>

        <div className="p-6 sm:p-7">
          <p className="ms-mono text-gold-400">{w.builtLabel}</p>

          {client.built.length > 0 ? (
            <ul className="mt-4 space-y-2.5">
              {client.built.map((item) => (
                <li key={item} className="flex items-baseline gap-3 text-[0.9375rem] text-bone">
                  <span className="block h-px w-3 shrink-0 bg-gold-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="ms-mono mt-4 text-[0.5625rem] normal-case leading-[1.8] tracking-[0.12em] text-char">
              {w.builtPending}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
