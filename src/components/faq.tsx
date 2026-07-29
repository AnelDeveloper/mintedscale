import { faq } from "@/lib/content";
import { Section } from "./section";

export function Faq() {
  return (
    <Section id="faq" index={faq.index} eyebrow={faq.eyebrow}>
      <div className="grid gap-[clamp(2rem,3.6vw,3.25rem)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <h2 className="ms-display text-[clamp(1.7rem,3.2vw,2.6rem)] lg:sticky lg:top-28 lg:self-start" data-reveal>
          <span className="block text-bone">{faq.headline[0]}</span>
          <span className="ms-gold-sweep block">{faq.headline[1]}</span>
        </h2>

        <div>
          {faq.items.map((item, i) => (
            <details
              key={item.q}
              className="group border-t border-[var(--rule)] last:border-b"
              data-reveal
              style={{ "--reveal-delay": `${i * 55}ms` } as React.CSSProperties}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-[clamp(1.0625rem,1.7vw,1.25rem)] text-bone transition-colors duration-300 hover:text-gold-200 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  className="relative mt-2 block h-3 w-3 shrink-0"
                  aria-hidden="true"
                >
                  <span className="absolute left-0 top-1/2 block h-px w-3 -translate-y-1/2 bg-gold-400" />
                  <span className="absolute left-1/2 top-0 block h-3 w-px -translate-x-1/2 bg-gold-400 transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-7 text-[0.9375rem] leading-[1.8] text-ash">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
