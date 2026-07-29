import { standard } from "@/lib/content";
import { Arrow } from "./hero";
import { Section } from "./section";

export function Standard() {
  return (
    <Section id="standard" index={standard.index} eyebrow={standard.eyebrow}>
      <div className="grid gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="ms-display text-[clamp(2.2rem,5.6vw,4.6rem)]" data-reveal>
            <span className="block text-bone">{standard.headline[0]}</span>
            <span className="ms-gold-sweep block">{standard.headline[1]}</span>
          </h2>
          <div className="mt-8 hidden lg:block" data-reveal>
            <a href="#apply" className="ms-btn ms-btn-gold ms-sheen">
              Apply to work with us
              <Arrow />
            </a>
          </div>
        </div>

        <dl>
          {standard.points.map((point, i) => (
            <div
              key={point.n}
              className="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-t border-[var(--rule)] py-7 last:border-b sm:gap-x-8 sm:py-8"
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
            >
              <span className="ms-mono pt-1.5 text-gold-600 transition-colors duration-500 group-hover:text-gold-200">
                {point.n}
              </span>
              <div>
                <dt className="ms-display-soft text-[clamp(1.25rem,2.2vw,1.625rem)] text-bone">
                  {point.title}
                </dt>
                <dd className="mt-3 max-w-[56ch] text-[0.9375rem] leading-[1.75] text-ash">
                  {point.body}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <div className="lg:hidden" data-reveal>
          <a href="#apply" className="ms-btn ms-btn-gold w-full">
            Apply to work with us
            <Arrow />
          </a>
        </div>
      </div>
    </Section>
  );
}
