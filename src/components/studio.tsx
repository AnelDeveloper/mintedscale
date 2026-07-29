import { site, studio } from "@/lib/content";
import { CoinMark } from "./coin-mark";
import { Eyebrow, Lede } from "./section";

/**
 * The proof section. A new studio has no creator results, so the proof is
 * the founder: seven years of shipped product, named companies, and an
 * offer that puts the risk on us rather than the creator.
 */
export function Studio() {
  return (
    <section id="studio" className="relative scroll-mt-24 border-t border-[var(--rule)]">
      <ClientRoster />

      <div className="mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] py-[clamp(3.25rem,6.5vh,5rem)]">
        <div className="mb-[clamp(1.4rem,2.6vw,2.25rem)]" data-reveal>
          <Eyebrow index={studio.index}>{studio.eyebrow}</Eyebrow>
        </div>

        <div className="grid gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="ms-display text-[clamp(1.7rem,3.2vw,2.6rem)]" data-reveal>
            <span className="block text-bone">{studio.headline[0]}</span>
            <span className="ms-gold-sweep block">{studio.headline[1]}</span>
          </h2>
          <Lede>{studio.note.lead}</Lede>
        </div>

        {/* Facts and terms — nothing here is a claim about creator results */}
        <div className="mt-[clamp(1.75rem,3.2vw,2.75rem)] grid grid-cols-2 gap-px border border-[var(--rule)] bg-[var(--rule)] lg:grid-cols-4">
          {studio.stats.map((stat, i) => (
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

        {/* Founder note */}
        <div className="mt-[clamp(1.75rem,3.2vw,2.75rem)] grid gap-px border border-[var(--rule)] bg-[var(--rule)] lg:grid-cols-[22rem_minmax(0,1fr)]">
          <Portrait />

          <div
            className="bg-ink p-7 sm:p-9"
            data-reveal
            style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
          >
            <p className="text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.75] text-bone">
              {studio.note.body}
            </p>
            <p className="mt-6 text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.75] text-ash">
              {studio.note.offer}
            </p>

            <p className="ms-serif mt-8 border-t border-[var(--rule)] pt-6 text-[1.25rem] text-gold-200">
              {site.tagline}
            </p>
            <p className="ms-mono mt-3">{studio.note.signature}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Portrait() {
  const { src, alt } = studio.portrait;

  return (
    <div
      className="relative flex min-h-[16rem] items-center justify-center overflow-hidden bg-ink"
      data-reveal
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
          <CoinMark size={44} id="portrait" />
          <p className="ms-mono text-gold-200">{site.founder}</p>
          <p className="ms-mono text-[0.5625rem] normal-case tracking-[0.14em] text-char">
            Portrait slot reserved
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Real prior engagements. This replaced a fabricated revenue ticker —
 * companies you can look up beat numbers nobody can verify.
 *
 * Static rather than a marquee on purpose: these are links, and a moving
 * target is impossible to tap on a phone, where there is no hover to pause it.
 */
function ClientRoster() {
  return (
    <div className="border-b border-[var(--rule)] bg-[rgba(14,12,10,0.55)]">
      <div className="mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] py-[clamp(1.75rem,3vw,2.5rem)]">
        <p className="ms-mono text-gold-400">{studio.clients.label}</p>

        <ul className="mt-5 grid grid-cols-2 gap-px border border-[var(--rule)] bg-[var(--rule)] lg:grid-cols-4">
          {studio.clients.items.map((client) => (
            <li key={client.label} className="bg-ink">
              <ClientCell {...client} />
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <p className="ms-mono max-w-[62ch] text-[0.5625rem] normal-case leading-[1.8] tracking-[0.12em]">
            {studio.clients.caveat}
          </p>

          <p className="ms-mono flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-char">{studio.follow.label}</span>
            {studio.follow.items.map((item) => (
              <a
                key={item.platform}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-gold-200 underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-80"
              >
                {item.platform} {item.handle}
              </a>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Renders as a link only when a URL exists — never points somewhere invented. */
function ClientCell({ label, href }: { label: string; href: string }) {
  const inner = (
    <span className="ms-display text-[clamp(0.95rem,1.5vw,1.25rem)] tracking-[0.02em]">
      {label}
    </span>
  );

  const shell = "flex items-center justify-between gap-3 px-5 py-5 sm:px-6";

  if (!href) {
    return <div className={`${shell} text-bone/60`}>{inner}</div>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`ms-sheen group relative overflow-hidden text-bone/75 transition-colors duration-500 hover:text-gold-200 ${shell}`}
    >
      {inner}
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        aria-hidden="true"
        className="shrink-0 text-gold-600 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      >
        <path d="M1 10L10 1M10 1H3.5M10 1v6.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </a>
  );
}
