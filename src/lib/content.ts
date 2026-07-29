/**
 * All page copy and data.
 *
 * HOUSE RULE: nothing here claims a result that has not happened.
 * The proof on this page is prior product work for real companies plus
 * seven years of shipping — not creator revenue, because there isn't any
 * yet. Creator results get added to `studio.clients` and `films` as they
 * actually land. If you add a number, be ready to prove it.
 *
 * TO CONFIRM before launch:
 *   • studio.clients.items — check the exact legal names, and add any others
 *     you're free to name. Per-project detail can be added later.
 *
 * Slots waiting on real material (they render as marked reserved frames,
 * so the layout is already correct):
 *   • studio.portrait   — a photo of you
 *   • hero.video        — the studio film
 *   • engine.video      — a screen recording of the system
 *   • films.items       — founding partner films, once they exist
 */

export const site = {
  name: "MintedScale",
  role: "The Creator Mint",
  tagline: "Turning creators into brands.",
  description:
    "MintedScale turns creator audiences into brands, products and businesses. Strategy, product and technology from one studio — built on a revenue share, so you pay nothing upfront.",
  email: "anel@mintedscale.com",
  established: "Est. MMXXVI",
  founder: "Anel Kujović",
  socials: [
    { label: "Instagram", href: "https://instagram.com/mintedscale", handle: "@mintedscale" },
    { label: "TikTok", href: "https://tiktok.com/@mintedscale", handle: "@mintedscale" },
    { label: "Email", href: "mailto:anel@mintedscale.com", handle: "anel@mintedscale.com" },
  ],
} as const;

export const nav = [
  { label: "Studio", href: "#studio" },
  { label: "The Mint", href: "#method" },
  { label: "AI System", href: "#engine" },
  { label: "Calculator", href: "#calculator" },
  { label: "Concepts", href: "#concepts" },
] as const;

/* ── Hero ──────────────────────────────────────────────────── */

export const hero = {
  eyebrow: "The Creator Mint",
  headline: ["Your audience is", "more than followers."],
  sub: "We turn attention into brands, products and businesses — built and launched by one studio, on a revenue share. You pay nothing upfront.",
  primaryCta: "Apply for a founding spot",
  secondaryCta: "See how it works",
  video: {
    src: "",
    poster: "",
    label: "How the mint works",
    duration: "",
  },
  bar: [
    { value: "€0", label: "Upfront" },
    { value: "Rev share", label: "We earn when you earn" },
    { value: "3", label: "Founding partners" },
  ],
} as const;

/* ── The studio (founder credibility, replaces client results) ─ */

export const studio = {
  eyebrow: "The studio",
  index: "01",
  headline: ["Seven years of shipped product.", "Now pointed at creators."],
  /**
   * Every figure is a fact about the founder or a term of the offer.
   * None of them is a claim about creator results.
   */
  stats: [
    { value: "7", label: "Years building products", note: "Software & commerce" },
    { value: "€0", label: "Upfront to start", note: "Nothing to pay in advance" },
    { value: "Rev share", label: "We earn when you earn", note: "No win, no fee" },
    { value: "3", label: "Founding partner spots", note: "Open now" },
  ],
  portrait: { src: "", alt: "Anel Kujović, founder of MintedScale" },
  note: {
    lead: "I'm Anel. For seven years I've built software and commerce products for companies — platforms, apps, storefronts and payment systems. The unglamorous infrastructure that makes a business actually run.",
    body: "MintedScale is that capability pointed at creators. Most people offering to build your brand are marketers who can't ship software, so the strategy deck arrives and the product never does. I ship the product.",
    offer:
      "The creator studio is new, and I'd rather say that than invent a client list. That's why the first three partners pay nothing upfront: I build, you launch, and I take a share of what it earns. If it earns nothing, I earn nothing.",
    signature: "Anel Kujović · Founder",
  },
  /**
   * Real prior engagements — the honest replacement for a revenue ticker.
   * An empty `href` renders as plain text rather than a dead link.
   */
  clients: {
    label: "Prior product work",
    caveat:
      "Software and commerce work delivered for these companies. Creator brands are the new chapter — those results go here as they land, not before.",
    items: [
      { label: "@accelit", href: "https://accelit.com.au" },
      { label: "@puzzlesit", href: "https://www.puzzlitapp.com" },
      { label: "TDT Planner", href: "https://transportdrivertraining.com.au" },
      { label: "NWAR Australia", href: "https://nationwideappliancerepairs.com.au" },
    ],
  },
  follow: {
    label: "Follow the build",
    items: [
      { platform: "Instagram", handle: "@mintedscale", href: "https://instagram.com/mintedscale" },
      { platform: "TikTok", handle: "@mintedscale", href: "https://tiktok.com/@mintedscale" },
    ],
  },
} as const;

