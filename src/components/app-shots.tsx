"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { media } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";

/**
 * The product screens, with a lightbox.
 *
 * Built on the native <dialog> and showModal(), which gives focus trapping,
 * Escape-to-close and an inert backdrop without hand-rolling any of it.
 */
export function AppShots({ t }: { t: Dictionary }) {
  const e = t.engine;
  const shots = media.engineShots;

  /*
    Two pieces of state, not one nullable index. Tying the dialog's content to
    "is it open" meant the figure unmounted on close and could still be
    unmounted on the next open, leaving an empty dialog.
  */
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const requestClose = useCallback(() => dialogRef.current?.close(), []);

  const step = useCallback(
    (delta: number) => setCurrent((i) => (i + delta + shots.length) % shots.length),
    [shots.length],
  );

  /*
    Watch the `open` attribute rather than the close event.

    React's onClose never fires — the dialog's close event does not bubble, so
    the delegated handler at the root never sees it — and an imperative
    addEventListener("close") did not fire reliably either. Every close path,
    including Escape which the browser handles itself, toggles this attribute,
    so observing it cannot miss one. Missing it left `isOpen` stuck at true,
    and the next click on a thumbnail then did nothing at all.
  */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const sync = () => {
      if (!dialog.open) {
        setIsOpen(false);
        openerRef.current?.focus();
      }
    };

    const observer = new MutationObserver(sync);
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
  }, [isOpen]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  };

  return (
    <div className="mt-[clamp(2rem,3.6vw,3rem)]">
      <p className="ms-mono text-gold-400" data-reveal>
        {e.shotsLabel}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {shots.map((shot, i) => (
          <figure
            key={shot.key}
            data-reveal
            style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
          >
            <button
              type="button"
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setCurrent(i);
                setIsOpen(true);
              }}
              className="ms-card ms-gloss group block w-full cursor-zoom-in overflow-hidden"
              aria-label={`${e.enlarge}: ${e.shots[i]}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={e.shots[i]}
                loading="lazy"
                className="block h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
              />
            </button>
            <figcaption className="ms-mono mt-3 text-[0.5rem] normal-case leading-[1.7] tracking-[0.1em]">
              {e.shots[i]}
            </figcaption>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onKeyDown={onKeyDown}
        onClick={(event) => {
          // Clicking the backdrop means clicking the dialog itself; a click
          // that lands on the figure inside must not close it.
          if (event.target === dialogRef.current) requestClose();
        }}
        className="ms-lightbox"
        aria-label={e.shotsLabel}
      >
        <figure className="m-0 flex max-h-[92vh] max-w-[94vw] flex-col items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shots[current].src}
            alt={e.shots[current]}
            className="max-h-[78vh] w-auto max-w-full rounded-[var(--radius)] border border-[var(--rule-gold)] object-contain"
          />

          <figcaption className="ms-mono max-w-[70ch] text-center text-[0.5625rem] normal-case leading-[1.7] tracking-[0.1em]">
            {e.shots[current]}
          </figcaption>

          {/* Close sits with the arrows rather than floating above the figure —
              anchored to the top it drifted off-screen on a tall image. */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              className="ms-btn ms-btn-outline px-4 py-2"
              aria-label="←"
            >
              ←
            </button>
            <span className="ms-mono min-w-[4ch] text-center text-[0.5625rem]">
              {current + 1} / {shots.length}
            </span>
            <button
              type="button"
              onClick={() => step(1)}
              className="ms-btn ms-btn-outline px-4 py-2"
              aria-label="→"
            >
              →
            </button>
            <button
              type="button"
              onClick={requestClose}
              className="ms-btn ms-btn-gold ms-sheen ml-2 px-5 py-2"
            >
              {e.close}
            </button>
          </div>
        </figure>
      </dialog>
    </div>
  );
}
