import { media } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";
import { AppShot } from "./app-shot";
import { Arrow } from "./hero";
import { Eyebrow, Lede } from "./section";
import { VideoFrame } from "./video-frame";

/** The AI monetization system — the thing no other studio on the list has. */
export function Engine({ t }: { t: Dictionary }) {
  const e = t.engine;

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

      <div className="relative mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] py-[clamp(3.25rem,6.5vh,5rem)]">
        <div className="mb-[clamp(1.4rem,2.6vw,2.25rem)]" data-reveal>
          <Eyebrow index={e.index}>{e.eyebrow}</Eyebrow>
        </div>

        <div className="grid gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="ms-display text-[clamp(1.7rem,3.2vw,2.6rem)]" data-reveal>
            <span className="block text-bone">{e.headline[0]}</span>
            <span className="ms-gold-sweep block">{e.headline[1]}</span>
          </h2>

          <div>
            <Lede>{e.body}</Lede>
            <p
              className="ms-serif mt-6 text-[clamp(1.05rem,1.7vw,1.35rem)] leading-[1.4] text-gold-200"
              data-reveal
              style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
            >
              {e.serif}
            </p>
          </div>
        </div>

        <div className="mt-[clamp(1.75rem,3.2vw,2.75rem)] grid gap-[clamp(1.5rem,3vw,2.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start">
          {/* Modules */}
          <div className="grid gap-px border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-2">
            {e.modules.map((module, i) => (
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

                <h3 className="ms-display-soft mt-6 text-[clamp(1.05rem,1.7vw,1.25rem)] text-bone">
                  {module.title}
                </h3>
                <p className="mt-3 text-[0.875rem] leading-[1.7] text-ash">{module.body}</p>

                <div className="mt-6 border-t border-[var(--rule)] pt-4">
                  <p className="ms-figure ms-gold text-[1.2rem]">{module.metric}</p>
                  <p className="ms-mono mt-1.5 text-[0.5625rem]">{e.producesLabel}</p>
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
            <AppShot
              src={media.engineApp.src}
              alt={e.appCaption}
              caption={e.appCaption}
              note={e.appNote}
              fallback={
                <VideoFrame
                  src={media.engineVideo.src}
                  poster={media.engineVideo.poster}
                  label={e.videoLabel}
                  reservedLabel={t.video.reserved}
                  playLabel={t.video.play}
                  ratio="16/9"
                />
              }
            />

            <div className="ms-panel ms-gloss relative mt-4 p-6">
              <p className="text-[0.9375rem] leading-[1.7] text-bone">{e.asideBody}</p>
              <a href="#apply" className="ms-btn ms-btn-gold ms-sheen mt-6 w-full">
                {e.asideCta}
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
