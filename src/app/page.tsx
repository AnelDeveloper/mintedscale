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
import { Standard } from "@/components/standard";
import { Studio } from "@/components/studio";
import { faq, site } from "@/lib/content";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    url: "https://mintedscale.com",
    founder: { "@type": "Person", name: site.founder },
    sameAs: site.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  },
];

export default function HomePage() {
  return (
    <>
      <ScrollEffects />
      <SiteNav />
      <main id="main">
        <Hero />
        <Studio />
        <Diagnosis />
        <Method />
        <Engine />
        <Calculator />
        <Concepts />
        <Films />
        <Capabilities />
        <Standard />
        <Faq />
        <Apply />
        <FinalCta />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
