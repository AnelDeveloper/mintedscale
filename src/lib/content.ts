/**
 * All page copy and data.
 *
 * ⚠️ BEFORE LAUNCH — replace every value marked PLACEHOLDER.
 * Publishing invented revenue figures or testimonials as if they were real
 * clients is a claim you would have to stand behind. Swap them for your own
 * numbers, or cut the section until you have them.
 *
 *   • results.headline  — PLACEHOLDER top-line figures
 *   • ticker            — PLACEHOLDER creator results
 *   • specimens         — fictional demonstration builds (labelled as such on the page)
 *   • videos / videoWall — empty slots; drop in your files under /public/videos
 */

export const site = {
  name: "MintedScale",
  role: "The Creator Mint",
  tagline: "Turning creators into brands.",
  description:
    "MintedScale turns creator audiences into brands, products and businesses — powered by our own AI monetization system. Strategy, product, technology and launch, run by one studio.",
  email: "anel@mintedscale.com",
  established: "Est. MMXXVI",
  socials: [
    { label: "Instagram", href: "https://instagram.com/mintedscale", handle: "@mintedscale" },
    { label: "TikTok", href: "https://tiktok.com/@mintedscale", handle: "@mintedscale" },
    { label: "Email", href: "mailto:anel@mintedscale.com", handle: "anel@mintedscale.com" },
  ],
} as const;

export const nav = [
  { label: "Results", href: "#results" },
  { label: "The Mint", href: "#method" },
  { label: "AI System", href: "#engine" },
  { label: "Calculator", href: "#calculator" },
  { label: "Work", href: "#specimens" },
] as const;

/* ── Hero ──────────────────────────────────────────────────── */

export const hero = {
  eyebrow: "The Creator Mint",
  headline: ["Your audience is", "more than followers."],
  sub: "We help creators turn attention into brands, products, and businesses — built, launched and scaled by one studio.",
  primaryCta: "Build my brand",
  secondaryCta: "See the numbers",
  /** PLACEHOLDER: drop your film in /public/videos/ and set src + poster. */
  video: {
    src: "",
    poster: "",
    label: "How the mint works",
    duration: "2:14",
  },
  bar: [
    { value: "€0", label: "Upfront" },
    { value: "48h", label: "To first plan" },
    { value: "4", label: "Partners per quarter" },
  ],
} as const;

/* ── Results ───────────────────────────────────────────────── */

export const results = {
  eyebrow: "Proven results",
  index: "01",
  headline: "The numbers we mint.",
  body: "Every partnership is measured the same way: what did the creator own at the end, and what did it earn.",
  /** PLACEHOLDER FIGURES — replace with your own before launch. */
  headlineStats: [
    { value: 2400000, prefix: "€", suffix: "+", label: "Revenue minted", note: "Across partner brands" },
    { value: 140, prefix: "", suffix: "+", label: "Creators transformed", note: "Since 2021" },
    { value: 92, prefix: "", suffix: "", label: "Products launched", note: "Live and trading" },
    { value: 4.9, prefix: "", suffix: "/5", label: "Partner rating", note: "Post-build survey", decimals: 1 },
  ],
  /** PLACEHOLDER: your own launch results. Handle → first-launch revenue. */
  ticker: [
    { handle: "@lenaruiz", amount: "€153K", note: "First launch" },
    { handle: "@thekwame", amount: "€94K", note: "Cohort one" },
    { handle: "@sofiedalgaard", amount: "€70K", note: "Collection one" },
    { handle: "@marcusdrey", amount: "€61K", note: "First launch" },
    { handle: "@ninaklos", amount: "€48K", note: "Launch week" },
    { handle: "@theobrandt", amount: "€41K", note: "First launch" },
    { handle: "@amaliviera", amount: "€33K", note: "Pre-sale" },
    { handle: "@joskovac", amount: "€28K", note: "Launch week" },
  ],
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
  body: "Most studios guess what your audience will buy, then bill you for the guess. We built software that reads the audience first — so the product is chosen from evidence, not taste.",
  serif: "The guesswork is the expensive part. We removed it.",
  modules: [
    {
      code: "01",
      title: "Audience decode",
      body: "Ingests your comments, DMs, watch-time and follower graph, then clusters what your audience actually wants to buy.",
      metric: "12M+",
      metricLabel: "Signals processed per audit",
    },
    {
      code: "02",
      title: "Offer synthesis",
      body: "Generates and scores candidate products against demand density, price tolerance and how hard each is to ship.",
      metric: "40+",
      metricLabel: "Offers modelled per creator",
    },
    {
      code: "03",
      title: "Price finder",
      body: "Models your ladder — entry, core and premium — against comparable launches in your niche.",
      metric: "3-tier",
      metricLabel: "Pricing ladder per brand",
    },
    {
      code: "04",
      title: "Launch simulator",
      body: "Projects the launch sequence before a single post goes out, so we know what to expect and where it breaks.",
      metric: "90-day",
      metricLabel: "Forecast horizon",
    },
  ],
  /** PLACEHOLDER: a screen recording of the system works well here. */
  video: { src: "", poster: "", label: "Inside the engine", duration: "1:38" },
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
    "An estimate, not a promise. Built from launch-sequence conversion against your engaged audience — your niche, offer and list quality move it in both directions.",
} as const;

