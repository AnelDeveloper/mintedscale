import { bs } from "./bs";
import { en, type Dictionary, type Locale } from "./en";

export type { Dictionary, Locale };

/**
 * `bs` covers Bosnian, Croatian and Serbian — one language for this purpose,
 * labelled BHS in the switcher. The URL uses the ISO code so `<html lang>`
 * stays valid.
 */
export const locales: Locale[] = ["en", "bs"];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Dictionary> = { en, bs };

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

export function getDictionary(locale: string): Dictionary {
  return isLocale(locale) ? dictionaries[locale] : dictionaries[defaultLocale];
}

/** Swaps `{name}` placeholders. Keeps the translations free of concatenation. */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
}

/** The other locale, for the switcher. */
export function otherLocale(current: Locale): Locale {
  return current === "en" ? "bs" : "en";
}
