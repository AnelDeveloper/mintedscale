import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { media, seo, site } from "@/lib/config";
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
    url: `/og-${t.locale}.jpg?v=${seo.ogVersion}`,
    width: 1200,
    height: 630,
    alt: t.seo.ogAlt,
    type: "image/jpeg",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale);
  const film = media.heroVideo;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t.seo.title,
      template: `%s — ${site.name}`,
    },
    description: t.seo.description,
    applicationName: site.name,
    authors: [{ name: site.founder, url: site.url }],
    creator: site.founder,
    publisher: site.name,
    category: "business",
    // Bare digit runs in the copy (follower counts, prices) are not phone
    // numbers; iOS Safari would otherwise turn them into tap-to-call links.
    formatDetection: { telephone: false, email: false, address: false },
    alternates: {
      canonical: `/${t.locale}`,
      languages: { en: "/en", bs: "/bs", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      url: `/${t.locale}`,
      locale: seo.ogLocale[t.locale],
      alternateLocale: locales.filter((l) => l !== t.locale).map((l) => seo.ogLocale[l]),
      title: t.seo.title,
      description: t.seo.description,
      siteName: site.name,
      images: [ogCard(t)],
      videos: [
        {
          // Absolute on purpose: metadataBase resolves images but not videos.
          url: `${site.url}${film.src}`,
          secureUrl: `${site.url}${film.src}`,
          type: "video/mp4",
          width: film.width,
          height: film.height,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.title,
      description: t.seo.description,
      images: [ogCard(t)],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
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
      /* The head script below writes classes onto <html> before React
         hydrates, which React would otherwise report as a mismatch. */
      suppressHydrationWarning
    >
      <head>
        {/*
          Two jobs, both before first paint:
          1. Flag JS so scroll reveals only hide content in browsers that can
             un-hide it — no script, no hidden text.
          2. Arm a fallback that reveals everything if the reveal observer
             never reports in. This deliberately lives outside React: if
             hydration is slow or never happens, a React-based safety net
             would never fire either.

          Two details that decide whether the page animates at all:
          the observer cancels this timer the moment it proves itself
          (`__msRevealOk`), and the countdown only starts once the tab is
          actually being looked at. A page opened in a background tab used to
          burn through the timer unwatched and be fully revealed, without a
          single animation, by the time anyone switched to it.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('ms-js');" +
              "var go=function(){if(!window.__msRevealOk)d.classList.add('ms-reveal-all')};" +
              "var arm=function(){window.__msRevealSafety=setTimeout(go,2000)};" +
              "if(document.hidden){document.addEventListener('visibilitychange',function h(){" +
              "if(!document.hidden){document.removeEventListener('visibilitychange',h);arm()}})}" +
              "else{arm()}",
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
