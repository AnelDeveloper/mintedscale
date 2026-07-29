import type { ReactNode } from "react";

export function Section({
  id,
  index,
  eyebrow,
  children,
  className = "",
  ruled = true,
}: {
  id?: string;
  index?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  ruled?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 ${ruled ? "border-t border-[var(--rule)]" : ""} ${className}`}
    >
      <div className="mx-auto w-full max-w-[var(--shell)] px-[var(--gutter)] py-[clamp(3.25rem,6.5vh,5rem)]">
        {index && eyebrow ? (
          <div className="mb-[clamp(1.4rem,2.6vw,2.25rem)]" data-reveal>
            <Eyebrow index={index}>{eyebrow}</Eyebrow>
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <p className="ms-eyebrow">
      {index ? <span className="text-gold-400">{index}</span> : null}
      <span className="ms-eyebrow-rule" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

/**
 * Two-part display heading: line one in bone, line two in gold.
 * This is the wordmark's own logic — MINTED bone, SCALE gold — reused as the
 * page's headline system.
 */
export function Heading({
  lines,
  className = "",
  soft = false,
}: {
  lines: readonly [string, string] | readonly string[];
  className?: string;
  soft?: boolean;
}) {
  return (
    <h2
      className={`${soft ? "ms-display-soft" : "ms-display"} text-[clamp(1.7rem,3.2vw,2.6rem)] ${className}`}
      data-reveal
    >
      <span className="block text-bone">{lines[0]}</span>
      {lines[1] ? <span className="ms-gold-sweep block">{lines[1]}</span> : null}
    </h2>
  );
}

export function Lede({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`max-w-[54ch] text-[clamp(1rem,1.35vw,1.1875rem)] leading-[1.65] text-ash ${className}`}
      data-reveal
      style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
    >
      {children}
    </p>
  );
}
