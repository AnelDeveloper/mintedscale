import { engine } from "@/lib/content";
import { Arrow } from "./hero";
import { Eyebrow, Lede } from "./section";
import { VideoFrame } from "./video-frame";

/** The AI monetization system — the thing no other studio on the list has. */
export function Engine() {
  return (
    <section id="engine" className="relative scroll-mt-24 overflow-hidden border-t border-[var(--rule)]">
      {/* The engine runs hot: a gold field behind this section only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 78% 18%, rgba(217,169,76,0.14) 0%, transparent 68%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] py-[clamp(4.5rem,10vh,8.5rem)]">
        <div className="mb-[clamp(2rem,4vw,3.5rem)]" data-reveal>
          <Eyebrow index={engine.index}>{engine.eyebrow}</Eyebrow>
        </div>

        <div className="grid gap-[clamp(2rem,4vw,4rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="ms-display text-[clamp(2.2rem,5.6vw,4.6rem)]" data-reveal>
            <span className="block text-bone">{engine.headline[0]}</span>
            <span className="ms-gold-sweep block">{engine.headline[1]}</span>
          </h2>

          <div>
            <Lede>{engine.body}</Lede>
            <p
              className="ms-serif mt-6 text-[clamp(1.15rem,1.9vw,1.5rem)] leading-[1.4] text-gold-200"
              data-reveal
              style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
            >
              {engine.serif}
            </p>
          </div>
        </div>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1.5rem,3vw,2.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start">
          {/* Modules */}
          <div className="grid gap-px border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-2">
            {engine.modules.map((module, i) => (
              <article
                key={module.code}
                className="ms-sheen group relative overflow-hidden bg-ink p-6 transition-colors duration-500 hover:bg-[rgba(22,18,14,0.95)] sm:p-7"
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="ms-mono text-gold-400">{module.code}</span>
                  <span
                    className="block h-1.5 w-1.5 rotate-45 bg-gold-600 transition-colors duration-500 group-hover:bg-gold-200"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="ms-display-soft mt-6 text-[clamp(1.25rem,2vw,1.5rem)] text-bone">
                  {module.title}
                </h3>
                <p className="mt-3 text-[0.875rem] leading-[1.7] text-ash">{module.body}</p>

                <div className="mt-6 border-t border-[var(--rule)] pt-4">
                  <p className="ms-figure ms-gold text-[1.5rem]">{module.metric}</p>
                  <p className="ms-mono mt-1.5 text-[0.5625rem]">{module.metricLabel}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Engine film + CTA */}
          <div
            className="lg:sticky lg:top-28"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <VideoFrame
              src={engine.video.src}
              poster={engine.video.poster}
              label={engine.video.label}
              duration={engine.video.duration}
              ratio="16/9"
            />

            <div className="ms-panel ms-rim relative border-t-0 p-6">
              <p className="text-[0.9375rem] leading-[1.7] text-bone">
                Every partner build starts with an audit from the engine. You see the
                output before you commit to anything.
              </p>
              <a href="#apply" className="ms-btn ms-btn-gold ms-sheen mt-6 w-full">
                Run my audit
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
