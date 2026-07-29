# Video slots

Drop your files here, then point at them from `src/lib/content.ts`.

| Slot | Where | Format | Field |
|---|---|---|---|
| Hero film | top of page | 16:9 landscape | `hero.video` |
| Engine film | AI system section | 16:9 landscape | `engine.video` |
| Creator testimonials ×4 | video wall | 9:16 portrait | `videoWall.items[]` |

Each slot takes `src` and `poster`:

```ts
video: {
  src: "/videos/how-the-mint-works.mp4",
  poster: "/videos/how-the-mint-works.jpg",
  label: "How the mint works",
  duration: "2:14",
}
```

A slot with an empty `src` renders as a marked reserved frame, so the layout is
already correct before the footage exists.

Encode as H.264 MP4 (`-crf 23`, AAC audio) and always ship a poster image —
without one the frame is black until the first byte arrives.