/* ── Case studies ──────────────────────────────────────────── */

export const specimens = {
  eyebrow: "Case studies",
  index: "06",
  headline: ["Struck,", "not sketched."],
  body: "Three transformations, end to end. The creators below are fictional, built to demonstrate exactly how the mint runs.",
  disclaimer: "Illustrative — fictional creators, real methodology.",
  items: [
    {
      ref: "01",
      handle: "@lenaruiz",
      platform: "Instagram",
      followers: "412K",
      field: "Training & recovery",
      before: {
        summary:
          "Four years of daily training content. Income from one-off brand deals, negotiated by DM, priced by guesswork.",
        points: ["No owned product", "Rate set by the sponsor", "Zero revenue between posts"],
        revenue: "€0",
        revenueLabel: "Owned revenue",
      },
      after: {
        brand: "VESSEL",
        line: "Recovery & hydration",
        summary:
          "A recovery brand with its own point of view, sold direct, with a subscription that bills whether or not she posts.",
        deliverables: [
          "Identity system & packaging",
          "vessel.co — direct storefront",
          "9-SKU recovery line",
          "Subscription & retention model",
        ],
        revenue: "€153K",
        revenueLabel: "First-launch revenue",
      },
      model: "DTC subscription · Retail wholesale",
      horizon: "11 months",
    },
    {
      ref: "02",
      handle: "@thekwame",
      platform: "TikTok",
      followers: "1.2M",
      field: "Personal finance",
      before: {
        summary:
          "Explains money to a million people. Monetised by affiliate links to products he did not build or control.",
        points: ["Audience trusts him, buys elsewhere", "No pricing power", "Platform-dependent income"],
        revenue: "€0",
        revenueLabel: "Owned revenue",
      },
      after: {
        brand: "LEDGERHOUSE",
        line: "Financial education",
        summary:
          "A school with a curriculum, a cohort calendar and software — priced as education, not as an affiliate click.",
        deliverables: [
          "Curriculum & cohort structure",
          "Ledgerhouse app — iOS & web",
          "Certification programme",
          "Enterprise licensing track",
        ],
        revenue: "€94K",
        revenueLabel: "Cohort one",
      },
      model: "Cohort tuition · Software subscription",
      horizon: "14 months",
    },
    {
      ref: "03",
      handle: "@sofiedalgaard",
      platform: "YouTube",
      followers: "640K",
      field: "Interiors & design",
      before: {
        summary:
          "Long-form interiors films with a devoted audience. Revenue was ad share — high views, thin margin.",
        points: ["Income tied to CPM", "No physical product", "Taste with nothing attached to it"],
        revenue: "€0",
        revenueLabel: "Owned revenue",
      },
      after: {
        brand: "ATELIER SD",
        line: "Objects & lighting",
        summary:
          "A design house that manufactures under her name, with licensing deals that pay without a single upload.",
        deliverables: [
          "House identity & art direction",
          "First object collection — 14 pieces",
          "Manufacturing & licensing deals",
          "Trade & showroom channel",
        ],
        revenue: "€70K",
        revenueLabel: "Collection one",
      },
      model: "Product margin · Licensing royalties",
      horizon: "16 months",
    },
  ],
} as const;

