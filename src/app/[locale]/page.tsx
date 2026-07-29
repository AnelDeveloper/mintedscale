import { Apply } from "@/components/apply";
import { Calculator } from "@/components/calculator";
import { Capabilities } from "@/components/capabilities";
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
import { site } from "@/lib/config";
import { getDictionary } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      description: t.site.description,
      slogan: t.site.tagline,
      email: site.email,
      url: site.url,
      founder: { "@type": "Person", name: site.founder },
      sameAs: [site.instagram, site.tiktok],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: t.htmlLang,
      mainEntity: t.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <>
      <ScrollEffects />
      <SiteNav t={t} />
      <main id="main">
        <Hero t={t} />
        <Studio t={t} />
        <Diagnosis t={t} />
        <Method t={t} />
        <Engine t={t} />
        <Calculator t={t} />
        <Concepts t={t} />
        <Films t={t} />
        <Capabilities t={t} />
        <Faq t={t} />
        <Apply t={t} />
        <FinalCta t={t} />
      </main>
      <SiteFooter t={t} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
