import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The film's words as plain text, read from its WebVTT subtitle file — the
 * VideoObject's `transcript`, so search engines can index what is said in a
 * video they cannot listen to. Runs at build time only (the page is static),
 * and the subtitle file stays the single source for the wording.
 */
export function transcriptFrom(publicPath: string): string {
  const vtt = readFileSync(join(process.cwd(), "public", publicPath), "utf8");
  return vtt
    .split(/\r?\n\r?\n/)
    .slice(1) // the WEBVTT header
    .map((cue) =>
      cue
        .split(/\r?\n/)
        .filter((line) => line && !/^\d+$/.test(line) && !line.includes("-->"))
        .join(" "),
    )
    .filter(Boolean)
    .join(" ");
}
