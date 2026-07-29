import { hero, site } from "@/lib/content";
import { CoinMark } from "./coin-mark";
import { VideoFrame } from "./video-frame";

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] pb-[clamp(3rem,7vh,5rem)] pt-[clamp(7rem,16vh,10rem)]">
        {/* Coin, struck and slowly turning under the light */}
        <div className="ms-rise flex justify-center" style={{ animationDelay: "40ms" }}>
          <span className="relative flex h-16 w-16 items-center justify-center">
            <span
              className="ms-orbit absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(240,212,134,0.55) 60deg, transparent 130deg, transparent 360deg)",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
              }}
              aria-hidden="true"
            />
            <CoinMark size={52} id="hero" />
          </span>
        </div>

        <div className="ms-rise mt-7 flex justify-center" style={{ animationDelay: "120ms" }}>
          <p className="ms-eyebrow flex-wrap justify-center text-center">
            <span>{hero.eyebrow}</span>
            <span className="text-gold-600" aria-hidden="true">
              ◆
            </span>
            <span>{site.established}</span>
          </p>
        </div>

        <h1 className="ms-display mt-[clamp(1.5rem,3.5vw,2.5rem)] text-center text-[clamp(2.6rem,9.2vw,7.4rem)]">
          <span className="ms-rise block text-bone" style={{ animationDelay: "200ms" }}>
            {hero.headline[0]}
          </span>
          <span className="ms-rise ms-gold-sweep block" style={{ animationDelay: "300ms" }}>
            {hero.headline[1]}
          </span>
        </h1>

        <p
          className="ms-rise ms-serif mt-6 text-center text-[clamp(1.15rem,2.2vw,1.75rem)] text-gold-200"
          style={{ animationDelay: "380ms" }}
        >
          {site.tagline}
        </p>

        <p
          className="ms-rise mx-auto mt-7 max-w-[54ch] text-center text-[clamp(1rem,1.4vw,1.1875rem)] leading-[1.65] text-ash"
          style={{ animationDelay: "440ms" }}
        >
          {hero.sub}
        </p>

        <div
          className="ms-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "520ms" }}
        >
          <a href="#apply" className="ms-btn ms-btn-gold w-full px-8 py-[1.1rem] sm:w-auto">
            {hero.primaryCta}
            <Arrow />
          </a>
          <a href="#results" className="ms-btn ms-btn-outline ms-sheen w-full sm:w-auto">
            {hero.secondaryCta}
          </a>
        </div>

        {/* The film */}
        <div className="ms-rise mt-[clamp(3rem,6vw,4.5rem)]" style={{ animationDelay: "620ms" }}>
          <div className="relative">
            <VideoFrame
              src={hero.video.src}
              poster={hero.video.poster}
              label={hero.video.label}
              duration={hero.video.duration}
              ratio="16/9"
            />
          </div>

          {/* Struck strip beneath the film */}
          <div className="ms-panel ms-rim relative grid grid-cols-1 divide-y divide-[var(--rule)] border-t-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {hero.bar.map((item) => (
              <div key={item.label} className="px-6 py-5 text-center">
                <p className="ms-figure ms-gold text-[clamp(1.75rem,3.2vw,2.5rem)]">{item.value}</p>
                <p className="ms-mono mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p
          className="ms-rise ms-mono mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-[0.625rem]"
          style={{ animationDelay: "720ms" }}
        >
          <span className="ms-live-dot block h-1.5 w-1.5 rounded-full bg-gold-300" aria-hidden="true" />
          The mint is open
          <span className="text-gold-800" aria-hidden="true">
            ◆
          </span>
          <a
            href="#apply"
            className="text-gold-200 underline-offset-4 transition-opacity hover:underline hover:opacity-80"
          >
            Book a strategy call
          </a>
        </p>
      </div>
    </section>
  );
}

export function Arrow() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
      <path d="M0.5 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