/* ── Video wall ────────────────────────────────────────────── */

export const videoWall = {
  eyebrow: "In their words",
  index: "07",
  headline: ["Hear it from", "the creators."],
  body: "Short films from partners on what changed after the mint.",
  /**
   * PLACEHOLDER SLOTS — portrait 9:16, the format creators already shoot.
   * Add files to /public/videos and set `src` + `poster` to fill a slot.
   * Empty slots render as a clearly-marked reserved frame.
   */
  items: [
    { id: "v1", name: "Creator one", handle: "@handle", result: "€153K first launch", src: "", poster: "" },
    { id: "v2", name: "Creator two", handle: "@handle", result: "€94K cohort one", src: "", poster: "" },
    { id: "v3", name: "Creator three", handle: "@handle", result: "€70K collection one", src: "", poster: "" },
    { id: "v4", name: "Creator four", handle: "@handle", result: "€61K first launch", src: "", poster: "" },
  ],
} as const;

/* ── Services ──────────────────────────────────────────────── */

export const capabilities = {
  eyebrow: "What we build",
  index: "08",
  headline: ["Four practices.", "One studio."],
  body: "No vendors, no handoffs. The team that writes the thesis ships the product.",
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
  headline: ["Why creators", "choose us."],
  points: [
    {
      n: "01",
      title: "Business mindset, not just content",
      body: "We read your audience as a market: who buys, at what price, how often. Content is the distribution channel, not the product.",
    },
    {
      n: "02",
      title: "Strategy and execution",
      body: "The same team that writes the thesis builds the brand, ships the product and stands up the technology. Nothing is handed to a vendor.",
    },
    {
      n: "03",
      title: "Brand building experience",
      body: "We have taken names from a profile page to a manufactured, trading company — through naming, supply, storefront and launch.",
    },
    {
      n: "04",
      title: "Long-term partnerships",
      body: "We take a small number of creators per year and stay through the difficult middle, where most projects quietly stall.",
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
      q: "How big does my audience need to be?",
      a: "There is no hard floor, but engagement matters far more than follower count. A 30K audience that comments and buys is worth more to us than a 500K audience that scrolls past. If the numbers do not support a build yet, we will tell you plainly instead of taking the work.",
    },
    {
      q: "What does it cost?",
      a: "It depends on what we are building — a digital product line and a manufactured physical brand are very different projects. We price after the discovery call, once we know the scope, and you see the full number before anything starts.",
    },
    {
      q: "How long until something is live?",
      a: "First plan inside 48 hours of the call. A digital product typically launches in 8–12 weeks; a physical line takes longer because manufacturing does.",
    },
    {
      q: "I already have a product. Can you still help?",
      a: "Often that is the better starting point. We audit what exists, fix the positioning and pricing, and build the system around it rather than starting from zero.",
    },
    {
      q: "Who owns the brand?",
      a: "You do — the name, the identity, the storefront, the customer list, all of it. We build assets in your name. That is the entire point.",
    },
    {
      q: "What do you need from me?",
      a: "Access to your audience data, a few hours a month, and honest answers on the call. We do the building.",
    },
  ],
} as const;

/* ── Application ───────────────────────────────────────────── */

export const application = {
  eyebrow: "Apply",
  index: "11",
  headline: ["Ready to turn your name", "into a brand?"],
  body: "If you are a creator and want to build something bigger than content, let's talk.",
  terms: [
    "We take four partners each quarter.",
    "Every application is read by a partner, not a form robot.",
    "Expect a reply within two business days.",
  ],
} as const;

export const platforms = ["Instagram", "TikTok", "YouTube", "X", "Twitch", "Other"] as const;
