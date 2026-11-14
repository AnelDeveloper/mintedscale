"use client";

import { useEffect } from "react";

/**
 * One observer for the whole page. Elements opt in with `data-reveal`;
 * CSS handles the transition so server components stay server components.
 */
export function ScrollEffects() {
  useEffect(() => armCounters(), []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const revealAll = () => targets.forEach((el) => el.classList.add("is-in"));

    if (reduced || typeof IntersectionObserver === "undefined") {
      revealAll();
      return;
    }

    // Anything already on screen is revealed synchronously — no visitor should
    // ever wait on a callback to read the page.
    const viewportHeight = window.innerHeight;
    for (const el of targets) {
      const box = el.getBoundingClientRect();
      if (box.top < viewportHeight && box.bottom > 0) el.classList.add("is-in");
    }

    let delivered = false;

    const observer = new IntersectionObserver(
      (entries) => {
        // The first callback is proof the observer works, so the blunt
        // reveal-everything fallback armed in the document head can stand
        // down. Left in place it shows every section two seconds after load,
        // and nothing further down the page ever animates in.
        if (!delivered) {
          delivered = true;
          window.__msRevealOk = true;
          window.clearTimeout(window.__msRevealSafety);
          document.documentElement.classList.remove("ms-reveal-all");
        }

        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    targets.forEach((el) => observer.observe(el));

    /*
      Last line of defence: an observer that never delivers a single callback
      — throttled tab, odd embedding, a browser we did not anticipate — must
      not leave the page blank. One that is delivering is left alone.

      The clock only runs while the tab is visible. A hidden tab does not get
      intersection callbacks at all, so a timer running in the background
      would "catch" a perfectly healthy observer and flatten the page.
    */
    let safety = 0;
    const arm = () => {
      safety = window.setTimeout(() => {
        if (!delivered) revealAll();
      }, 2500);
    };

    const onVisible = () => {
      if (document.hidden) return;
      document.removeEventListener("visibilitychange", onVisible);
      arm();
    };

    if (document.hidden) {
      document.addEventListener("visibilitychange", onVisible);
    } else {
      arm();
    }

    return () => {
      window.clearTimeout(safety);
      document.removeEventListener("visibilitychange", onVisible);
      observer.disconnect();
    };
  }, []);

  return null;
}

declare global {
  interface Window {
    /** Both set by the inline head script; see the comment there. */
    __msRevealSafety?: number;
    __msRevealOk?: boolean;
  }
}

/**
 * The mint: any figure marked `data-count` strikes up from zero the first
 * time it comes on screen, and locks on the real value.
 *
 * The server always renders the final number, so crawlers, visitors without
 * JS and anyone who prefers reduced motion only ever see the true figure —
 * and an observer that never reports simply leaves it standing. The value of
 * the attribute is a delay in ms, to land the count with an entrance that is
 * still playing. Figures with no digits ("Rev share") or a zero ("€0") are
 * left alone: counting to nothing says nothing.
 */
function armCounters(): () => void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
  if (reduced || nodes.length === 0 || typeof IntersectionObserver === "undefined") {
    return () => {};
  }

  const timers: number[] = [];
  const frames = new Set<number>();

  const strike = (el: HTMLElement) => {
    const final = el.textContent ?? "";
    const match = final.match(/\d[\d.,]*/);
    if (!match || match.index === undefined) return;

    const digits = match[0];
    const target = Number(digits.replace(/[.,]/g, ""));
    if (!target) return;

    // Keep whatever grouping the figure was written with: "€7,500" stays
    // comma-grouped all the way up, "1.000" stays dot-grouped.
    const separator = digits.match(/\d([.,])\d{3}/)?.[1] ?? "";
    const group = (n: number) =>
      separator ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, separator) : String(n);
    const before = final.slice(0, match.index);
    const after = final.slice(match.index + digits.length);

    // Hold the finished width so the row beside it never reflows mid-count.
    el.style.minWidth = `${el.getBoundingClientRect().width}px`;
    el.textContent = `${before}${group(0)}${after}`;

    timers.push(
      window.setTimeout(() => {
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / 1400, 1);
          // easeOutExpo — fast arrival, long settle, reads as a press locking in
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          el.textContent = p === 1 ? final : `${before}${group(Math.round(target * eased))}${after}`;
          if (p < 1) {
            const id = requestAnimationFrame(step);
            frames.add(id);
          } else {
            el.style.minWidth = "";
          }
        };
        frames.add(requestAnimationFrame(step));
      }, Number(el.dataset.count) || 0),
    );
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        strike(entry.target as HTMLElement);
      }
    },
    { threshold: 0.4 },
  );
  nodes.forEach((el) => observer.observe(el));

  return () => {
    observer.disconnect();
    timers.forEach((id) => window.clearTimeout(id));
    frames.forEach((id) => cancelAnimationFrame(id));
  };
}
