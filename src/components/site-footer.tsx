import { nav, site } from "@/lib/content";
import { CoinMark } from "./coin-mark";

export function SiteFooter() {
  const year = new Date().getFullYear();

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
            <p className="ms-mono mt-4">{site.role}</p>
            <p className="ms-serif mt-5 max-w-[30ch] text-[1.125rem] text-gold-200">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="ms-mono text-gold-400">Studio</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-ash transition-colors duration-300 hover:text-gold-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#apply"
                  className="text-sm text-gold-200 underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-80"
                >
                  Apply
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="ms-mono text-gold-400">Contact</p>
            <ul className="mt-5 space-y-3">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="group flex items-baseline justify-between gap-4 text-sm text-ash transition-colors duration-300 hover:text-gold-200"
                  >
                    <span>{social.label}</span>
                    <span className="ms-mono text-[0.5625rem] transition-colors duration-300 group-hover:text-ash">
                      {social.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[clamp(1.75rem,3.2vw,2.75rem)] flex flex-wrap items-center justify-between gap-4 border-t border-[var(--rule)] pt-7">
          <p className="ms-mono text-[0.5625rem]">
            © {year} {site.name}
          </p>
          <p className="ms-mono text-[0.5625rem] text-gold-800">
            {site.role} · {site.established}
          </p>
        </div>
      </div>
    </footer>
  );
}
