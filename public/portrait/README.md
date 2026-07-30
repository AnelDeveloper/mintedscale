# Founder portrait

`anel.jpg` — the photo beside the founder note. Present. Cropped out of the
ad poster (kept at `design-assets/mintedscale-poster.png`, deliberately outside
`public/` so it is not served): head, beard and the gold dissolve, 3:4, no
fragments of the poster's other panels. 840x1120, JPEG at quality 82, 260KB —
the PNG was 1.3MB, which is not worth it for a photograph on a landing page.

To replace it, drop in another 3:4 crop under the same name.

## How this one was made

The client only had the finished ad poster, not the photo behind it, so the
portrait is cropped out of `design-assets/mintedscale-poster.png`.

The poster's layout constrains the crop badly. His face spans x 595-920, but
the AI agents panel runs to x 651 with text reaching about x 620. So a crop
wide enough to show his whole face and shoulders necessarily catches panel
fragments — the first wide attempt showed "...zer" and "...venue" from
"Income Optimizer / Increase your revenue".

Fix: crop from x 612 and bake a left-edge gradient over the first 8-19% of the
frame. It buries the panel edge and reads as vignetting rather than a patch.

The result is 1:2, which is why the portrait column is 16rem rather than 22rem
— at the old width `object-cover` would have cropped the tall frame back to a
face close-up, which is the framing the client rejected.

**If you can find the original photo**, use it instead. It needs no vignette,
allows any framing, and this whole workaround disappears.

## What to export