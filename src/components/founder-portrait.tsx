"use client";

import { useEffect, useRef, useState } from "react";
import { CoinMark } from "./coin-mark";

/**
 * The founder photo. Falls back to the coin monogram until the file exists.
 *
 * Same pre-hydration guard as the client logos: a server-rendered <img> starts
 * loading before React can attach onError, so a missing file has to be caught
 * on mount by looking for a completed load with zero natural width. Without
 * it, a 404 leaves Chrome's broken-image icon sitting in the panel.
 */
export function FounderPortrait({
  src,
  alt,
  founder,
  slotLabel,
}: {
  src: string;
  alt: string;
  founder: string;
  slotLabel: string;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  const showPhoto = Boolean(src) && !failed;

  return (
    <div
      className="relative flex aspect-[10/19] items-center justify-center overflow-hidden bg-ink sm:aspect-[3/4] lg:aspect-auto lg:min-h-[16rem]"
      data-reveal
    >
      {showPhoto ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
          {/* Warm the photo into the page rather than letting it sit as a
              rectangle of daylight against the black. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(8,7,6,0.15) 0%, transparent 35%, rgba(8,7,6,0.55) 100%)",
            }}
          />
          <span className="ms-mono absolute bottom-4 left-0 right-0 text-center text-gold-200">
            {founder}
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
          <CoinMark size={44} id="portrait" />
          <p className="ms-mono text-gold-200">{founder}</p>
          <p className="ms-mono text-[0.5625rem] normal-case tracking-[0.14em] text-char">
            {slotLabel}
          </p>
        </div>
      )}
    </div>
  );
}
