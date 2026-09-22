import { calculator, clients, heroSample, media } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";
import { ClientLogo } from "./client-logo";
import { VideoFrame } from "./video-frame";

/**
 * Derived from the calculator's own model, not typed by hand — the headline
 * number in the hero can never drift away from what the calculator computes.
 */
const SAMPLE_REVENUE = Math.round(
  heroSample.followers *
    (heroSample.engagement / 100) *
    calculator.launchConversion *
    heroSample.price,
);
const money = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

/**
 * The opening: the pitch, then the film.
 *
 * Stacked rather than side by side on purpose. The intro film is the one
 * thing a creator will actually watch, and a half-width frame beside a
 * paragraph treats it as decoration. Full width under the headline, it is
 * the next thing after the words — and it starts just inside the fold, so
 * the frame edge is visible before any scrolling and invites the rest.
 */
export function Hero({ t }: { t: Dictionary }) {
  const h = t.hero;

  return (
    <section id="top" className="relative">
      <div className="mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] pb-[clamp(3rem,7vh,5rem)] pt-[clamp(6rem,12vh,7.5rem)]">
        {/* ── The pitch ── */}
        <div className="ms-lift-in" style={{ animationDelay: "60ms" }}>
          <TrustPill t={t} />
        </div>

        {/* The headline runs the full width now that nothing sits beside it.
            Each line is struck separately, the second a beat behind the
            first, so the headline arrives rather than fades in. */}
        <h1 className="ms-display mt-[clamp(1.25rem,2.5vw,1.75rem)] text-[clamp(2.1rem,4.8vw,3.9rem)]">
          <span className="ms-strike-in text-bone" style={{ animationDelay: "170ms" }}>
            {h.headline[0]}
          </span>
          <span className="ms-strike-in" style={{ animationDelay: "300ms" }}>
            <span className="ms-gold-sweep block">{h.headline[1]}</span>
          </span>
        </h1>

        <div className="mt-[clamp(1.5rem,3vw,2.25rem)] grid items-end gap-[clamp(1.75rem,3.4vw,3rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="min-w-0">
            <p
              className="ms-lift-in ms-serif text-[clamp(1.05rem,1.7vw,1.35rem)] text-gold-200"
              style={{ animationDelay: "430ms" }}
            >
              {t.site.tagline}
            </p>

            <p
              className="ms-lift-in mt-4 max-w-[48ch] text-[clamp(0.9375rem,1.2vw,1.0625rem)] leading-[1.7] text-ash"
              style={{ animationDelay: "500ms" }}
            >
              {h.sub}
            </p>

            <div
              className="ms-lift-in mt-7 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "580ms" }}
            >
              <a href="#apply" className="ms-btn ms-btn-gold w-full sm:w-auto">
                {h.primaryCta}
                <Arrow />
              </a>
              <a href="#method" className="ms-btn ms-btn-outline ms-sheen w-full sm:w-auto">
                {h.secondaryCta}
              </a>
            </div>

            {/* Terms at a glance — small, not a billboard. Each one lands in
                turn so the row reads left to right rather than all at once. */}
            <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
              {h.bar.map((item, i) => (
                <div
                  key={item.label}
                  className="ms-lift-in"
                  style={{ animationDelay: `${660 + i * 70}ms` }}
                >
                  <dt className="ms-figure ms-gold whitespace-nowrap text-[1.25rem]">
                    {item.value}
                  </dt>
                  <dd className="ms-mono mt-1.5 text-[0.5625rem]">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="ms-lift-in min-w-0" style={{ animationDelay: "760ms" }}>
            <EarningsCard t={t} />
          </div>
        </div>

        {/* ── The film ── */}
        <div
          className="ms-lift-in mt-[clamp(2.25rem,4.5vw,3.5rem)]"
          style={{ animationDelay: "860ms" }}
        >
          <VideoFrame
            src={media.heroVideo.src}
            poster={media.heroVideo.poster}
            label={h.videoLabel}
            reservedLabel={t.video.reserved}
            playLabel={t.video.play}
            ratio="16/9"
            className="ms-drift"
          />
        </div>
      </div>
    </section>
  );
}

/**
 * The stacked-avatar trust badge, built from real prior clients.
 *
 * The reference site puts a star rating and a client count here. We have
 * neither — no creator has been through the studio yet, so there is nothing
 * to rate. What is true is four companies and seven years, so that is what
 * it says. Drop a logo file into `logo` and it replaces the monogram.
 */
function TrustPill({ t }: { t: Dictionary }) {
  return (
    <div className="ms-panel ms-gloss inline-flex flex-wrap items-center gap-x-4 gap-y-2 !rounded-full py-2 pl-2 pr-5">
      <ul className="flex items-center">
        {clients.map((client, i) => (
          <li
            key={client.label}
            className="relative"
            style={{ marginLeft: i === 0 ? 0 : "-0.55rem", zIndex: clients.length - i }}
          >
            <ClientLogo
              logo={client.logo}
              initials={client.initials}
              label={client.label}
              size={32}
              fill={client.logoFill}
            />
          </li>
        ))}
      </ul>

      {/* The tail is the first thing to drop — translations run different
          lengths, and a wrapped pill reads as a broken box. */}
      <p className="ms-mono flex items-center gap-x-2.5 whitespace-nowrap text-[0.5625rem]">
        <span className="text-bone">
          {t.hero.pill.lead} {clients.length} {t.hero.pill.companies}
        </span>
        <span className="hidden text-gold-600 md:inline" aria-hidden="true">
          ◆
        </span>
        <span className="hidden md:inline">{t.hero.pill.tail}</span>
      </p>
    </div>
  );
}

/**
 * The one number a creator actually came for. Honest because every input is
 * printed next to it — this is a model, and it says so.
 */
function EarningsCard({ t }: { t: Dictionary }) {
  return (
    <div className="ms-panel ms-gloss ms-rim p-5 shadow-[0_28px_70px_-30px_rgba(0,0,0,0.9)] sm:p-6">
      <p className="ms-mono text-[0.5625rem]">{t.hero.earnings.lead}</p>

      <p className="ms-figure ms-money mt-2.5 text-[clamp(1.9rem,3.6vw,2.75rem)]">
        {money.format(SAMPLE_REVENUE)}
      </p>

      <p className="ms-mono mt-2 text-[0.5rem] normal-case leading-[1.7] tracking-[0.1em]">
        {t.hero.earnings.inputs}
      </p>

      <a
        href="#calculator"
        className="ms-mono mt-4 inline-flex items-center gap-2 text-gold-200 underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-80"
      >
        {t.hero.earnings.cta}
        <Arrow />
      </a>
    </div>
  );
}

export function Arrow() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
      <path d="M0.5 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