/* ── Problem ───────────────────────────────────────────────── */

export const diagnosis = {
  eyebrow: "The problem",
  index: "02",
  headline: ["Creators have attention.", "Few build assets."],
  body: "Millions of creators build audiences every day. Almost none of that attention becomes something they own. A following is rented — the moment you stop posting, it stops paying. A brand is an asset. It holds value while you sleep, and it can be sold.",
  faults: [
    {
      code: "01",
      title: "No clear brand strategy",
      body: "The audience knows your face, not what you stand for. Without a position, every collaboration looks the same and none of them compound.",
      state: "Undefined",
      loss: "Rate set by the sponsor",
    },
    {
      code: "02",
      title: "No product system",
      body: "One launch, then silence. There is no catalogue, no pricing ladder, no supply chain — so revenue depends on posting again tomorrow.",
      state: "Unbuilt",
      loss: "€0 between posts",
    },
    {
      code: "03",
      title: "No scalable business model",
      body: "Income is trading hours for brand deals. Nothing runs without you in frame, so the ceiling is your calendar.",
      state: "Unowned",
      loss: "Ceiling = your time",
    },
  ],
} as const;

/* ── Method ────────────────────────────────────────────────── */

export const method = {
  eyebrow: "The mint",
  index: "03",
  headline: ["From creator", "to brand."],
  body: "One sequence, run in order. Each stage produces something you own before the next one starts.",
  steps: [
    {
      n: "01",
      title: "Discover",
      body: "Understand your audience, identity, and opportunities.",
      detail:
        "We run your audience through the engine: who they are, what they already buy, where the demand is dense enough to price against. The output is a positioning thesis, not a mood board.",
      output: "Audience thesis · Opportunity map",
      time: "Week 1–2",
    },
    {
      n: "02",
      title: "Build",
      body: "Create your brand identity, positioning, and strategy.",
      detail:
        "Name, mark, voice, and the story that makes the price make sense. Built so it survives leaving your face out of the frame.",
      output: "Identity system · Brand book",
      time: "Week 3–6",
    },
    {
      n: "03",
      title: "Launch",
      body: "Develop products, offers, and digital assets.",
      detail:
        "Product, pricing, packaging, storefront and the launch itself — sequenced against your content calendar so attention lands on something for sale.",
      output: "Product line · Storefront · Launch plan",
      time: "Week 7–12",
    },
    {
      n: "04",
      title: "Scale",
      body: "Grow your brand into a real business.",
      detail:
        "Retention, margin, operations and the systems that let the company grow faster than your posting schedule.",
      output: "Operating model · Growth systems",
      time: "Month 4+",
    },
  ],
} as const;

/* ── AI monetization engine ────────────────────────────────── */

export const engine = {
  eyebrow: "Built in-house",
  index: "04",
  headline: ["We built our own", "AI monetization system."],
  body: "Most studios guess what your audience will buy, then bill you for the guess. I built software that reads the audience first — so the product is chosen from evidence, not taste.",
  serif: "The guesswork is the expensive part. We removed it.",
  /** Each module states what it *produces*, not how much it has processed. */
  modules: [
    {
      code: "01",
      title: "Audience decode",
      body: "Reads your comments, DMs, watch-time and follower graph, then clusters what your audience actually wants to buy.",
      metric: "Demand map",
      metricLabel: "What it produces",
    },
    {
      code: "02",
      title: "Offer synthesis",
      body: "Generates and scores candidate products against demand density, price tolerance and how hard each is to ship.",
      metric: "Ranked offers",
      metricLabel: "What it produces",
    },
    {
      code: "03",
      title: "Price finder",
      body: "Models your ladder — entry, core and premium — against comparable launches in your niche.",
      metric: "3-tier ladder",
      metricLabel: "What it produces",
    },
    {
      code: "04",
      title: "Launch simulator",
      body: "Projects the launch sequence before a single post goes out, so we know what to expect and where it breaks.",
      metric: "90-day forecast",
      metricLabel: "What it produces",
    },
  ],
  video: { src: "", poster: "", label: "Inside the engine", duration: "" },
} as const;

/* ── Calculator ────────────────────────────────────────────── */

