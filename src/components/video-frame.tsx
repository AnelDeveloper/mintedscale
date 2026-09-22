"use client";

import { useRef, useState } from "react";

/**
 * A video slot. Give it a `src` and it plays; leave `src` empty and it renders
 * a reserved frame so the layout is already right when the footage lands.
 * Files go in /public/videos — reference them as "/videos/name.mp4".
 */
export function VideoFrame({
  src,
  poster,
  label,
  duration,
  reservedLabel,
  playLabel,
  ratio = "16/9",
  className = "",
}: {
  src?: string;
  poster?: string;
  label: string;
  duration?: string;
  reservedLabel: string;
  playLabel: string;
  ratio?: "16/9" | "9/16";
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const aspect = ratio === "9/16" ? "aspect-[9/16]" : "aspect-video";

  if (!src) {
    return (
      <div className={`ms-video ms-gloss ${aspect} ${className}`}>
        {/* A pool of light where the film will be, so the empty frame reads
            as a stage waiting rather than a box that failed to load. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_44%_52%_at_50%_46%,rgba(217,169,76,0.14),transparent_72%)]"
        />
        <span className="ms-strike-beam" aria-hidden="true" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <span
            className="ms-play ms-ring h-14 w-14 opacity-70 sm:h-16 sm:w-16"
            aria-hidden="true"
          >
            <PlayGlyph />
          </span>
          <span className="ms-mono text-gold-200">{label}</span>
          <span className="ms-mono text-[0.5625rem] normal-case tracking-[0.14em] text-char">
            {reservedLabel}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`ms-video group ${aspect} ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster || undefined}
        preload="metadata"
        playsInline
        controls={playing}
        className="absolute inset-0 h-full w-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {!playing ? (
        <button
          type="button"
          onClick={() => void videoRef.current?.play()}
          className="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-4 bg-[rgba(8,7,6,0.35)] transition-colors duration-500 hover:bg-[rgba(8,7,6,0.2)]"
          aria-label={`${playLabel}: ${label}`}
        >
          <span className="ms-play ms-ring h-16 w-16 sm:h-20 sm:w-20" aria-hidden="true">
            <PlayGlyph />
          </span>
          <span className="ms-mono text-gold-200">{label}</span>
          {duration ? <span className="ms-mono text-[0.5625rem]">{duration}</span> : null}
        </button>
      ) : null}
    </div>
  );
}

function PlayGlyph() {
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor">
      <path d="M17 8.27a2 2 0 0 1 0 3.46L3 19.8A2 2 0 0 1 0 18.06V1.94A2 2 0 0 1 3 .2z" />
    </svg>
  );
}
