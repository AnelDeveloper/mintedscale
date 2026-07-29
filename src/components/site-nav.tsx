"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navTargets, site } from "@/lib/config";
import { locales, type Dictionary, type Locale } from "@/lib/i18n";
import { CoinMark } from "./coin-mark";

const LABELS: Record<Locale, string> = { en: "EN", bs: "BHS" };

export function SiteNav({ t }: { t: Dictionary }) {
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
        <a href="#top" className="flex items-center gap-2.5" aria-label={site.name}>
          <CoinMark size={30} id="nav" />
          <span className="ms-display text-[1rem] leading-none tracking-[0.01em]">
            <span className="text-bone">Minted</span>
            <span className="ms-gold">Scale</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {t.nav.map((label, i) => (
            <a
              key={label}
              href={navTargets[i]}
              className="ms-mono py-2 transition-colors duration-300 hover:text-gold-200"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitch current={t.locale as Locale} label={t.langLabel} />

          <a href="#apply" className="ms-btn ms-btn-gold ms-sheen hidden px-5 py-3 sm:inline-flex">
            {t.applyCta}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--rule-gold)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.menuClose : t.menuOpen}
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
          {t.nav.map((label, i) => (
            <a
              key={label}
              href={navTargets[i]}
              onClick={() => setOpen(false)}
              className="ms-display border-b border-[var(--rule)] py-4 text-2xl text-bone transition-colors duration-300 hover:text-gold-200"
            >
              {label}
            </a>
          ))}
          <a href="#apply" onClick={() => setOpen(false)} className="ms-btn ms-btn-gold mt-5">
            {t.applyCta}
          </a>
        </nav>
      </div>
    </header>
  );
}

/**
 * Swaps the locale segment of the current path. Real links, not a JS toggle,
 * so each language is a URL you can share and a search engine can index.
 */
function LangSwitch({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname() ?? `/${current}`;

  return (
    <div
      className="flex items-center rounded-full border border-[var(--rule-gold)] p-0.5"
      role="group"
      aria-label={label}
    >
      {locales.map((locale) => {
        const active = locale === current;
        const href = pathname.replace(/^\/[^/]+/, `/${locale}`);

        return (
          <a
            key={locale}
            href={href}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            className={`ms-mono rounded-full px-2.5 py-1.5 text-[0.5625rem] transition-colors duration-300 ${
              active ? "bg-[rgba(217,169,76,0.16)] text-gold-100" : "text-ash hover:text-gold-200"
            }`}
          >
            {LABELS[locale]}
          </a>
        );
      })}
    </div>
  );
}
