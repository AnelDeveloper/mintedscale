import { platforms } from "./config";
import type { Dictionary } from "./i18n";

/**
 * One validator, imported by both the console and the API routes, so the
 * inline errors a creator sees match exactly what the server enforces —
 * in whichever language they are reading the page.
 */

export type Intent = "call" | "message";
export type ErrorCopy = Dictionary["console"]["errors"];

export type ApplicationInput = {
  intent: Intent;
  name: string;
  email: string;
  platform: string;
  handle: string;
  followers: string;
  idea: string;
  slotStart?: string;
  visitorTimeZone?: string;
  locale?: string;
  /** Honeypot — real people never fill this in. */
  company?: string;
};

export type FieldErrors = Partial<Record<keyof ApplicationInput, string>>;

export type ValidatedApplication = {
  intent: Intent;
  name: string;
  email: string;
  platform: string;
  handle: string;
  followers: number;
  idea: string;
  slotStart?: string;
  visitorTimeZone?: string;
  locale: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Accepts "412000", "412,000", "412k", "1.2M" — people write follower counts every way. */
export function parseFollowers(raw: string): number | null {
  const cleaned = raw.trim().toLowerCase().replace(/[,\s_]/g, "");
  if (!cleaned) return null;

  const match = cleaned.match(/^(\d+(?:\.\d+)?)([km])?$/);
  if (!match) return null;

  const value = Number(match[1]);
  if (!Number.isFinite(value)) return null;

  const multiplier = match[2] === "m" ? 1_000_000 : match[2] === "k" ? 1_000 : 1;
  return Math.round(value * multiplier);
}

export function normaliseHandle(raw: string): string {
  return raw.trim().replace(/^@+/, "");
}

export function validateApplication(
  input: Partial<ApplicationInput>,
  e: ErrorCopy,
): { ok: boolean; errors: FieldErrors; data?: ValidatedApplication } {
  const errors: FieldErrors = {};
  const intent: Intent = input.intent === "call" ? "call" : "message";

  const name = (input.name ?? "").trim();
  if (name.length < 2) errors.name = e.name;
  else if (name.length > 80) errors.name = e.nameLong;

  const email = (input.email ?? "").trim();
  if (!email) errors.email = e.emailMissing;
  else if (!EMAIL.test(email)) errors.email = e.emailInvalid;
  else if (email.length > 160) errors.email = e.emailLong;

  const platform = (input.platform ?? "").trim();
  if (!platform) errors.platform = e.platformMissing;
  else if (!platforms.includes(platform)) errors.platform = e.platformInvalid;

  const handle = normaliseHandle(input.handle ?? "");
  if (handle.length < 2) errors.handle = e.handle;
  else if (handle.length > 60) errors.handle = e.handleLong;

  const followers = parseFollowers(input.followers ?? "");
  if (followers === null) errors.followers = e.followers;
  else if (followers > 2_000_000_000) errors.followers = e.followersUnreal;

  const idea = (input.idea ?? "").trim();
  if (idea.length < 10) errors.idea = e.idea;
  else if (idea.length > 2000) errors.idea = e.ideaLong;

  if (intent === "call") {
    const slotStart = (input.slotStart ?? "").trim();
    if (!slotStart) errors.slotStart = e.slotMissing;
    else {
      const when = new Date(slotStart);
      if (Number.isNaN(when.getTime())) errors.slotStart = e.slotInvalid;
      else if (when.getTime() < Date.now()) errors.slotStart = e.slotPast;
    }
  }

  const ok = Object.keys(errors).length === 0;
  if (!ok) return { ok, errors };

  return {
    ok,
    errors,
    data: {
      intent,
      name,
      email,
      platform,
      handle,
      followers: followers!,
      idea,
      slotStart: intent === "call" ? (input.slotStart ?? "").trim() : undefined,
      visitorTimeZone: (input.visitorTimeZone ?? "").trim() || undefined,
      locale: (input.locale ?? "en").trim(),
    },
  };
}

/** Silently drop honeypot hits — a bot should get a 200 and learn nothing. */
export function isBot(input: Partial<ApplicationInput>): boolean {
  return Boolean((input.company ?? "").trim());
}

const REFERENCE_ALPHABET = "ACDEFGHJKLMNPQRSTUVWXYZ23456789";

/** MS-2026-K7Q4 — a file number the applicant can quote back to us. */
export function createReference(now = new Date()): string {
  let tail = "";
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  for (const byte of bytes) tail += REFERENCE_ALPHABET[byte % REFERENCE_ALPHABET.length];
  return `MS-${now.getUTCFullYear()}-${tail}`;
}
