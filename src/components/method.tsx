import type { Dictionary } from "@/lib/i18n";
import { Arrow } from "./hero";
import { Heading, Lede, Section } from "./section";

/**
 * The only place 01–04 numbering is earned: a real sequence where each stage
 * depends on the one before it.
 */
export function Method({ t }: { t: Dictionary }) {
  const m = t.method;

  return (
    <Section id="method" index={m.index} eyebrow={m.eyebrow}>
      <div className="grid gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end">
        <Heading lines={m.headline} />
        <Lede>{m.body}</Lede>
      </div>

      <ol className="mt-[clamp(2rem,3.6vw,3rem)]">
        {m.steps.map((step, i) => (
          <li
            key={step.n}
            className="group relative border-t border-[var(--rule)] last:border-b"
            data-reveal
            style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
          >
            {/* Hover fills the rule in gold — the stage completing */}
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold-400 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 gap-x-8 gap-y-4 py-[clamp(1.75rem,3.2vw,2.75rem)] md:grid-cols-[8rem_minmax(0,1fr)_minmax(0,1.15fr)] md:items-baseline">
              <div>
                <span
                  className="ms-figure block text-[clamp(1.9rem,3.4vw,2.6rem)] leading-none text-transparent transition-all duration-700 group-hover:text-gold-400"
                  style={{ WebkitTextStroke: "1px rgba(217,169,76,0.4)" }}
                  aria-hidden="true"
                >
                  {step.n}
                </span>
                <span className="ms-mono mt-3 block text-[0.5625rem]">{step.time}</span>
              </div>

              <div>
                <h3 className="ms-display text-[clamp(1.35rem,2.3vw,1.8rem)] text-bone">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-gold-200">{step.body}</p>
              </div>

              <div>
                <p className="text-[0.9375rem] leading-[1.75] text-ash">{step.detail}</p>
                <p className="ms-mono mt-4 flex items-center gap-2.5 text-[0.625rem]">
                  <span className="block h-px w-4 bg-gold-600" aria-hidden="true" />
                  {step.output}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-[clamp(1.75rem,3vw,2.5rem)]" data-reveal>
        <a href="#apply" className="ms-btn ms-btn-gold ms-sheen">
          {m.cta}
          <Arrow />
        </a>
      </div>
    </Section>
  );
}
