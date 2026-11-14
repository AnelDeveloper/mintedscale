import type { MetadataRoute } from "next";
import { media, site } from "@/lib/config";
import { getDictionary, locales } from "@/lib/i18n";

/**
 * One entry per language, each naming the other as its translation, so the
 * hreflang pairing in the page head is confirmed here as well. The intro film
 * is listed with each page: that is what lets it appear in video results.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const film = media.heroVideo;
  const languages = Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}`]));

  return locales.map((locale) => {
    const t = getDictionary(locale);
    return {
      url: `${site.url}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: locale === "en" ? 1 : 0.9,
      alternates: { languages: { ...languages, "x-default": `${site.url}/en` } },
      images: [`${site.url}/og-${locale}.jpg`],
      videos: [
        {
          title: t.seo.film.name,
          description: t.seo.film.description,
          thumbnail_loc: `${site.url}${film.poster}`,
          content_loc: `${site.url}${film.src}`,
          duration: film.seconds,
          publication_date: film.uploaded,
          family_friendly: "yes",
        },
      ],
    };
  });
}
