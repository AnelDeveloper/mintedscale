# Prompt za prvi post — Instagram karusel + TikTok

Kopiraj sve ispod linije u Claude (Design / Artifacts). Kopija je bosanska i
doslovna — uzeta iz `src/lib/i18n/bs.ts`, brojke iz `src/lib/config.ts`.

Ako želiš samo 5 slajdova umjesto 8, uzmi **01, 03, 04, 05, 08**.

---

You are designing the launch carousel for **MintedScale** — a one-person creator
brand studio. Output is a set of social slides, not a web page.

## 1. Output

Build **one self-contained HTML file** containing 8 slides, each an exact-pixel
frame, stacked vertically with a 40px gap between them so each can be screenshot
individually:

- **Instagram carousel:** 8 frames at exactly **1080 × 1350 px** (4:5).
- **TikTok photo post:** the same 8 designs reflowed to **1080 × 1920 px** (9:16)
  — *reflowed, not scaled*. Give these as a second set below the first.

Rules for the frames:

- No page scroll inside a frame, no cropping, nothing clipped. Everything must
  fit inside its own box.
- Inline every style. No external CSS, no external images, no CDN.
- Padding inside each frame: **88px** left/right, **96px** top/bottom.
- **TikTok safe zones:** keep all text and logos out of the top 180px, the
  bottom 520px, and the right 240px — TikTok's own UI sits there. Center the
  composition in what's left.
- Fonts: Archivo (800/700), Instrument Serif (italic 400), Instrument Sans
  (400/500), IBM Plex Mono (500). Load from Google Fonts if allowed; otherwise
  fall back to Helvetica Neue / Georgia italic / system-ui / SF Mono and say so.

## 2. Brand system — use these values exactly

```
Background       #080706   (warm black, never pure #000)
Panel            linear-gradient(168deg, rgba(24,19,14,.70), rgba(11,9,8,.80))
Bone (text)      #f2ede3
Ash (muted)      #8f887c
Hairline         rgba(242,237,227,0.08)
Gold hairline    rgba(217,169,76,0.28)

Gold ramp (fills display type and the mark):
linear-gradient(177deg,#f9edcb 0%,#f0d486 22%,#e0b45c 44%,#c99a3e 62%,#edcd7d 82%,#a9762a 100%)

Wide gold (for long headlines):
linear-gradient(100deg,#b8842f 0%,#f7e7bc 18%,#d9a94c 38%,#f9edcb 55%,#c99a3e 74%,#f0d486 92%)

Money green      #3fd98a   — ONLY for revenue/positive figures. Never decoration.
Radius           16px panels, 10px chips/buttons
```

Atmosphere on every frame, in this order:

1. Gold radial bloom, top center: `radial-gradient(ellipse 48% 44% at 50% 32%,
   rgba(217,169,76,.20), rgba(160,114,40,.09) 40%, transparent 74%)`
2. Deeper amber bloom, bottom-left: `radial-gradient(ellipse 46% 42% at 40% 60%,
   rgba(184,132,47,.13), transparent 72%)`
3. Grid lines every 84px at `rgba(242,237,227,0.032)`, radially masked so they
   fade out toward the edges.
4. SVG fractal-noise film grain, `opacity:.055`, `mix-blend-mode:overlay`.
5. On panels: a 1px lit gold rim along the **top edge only**, fading to
   transparent at both ends.

## 3. Type rules — these are the brand, don't improvise

- **Every headline is two lines. Line one is bone, line two is gold.** This is
  the studio's one hard rule — it mirrors MINTED / SCALE in the wordmark.
- Display: Archivo 800, uppercase, `letter-spacing:-0.025em`,
  `line-height:0.96`. Size on a 1080px frame: **104–132px**.
- Eyebrow / labels / buttons: IBM Plex Mono 500, uppercase,
  `letter-spacing:0.22em`, **24px**, color gold `#e8c271` for eyebrows, ash for
  quiet labels. Eyebrow is preceded by a 60px gold-to-transparent rule.
- Body: Instrument Sans 400, **30–34px**, `line-height:1.5`, color
  `rgba(242,237,227,0.72)`. Max 62 characters per line.
- One serif line per carousel at most: Instrument Serif *italic*, 46px, bone.
- Numbers and figures: Archivo 800, tabular numerals.
- Gold gradient text needs `padding-bottom:.2em; margin-bottom:-.2em` or
  descenders get sliced off by the clip box.

