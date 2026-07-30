/**
 * English copy. This file defines the shape every other language must match —
 * `Dictionary` is derived from it, so a missing key in a translation is a
 * build error rather than a blank spot on the page.
 *
 * HOUSE RULE: nothing here claims a result that has not happened.
 */
export const en = {
  locale: "en",
  htmlLang: "en",
  label: "EN",

  site: {
    role: "The Creator Mint",
    tagline: "Turning creators into brands.",
    description:
      "MintedScale turns creator audiences into brands, products and businesses. Strategy, product and technology from one person — built on a revenue share, so you pay nothing upfront.",
  },

  nav: ["Work", "The Mint", "AI System", "Calculator", "Concepts"],
  applyCta: "Apply now",
  langLabel: "Language",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  skipToContent: "Skip to content",

  hero: {
    headline: ["Your audience is", "more than followers."],
    sub: "I turn attention into brands, products and businesses — built and launched by one person, on a revenue share. You pay nothing upfront.",
    primaryCta: "Build my brand",
    secondaryCta: "See how it works",
    videoLabel: "How the mint works",
    bar: [
      { value: "€0", label: "Upfront" },
      { value: "Rev share", label: "I earn when you earn" },
      { value: "8+ yrs", label: "Building products" },
    ],
    earnings: {
      lead: "What a 250K creator makes on launch",
      inputs: "250,000 followers · 3% engagement rate · €125 product",
      cta: "Run your numbers",
    },
    pill: { lead: "Shipped for", companies: "companies", tail: "8+ years of product work" },
  },

  /** Prior work showcase. Company facts are public; `built` comes from config. */
  work: {
    eyebrow: "Prior work",
    index: "01",
    headline: ["Built for", "real companies."],
    body: "Eight years of platforms, apps, storefronts and the operations behind them. Creator brands are the new chapter — every company below is one you can open and check.",
    selectLabel: "Select a project",
    visitLabel: "Visit site",
    sectorLabel: "Sector",
    placeLabel: "Based in",
    doesLabel: "What they do",
    builtLabel: "What I built",
    builtPending: "Project detail coming — the company is real, the write-up is not written yet.",
    items: [
      {
        sector: "Business IT services",
        place: "Melbourne, Australia",
        does: "Managed IT support, cybersecurity and infrastructure for small and medium businesses.",
        built: [
          "Web platform and mobile app",
          "IT ticketing system",
          "Cybersecurity",
        ],
      },
      {
        sector: "Software product",
        place: "Australia",
        does: "A product business shipping its own application.",
        built: [
          "Web platform and mobile app",
          "Shipped as the company's own product",
        ],
      },
      {
        sector: "Training & licensing",
        place: "Victoria, Australia",
        does: "A registered training organisation running heavy vehicle, forklift and plant licensing across six locations.",
        built: [
          "Web platform and mobile app",
          "For heavy vehicle and plant licensing",
        ],
      },
      {
        sector: "Field service",
        place: "Australia-wide",
        does: "Appliance repair for homes and businesses, booked online and dispatched nationally.",
        built: [
          "Web platform and mobile app",
          "For national field service",
        ],
      },
    ],
  },

  studio: {
    stats: [
      { value: "8+", label: "Years building products", note: "Software & commerce" },
      { value: "€0", label: "Upfront to start", note: "Nothing to pay in advance" },
      { value: "Rev share", label: "I earn when you earn", note: "No win, no fee" },
      { value: "4", label: "Practices, one person", note: "Brand · Product · Growth · Tech" },
    ],
    portraitAlt: "Anel Kujović, founder of MintedScale",
    portraitSlot: "Portrait slot reserved",
    note: {
      lead: "I'm Anel. For over eight years I've built software and commerce products for companies — platforms, apps, storefronts and payment systems. The unglamorous infrastructure that makes a business actually run.",
      body: "MintedScale is that capability pointed at creators. Most people offering to build your brand are marketers who can't ship software, so the strategy deck arrives and the product never does. I ship the product.",
      offer:
        "Creator brands are new for me, and I'd rather say that than invent a client list. That's why partners pay nothing upfront: I build, you launch, and I take a share of what it earns. If it earns nothing, I earn nothing.",
      signature: "Anel Kujović · Founder",
    },
    clientsLabel: "Prior product work",
    clientsCaveat:
      "Software and commerce work I delivered for these companies. Creator brands are the new chapter — those results go here as they land, not before.",
    followLabel: "Follow the build",
  },

  diagnosis: {
    eyebrow: "The problem",
    index: "02",
    headline: ["Creators have attention.", "Few build assets."],
    body: "Millions of creators build audiences every day. Almost none of that attention becomes something they own. A following is rented — the moment you stop posting, it stops paying. A brand is an asset. It holds value while you sleep, and it can be sold.",
    costLabel: "Cost",
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
  },

  method: {
    eyebrow: "The mint",
    index: "03",
    headline: ["From creator", "to brand."],
    body: "One sequence, run in order. Each stage produces something you own before the next one starts.",
    cta: "Start building your brand",
    steps: [
      {
        n: "01",
        title: "Discover",
        body: "Understand your audience, identity, and opportunities.",
        detail:
          "I run your audience through the engine: who they are, what they already buy, where the demand is dense enough to price against. The output is a positioning thesis, not a mood board.",
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
  },

  engine: {
    eyebrow: "Built in-house",
    index: "04",
    headline: ["I built my own", "AI monetization system."],
    body: "Most studios guess what your audience will buy, then bill you for the guess. I built software that reads the audience first — so the product is chosen from evidence, not taste.",
    serif: "The guesswork is the expensive part. I removed it.",
    videoLabel: "Inside the engine",
    asideBody:
      "Every partner build starts with an audit from the engine. You see the output before you commit to anything.",
    asideCta: "Run my audit",
    appCaption: "The audit output",
    appNote: "A projection from your own numbers — not revenue earned.",
    producesLabel: "What it produces",
    modules: [
      {
        code: "01",
        title: "Brand Analyzer",
        tag: "Optimize your brand",
        body: "Reads your profile, your comments and what your audience already responds to, then scores where the positioning is weak.",
        metric: "Positioning report",
      },
      {
        code: "02",
        title: "Content Strategist",
        tag: "Plan content that converts",
        body: "Maps what to post against what sells, so your calendar and your storefront stop working against each other.",
        metric: "Content plan",
      },
      {
        code: "03",
        title: "Audience Growth",
        tag: "Grow & engage faster",
        body: "Finds where the engaged part of your audience actually sits, and what pulls more of it in.",
        metric: "Growth plan",
      },
      {
        code: "04",
        title: "Deal Finder",
        tag: "Find brand deals",
        body: "Surfaces brands whose customers overlap with your audience, and what they pay creators your size.",
        metric: "Deal shortlist",
      },
      {
        code: "05",
        title: "Income Optimizer",
        tag: "Increase your revenue",
        body: "Models your pricing ladder and the launch sequence, then projects what a full year looks like.",
        metric: "Revenue model",
      },
    ],
  },

  calculator: {
    eyebrow: "Revenue calculator",
    index: "05",
    headline: ["What is your audience", "actually worth?"],
    body: "Move the dials. The maths is shown in full — no black box, no inflated promise.",
    audienceLabel: "Your audience",
    followersLabel: "Followers",
    engagementLabel: "Engagement rate",
    engagementHint:
      "Share of your followers who actually like, comment or watch — not your revenue share",
    priceLabel: "Product price",
    leversLabel: "What moves this number",
    projectedLabel: "Projected first launch",
    yearLabel: "12-month potential",
    engagedRow: "Engaged audience",
    conversionRow: "Launch conversion",
    conversionValue: "of engaged",
    buyersRow: "Expected buyers",
    priceRow: "Price each",
    cta: "I want this revenue",
    levers: [
      "How well the offer matches what your audience already buys",
      "Whether you own an email list or only rent the platform",
      "Price ladder — an entry product lifts the core one",
      "Launch sequencing against your content calendar",
    ],
    disclaimer:
      "A model, not a promise. It applies a launch-sequence conversion rate to your engaged audience — your niche, offer and list quality move it in both directions. I show the arithmetic so you can argue with it.",
  },

  concepts: {
    eyebrow: "Concept builds",
    index: "06",
    headline: ["Built on paper", "before it's built for real."],
    body: "Three creators I'd love to work with, and exactly what I'd make for each. These are plans, not past clients — read them to judge the thinking, because the thinking is what you're hiring.",
    disclaimer:
      "Concept builds. Illustrative creators, real method. The figures are projections from the model in my calculator, not results — MintedScale is taking its first partners now.",
    cta: "Get your own concept",
    conceptWord: "Concept",
    beforeLabel: "Where they are",
    afterLabel: "What I'd build",
    projectedLabel: "Projected first launch",
    audienceRow: "Audience",
    engagedRow: "Engaged",
    buyersRow: "Buyers",
    priceRow: "Price",
    ladderLabel: "Price ladder",
    modelLabel: "Business model",
    horizonLabel: "Build horizon",
    items: [
      {
        handle: "The training creator",
        field: "Training & recovery",
        beforeSummary:
          "Four years of daily training content. Income from one-off brand deals, negotiated by DM, priced by guesswork.",
        beforePoints: ["No owned product", "Rate set by the sponsor", "Zero revenue between posts"],
        line: "Recovery & hydration",
        afterSummary:
          "A recovery brand with its own point of view, sold direct, with a subscription that bills whether or not she posts.",
        deliverables: [
          "Identity system & packaging",
          "Direct storefront on Shopify",
          "9-SKU recovery line",
          "Subscription & retention flows",
        ],
        ladderTiers: ["Entry", "Core", "Bundle"],
        model: "DTC subscription · Retail wholesale",
        horizon: "11 months to full line",
      },
      {
        handle: "The finance creator",
        field: "Personal finance",
        beforeSummary:
          "Explains money to a million people. Monetised by affiliate links to products he did not build or control.",
        beforePoints: [
          "Audience trusts him, buys elsewhere",
          "No pricing power",
          "Platform-dependent income",
        ],
        line: "Financial education",
        afterSummary:
          "A school with a curriculum, a cohort calendar and software — priced as education, not as an affiliate click.",
        deliverables: [
          "Curriculum & cohort structure",
          "Web app — tracking & lessons",
          "Certification programme",
          "Enterprise licensing track",
        ],
        ladderTiers: ["Entry", "Cohort", "Licence"],
        model: "Cohort tuition · Software subscription",
        horizon: "14 months to licensing",
      },
      {
        handle: "The design creator",
        field: "Interiors & design",
        beforeSummary:
          "Long-form interiors films with a devoted audience. Revenue is ad share — high views, thin margin.",
        beforePoints: [
          "Income tied to CPM",
          "No physical product",
          "Taste with nothing attached to it",
        ],
        line: "Objects & lighting",
        afterSummary:
          "A design house that manufactures under her name, with licensing deals that pay without a single upload.",
        deliverables: [
          "House identity & art direction",
          "First collection — 14 pieces",
          "Manufacturing & licensing structure",
          "Trade & showroom channel",
        ],
        ladderTiers: ["Print", "Object", "Lighting"],
        model: "Product margin · Licensing royalties",
        horizon: "16 months to first collection",
      },
    ],
  },

  films: {
    eyebrow: "Partner films",
    index: "07",
    headline: ["Are you", "next?"],
    body: "When a partner launches, their film goes here — what I built, what it earns, in their own words. Reserved, not invented.",
    cta: "Take the first frame",
    slotLabel: "Are you next?",
    status: "Open",
    frameWord: "Frame",
  },

  faq: {
    eyebrow: "Questions",
    index: "08",
    headline: ["Before you", "apply."],
    items: [
      {
        q: "What does it cost?",
        a: "Nothing upfront. I work on a revenue share: I build the brand, the product and the technology at my own cost, and take a share of what it earns. If it earns nothing, I earn nothing. The percentage depends on how much we're building, so we set it together on the call — and it goes in writing, time-limited, before any work starts. You are not signing away your company.",
      },
      {
        q: "You're new to creator brands. Why should I take the risk?",
        a: "Because of how it's priced, you aren't taking the financial risk — I am. The product work isn't new: eight years of platforms, apps and storefronts for companies like Accelit IT, Puzzles IT, TDT Training and Nationwide Appliance Repairs. What's new is applying it to creator brands, and I'd rather say that plainly than invent a creator client list. Start with the free audit and judge the work before committing to anything.",
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
        a: "Often that is the better starting point. I audit what exists, fix the positioning and pricing, and build the system around it rather than starting from zero.",
      },
      {
        q: "Who owns the brand?",
        a: "You do — the name, the identity, the storefront, the customer list, all of it, in your name from day one. A revenue share is a share of revenue, not of ownership.",
      },
    ],
  },

  application: {
    eyebrow: "Apply",
    index: "09",
    headline: ["Ready to turn your name", "into a brand?"],
    body: "If you are a creator and want to build something bigger than content, let's talk. No upfront fee — I earn when you earn.",
    writeToUs: "Or write to me",
    terms: [
      "Nothing to pay upfront — I earn when you earn.",
      "You own the brand, the product and the customer list.",
      "Every application is read by me, not a form robot.",
      "Expect a reply within two business days.",
    ],
  },

  /** The booking console. Every string a visitor can hit, including errors. */
  console: {
    header: "Private consultation",
    confidential: "Confidential",
    tablistLabel: "How to reach me",
    callTab: "Schedule a call",
    callNote: "45 minutes, with me",
    messageTab: "Send a message",
    messageNote: "I reply within two days",
    stepDay: "Choose a day",
    stepTime: "Choose a time",
    stepAbout: "Tell me about you",
    loadingSlots: "Loading my calendar",
    slotsError: "Calendar unavailable.",
    tryAgain: "Try again",
    orMessage: "or send a message instead.",
    noSlots: "No open times right now — send a message and I will make room.",
    pickDayFirst: "Pick a day first.",
    provisional: "Times are provisional until I confirm them.",
    minutes: "min",
    privacyCall: "Your details come straight to me. Nothing is shared.",
    privacyMessage: "Sent to {email}. Nothing is shared.",
    submitCall: "Confirm my call",
    submitMessage: "Send application",
    sending: "Sending",
    preferGoogle: "Prefer Google?",
    openAppointments: "Open my appointment page",
    fields: {
      name: "Full name",
      namePlaceholder: "Lena Ruiz",
      email: "Email",
      emailPlaceholder: "you@email.com",
      platform: "Main platform",
      select: "Select",
      handle: "Username",
      handlePlaceholder: "yourname",
      followers: "Followers",
      followersHint: "120000 or 120k",
      followersPlaceholder: "412000",
      ideaCall: "What do you want to build?",
      ideaMessage: "Message",
      ideaPlaceholder:
        "What you make, who watches, and the business you want on the other side of it.",
    },
    done: {
      received: "Application received",
      thanks: "Thank you. I will get back to you shortly.",
      yourCall: "Your call",
      joining: "Joining details",
      meetLink: "Google Meet link",
      sentToEmail: "Sent to your email",
      quote: "Quote {ref} if you need to reach me before then —",
    },
    errors: {
      generic: "Something went wrong. Try again.",
      unreachable: "Could not reach me. Email {email} directly.",
      checkFields: "Check the highlighted fields.",
      slotTaken: "That time has just been taken. Pick another.",
      slotGone: "No longer available.",
      tooMany: "Too many attempts. Try again shortly.",
      malformed: "Malformed request.",
      sendFailed: "That did not send. Email {email} directly.",
      name: "Enter your full name.",
      nameLong: "That name is too long.",
      emailMissing: "Enter an email address.",
      emailInvalid: "That email address does not look right.",
      emailLong: "That email address is too long.",
      platformMissing: "Choose a platform.",
      platformInvalid: "Choose a platform from the list.",
      handle: "Enter your username.",
      handleLong: "That username is too long.",
      followers: "Enter a number, like 120000 or 120k.",
      followersUnreal: "Enter a realistic follower count.",
      idea: "Tell me a little more — at least a sentence.",
      ideaLong: "Keep it under 2,000 characters.",
      slotMissing: "Choose a time for your call.",
      slotInvalid: "That time is not valid.",
      slotPast: "That time has already passed.",
    },
    success: {
      call: "Your call is held.",
      message: "Thank you. I will get back to you shortly.",
    },
  },

  finalCta: {
    eyebrow: "Now minting",
    headline: ["Your name can become", "a brand."],
    body: "Bring an audience and an appetite — I bring the strategy, the product, the technology and the launch. Nothing to pay upfront.",
    primary: "Start building",
    secondary: "Email me",
  },

  footer: {
    studio: "Sections",
    contact: "Contact",
    apply: "Apply",
  },

  video: { reserved: "Video slot reserved", play: "Play" },
};

export type Dictionary = typeof en;
export type Locale = "en" | "bs";
