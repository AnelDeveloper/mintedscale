import { media } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";
import { AppShots } from "./app-shots";
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
          {/* Five agents, listed vertically the way the poster lists them —
              a 2x2 grid would leave the fifth one orphaned. */}
          <ul className="grid gap-px border border-[var(--rule)] bg-[var(--rule)]">
            {e.modules.map((module, i) => (
              <li
                key={module.code}
                className="ms-sheen group relative overflow-hidden bg-ink p-5 transition-colors duration-500 hover:bg-[rgba(22,18,14,0.95)] sm:p-6"
                data-reveal
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              >
                <div className="flex items-baseline gap-4">
                  <span className="ms-mono shrink-0 text-gold-400">{module.code}</span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="ms-display-soft text-[1.05rem] text-bone">{module.title}</h3>
                      <p className="ms-mono text-[0.5625rem] text-gold-300">{module.tag}</p>
                    </div>

                    <p className="mt-2.5 max-w-[62ch] text-[0.875rem] leading-[1.7] text-ash">
                      {module.body}
                    </p>

                    <p className="ms-mono mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.5625rem]">
                      <span className="block h-px w-4 shrink-0 bg-gold-600" aria-hidden="true" />
                      {e.producesLabel}
                      <span className="text-gold-200">{module.metric}</span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Engine film + CTA */}
          <div
            className="lg:sticky lg:top-28"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <figure>
              <VideoFrame
                src={media.engineVideo.src}
                poster={media.engineVideo.poster}
                label={e.videoLabel}
                reservedLabel={t.video.reserved}
                playLabel={t.video.play}
                ratio="16/9"
              />
              {/* The deck in the recording carries a creator name and a
                  revenue figure. Saying it is sample data keeps a product
                  demo from reading as a client result. */}
              <figcaption className="ms-mono mt-3 text-[0.5rem] normal-case leading-[1.7] tracking-[0.1em]">
                {e.videoNote}
              </figcaption>
            </figure>

            <div className="ms-panel ms-gloss relative mt-4 p-6">
              <p className="text-[0.9375rem] leading-[1.7] text-bone">{e.asideBody}</p>
              <a href="#apply" className="ms-btn ms-btn-gold ms-sheen mt-6 w-full">
                {e.asideCta}
                <Arrow />
              </a>
            </div>
          </div>
        </div>

        <AppShots t={t} />

      </div>
    </section>
  );
}
