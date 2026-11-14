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

## Subtitles

`how-the-mint-works.en.vtt` and `.bs.vtt` are the intro film's subtitle
tracks, wired through `media.heroVideo.captions`. The English page switches
English on from the first frame (the film is narrated in Bosnian); the
Bosnian page leaves both off but offers them in the player's CC menu. The
English file also feeds the VideoObject `transcript`, so editing a line here
changes what search engines index — keep the two in step by editing the VTT
only.

SRT copies for uploading to YouTube, TikTok and the like are in
`design-assets/subtitles/`. If you change a VTT, change its SRT too (same cue
numbers and wording, `,` instead of `.` before the milliseconds).
