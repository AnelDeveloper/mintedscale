import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { site } from "@/lib/config";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import "../globals.css";

/* Display: Archivo, run heavy to match the MINTEDSCALE wordmark.
   Accent: Instrument Serif italic — the voice of the tagline.
   Data: IBM Plex Mono. Body: Instrument Sans.
   latin-ext is loaded for č ć ž š đ. */
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const instrument = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-instrument",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * The share card, one per locale.
 *
 * Without og:image a scraper picks the first image it finds in the markup —
 * which here is the first client logo in the hero, so links previewed as
 * somebody else's brand. Baked as a flat JPEG rather than generated at request
 * time: it never has to be rendered again, and a preview crawler that gives up
 * after a second still gets it.
 */
function ogCard(t: ReturnType<typeof getDictionary>) {
  return {
    url: `/og-${t.locale}.jpg`,
    width: 1200,
    height: 630,
    alt: `${site.name} — ${t.site.tagline}`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${t.site.tagline}`,
      template: `%s — ${site.name}`,
    },
    description: t.site.description,
    alternates: {
      canonical: `/${t.locale}`,
      languages: { en: "/en", bs: "/bs", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      url: `/${t.locale}`,
      locale: t.locale,
      title: `${site.name} — ${t.site.tagline}`,
      description: t.site.description,
      siteName: site.name,
      images: [ogCard(t)],
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${t.site.tagline}`,
      description: t.site.description,
      images: [ogCard(t)],
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#080706",
  colorScheme: "dark",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <html
      lang={t.htmlLang}
      className={`${archivo.variable} ${instrumentSerif.variable} ${instrument.variable} ${plexMono.variable}`}
    >
      <head>
        {/*
          Two jobs, both before first paint:
          1. Flag JS so scroll reveals only hide content in browsers that can
             un-hide it — no script, no hidden text.
          2. Arm a fallback that reveals everything after 2s regardless. This
             deliberately lives outside React: if hydration is slow or never
             happens, a React-based safety net would never fire either.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('ms-js');" +
              "setTimeout(function(){d.classList.add('ms-reveal-all')},2000);",
          }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="ms-mono sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold-200 focus:px-4 focus:py-3 focus:text-ink"
        >
          {t.skipToContent}
        </a>
        <div className="ms-atmosphere" aria-hidden="true" />
        <div className="ms-aurora" aria-hidden="true" />
        <div className="ms-grain" aria-hidden="true" />
        <div className="relative z-[2]">{children}</div>
      </body>
    </html>
  );
}
