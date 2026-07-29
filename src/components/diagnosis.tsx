import type { Dictionary } from "@/lib/i18n";
import { Heading, Lede, Section } from "./section";

export function Diagnosis({ t }: { t: Dictionary }) {
  const d = t.diagnosis;

  return (
    <Section id="diagnosis" index={d.index} eyebrow={d.eyebrow}>
      <div className="grid gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end">
        <Heading lines={d.headline} />
        <Lede>{d.body}</Lede>
      </div>

      <div className="mt-[clamp(1.75rem,3.2vw,2.75rem)] grid gap-px border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-3">
        {d.faults.map((fault, i) => (
          <article
            key={fault.code}
            className="ms-sheen group relative overflow-hidden bg-ink p-7 transition-colors duration-500 hover:bg-[rgba(22,18,14,0.95)] sm:p-8"
            data-reveal
            style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
          >
            <div className="flex items-center justify-between">
              <span className="ms-mono text-gold-400">{fault.code}</span>
              <span className="ms-mono text-[0.5625rem] text-char transition-colors duration-500 group-hover:text-ash">
                {fault.state}
              </span>
            </div>

            {/* The meter that was never filled */}
            <div className="mt-5 h-px w-full bg-[rgba(242,237,227,0.06)]">
              <div className="h-px w-[7%] bg-[rgba(226,122,106,0.7)]" />
            </div>

            <h3 className="ms-display-soft mt-8 text-[clamp(1.35rem,2.2vw,1.7rem)] text-bone">
              {fault.title}
            </h3>
            <p className="mt-4 text-[0.9375rem] leading-[1.7] text-ash">{fault.body}</p>

            <p className="ms-mono mt-7 border-t border-[var(--rule)] pt-4 text-[0.5625rem] normal-case tracking-[0.14em]">
              {d.costLabel} <span className="text-[rgba(226,122,106,0.95)]">{fault.loss}</span>
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
