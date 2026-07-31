# Engine media

`engine-demo.mp4` + `engine-demo-poster.jpg` — a screen recording of the real
MintedScale AI product, shown in the AI system section.

Converted from the original QuickTime capture with macOS `avconvert`:

```
avconvert --preset Preset1280x720 --source in.mov --output engine-demo.mp4 --replace
```

The source `.mov` was H.264 already, but QuickTime is not a container every
browser handles reliably, and `video/quicktime` is not universally accepted.
The source is kept at `design-assets/engine-demo-source.mov`, outside `public/`
so 4.3MB of unused file is not served to every visitor.

The poster frame was captured at 1.5s. Without one the frame is black until
the first bytes arrive.

## The caption is not decoration

The deck in the recording shows a creator name, 254K followers and
"€148,094 expected revenue". That creator is sample data. The caption says so:

> A recording of the real product. The creator shown is sample data.

Leave it. A product demo that reads as a client result is the one mistake this
page is built to avoid.