export const calculator = {
  eyebrow: "Revenue calculator",
  index: "05",
  headline: ["What is your audience", "actually worth?"],
  body: "Move the dials. The maths is shown in full — no black box, no inflated promise.",
  defaults: { followers: 120000, engagement: 3.5, price: 120 },
  bounds: {
    followers: { min: 5000, max: 3000000, step: 5000 },
    engagement: { min: 0.5, max: 12, step: 0.1 },
    price: { min: 19, max: 999, step: 10 },
  },
  /** Share of the *engaged* audience that buys across a full launch sequence. */
  launchConversion: 0.08,
  /** Launches plus retention over the first year. */
  yearMultiple: 3.4,
  levers: [
    "How well the offer matches what your audience already buys",
    "Whether you own an email list or only rent the platform",
    "Price ladder — an entry product lifts the core one",
    "Launch sequencing against your content calendar",
  ],
  disclaimer:
    "A model, not a promise. It applies a launch-sequence conversion rate to your engaged audience — your niche, offer and list quality move it in both directions. We show the arithmetic so you can argue with it.",
} as const;

/* ── Concept builds (replaces fabricated case studies) ─────── */

export const concepts = {
  eyebrow: "Concept builds",
  index: "06",
  headline: ["Built on paper", "before it's built for real."],
  body: "Three creators we'd love to work with, and exactly what we'd make for each. These are plans, not past clients — read them to judge the thinking, because the thinking is what you're hiring.",
  disclaimer:
    "Concept builds. Illustrative creators, real method — no results claimed, because MintedScale is taking its first partners now.",
  items: [
    {
      ref: "01",
      handle: "The training creator",
      platform: "Instagram",
      followers: "~400K",
      field: "Training & recovery",
      before: {
        summary:
          "Four years of daily training content. Income from one-off brand deals, negotiated by DM, priced by guesswork.",
        points: ["No owned product", "Rate set by the sponsor", "Zero revenue between posts"],
      },
      after: {
        brand: "VESSEL",
        line: "Recovery & hydration",
        summary:
          "A recovery brand with its own point of view, sold direct, with a subscription that bills whether or not she posts.",
        deliverables: [
          "Identity system & packaging",
          "Direct storefront on Shopify",
          "9-SKU recovery line",
          "Subscription & retention flows",
        ],
      },
      ladder: "Entry €29 · Core €89 · Bundle €240",
      model: "DTC subscription · Retail wholesale",
      horizon: "11 months to full line",
    },
    {
      ref: "02",
      handle: "The finance creator",
      platform: "TikTok",
      followers: "~1M",
      field: "Personal finance",
      before: {
        summary:
          "Explains money to a million people. Monetised by affiliate links to products he did not build or control.",
        points: ["Audience trusts him, buys elsewhere", "No pricing power", "Platform-dependent income"],
      },
      after: {
        brand: "LEDGERHOUSE",
        line: "Financial education",
        summary:
          "A school with a curriculum, a cohort calendar and software — priced as education, not as an affiliate click.",
        deliverables: [
          "Curriculum & cohort structure",
          "Web app — tracking & lessons",
          "Certification programme",
          "Enterprise licensing track",
        ],
      },
      ladder: "Entry €49 · Cohort €890 · Licence €4,800",
      model: "Cohort tuition · Software subscription",
      horizon: "14 months to licensing",
    },
    {
      ref: "03",
      handle: "The design creator",
      platform: "YouTube",
      followers: "~600K",
      field: "Interiors & design",
      before: {
        summary:
          "Long-form interiors films with a devoted audience. Revenue is ad share — high views, thin margin.",
        points: ["Income tied to CPM", "No physical product", "Taste with nothing attached to it"],
      },
      after: {
        brand: "ATELIER SD",
        line: "Objects & lighting",
        summary:
          "A design house that manufactures under her name, with licensing deals that pay without a single upload.",
        deliverables: [
          "House identity & art direction",
          "First collection — 14 pieces",
          "Manufacturing & licensing structure",
          "Trade & showroom channel",
        ],
      },
      ladder: "Print €60 · Object €340 · Lighting €1,200",
      model: "Product margin · Licensing royalties",
      horizon: "16 months to first collection",
    },
  ],
} as const;

/* ── Films (reserved for founding partners) ────────────────── */

export const films = {
  eyebrow: "Partner films",
  index: "07",
  headline: ["Three seats.", "Three stories to come."],
  body: "When a founding partner launches, their film goes here — what we built, what it earns, in their own words. Reserved, not invented.",
  items: [
    { id: "v1", seat: "Seat 01", status: "Open", src: "", poster: "" },
    { id: "v2", seat: "Seat 02", status: "Open", src: "", poster: "" },
    { id: "v3", seat: "Seat 03", status: "Open", src: "", poster: "" },
  ],
} as const;

