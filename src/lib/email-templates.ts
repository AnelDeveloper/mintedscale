import { site } from "./config";
import { BOOKING } from "./slots";
import type { ValidatedApplication } from "./validation";

/** Never interpolate submitted text into HTML without this. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function formatSlot(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}

const INK = "#080706";
const PANEL = "#14110f";
const SILVER = "#f2ede3";
const STEEL = "#8f887c";
const GOLD = "#d9a94c";
const RULE = "#241e18";

function shell(title: string, inner: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:${INK};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${INK};padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${PANEL};border:1px solid ${RULE};">
  <tr><td style="border-bottom:1px solid ${RULE};padding:20px 28px;">
    <span style="font:500 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:0.24em;text-transform:uppercase;color:${SILVER};">Minted</span><span style="font:500 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:0.24em;text-transform:uppercase;color:${GOLD};">Scale</span>
    <span style="font:400 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:0.2em;text-transform:uppercase;color:${STEEL};"> &nbsp;·&nbsp; ${esc("The Creator Mint")}</span>
  </td></tr>
  ${inner}
  <tr><td style="border-top:1px solid ${RULE};padding:18px 28px;">
    <p style="margin:0;font:400 11px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:0.14em;text-transform:uppercase;color:${STEEL};">${esc("The Creator Mint")} &nbsp;·&nbsp; ${esc(site.established)}</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:12px 28px;border-bottom:1px solid ${RULE};width:38%;font:400 11px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:0.18em;text-transform:uppercase;color:${STEEL};vertical-align:top;">${esc(label)}</td>
    <td style="padding:12px 28px 12px 0;border-bottom:1px solid ${RULE};font:400 15px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${SILVER};vertical-align:top;">${value}</td>
  </tr>`;
}

export type NotificationContext = {
  application: ValidatedApplication;
  reference: string;
  eventLink?: string;
  meetLink?: string;
  calendarWritten: boolean;
};

export function studioNotification({
  application,
  reference,
  eventLink,
  meetLink,
  calendarWritten,
}: NotificationContext) {
  const isCall = application.intent === "call";
  const subject = isCall
    ? `New MintedScale Creator Application — Call booked · ${application.name}`
    : `New MintedScale Creator Application — ${application.name}`;

  const profileUrl = socialUrl(application.platform, application.handle);

  const rows = [
    row("Reference", `<strong style="letter-spacing:0.08em;">${esc(reference)}</strong>`),
    row("Type", isCall ? "Strategy call booking" : "Message"),
    row("Name", esc(application.name)),
    row("Email", `<a href="mailto:${esc(application.email)}" style="color:${SILVER};">${esc(application.email)}</a>`),
    row("Platform", esc(application.platform)),
    row(
      "Username",
      profileUrl
        ? `<a href="${esc(profileUrl)}" style="color:${SILVER};">@${esc(application.handle)}</a>`
        : `@${esc(application.handle)}`,
    ),
    row("Followers", application.followers.toLocaleString("en-US")),
    application.visitorTimeZone ? row("Their timezone", esc(application.visitorTimeZone)) : "",
    isCall && application.slotStart
      ? row(
          "Requested slot",
          `${esc(formatSlot(application.slotStart, BOOKING.timeZone))}<br><span style="color:${STEEL};font-size:13px;">${esc(BOOKING.timeZone)} · ${BOOKING.durationMinutes} min</span>`,
        )
      : "",
    isCall
      ? row(
          "Calendar",
          calendarWritten
            ? `Event created${eventLink ? ` · <a href="${esc(eventLink)}" style="color:${SILVER};">Open</a>` : ""}${meetLink ? ` · <a href="${esc(meetLink)}" style="color:${SILVER};">Meet link</a>` : ""}`
            : `<span style="color:#e29494;">Not written — add this to your calendar manually.</span>`,
        )
      : "",
  ]
    .filter(Boolean)
    .join("");

  const html = shell(
    subject,
    `<tr><td style="padding:28px 28px 8px;">
      <h1 style="margin:0;font:600 24px/1.25 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;letter-spacing:-0.02em;color:${SILVER};">New creator application</h1>
      <p style="margin:10px 0 0;font:400 15px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${STEEL};">Reply to this email to reach ${esc(application.name)} directly.</p>
    </td></tr>
    <tr><td style="padding:20px 0 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    </td></tr>
    <tr><td style="padding:22px 28px 28px;">
      <p style="margin:0 0 10px;font:400 11px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:0.18em;text-transform:uppercase;color:${STEEL};">Their idea</p>
      <p style="margin:0;white-space:pre-wrap;font:400 15px/1.7 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${SILVER};">${esc(application.idea)}</p>
    </td></tr>`,
  );

  const text = [
    "NEW MINTEDSCALE CREATOR APPLICATION",
    "",
    `Reference: ${reference}`,
    `Type: ${isCall ? "Strategy call booking" : "Message"}`,
    `Name: ${application.name}`,
    `Email: ${application.email}`,
    `Platform: ${application.platform}`,
    `Username: @${application.handle}`,
    `Followers: ${application.followers.toLocaleString("en-US")}`,
    application.visitorTimeZone ? `Their timezone: ${application.visitorTimeZone}` : "",
    isCall && application.slotStart
      ? `Requested slot: ${formatSlot(application.slotStart, BOOKING.timeZone)} (${BOOKING.timeZone})`
      : "",
    isCall ? `Calendar: ${calendarWritten ? eventLink || "event created" : "NOT WRITTEN — add manually"}` : "",
    meetLink ? `Meet: ${meetLink}` : "",
    "",
    "Idea:",
    application.idea,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

export function applicantReceipt({
  application,
  reference,
  meetLink,
}: {
  application: ValidatedApplication;
  reference: string;
  meetLink?: string;
}) {
  const isCall = application.intent === "call";
  const subject = isCall
    ? `Your MintedScale strategy call — ${reference}`
    : `We have your MintedScale application — ${reference}`;

  const when =
    isCall && application.slotStart
      ? formatSlot(application.slotStart, application.visitorTimeZone || BOOKING.timeZone)
      : null;

  const body = isCall
    ? `Your strategy call is held. We will send the joining details before we meet — if anything changes, reply to this email and we will move it.`
    : `Thank you. We will get back to you shortly — every application is read by a partner, and you can expect a reply within two business days.`;

  const detail = [
    row("Reference", `<strong style="letter-spacing:0.08em;">${esc(reference)}</strong>`),
    when
      ? row(
          "Your call",
          `${esc(when)}<br><span style="color:${STEEL};font-size:13px;">${esc(application.visitorTimeZone || BOOKING.timeZone)} · ${BOOKING.durationMinutes} minutes</span>`,
        )
      : "",
    meetLink ? row("Join", `<a href="${esc(meetLink)}" style="color:${SILVER};">${esc(meetLink)}</a>`) : "",
    row("Studio", `<a href="mailto:${esc(site.email)}" style="color:${SILVER};">${esc(site.email)}</a>`),
  ]
    .filter(Boolean)
    .join("");

  const html = shell(
    subject,
    `<tr><td style="padding:28px 28px 8px;">
      <h1 style="margin:0;font:600 24px/1.25 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;letter-spacing:-0.02em;color:${SILVER};">${isCall ? "Your call is confirmed" : "Application received"}</h1>
      <p style="margin:10px 0 0;font:400 15px/1.65 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${STEEL};">${esc(body)}</p>
    </td></tr>
    <tr><td style="padding:20px 0 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detail}</table>
    </td></tr>
    <tr><td style="padding:24px 28px 28px;">
      <p style="margin:0;font:400 14px/1.7 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${STEEL};">${esc("Turning creators into brands.")}</p>
    </td></tr>`,
  );

  const text = [
    isCall ? "YOUR MINTEDSCALE CALL IS CONFIRMED" : "MINTEDSCALE — APPLICATION RECEIVED",
    "",
    body,
    "",
    `Reference: ${reference}`,
    when ? `Your call: ${when} (${application.visitorTimeZone || BOOKING.timeZone})` : "",
    meetLink ? `Join: ${meetLink}` : "",
    `Studio: ${site.email}`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

function socialUrl(platform: string, handle: string): string | null {
  const clean = encodeURIComponent(handle);
  switch (platform) {
    case "Instagram":
      return `https://instagram.com/${clean}`;
    case "TikTok":
      return `https://tiktok.com/@${clean}`;
    case "YouTube":
      return `https://youtube.com/@${clean}`;
    case "X":
      return `https://x.com/${clean}`;
    case "Twitch":
      return `https://twitch.tv/${clean}`;
    default:
      return null;
  }
}
