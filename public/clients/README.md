# Client logos

Drop a file here with the exact name below and it appears on the site — no
code change needed. A name that does not match, or a file that is not there
yet, falls back to the initials monogram rather than a broken image.

| Company | Filename | Status |
|---|---|---|
| Accelit IT | `accelit.png` | **missing — shows "AC"** |
| Puzzles IT | `puzzles-it.png` | present — replace with the purple P |
| TDT Training | `tdt-planner.png` | present |
| Nationwide Appliance Repairs | `nwar.png` | **missing — shows "NW"** |

`.svg`, `.png` and `.webp` all work; if you use a different extension, update
`logo` in `src/lib/config.ts` to match.

## Framed or full-bleed

Each entry has a `logoFill` flag in `src/lib/config.ts`:

- **`false`** (default) — the logo sits padded on a bone circle. Right for a
  mark on a transparent or white background, which is most of them.
- **`true`** — the artwork fills the circle edge to edge. Use this when the
  file is *already* a circle or a full-bleed coloured tile, so it does not end
  up with a second ring around its own.

`nwar` is set to `true` because that logo is supplied as a circle with a blue
ring. The rest are `false`.

## What crops well

These render at 32px in the hero pill and 52px in the work panel.

A **square, icon-only** crop is what you want. A wide wordmark technically
fits, but at 32px the words are unreadable — the Nationwide logo with
"APPLIANCE REPAIRS NATIONWIDE" beside the N shrinks to a smudge at that size.
If you have the bare blue N on its own, use that instead and set
`logoFill: false`.
