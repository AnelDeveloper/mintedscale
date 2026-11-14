# Share cards

`card-en.html` and `card-bs.html` are the source for `public/og-en.jpg` and
`public/og-bs.jpg` — the image every chat app, Slack and search preview shows
when the link is pasted.

Before these existed there was no `og:image` at all, so scrapers fell back to
the first image in the markup: the first client logo in the hero. Links
previewed under someone else's brand.

## Regenerating

The card leads with the hero headline ("Your audience is more than
followers.") and a "watch the film · 2:50" badge, then the founder stats. **If either
changes in `src/lib/i18n/`, the card is now wrong** — nothing enforces this,
because a JPEG cannot import a dictionary. Re-render both:

```sh
for l in en bs; do
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --window-size=1200,630 --screenshot="og-$l.png" --virtual-time-budget=12000 \
    "file://$PWD/card-$l.html"
done
```

Then convert to JPEG — PNG at this size is ~1MB and some scrapers cap the
download. On a Mac without Pillow, `sips` does the same job:

```sh
for l in en bs; do sips -s format jpeg -s formatOptions 86 og-$l.png --out ../../public/og-$l.jpg; done
```

Or with Pillow:

```sh
python3 -c "
from PIL import Image
for l in ('en','bs'):
    Image.open(f'og-{l}.png').convert('RGB').save(
        f'../../public/og-{l}.jpg', 'JPEG', quality=86, optimize=True)
"
```

Both land around 75KB with Pillow, ~130KB with `sips` — either is well under
the ~300KB WhatsApp will still fetch.

**Then bump `seo.ogVersion` in `src/lib/config.ts`.** The image URL carries it
as `?v=`, and that is the only thing that makes WhatsApp, LinkedIn and
Facebook drop a preview they have already cached.

## Notes

- 1200×630 is the ratio every platform crops to. Keep it.
- Fonts come from Google Fonts over the network at render time, with
  `display=block` so Chrome waits for them instead of screenshotting fallbacks.
- Chrome needs `--allow-file-access-from-files` or the portrait silently
  renders as an empty box.
- The filenames are stable on purpose; `?v=` on the og:image URL is what
  forces a re-fetch (see above).
