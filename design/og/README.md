# Share cards

`card-en.html` and `card-bs.html` are the source for `public/og-en.jpg` and
`public/og-bs.jpg` — the image every chat app, Slack and search preview shows
when the link is pasted.

Before these existed there was no `og:image` at all, so scrapers fell back to
the first image in the markup: the first client logo in the hero. Links
previewed under someone else's brand.

## Regenerating

The copy on the card repeats the tagline and the founder stats. **If either
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
download:

```sh
python3 -c "
from PIL import Image
for l in ('en','bs'):
    Image.open(f'og-{l}.png').convert('RGB').save(
        f'../../public/og-{l}.jpg', 'JPEG', quality=86, optimize=True)
"
```

Both land around 75KB.

## Notes

- 1200×630 is the ratio every platform crops to. Keep it.
- Fonts come from Google Fonts over the network at render time, with
  `display=block` so Chrome waits for them instead of screenshotting fallbacks.
- Chrome needs `--allow-file-access-from-files` or the portrait silently
  renders as an empty box.
- The filenames are stable, so a preview a platform has already cached will
  not update on its own — see the note about re-scraping in the commit that
  added these.
