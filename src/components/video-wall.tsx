import { videoWall } from "@/lib/content";
import { Heading, Lede, Section } from "./section";
import { VideoFrame } from "./video-frame";

/**
 * Creator testimonials in the format creators already shoot: portrait 9:16.
 * Slots render empty and clearly reserved until footage is dropped into
 * /public/videos and wired up in content.ts.
 */
export function VideoWall() {
  return (
    <Section id="voices" index={videoWall.index} eyebrow={videoWall.eyebrow}>
      <div className="grid gap-[clamp(1.5rem,4vw,4rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end">
        <Heading lines={videoWall.headline} />
        <Lede>{videoWall.body}</Lede>
      </div>

      <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {videoWall.items.map((item, i) => (
          <figure
            key={item.id}
            data-reveal
            style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
          >
            <VideoFrame
              src={item.src}
              poster={item.poster}
              label={item.handle}
              ratio="9/16"
            />
            <figcaption className="mt-3">
              <p className="text-[0.9375rem] text-bone">{item.name}</p>
              <p className="ms-mono mt-1 text-[0.5625rem]">{item.handle}</p>
              <p className="ms-figure mt-2 text-[1.125rem] text-gold-300">{item.result}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
