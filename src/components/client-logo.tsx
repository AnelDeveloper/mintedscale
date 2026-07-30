"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A client's mark in a circle, with the initials as a fallback.
 *
 * The fallback is on an `onError`, not just on an empty path — so a logo file
 * that has not been added yet, or is misnamed, degrades to the monogram
 * instead of showing a broken image. That means logo files can be dropped in
 * at any time without a code change.
 *
 * object-contain, not cover: several of these marks are wide wordmarks, and
 * cover would crop them to an unreadable slice of the middle.
 */
export function ClientLogo({
  logo,
  initials,
  label,
  size,
  fill = false,
}: {
  logo: string;
  initials: string;
  label: string;
  size: number;
  /** True when the artwork is already a circle or full-bleed tile. */
  fill?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  /*
    onError alone is not enough. The <img> is server-rendered, so the browser
    starts loading it while parsing the HTML — long before React attaches an
    error handler. A file that 404s loses the event entirely and the broken
    image icon stays on screen.

    Once hydrated, a decoded-but-zero-width image is a failed one.
  */
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  const showLogo = Boolean(logo) && !failed;

  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-full border border-[var(--rule-gold)] ${
        showLogo ? (fill ? "bg-bone" : "bg-bone p-[9%]") : "bg-ink"
      }`}
      style={{ width: size, height: size }}
      title={label}
    >
      {showLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={logo}
          alt=""
          aria-hidden="true"
          onError={() => setFailed(true)}
          className={`h-full w-full ${fill ? "object-cover" : "object-contain"}`}
        />
      ) : (
        <span
          className="ms-mono text-gold-200"
          style={{ fontSize: Math.max(8, Math.round(size * 0.26)), letterSpacing: "0.04em" }}
          aria-hidden="true"
        >
          {initials}
        </span>
      )}
    </span>
  );
}