/* ── Services ──────────────────────────────────────────────── */

export const capabilities = {
  eyebrow: "What we build",
  index: "08",
  headline: ["Four practices.", "One studio."],
  body: "No vendors, no handoffs. The person who writes the thesis ships the product.",
  services: [
    {
      code: "01",
      title: "Brand Strategy",
      body: "The thesis everything else is built on.",
      items: ["Positioning", "Identity", "Content direction"],
    },
    {
      code: "02",
      title: "Product Creation",
      body: "Things people can actually buy.",
      items: ["Digital products", "Physical products", "Brand concepts"],
    },
    {
      code: "03",
      title: "Growth Systems",
      body: "Revenue that does not depend on posting.",
      items: ["Monetization", "Audience strategy", "Scaling"],
    },
    {
      code: "04",
      title: "Technology",
      body: "The infrastructure your brand runs on.",
      items: ["Websites", "Apps", "Digital platforms"],
    },
  ],
} as const;

/* ── Why us ────────────────────────────────────────────────── */

export const standard = {
  eyebrow: "Why us",
  index: "09",
  headline: ["Why work with", "a new studio."],
  points: [
    {
      n: "01",
      title: "You are not paying for the risk",
      body: "No upfront fee. I build, you launch, and I take a share of what it earns. A studio with a waiting list has no reason to price like that — a new one does, and you get the benefit.",
    },
    {
      n: "02",
      title: "Seven years of shipped product",
      body: "Platforms, apps, storefronts and payment systems delivered for companies across IT, planning and commerce. The creator work is the new chapter; the ability to actually ship the thing is not.",
    },
    {
      n: "03",
      title: "Strategy and execution, same hands",
      body: "The person who writes the positioning builds the storefront and stands up the technology. Nothing is handed to a vendor, and nothing gets lost in translation.",
    },
    {
      n: "04",
      title: "Three partners, not thirty",
      body: "Founding partners get the whole studio, not a slice of an account manager's week. That is only possible while the number is small — which is exactly now.",
    },
  ],
} as const;

/* ── FAQ ───────────────────────────────────────────────────── */

export const faq = {
  eyebrow: "Questions",
  index: "10",
  headline: ["Before you", "apply."],
  items: [
    {
      q: "What does it cost?",
      a: "Nothing upfront. The first three partners work on a revenue share: I build the brand, the product and the technology at my own cost, and take a share of what it earns. If it earns nothing, I earn nothing. The percentage depends on how much we're building, so we set it together on the call — and it goes in writing, time-limited, before any work starts. You are not signing away your company.",
    },
    {
      q: "You're new to creator brands. Why should I take the risk?",
      a: "Because of how it's priced, you aren't taking the financial risk — I am. The product work isn't new: seven years of platforms, apps and storefronts for companies like Accelit IT, Puzzles IT, TDT Planner and NWAR Australia. What's new is applying it to creator brands, and I'd rather say that plainly than invent a creator client list. Start with the free audit and judge the work before committing to anything.",
    },
    {
      q: "How big does my audience need to be?",
      a: "There is no hard floor, but engagement matters far more than follower count. A 30K audience that comments and buys is worth more than a 500K audience that scrolls past. If the numbers do not support a build yet, I will tell you plainly instead of taking the work.",
    },
    {
      q: "How long until something is live?",
      a: "First plan inside 48 hours of the call. A digital product is an 8–12 week build; a physical line takes longer, because manufacturing does. You get the full schedule before we start, not after.",
    },
    {
      q: "I already have a product. Can you still help?",
      a: "Often that is the better starting point. We audit what exists, fix the positioning and pricing, and build the system around it rather than starting from zero.",
    },
    {
      q: "Who owns the brand?",
      a: "You do — the name, the identity, the storefront, the customer list, all of it, in your name from day one. A revenue share is a share of revenue, not of ownership.",
    },
  ],
} as const;

/* ── Application ───────────────────────────────────────────── */

export const application = {
  eyebrow: "Apply",
  index: "11",
  headline: ["Ready to turn your name", "into a brand?"],
  body: "If you are a creator and want to build something bigger than content, let's talk. Three founding spots, no upfront fee.",
  terms: [
    "Three founding partners, then the revenue share closes.",
    "Nothing to pay upfront — we earn when you earn.",
    "Every application is read by me, not a form robot.",
    "Expect a reply within two business days.",
  ],
} as const;

export const platforms = ["Instagram", "TikTok", "YouTube", "X", "Twitch", "Other"] as const;
