import { NextResponse } from "next/server";
import { site } from "@/lib/content";
import { sendMail } from "@/lib/email";
import { applicantReceipt, studioNotification } from "@/lib/email-templates";
import { createBookingEvent, getBusyBlocks, isCalendarConfigured } from "@/lib/google-calendar";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { generateCandidateSlots, removeBusy } from "@/lib/slots";
import { createReference, isBot, validateApplication } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STUDIO_INBOX = process.env.CONTACT_INBOX || site.email;

/**
 * One endpoint for both routes into the studio: a booked strategy call
 * (`intent: "call"`) and a written application (`intent: "message"`).
 */
export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request));
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let input: Record<string, string>;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Malformed request." }, { status: 400 });
  }

  // Honeypot: answer like a success so the bot stops trying, send nothing.
  if (isBot(input)) {
    return NextResponse.json({ ok: true, reference: createReference() });
  }

  const { ok, errors, data } = validateApplication(input);
  if (!ok || !data) {
    return NextResponse.json(
      { ok: false, message: "Check the highlighted fields.", errors },
      { status: 422 },
    );
  }

  const reference = createReference();
  let calendarWritten = false;
  let eventLink: string | undefined;
  let meetLink: string | undefined;

  if (data.intent === "call" && data.slotStart) {
    const slotIsOffered = await verifySlot(data.slotStart);
    if (!slotIsOffered) {
      return NextResponse.json(
        {
          ok: false,
          message: "That time has just been taken. Pick another.",
          errors: { slotStart: "No longer available." },
        },
        { status: 409 },
      );
    }

    if (isCalendarConfigured()) {
      try {
        const event = await createBookingEvent({
          name: data.name,
          email: data.email,
          platform: data.platform,
          handle: data.handle,
          followers: data.followers,
          idea: data.idea,
          startIso: data.slotStart,
          reference,
          visitorTimeZone: data.visitorTimeZone,
        });
        calendarWritten = true;
        eventLink = event.htmlLink;
        meetLink = event.meetLink;
      } catch (error) {
        // The lead is worth more than the calendar entry — keep going and
        // flag it loudly in the studio email.
        console.error("[apply] calendar write failed:", error);
      }
    }
  }

  const notification = studioNotification({
    application: data,
    reference,
    eventLink,
    meetLink,
    calendarWritten,
  });

  const studioResult = await sendMail({
    to: [STUDIO_INBOX],
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
    replyTo: data.email,
  });

  // Never block the applicant on their own receipt failing.
  const receipt = applicantReceipt({ application: data, reference, meetLink });
  void sendMail({
    to: [data.email],
    subject: receipt.subject,
    html: receipt.html,
    text: receipt.text,
    replyTo: STUDIO_INBOX,
  }).catch((error) => console.error("[apply] receipt send failed:", error));

  if (!studioResult.delivered && studioResult.provider !== "console") {
    return NextResponse.json(
      {
        ok: false,
        message: `We could not send that. Email us directly at ${STUDIO_INBOX}.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    reference,
    calendarWritten,
    meetLink,
    message:
      data.intent === "call"
        ? "Your call is held."
        : "Thank you. We will get back to you shortly.",
  });
}

/** Re-check server-side so nobody can post a time we never offered. */
async function verifySlot(startIso: string): Promise<boolean> {
  let days = generateCandidateSlots();

  if (isCalendarConfigured()) {
    try {
      const busy = await getBusyBlocks(new Date(), new Date(Date.now() + 32 * 86_400_000));
      days = removeBusy(days, busy);
    } catch (error) {
      console.error("[apply] free/busy check failed, accepting studio hours:", error);
    }
  }

  const target = new Date(startIso).getTime();
  return days.some((day) => day.slots.some((slot) => new Date(slot).getTime() === target));
}
