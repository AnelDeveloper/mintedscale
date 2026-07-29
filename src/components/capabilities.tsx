import { capabilities } from "@/lib/content";
import { Heading, Lede, Section } from "./section";

export function Capabilities() {
  return (
    <Section id="capabilities" index={capabilities.index} eyebrow={capabilities.eyebrow}>
      <div className="grid gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end">
        <Heading lines={capabilities.headline} />
        <Lede>{capabilities.body}</Lede>
      </div>

      <div className="mt-[clamp(1.75rem,3.2vw,2.75rem)] grid gap-px border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-2">
        {capabilities.services.map((service, i) => (
          <article
            key={service.code}
            className="ms-sheen group relative overflow-hidden bg-ink p-7 transition-colors duration-500 hover:bg-[rgba(22,18,14,0.95)] sm:p-9"
            data-reveal
            style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
          >
            <span className="ms-mono text-gold-400">{service.code}</span>

            <h3 className="ms-display mt-7 text-[clamp(1.35rem,2.2vw,1.7rem)] text-bone transition-colors duration-500 group-hover:text-gold-100">
              {service.title}
            </h3>
            <p className="mt-3 max-w-[34ch] text-[0.9375rem] leading-[1.65] text-ash">
              {service.body}
            </p>

            <ul className="mt-8 border-t border-[var(--rule)]">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between gap-4 border-b border-[var(--rule)] py-3 text-[0.9375rem] text-bone"
                >
                  {item}
                  <span
                    className="block h-1 w-1 rotate-45 bg-gold-800 transition-colors duration-500 group-hover:bg-gold-300"
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
