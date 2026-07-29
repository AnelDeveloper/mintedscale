# MintedScale — The Creator Mint

Landing page and lead system for MintedScale. Next.js 15 (App Router), React 19,
Tailwind CSS v4, TypeScript. No runtime dependencies beyond the framework — the
Google Calendar and email integrations are written against their HTTP APIs.

```bash
npm install
cp .env.example .env.local   # optional — the site runs without it
npm run dev
```

---

## ⚠️ Before you go live

Three things must be replaced. They are all in `src/lib/content.ts` and marked
`PLACEHOLDER`.

| What | Where | Why it matters |
|---|---|---|
| Top-line figures (`€2.4M+`, `140+`, `92`, `4.9/5`) | `results.headlineStats` | These are stand-ins. Publishing invented revenue as fact is a claim you would have to defend. |
| Money ticker results | `results.ticker` | Same — swap for your own launches, or delete the ticker until you have them. |
| Case studies | `specimens.items` | Fictional demo creators. The page labels them "Illustrative — fictional creators, real methodology," so they are honest as they stand, but real ones convert better. |

The results section renders a visible note pointing at this file. Delete that
line (`src/components/results.tsx`) once the numbers are real.

---

## Videos

Every video is an empty slot until you fill it. Empty slots render as a marked
reserved frame, so the layout is already correct.

| Slot | Format | Field in `content.ts` |
|---|---|---|
| Hero film | 16:9 landscape | `hero.video` |
| Engine film | 16:9 landscape | `engine.video` |
| Creator testimonials ×4 | 9:16 portrait | `videoWall.items[]` |

Drop files in `public/videos/`, then:

```ts
video: {
  src: "/videos/how-the-mint-works.mp4",
  poster: "/videos/how-the-mint-works.jpg",
  label: "How the mint works",
  duration: "2:14",
}
```

Encode H.264 MP4 (`-crf 23`, AAC audio) and always ship a poster — without one
the frame is black until the first byte arrives.

---

## Lead system

Two routes into the studio, both handled by `POST /api/apply`:

- **Schedule a call** — picks a slot, writes it to Google Calendar, emails both sides.
- **Send a message** — a written application, emailed to you.

Both collect name, email, platform, username, follower count and a description.
Validation is shared between the browser and the server (`src/lib/validation.ts`),
so inline errors always match what the API enforces.

Also included: honeypot spam trap, in-memory rate limit (6 submissions per IP per
10 minutes), server-side re-validation that a booked slot was actually offered,
and a 409 when someone takes a slot mid-form.

### Email

Set one key and it sends. With neither set, messages are logged to the server
console so you can see exactly what would have gone out.

```bash
RESEND_API_KEY=re_...          # or SENDGRID_API_KEY=SG...
EMAIL_FROM="MintedScale <studio@mintedscale.com>"
CONTACT_INBOX=anel@mintedscale.com
```

Verify your sending domain with the provider first, or mail lands in spam.

Two emails go out per application: the full application to the studio (reply-to
set to the creator, so hitting reply reaches them), and a receipt to the creator.

### Google Calendar

1. Google Cloud → new project → enable the **Google Calendar API**.
2. Create a **service account**, add a **JSON key**, download it.
3. Open Google Calendar → your calendar → *Settings and sharing* → *Share with
   specific people* → add the service account's `client_email` with
   **"Make changes to events"**.
4. Fill in:

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=mintedscale@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=anel@mintedscale.com
```

Keep the `\n` escapes and the quotes.

**Google Workspace only:** a bare service account cannot invite the creator to
the event or create a Meet link — both need domain-wide delegation. If you have
Workspace, grant delegation for the `calendar` scope and set
`GOOGLE_IMPERSONATED_USER=anel@mintedscale.com`. Bookings will then send a real
invite with a Meet link. On a personal Gmail account, leave it blank: the event
is still written to your calendar and both parties still get the emails.

Nothing here is load-bearing. Unset it all and the site still takes applications
— it emails them instead of writing calendar events, and slots are offered from
studio hours marked "provisional until a partner confirms."

### Studio hours

```bash
BOOKING_TIMEZONE=Europe/Berlin     # hours are expressed here; visitors see their own zone
BOOKING_DURATION_MINUTES=45
BOOKING_LEAD_TIME_HOURS=24
BOOKING_HORIZON_DAYS=21
```

Weekends are closed and the daily slots (10, 11, 12, 14, 15, 16) live in
`src/lib/slots.ts`.

---

## Design system

Sampled from the coin mark, not invented.

- **Black + gold.** Warm black `#080706`, gold ramp `#F7E7BC → #D9A94C → #8A5F1E`,
  bone `#F2EDE3`. Gold is the loud voice; bone is the calm one.
- **Type.** Archivo at heavy weights for the wordmark's plate lettering,
  Instrument Serif *italic* for the tagline voice, Instrument Sans for body,
  IBM Plex Mono for figures and labels.
- **Headline logic.** Every section heading is two lines: line one bone, line two
  gold — the same rule as MINTED/SCALE in the wordmark.

Tokens live in `src/app/globals.css`. Component classes are inside
`@layer components` on purpose, so Tailwind utilities always win a conflict —
move them out and things like `hidden sm:inline-flex` silently stop working.

Scroll reveals hide content until JS runs. An inline script in `layout.tsx` arms
a 2-second fallback that reveals everything regardless, deliberately outside
React: if hydration never happens, a React-based safety net would not fire either.

---

## Structure

```
src/
  app/
    layout.tsx            fonts, metadata, reveal bootstrap
    page.tsx              section order + JSON-LD
    globals.css           design tokens and component classes
    api/apply/            applications and bookings
    api/availability/     open slots (free/busy aware)
  components/             one file per section
  lib/
    content.ts            ← all copy and data
    validation.ts         shared browser/server rules
    slots.ts              studio hours, timezone maths
    google-calendar.ts    service-account JWT, free/busy, event creation
    email.ts              Resend / SendGrid over HTTP
    email-templates.ts    the studio notification and creator receipt
```

Change copy in `content.ts`. You should rarely need to touch a component.
