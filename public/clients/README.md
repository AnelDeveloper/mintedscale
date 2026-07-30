# Client logos

Drop a file here with the exact name below and it appears on the site — no
code change needed. A name that does not match, or a file that is not there
yet, falls back to the initials monogram rather than a broken image.

| Company | Filename | Status |
|---|---|---|
| Accelit IT | `accelit.png` | **missing — shows "AC"** |
| Puzzles IT | `puzzles-it.png` | present |
| TDT Training | `tdt-planner.png` | present |
| Nationwide Appliance Repairs | `nwar.png` | **missing — shows "NW"** |

`.svg`, `.png` and `.webp` all work; if you use a different extension, update
`logo` in `src/lib/config.ts` to match.

## What crops well

These render inside a circle at 32px (hero pill) and 52px (work panel), sized
with `object-contain` so nothing is cut off.

A **square, icon-only** crop is what you want. A wide wordmark technically
fits, but at 32px the words are unreadable — the Nationwide logo with the full
"NATIONWIDE APPLIANCE REPAIRS" text beside the N will shrink to a smudge. Use
just the N if you have it.

Transparent or white backgrounds are both fine — the circle puts a bone
backing behind every logo, since most marks are dark ink and would vanish
against the page.
