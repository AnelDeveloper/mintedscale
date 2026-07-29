/**
 * Everything that is NOT language: figures, URLs, media slots, proper nouns.
 *
 * Kept out of the translation files on purpose. If a projection or a price
 * lived in both `en.ts` and `bs.ts`, changing one and forgetting the other
 * would quietly show visitors different numbers depending on their language.
 * There is one source for every number.
 *
 * Slots waiting on real material (they render as marked reserved frames, so
 * the layout is already correct):
 *   • media.portrait     — a photo of you
 *   • media.heroVideo    — the studio film
 *   • media.engineVideo  — a screen recording of the system
 *   • media.films        — partner films, once they exist
 */

export const site = {
  name: "MintedScale",
  email: "anel@mintedscale.com",
  established: "Est. MMXXVI",
  founder: "Anel Kujović",
  url: "https://mintedscale.com",
  instagram: "https://instagram.com/mintedscale",
  tiktok: "https://tiktok.com/@mintedscale",
  handle: "@mintedscale",
};

/** Real prior engagements. An empty `logo` falls back to the initials. */
export const clients = [
  { label: "Accelit IT", initials: "AC", logo: "", href: "https://accelit.com.au" },
  {
    label: "Puzzles IT",
    initials: "PZ",
    logo: "/clients/puzzles-it.png",
    href: "https://www.puzzlitapp.com",
  },
  {
    label: "TDT Planner",
    initials: "TD",
    logo: "/clients/tdt-planner.png",
    href: "https://transportdrivertraining.com.au",
  },
  {
    label: "NWAR Australia",
    initials: "NW",
    logo: "",
    href: "https://nationwideappliancerepairs.com.au",
  },
];

export const media = {
  portrait: { src: "" },
  heroVideo: { src: "", poster: "" },
  engineVideo: { src: "", poster: "" },
  films: [
    { id: "v1", src: "", poster: "" },
    { id: "v2", src: "", poster: "" },
    { id: "v3", src: "", poster: "" },
  ],
};

export const calculator = {
  defaults: { followers: 250_000, engagement: 3.5, price: 125 },
  bounds: {
    followers: { min: 5_000, max: 3_000_000, step: 5_000 },
    engagement: { min: 0.5, max: 12, step: 0.1 },
    price: { min: 19, max: 999, step: 10 },
  },
  /** Share of the *engaged* audience that buys across a full launch sequence. */
  launchConversion: 0.08,
  /** Launches plus retention over the first year. */
  yearMultiple: 3.4,
};

/** The creator the hero illustrates with. Same model as the calculator. */
export const heroSample = { followers: 250_000, engagement: 3, price: 125 };

/**
 * Per-concept figures. Conversion is set per concept because a €890 cohort
 * does not convert like an €89 product.
 */
export const conceptData = [
  {
    ref: "01",
    platform: "Instagram",
    followers: "~400K",
    brand: "VESSEL",
    projection: { audience: 400_000, engagement: 3.5, conversion: 0.08, price: 89 },
    ladderPrices: [29, 89, 240],
  },
  {
    ref: "02",
    platform: "TikTok",
    followers: "~1M",
    brand: "LEDGERHOUSE",
    projection: { audience: 1_000_000, engagement: 4, conversion: 0.008, price: 890 },
    ladderPrices: [49, 890, 4800],
  },
  {
    ref: "03",
    platform: "YouTube",
    followers: "~600K",
    brand: "ATELIER SD",
    projection: { audience: 600_000, engagement: 2.5, conversion: 0.04, price: 340 },
    ladderPrices: [60, 340, 1200],
  },
];

export const platforms = ["Instagram", "TikTok", "YouTube", "X", "Twitch", "Other"];

export const navTargets = ["#studio", "#method", "#engine", "#calculator", "#concepts"];
