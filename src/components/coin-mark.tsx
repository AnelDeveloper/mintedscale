/**
 * The MS coin — the brand's own mark, redrawn as SVG so it stays crisp at
 * any size and can carry gradients and motion the PNG cannot.
 */
export function CoinMark({
  size = 32,
  className = "",
  id = "coin",
}: {
  size?: number;
  className?: string;
  id?: string;
}) {
  const ring = `${id}-ring`;
  const face = `${id}-face`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={ring} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f9edcb" />
          <stop offset="45%" stopColor="#d9a94c" />
          <stop offset="100%" stopColor="#a9762a" />
        </linearGradient>
        <linearGradient id={face} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f9edcb" />
          <stop offset="30%" stopColor="#f0d486" />
          <stop offset="62%" stopColor="#c99a3e" />
          <stop offset="100%" stopColor="#edcd7d" />
        </linearGradient>
      </defs>

      <circle cx="50" cy="50" r="46" stroke={`url(#${ring})`} strokeWidth="2.5" />
      <circle cx="50" cy="50" r="39" stroke="rgba(217,169,76,0.22)" strokeWidth="1" />

      {/* Assay diamonds, top and bottom, as on the profile mark */}
      <rect x="46.5" y="8.5" width="7" height="7" transform="rotate(45 50 12)" fill={`url(#${face})`} />
      <rect x="46.5" y="84.5" width="7" height="7" transform="rotate(45 50 88)" fill={`url(#${face})`} />

      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fill={`url(#${face})`}
        fontFamily="var(--font-archivo), Helvetica, sans-serif"
        fontWeight="800"
        fontSize="34"
        letterSpacing="-1"
      >
        MS
      </text>
    </svg>
  );
}

/** The wordmark: MINTED in bone, SCALE in gold — exactly as the brand sets it. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`ms-display leading-none ${className}`}>
      <span className="text-bone">Minted</span>
      <span className="ms-gold">Scale</span>
    </span>
  );
}
