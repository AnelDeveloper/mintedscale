import crypto from "node:crypto";
import { BOOKING, slotEnd } from "./slots";

/**
 * Google Calendar via a service account, signed with node:crypto — no SDK, no
 * extra dependency. Configure the env vars in .env.example and bookings land
 * directly in the studio calendar; leave them unset and the site still takes
 * applications, it just emails them instead of writing events.
 */

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/calendar";

function privateKey(): string | null {
  const raw = process.env.GOOGLE_PRIVATE_KEY;
  if (!raw) return null;
  // Env files store the PEM with escaped newlines.
  return raw.includes("\\n") ? raw.replace(/\\n/g, "\n") : raw;
}

export function isCalendarConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && privateKey() && process.env.GOOGLE_CALENDAR_ID,
  );
}

/** Set only with domain-wide delegation: lets us invite the creator and mint a Meet link. */
function impersonatedUser(): string | undefined {
  return process.env.GOOGLE_IMPERSONATED_USER || undefined;
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = privateKey();
  if (!clientEmail || !key) throw new Error("Google service account is not configured");

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims: Record<string, unknown> = {
    iss: clientEmail,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };
  const sub = impersonatedUser();
  if (sub) claims.sub = sub;

  const payload = base64url(JSON.stringify(claims));
  const signature = base64url(
    crypto.sign("RSA-SHA256", Buffer.from(`${header}.${payload}`), key),
  );

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${payload}.${signature}`,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Google token exchange failed (${response.status}): ${await response.text()}`);
  }

  const data = (await response.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return cachedToken.value;
}

export type BusyBlock = { start: string; end: string };

export async function getBusyBlocks(timeMin: Date, timeMax: Date): Promise<BusyBlock[]> {
  const token = await getAccessToken();
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;

  const response = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      timeZone: BOOKING.timeZone,
      items: [{ id: calendarId }],
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`freeBusy failed (${response.status}): ${await response.text()}`);
  }

  const data = (await response.json()) as {
    calendars?: Record<string, { busy?: BusyBlock[]; errors?: { reason: string }[] }>;
  };
  const calendar = data.calendars?.[calendarId];
  if (calendar?.errors?.length) {
    throw new Error(`freeBusy error for ${calendarId}: ${calendar.errors[0].reason}`);
  }
  return calendar?.busy ?? [];
}

export type BookingDetails = {
  name: string;
  email: string;
  platform: string;
  handle: string;
  followers: number;
  idea: string;
  startIso: string;
  reference: string;
  visitorTimeZone?: string;
};

export type CreatedEvent = {
  id: string;
  htmlLink?: string;
  meetLink?: string;
};

export async function createBookingEvent(details: BookingDetails): Promise<CreatedEvent> {
  const token = await getAccessToken();
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;
  const canInvite = Boolean(impersonatedUser());

  const body: Record<string, unknown> = {
    summary: `MintedScale — Strategy call · ${details.name} (${details.handle})`,
    description: [
      `Reference: ${details.reference}`,
      "",
      `Name: ${details.name}`,
      `Email: ${details.email}`,
      `Platform: ${details.platform}`,
      `Handle: ${details.handle}`,
      `Followers: ${details.followers.toLocaleString("en-US")}`,
      details.visitorTimeZone ? `Their timezone: ${details.visitorTimeZone}` : "",
      "",
      "Idea:",
      details.idea,
    ]
      .filter(Boolean)
      .join("\n"),
    start: { dateTime: new Date(details.startIso).toISOString(), timeZone: "UTC" },
    end: { dateTime: slotEnd(details.startIso).toISOString(), timeZone: "UTC" },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 15 },
      ],
    },
  };

  // A bare service account cannot invite attendees or mint a Meet link; both
  // require domain-wide delegation. Only ask for them when that is configured.
  if (canInvite) {
    body.attendees = [{ email: details.email, displayName: details.name }];
    body.conferenceData = {
      createRequest: {
        requestId: details.reference,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    };
  }

  const params = new URLSearchParams();
  if (canInvite) {
    params.set("conferenceDataVersion", "1");
    params.set("sendUpdates", "all");
  }

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Event creation failed (${response.status}): ${await response.text()}`);
  }

  const event = (await response.json()) as {
    id: string;
    htmlLink?: string;
    hangoutLink?: string;
    conferenceData?: { entryPoints?: { entryPointType: string; uri: string }[] };
  };

  const meetLink =
    event.hangoutLink ??
    event.conferenceData?.entryPoints?.find((e) => e.entryPointType === "video")?.uri;

  return { id: event.id, htmlLink: event.htmlLink, meetLink };
}
