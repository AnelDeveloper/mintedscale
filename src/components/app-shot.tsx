"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The phone shot of the audit output.
 *
 * Same pre-hydration guard as ClientLogo: a server-rendered <img> starts
 * loading before React can attach onError, so a missing file has to be caught
 * on mount by looking for a completed load with zero natural width. Until the
 * file exists, the caller's fallback renders instead.
 */
export function AppShot({
  src,
  alt,
  caption,
  note,
  fallback,
}: {
  src: string;
  alt: string;
  caption: string;
  note: string;
  fallback: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (!src || failed) return <>{fallback}</>;

  return (
    <figure className="relative">
      <div className="flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="h-auto w-full max-w-[17rem] drop-shadow-[0_40px_80px_rgba(0,0,0,0.85)]"
        />
      </div>

      {/* The chart in the shot reads like history; this line is what keeps the
          figure honest, so it is not optional decoration. */}
      <figcaption className="mt-4 text-center">
        <p className="ms-mono text-gold-300">{caption}</p>
        <p className="ms-mono mx-auto mt-2 max-w-[34ch] text-[0.5rem] normal-case leading-[1.7] tracking-[0.1em]">
          {note}
        </p>
      </figcaption>
    </figure>
  );
}
