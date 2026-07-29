import { calculator, hero, site, studio } from "@/lib/content";
import { VideoFrame } from "./video-frame";

/**
 * Derived from the calculator's own model, not typed by hand — the headline
 * number in the hero can never drift away from what the calculator computes.
 */
const SAMPLE = { followers: 100_000, engagement: 3, price: 120 };
const SAMPLE_REVENUE = Math.round(
  SAMPLE.followers * (SAMPLE.engagement / 100) * calculator.launchConversion * SAMPLE.price,
);
const money = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] pb-[clamp(3rem,7vh,5rem)] pt-[clamp(6.5rem,13vh,8.5rem)]">
        <div className="grid items-center gap-[clamp(2rem,3.6vw,3.25rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          {/* ── Left: the pitch ── */}
          <div className="min-w-0">
            <div className="ms-rise" style={{ animationDelay: "40ms" }}>
              <TrustPill />
            </div>

            <h1 className="ms-display mt-[clamp(1.25rem,2.5vw,1.75rem)] text-[clamp(1.95rem,4vw,3.25rem)]">
              <span className="ms-rise block text-bone" style={{ animationDelay: "140ms" }}>
                {hero.headline[0]}
              </span>
              <span className="ms-rise ms-gold-sweep block" style={{ animationDelay: "220ms" }}>
                {hero.headline[1]}
              </span>
            </h1>

            <p
              className="ms-rise ms-serif mt-5 text-[clamp(1.05rem,1.7vw,1.35rem)] text-gold-200"
              style={{ animationDelay: "300ms" }}
            >
              {site.tagline}
            </p>

            <p
              className="ms-rise mt-5 max-w-[46ch] text-[clamp(0.9375rem,1.2vw,1.0625rem)] leading-[1.7] text-ash"
              style={{ animationDelay: "360ms" }}
            >
              {hero.sub}
            </p>

            <div
              className="ms-rise mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "440ms" }}
            >
              <a href="#apply" className="ms-btn ms-btn-gold w-full sm:w-auto">
                {hero.primaryCta}
                <Arrow />
              </a>
              <a href="#method" className="ms-btn ms-btn-outline ms-sheen w-full sm:w-auto">
                {hero.secondaryCta}
              </a>
            </div>

            {/* Terms at a glance — small, not a billboard */}
            <dl className="ms-rise mt-8 flex flex-wrap gap-x-8 gap-y-4" style={{ animationDelay: "520ms" }}>
              {hero.bar.map((item) => (
                <div key={item.label}>
                  <dt className="ms-figure ms-gold whitespace-nowrap text-[1.25rem]">{item.value}</dt>
                  <dd className="ms-mono mt-1.5 text-[0.5625rem]">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Right: the film, with the number that matters clipped to it ── */}
          <div
            className="ms-rise relative min-w-0 sm:pb-[clamp(4rem,8vw,6rem)]"
            style={{ animationDelay: "560ms" }}
          >
            <VideoFrame
              src={hero.video.src}
              poster={hero.video.poster}
              label={hero.video.label}
              duration={hero.video.duration}
              ratio="16/9"
            />

            <EarningsCard />
          </div>
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
function TrustPill() {
  const { items } = studio.clients;

  return (
    <div className="ms-panel ms-gloss inline-flex flex-wrap items-center gap-x-4 gap-y-2 !rounded-full py-2 pl-2 pr-5">
      <ul className="flex items-center">
        {items.map((client, i) => (
          <li
            key={client.label}
            /* Logos get a light backing — plenty of marks are dark ink on
               transparent, and would vanish against the black. */
            className={`relative grid h-8 w-8 place-items-center overflow-hidden rounded-full border border-[var(--rule-gold)] ${
              client.logo ? "bg-bone" : "bg-ink"
            }`}
            style={{ marginLeft: i === 0 ? 0 : "-0.55rem", zIndex: items.length - i }}
            title={client.label}
          >
            {client.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={client.logo} alt={client.label} className="h-full w-full object-cover" />
            ) : (
              <span className="ms-mono text-[0.5rem] tracking-[0.06em] text-gold-200">
                {client.initials}
              </span>
            )}
          </li>
        ))}
      </ul>

      <p className="ms-mono flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.5625rem]">
        <span className="text-bone">
          {studio.pill.lead} {items.length} companies
        </span>
        <span className="text-gold-600" aria-hidden="true">
          ◆
        </span>
        <span>{studio.pill.tail}</span>
      </p>
    </div>
  );
}

/**
 * The one number a creator actually came for. Honest because every input is
 * printed next to it — this is a model, and it says so.
 */
function EarningsCard() {
  // Stacked under the film on a phone — overlapping it there would bury most
  // of the frame. It only floats once there is room to float in.
  return (
    <div className="ms-panel ms-gloss mt-4 p-5 shadow-[0_28px_70px_-30px_rgba(0,0,0,0.9)] sm:absolute sm:bottom-0 sm:left-[-1rem] sm:right-[clamp(2rem,12%,6rem)] sm:mt-0 sm:p-6">
      <p className="ms-mono text-[0.5625rem]">What a 100K audience earns</p>

      <p className="ms-figure ms-money mt-2.5 text-[clamp(1.9rem,3.6vw,2.75rem)]">
        {money.format(SAMPLE_REVENUE)}
      </p>

      <p className="ms-mono mt-2 text-[0.5rem] normal-case leading-[1.7] tracking-[0.1em]">
        First launch · {SAMPLE.engagement}% engagement · {money.format(SAMPLE.price)} product
      </p>

      <a
        href="#calculator"
        className="ms-mono mt-4 inline-flex items-center gap-2 text-gold-200 underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-80"
      >
        Run your numbers
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
