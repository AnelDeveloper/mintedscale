import { site } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";
import { ApplicationConsole } from "./application-console";
import { Eyebrow } from "./section";

export function Apply({ t }: { t: Dictionary }) {
  const a = t.application;

  return (
    <section id="apply" className="relative scroll-mt-20 border-t border-[var(--rule)]">
      {/* The room brightens where the decision gets made */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%]"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 0%, rgba(217,169,76,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] py-[clamp(3.25rem,6.5vh,5rem)]">
        <div className="mb-[clamp(1.4rem,2.6vw,2.25rem)]" data-reveal>
          <Eyebrow index={a.index}>{a.eyebrow}</Eyebrow>
        </div>

        <div className="grid gap-[clamp(2rem,3.6vw,3.25rem)] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          {/* min-w-0 on both columns: a grid item defaults to min-width:auto, which
              stops the booking console shrinking below the day rail's min-content
              and blows the whole page out horizontally on mobile. */}
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <h2 className="ms-display text-[clamp(1.7rem,3.1vw,2.5rem)]" data-reveal>
              <span className="block text-bone">{a.headline[0]}</span>
              <span className="ms-gold-sweep block">{a.headline[1]}</span>
            </h2>

            <p
              className="mt-6 max-w-[38ch] text-[clamp(1rem,1.35vw,1.125rem)] leading-[1.65] text-ash"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              {a.body}
            </p>

            <ul
              className="mt-9 border-t border-[var(--rule)]"
              data-reveal
              style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
            >
              {a.terms.map((term) => (
                <li
                  key={term}
                  className="flex items-baseline gap-3 border-b border-[var(--rule)] py-4 text-[0.9375rem] leading-[1.6] text-ash"
                >
                  <span
                    className="mt-1.5 block h-1 w-1 shrink-0 rotate-45 bg-gold-500"
                    aria-hidden="true"
                  />
                  {term}
                </li>
              ))}
            </ul>

            <p
              className="ms-mono mt-8 leading-[1.9]"
              data-reveal
              style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
            >
              {a.writeToUs}
              <br />
              <a
                href={`mailto:${site.email}`}
                className="text-gold-200 underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-80"
              >
                {site.email}
              </a>
            </p>
          </div>

          <div
            className="min-w-0"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <ApplicationConsole t={t} />
          </div>
        </div>
      </div>
    </section>
  );
}
