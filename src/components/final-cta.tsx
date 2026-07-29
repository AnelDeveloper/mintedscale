import { site } from "@/lib/content";
import { CoinMark } from "./coin-mark";
import { Arrow } from "./hero";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-[var(--rule)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-45%] h-[130%]"
        style={{
          background:
            "radial-gradient(ellipse 48% 52% at 50% 76%, rgba(217,169,76,0.22) 0%, rgba(160,114,40,0.08) 42%, transparent 74%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] py-[clamp(5.5rem,15vh,11rem)] text-center">
        <div className="flex justify-center" data-reveal>
          <CoinMark size={44} id="final" />
        </div>

        <p className="ms-eyebrow mt-7 justify-center" data-reveal>
          <span className="ms-eyebrow-rule rotate-180" aria-hidden="true" />
          <span>Now minting</span>
          <span className="ms-eyebrow-rule" aria-hidden="true" />
        </p>

        <h2
          className="ms-display mx-auto mt-8 max-w-[15ch] text-[clamp(2.5rem,8.5vw,6.4rem)]"
          data-reveal
          style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
        >
          <span className="block text-bone">Your name can become</span>
          <span className="ms-gold-sweep block">a brand.</span>
        </h2>

        <p
          className="ms-serif mx-auto mt-7 text-[clamp(1.15rem,2.1vw,1.625rem)] text-gold-200"
          data-reveal
          style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
        >
          {site.tagline}
        </p>

        <p
          className="mx-auto mt-6 max-w-[46ch] text-[clamp(1rem,1.4vw,1.1875rem)] leading-[1.65] text-ash"
          data-reveal
          style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
        >
          Four partners this quarter. Bring us an audience and an appetite — we bring
          the strategy, the product, the technology and the launch.
        </p>

        <div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          data-reveal
          style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
        >
          <a href="#apply" className="ms-btn ms-btn-gold w-full px-9 py-[1.15rem] sm:w-auto">
            Start building
            <Arrow />
          </a>
          <a href={`mailto:${site.email}`} className="ms-btn ms-btn-ghost ms-sheen w-full sm:w-auto">
            Email the studio
          </a>
        </div>
      </div>
    </section>
  );
}
