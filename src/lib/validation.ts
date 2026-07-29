import { platforms } from "./content";

/**
 * One validator, imported by both the console and the API routes, so the
 * inline errors a creator sees match exactly what the server enforces.
 */

export type Intent = "call" | "message";

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

export function validateApplication(input: Partial<ApplicationInput>): {
  ok: boolean;
  errors: FieldErrors;
  data?: ValidatedApplication;
} {
  const errors: FieldErrors = {};
  const intent: Intent = input.intent === "call" ? "call" : "message";

  const name = (input.name ?? "").trim();
  if (name.length < 2) errors.name = "Enter your full name.";
  else if (name.length > 80) errors.name = "That name is too long.";

  const email = (input.email ?? "").trim();
  if (!email) errors.email = "Enter an email address.";
  else if (!EMAIL.test(email)) errors.email = "That email address does not look right.";
  else if (email.length > 160) errors.email = "That email address is too long.";

  const platform = (input.platform ?? "").trim();
  if (!platform) errors.platform = "Choose a platform.";
  else if (!(platforms as readonly string[]).includes(platform)) {
    errors.platform = "Choose a platform from the list.";
  }

  const handle = normaliseHandle(input.handle ?? "");
  if (handle.length < 2) errors.handle = "Enter your username.";
  else if (handle.length > 60) errors.handle = "That username is too long.";

  const followers = parseFollowers(input.followers ?? "");
  if (followers === null) errors.followers = "Enter a number, like 120000 or 120k.";
  else if (followers > 2_000_000_000) errors.followers = "Enter a realistic follower count.";

  const idea = (input.idea ?? "").trim();
  if (idea.length < 10) errors.idea = "Tell us a little more — at least a sentence.";
  else if (idea.length > 2000) errors.idea = "Keep it under 2,000 characters.";

  if (intent === "call") {
    const slotStart = (input.slotStart ?? "").trim();
    if (!slotStart) errors.slotStart = "Choose a time for your call.";
    else {
      const when = new Date(slotStart);
      if (Number.isNaN(when.getTime())) errors.slotStart = "That time is not valid.";
      else if (when.getTime() < Date.now()) errors.slotStart = "That time has already passed.";
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
