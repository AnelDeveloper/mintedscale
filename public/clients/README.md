# Client logos

Square images, ideally 128×128 or larger, PNG or SVG with a transparent or
dark background. They render inside a 32px circle in the hero trust pill.

Drop a file here, then point at it from `studio.clients.items[].logo` in
`src/lib/content.ts`:

```ts
{ label: "Accelit IT", initials: "AC", logo: "/clients/accelit.png", href: "…" }
```

With `logo` empty the circle falls back to the `initials` monogram, so the
pill looks finished either way.

Use a logo you have the right to display. These are your own clients, so that
is normally fine — but ask if you are unsure.
