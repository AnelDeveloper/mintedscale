import { NextResponse } from "next/server";
import { getBusyBlocks, isCalendarConfigured } from "@/lib/google-calendar";
import { BOOKING, generateCandidateSlots, removeBusy } from "@/lib/slots";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Open slots for the scheduler. With Google Calendar configured the studio's
 * real free/busy is subtracted; without it, studio hours are offered and the
 * booking is confirmed by hand.
 */
export async function GET() {
  const days = generateCandidateSlots();

  const payload = {
    timeZone: BOOKING.timeZone,
    durationMinutes: BOOKING.durationMinutes,
    /** false = slots are provisional and a human confirms the time. */
    live: false,
    days,
  };

  if (!isCalendarConfigured()) {
    return NextResponse.json(payload, {
      headers: { "Cache-Control": "no-store" },
    });
  }

  try {
    const timeMin = new Date();
    const timeMax = new Date(Date.now() + (BOOKING.horizonDays + 1) * 86_400_000);
    const busy = await getBusyBlocks(timeMin, timeMax);
    return NextResponse.json(
      { ...payload, live: true, days: removeBusy(days, busy) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    // A calendar outage must never block a lead. Fall back to studio hours.
    console.error("[availability] free/busy lookup failed:", error);
    return NextResponse.json(payload, { headers: { "Cache-Control": "no-store" } });
  }
}
