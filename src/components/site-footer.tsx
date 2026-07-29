import { navTargets, site } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";
import { CoinMark } from "./coin-mark";

export function SiteFooter({ t }: { t: Dictionary }) {
  const year = new Date().getFullYear();

  const contact = [
    { label: "Instagram", href: site.instagram, handle: site.handle },
    { label: "TikTok", href: site.tiktok, handle: site.handle },
    { label: "Email", href: `mailto:${site.email}`, handle: site.email },
  ];

  return (
    <footer className="relative border-t border-[var(--rule)]">
      <div className="mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] py-[clamp(2.75rem,5vh,4rem)]">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <CoinMark size={36} id="footer" />
              <span className="ms-display text-[clamp(1.2rem,2vw,1.5rem)] leading-none">
                <span className="text-bone">Minted</span>
                <span className="ms-gold">Scale</span>
              </span>
            </div>
            <p className="ms-mono mt-4">{t.site.role}</p>
            <p className="ms-serif mt-5 max-w-[30ch] text-[1.125rem] text-gold-200">
              {t.site.tagline}
            </p>
          </div>

          <nav aria-label={t.footer.studio}>
            <p className="ms-mono text-gold-400">{t.footer.studio}</p>
            <ul className="mt-5 space-y-3">
              {t.nav.map((label, i) => (
                <li key={label}>
                  <a
                    href={navTargets[i]}
                    className="text-sm text-ash transition-colors duration-300 hover:text-gold-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#apply"
                  className="text-sm text-gold-200 underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-80"
                >
                  {t.footer.apply}
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="ms-mono text-gold-400">{t.footer.contact}</p>
            <ul className="mt-5 space-y-3">
              {contact.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="group flex items-baseline justify-between gap-4 text-sm text-ash transition-colors duration-300 hover:text-gold-200"
                  >
                    <span>{item.label}</span>
                    <span className="ms-mono text-[0.5625rem] transition-colors duration-300 group-hover:text-ash">
                      {item.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[clamp(2rem,4vw,3rem)] flex flex-wrap items-center justify-between gap-4 border-t border-[var(--rule)] pt-7">
          <p className="ms-mono text-[0.5625rem]">
            © {year} {site.name}
          </p>
          <p className="ms-mono text-[0.5625rem] text-gold-800">
            {t.site.role} · {site.established}
          </p>
        </div>
      </div>
    </footer>
  );
}