## 4. Composition

- Slide 1 is a poster: one idea, huge type, most of the frame empty.
- Slides 2–7 each get one headline + at most **four** supporting blocks. If a
  slide needs more than ~45 words of body copy total, cut copy, don't shrink type.
- Vary the layout slide to slide — a carousel where every frame is a centered
  stack reads as a template. Rotate between: full-bleed poster, left type /
  right panel, numbered vertical list, 2×2 tile grid, wide stat row.
- Every slide carries the small MS coin mark + `mintedscale.com` in one corner
  at 22px mono, ash — the same corner on all 8.

**The MS coin mark** (redraw as inline SVG, viewBox 0 0 100 100): a 2.5px gold
ring at r=46, a faint inner ring `rgba(217,169,76,.22)` at r=39, a small gold
assay diamond at top center and bottom center, and `MS` in Archivo 800 centered,
filled with the gold ramp.

## 5. The slides — set this copy verbatim, do not translate or rewrite

Bosnian. First person singular throughout ("ja", not "mi") — MintedScale is one
person and the whole positioning depends on saying so.

### Slide 01 — Hook

- Eyebrow: `MINTEDSCALE · EST. MMXXVI`
- Headline: `Tvoja publika je` / `više od pratilaca.`
- Sub (Instrument Serif italic): `Pretvaram kreatore u brendove.`
- Bottom-right, mono, ash: `PREVUCI →`
- Layout: poster. Type occupies the lower two-thirds, coin mark large and dim
  behind the headline, nothing else.

### Slide 02 — Ko sam

- Eyebrow: `01 · KO SAM`
- Headline: `Jedan čovjek,` / `četiri discipline.`
- Body: `Ja sam Anel. Preko osam godina radim softver i sisteme za online prodaju
  — platforme, aplikacije, web prodavnice i naplatu. Onu infrastrukturu o kojoj
  niko ne priča, a bez koje biznis ne radi.`
- Four mono chips in a row: `BREND` `PROIZVOD` `RAST` `TEHNOLOGIJA`
- Signature line, small: `Anel Kujović · Osnivač`
- Layout: left type, right a portrait frame — leave it as a marked empty frame
  with a thin gold border and the mono label `MJESTO ZA FOTOGRAFIJU` if no photo
  is supplied.

### Slide 03 — Problem

- Eyebrow: `02 · PROBLEM`
- Headline: `Kreatori imaju pažnju.` / `Rijetki grade brend.`
- Three numbered rows, each `title` + a right-aligned gold `cost`:
  - `01  Nema jasne strategije brenda` → `Cijenu određuje sponzor`
  - `02  Nema sistema proizvoda` → `€0 između objava`
  - `03  Nema održivog modela` → `Granica = tvoje vrijeme`
- Closing serif italic line: `Pratioce samo iznajmljuješ. Brend je imovina.`

### Slide 04 — Šta radim

- Eyebrow: `03 · RAST I IZGRADNJA`
- Headline: `Od kreatora` / `do brenda.`
- Four steps as a vertical list; number in gold mono, title in Archivo, output
  and time in small mono:
  - `01 Otkrivanje` · `Teza o publici · Mapa prilika` · `SEDMICA 1–2`
  - `02 Gradnja` · `Sistem identiteta · Knjiga brenda` · `SEDMICA 3–6`
  - `03 Lansiranje` · `Linija proizvoda · Prodavnica` · `SEDMICA 7–12`
  - `04 Rast` · `Operativni model · Sistemi rasta` · `MJESEC 4+`
- A thin gold vertical line connecting the four numbers.

### Slide 05 — AI sistem

- Eyebrow: `04 · VLASTITI RAZVOJ`
- Headline: `Izgradio sam vlastiti` / `AI sistem za monetizaciju.`
- Five agent rows — English product name, Bosnian result:
  - `Brand Analyzer` → `Izvještaj o pozicioniranju`
  - `Content Strategist` → `Plan sadržaja`
  - `Audience Growth` → `Plan rasta`
  - `Deal Finder` → `Lista saradnji`
  - `Income Optimizer` → `Model prihoda`
- Each row gets a small gold outline icon in a rounded square.
- Footer line, serif italic: `Nagađanje je ono što košta. Njega sam uklonio.`

### Slide 06 — Dokaz

