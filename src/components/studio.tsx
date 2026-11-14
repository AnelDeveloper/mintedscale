import type { Dictionary } from "@/lib/i18n";

/**
 * The terms band. Deliberately unlabelled — the section above already says
 * what the work is, so this just puts the terms beside it.
 */
export function Studio({ t }: { t: Dictionary }) {
  const s = t.studio;

  return (
    <section id="studio" className="relative scroll-mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] py-[clamp(3.25rem,6.5vh,5rem)]">
        {/* Facts and terms — nothing here is a claim about creator results */}
        <div className="grid grid-cols-2 gap-px border border-[var(--rule)] bg-[var(--rule)] lg:grid-cols-4">
          {s.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="ms-sheen relative overflow-hidden bg-ink px-5 py-[clamp(1.75rem,3.2vw,2.75rem)] transition-colors duration-500 hover:bg-[rgba(20,17,16,0.9)] sm:px-7"
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
            >
              {/* A word like "Rev share" needs its own size, or it wraps
                  awkwardly beside the single-token figures. */}
              <p
                className={`ms-figure ms-gold whitespace-nowrap ${
                  stat.value.length > 4
                    ? "text-[clamp(1.15rem,1.9vw,1.5rem)]"
                    : "text-[clamp(1.6rem,3vw,2.35rem)]"
                }`}
              >
                {stat.value}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-snug text-bone">{stat.label}</p>
              <p className="ms-mono mt-1.5 text-[0.5625rem]">{stat.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
