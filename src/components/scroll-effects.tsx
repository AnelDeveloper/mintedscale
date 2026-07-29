"use client";

import { useEffect } from "react";

/**
 * One observer for the whole page. Elements opt in with `data-reveal`;
 * CSS handles the transition so server components stay server components.
 */
export function ScrollEffects() {
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

    const observer = new IntersectionObserver(
      (entries) => {
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

    // Last line of defence: if the observer never delivers — throttled tab,
    // odd embedding, a browser we did not anticipate — show everything anyway.
    const safety = window.setTimeout(revealAll, 2500);

    return () => {
      window.clearTimeout(safety);
      observer.disconnect();
    };
  }, []);

  return null;
}

/** Count-up for the proof figures. Fires once, when the number is on screen. */
export function useCountUp(
  ref: React.RefObject<HTMLElement | null>,
  target: number,
  onTick: (value: number) => void,
  decimals = 0,
) {
  const round = (v: number) =>
    decimals > 0 ? Number(v.toFixed(decimals)) : Math.round(v);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      onTick(target);
      return;
    }

    let frame = 0;
    let started = false;

    const run = () => {
      const duration = 1500;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        // easeOutExpo — fast arrival, long settle, reads as a counter locking in
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        onTick(round(target * eased));
        if (p < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (started) return;
      started = true;
      run();
      observer.disconnect();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) start();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    // A figure stuck at zero is worse than one that never animated.
    const safety = window.setTimeout(() => {
      if (!started) {
        started = true;
        observer.disconnect();
        onTick(target);
      }
    }, 2500);

    return () => {
      window.clearTimeout(safety);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [ref, target, onTick, decimals]);
}
