import { films } from "@/lib/content";
import { Arrow } from "./hero";
import { Heading, Lede, Section } from "./section";
import { VideoFrame } from "./video-frame";

/**
 * Reserved, not invented. There are no partner testimonials yet, so the
 * section says so and shows the seats instead — which doubles as scarcity.
 */
export function Films() {
  return (
    <Section id="films" index={films.index} eyebrow={films.eyebrow}>
      <div className="grid gap-[clamp(1.5rem,4vw,4rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end">
        <Heading lines={films.headline} />
        <Lede>{films.body}</Lede>
      </div>

      <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-1 gap-4 sm:grid-cols-3">
        {films.items.map((item, i) => (
          <figure
            key={item.id}
            data-reveal
            style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
          >
            <VideoFrame
              src={item.src}
              poster={item.poster}
              label={item.seat}
              ratio="9/16"
            />
            <figcaption className="mt-3 flex items-baseline justify-between gap-3">
              <span className="ms-mono">{item.seat}</span>
              <span className="ms-mono text-[0.5625rem] text-gold-300">{item.status}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-[clamp(2rem,4vw,3rem)]" data-reveal>
        <a href="#apply" className="ms-btn ms-btn-gold ms-sheen">
          Take a seat
          <Arrow />
        </a>
      </div>
    </Section>
  );
}