- Eyebrow: `05 · DOSADAŠNJI RAD`
- Headline: `Rađeno za` / `prave kompanije.`
- 2×2 grid of company tiles — name + sector, monogram initials in gold on a bone
  circle where no logo is supplied:
  - `Accelit IT` · `Poslovne IT usluge` · `AC`
  - `Puzzles IT` · `Softverski proizvod` · `PZ`
  - `TDT Training` · `Obuka i licenciranje` · `TD`
  - `Nationwide Appliance Repairs` · `Servis na terenu` · `NW`
- Caveat at the bottom, mono, ash, small: `Brendovi kreatora su novo poglavlje —
  ti rezultati dolaze ovdje kada se dogode, ne prije.`

### Slide 07 — Model

- Eyebrow: `06 · MODEL`
- Headline: `Unaprijed` / `ne plaćaš ništa.`
- Three stat tiles in a row — figure in Archivo 800, label in mono:
  - `€0` · `UNAPRIJED`
  - `Podjela` · `ZARAĐUJEM KAD TI ZARADIŠ`
  - `Tvoje` · `BREND, PROIZVOD I LISTA KUPACA`
- Body: `Ja gradim, ti lansiraš, a ja uzimam dio onoga što zaradi. Ako ne zaradi
  ništa, ne zarađujem ni ja.`

### Slide 08 — Poziv

- Eyebrow with a small pulsing gold dot: `SADA PRIMAM PARTNERE`
- Headline: `Tvoje ime može postati` / `brend.`
- Body: `Donesi publiku i apetit — ja donosim strategiju, proizvod, tehnologiju
  i lansiranje.`
- Gold pill button: `PRIJAVI SE`
- Footer, mono, ash: `mintedscale.com · @mintedscale`
- Layout: centered, most empty of all eight. Coin mark large and lit above the
  headline.

## 6. Hard rules

1. **No invented numbers.** No follower counts, no revenue figures, no client
   counts, no testimonials, no "500+ creators". The studio is taking its first
   partners; a fake number loses this exact audience. The only figures allowed
   are the ones written above.
2. First person singular. Never "mi", never "naš tim".
3. No emoji anywhere. No stock-photo people. No drop shadows on text other than
   the specified gold glow. No purple, no blue, no neon — black, gold, bone, and
   green only for money.
4. Bosnian forms: sedmica (not tjedan), hiljada (not tisuća), niko (not nitko).
   Keep every diacritic — č, ć, ž, š, đ.
5. Slide 1 must read at thumbnail size. If the headline is unreadable scaled to
   150px wide, it's too small.

## 7. Deliver

- The HTML file with all 16 frames (8 at 4:5, 8 at 9:16).
- A one-line note on how to export each frame to PNG at 1080px wide.
- A short list of anything you had to change to make copy fit, so it can be
  checked against the site.

---

## Dodatak A — engleska verzija

Isti prompt, samo zamijeni kopiju engleskom iz `src/lib/i18n/en.ts`. Naslovi:
`Your audience is` / `more than followers.` · `Creators have attention.` /
`Few build a brand.` · `From creator` / `to brand.` · `I built my own` /
`AI monetisation system.` · `Built for` / `real companies.`

## Dodatak B — ako želiš foto-kompozit kao na posteru

Za slajd 01 i 08, umjesto čiste tipografije:

> Editorial portrait of a bearded man in a black shirt, lit warm from the left
> against a near-black background (#080706). The right edge of his silhouette
> disintegrates into thousands of small gold triangular particles drifting
> outward. Cinematic, high contrast, shallow depth of field, no text, no logo,
> vertical 4:5 composition with the subject on the right third and the left
> third left empty and dark for typography. Colour limited to warm black, bone
> white and polished gold.

Tekst se **uvijek** dodaje u HTML-u preko slike, nikad ne generisati tekst u
image modelu — pogrešno će napisati dijakritike.

## Dodatak C — caption za prvi post

```
Tvoja publika je više od pratilaca.

Osam godina sam gradio softver i sisteme za prodaju za kompanije. MintedScale je
isto to, samo za kreatore: brend, proizvod, prodavnica i lansiranje.

Unaprijed ne plaćaš ništa. Zarađujem kad ti zaradiš.
Prijave su otvorene → mintedscale.com

#kreator #brend #biznis #bosna #balkan #contentcreator #brandbuilding
```
