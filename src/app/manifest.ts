import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import { en } from "@/lib/i18n/en";

/** Name, colours and icons for "Add to Home Screen" and Android's tab tint. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${en.site.tagline}`,
    short_name: site.name,
    description: en.seo.description,
    start_url: "/",
    display: "browser",
    background_color: "#080706",
    theme_color: "#080706",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
  };
}
