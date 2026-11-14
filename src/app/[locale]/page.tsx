import { Apply } from "@/components/apply";
import { Calculator } from "@/components/calculator";
import { Concepts } from "@/components/concepts";
import { Diagnosis } from "@/components/diagnosis";
import { Engine } from "@/components/engine";
import { Faq } from "@/components/faq";
import { Films } from "@/components/films";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { Method } from "@/components/method";
import { ScrollEffects } from "@/components/scroll-effects";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Studio } from "@/components/studio";
import { Work } from "@/components/work";
import { media, seo, site } from "@/lib/config";
import { getDictionary, locales } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);

  /*
    One linked graph rather than loose blocks: every node has an @id, so
    search engines read "this page, on this site, by this organisation,
    founded by this person, carrying this film" as one set of facts instead
    of guessing whether the Organization and the video belong together.
  */
  const pageUrl = `${site.url}/${t.locale}`;
  const film = media.heroVideo;
  const ids = {
    org: `${site.url}/#organization`,
    founder: `${site.url}/#founder`,
    website: `${site.url}/#website`,
    film: `${site.url}/#film`,
    page: `${pageUrl}#webpage`,
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ids.org,
        name: site.name,
        url: site.url,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}${seo.logo}`,
          width: 512,
          height: 512,
        },
        image: `${site.url}/og-${t.locale}.jpg`,
        description: t.site.description,
        slogan: t.site.tagline,
        email: site.email,
        foundingDate: "2026",
        founder: { "@id": ids.founder },
        sameAs: [site.instagram, site.tiktok],
      },
      {
        "@type": "Person",
        "@id": ids.founder,
        name: site.founder,
        jobTitle: "Founder",
        image: `${site.url}${seo.founderPhoto}`,
        worksFor: { "@id": ids.org },
      },
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: site.url,
        name: site.name,
        inLanguage: locales,
        publisher: { "@id": ids.org },
      },
      {
        "@type": "WebPage",
        "@id": ids.page,
        url: pageUrl,
        name: t.seo.title,
        description: t.seo.description,
        inLanguage: t.htmlLang,
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.org },
        primaryImageOfPage: `${site.url}/og-${t.locale}.jpg`,
        video: { "@id": ids.film },
      },
      {
        "@type": "VideoObject",
        "@id": ids.film,
        name: t.seo.film.name,
        description: t.seo.film.description,
        thumbnailUrl: [`${site.url}${film.poster}`],
        uploadDate: film.uploaded,
        duration: film.isoDuration,
        contentUrl: `${site.url}${film.src}`,
        embedUrl: `${pageUrl}#top`,
        inLanguage: film.language,
        width: film.width,
        height: film.height,
        publisher: { "@id": ids.org },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: t.htmlLang,
        isPartOf: { "@id": ids.page },
        mainEntity: t.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <ScrollEffects />
      <SiteNav t={t} />
      <main id="main">
        <Hero t={t} />
        <Work t={t} />
        <Studio t={t} />
        <Diagnosis t={t} />
        <Method t={t} />
        <Engine t={t} />
        <Calculator t={t} />
        <Concepts t={t} />
        <Films t={t} />
        <Faq t={t} />
        <Apply t={t} />
        <FinalCta t={t} />
      </main>
      <SiteFooter t={t} />
      <script
        type="application/ld+json"
        // "<" escaped so no string in the copy can ever close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
