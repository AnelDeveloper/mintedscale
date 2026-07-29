import { media } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";
import { Arrow } from "./hero";
import { Heading, Lede, Section } from "./section";
import { VideoFrame } from "./video-frame";

/**
 * Reserved, not invented. There are no partner testimonials yet, so the empty
 * frames ask the question instead of pretending to answer it.
 */
export function Films({ t }: { t: Dictionary }) {
  const f = t.films;

  return (
    <Section id="films" index={f.index} eyebrow={f.eyebrow}>
      <div className="grid gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end">
        <Heading lines={f.headline} />
        <Lede>{f.body}</Lede>
      </div>

      <div className="mt-[clamp(1.75rem,3.2vw,2.75rem)] grid grid-cols-1 gap-4 sm:grid-cols-3">
        {media.films.map((film, i) => (
          <figure
            key={film.id}
            data-reveal
            style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
          >
            <VideoFrame
              src={film.src}
              poster={film.poster}
              label={f.slotLabel}
              reservedLabel={t.video.reserved}
              playLabel={t.video.play}
              ratio="9/16"
            />
            <figcaption className="ms-mono mt-3 flex items-center justify-between gap-3">
              <span className="text-gold-300">{f.status}</span>
              <span className="text-[0.5625rem] text-char">
                {f.frameWord} {i + 1}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-[clamp(1.5rem,2.8vw,2.25rem)]" data-reveal>
        <a href="#apply" className="ms-btn ms-btn-gold ms-sheen">
          {f.cta}
          <Arrow />
        </a>
      </div>
    </Section>
  );
}
