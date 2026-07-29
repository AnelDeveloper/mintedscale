"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { CoinMark } from "./coin-mark";

export function SiteNav() {
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        lifted
          ? "border-b border-[var(--rule)] bg-[rgba(8,7,6,0.78)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[var(--shell)] items-center justify-between gap-4 px-[var(--gutter)]">
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <CoinMark size={30} id="nav" />
          <span className="ms-display text-[1rem] leading-none tracking-[0.01em]">
            <span className="text-bone">Minted</span>
            <span className="ms-gold">Scale</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="ms-mono py-2 transition-colors duration-300 hover:text-gold-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#apply" className="ms-btn ms-btn-gold ms-sheen hidden px-5 py-3 sm:inline-flex">
            Apply now
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center border border-[var(--rule-gold)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="relative block h-[9px] w-4">
              <span
                className={`absolute left-0 block h-px w-4 bg-gold-300 transition-transform duration-300 ${
                  open ? "top-1 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-4 bg-gold-300 transition-transform duration-300 ${
                  open ? "top-1 -rotate-45" : "top-2"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-[var(--rule)] bg-[rgba(8,7,6,0.98)] backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Primary mobile" className="flex flex-col px-[var(--gutter)] py-5">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="ms-display border-b border-[var(--rule)] py-4 text-2xl text-bone transition-colors duration-300 hover:text-gold-200"
            >
              {item.label}
            </a>
          ))}
          <a href="#apply" onClick={() => setOpen(false)} className="ms-btn ms-btn-gold mt-5">
            Apply now
          </a>
        </nav>
      </div>
    </header>
  );
}
