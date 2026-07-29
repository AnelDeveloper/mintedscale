/**
 * Slot generation for the strategy-call scheduler.
 *
 * All studio hours are expressed in `BOOKING_TIMEZONE`; every slot leaves this
 * module as a UTC instant so the browser can render it in the visitor's own
 * timezone without any further conversion.
 */

export const BOOKING = {
  timeZone: process.env.BOOKING_TIMEZONE || "Europe/Berlin",
  /** Studio hours, 24h clock, in the studio timezone. 13:00 is deliberately empty. */
  hours: [10, 11, 12, 14, 15, 16],
  durationMinutes: Number(process.env.BOOKING_DURATION_MINUTES || 45),
  /** Earliest a call can be booked, in hours from now. */
  leadTimeHours: Number(process.env.BOOKING_LEAD_TIME_HOURS || 24),
  /** How far ahead the scheduler offers. */
  horizonDays: Number(process.env.BOOKING_HORIZON_DAYS || 21),
  /** 0 = Sunday. Weekends closed. */
  closedWeekdays: [0, 6],
} as const;

export type DayOffer = {
  /** YYYY-MM-DD in the studio timezone */
  date: string;
  /** UTC ISO instants */
  slots: string[];
};

/** Milliseconds a timezone is offset from UTC at a given instant. */
function offsetMs(instant: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(instant);

  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  // `hour` can come back as 24 for midnight under hour12:false in some engines.
  const hour = get("hour") % 24;
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), hour, get("minute"), get("second"));
  return asUtc - instant.getTime();
}

/** Wall-clock time in `timeZone` → the UTC instant it refers to. */
export function zonedToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  // Two passes settle the DST boundary cases where the first guess lands in
  // the wrong offset.
  let ts = guess - offsetMs(new Date(guess), timeZone);
  ts = guess - offsetMs(new Date(ts), timeZone);
  return new Date(ts);
}

/** Calendar parts of an instant as seen from `timeZone`. */
export function zonedParts(instant: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(instant);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    date: `${get("year")}-${get("month")}-${get("day")}`,
    weekday: get("weekday"),
  };
}

function weekdayIndex(instant: Date, timeZone: string): number {
  const name = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short" }).format(instant);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(name);
}

/** Every slot the studio could offer, before checking the calendar. */
export function generateCandidateSlots(now = new Date()): DayOffer[] {
  const earliest = now.getTime() + BOOKING.leadTimeHours * 3_600_000;
  const days: DayOffer[] = [];

  for (let i = 0; i <= BOOKING.horizonDays; i += 1) {
    const cursor = new Date(now.getTime() + i * 86_400_000);
    if ((BOOKING.closedWeekdays as readonly number[]).includes(weekdayIndex(cursor, BOOKING.timeZone))) {
      continue;
    }

    const { year, month, day, date } = zonedParts(cursor, BOOKING.timeZone);
    const slots = BOOKING.hours
      .map((hour) => zonedToUtc(year, month, day, hour, 0, BOOKING.timeZone))
      .filter((slot) => slot.getTime() >= earliest)
      .map((slot) => slot.toISOString());

    if (slots.length > 0) days.push({ date, slots });
  }

  return days;
}

export function slotEnd(startIso: string): Date {
  return new Date(new Date(startIso).getTime() + BOOKING.durationMinutes * 60_000);
}

/** Drop any slot overlapping a busy block from the studio calendar. */
export function removeBusy(days: DayOffer[], busy: { start: string; end: string }[]): DayOffer[] {
  if (busy.length === 0) return days;

  const blocks = busy.map((b) => ({
    start: new Date(b.start).getTime(),
    end: new Date(b.end).getTime(),
  }));

  return days
    .map((day) => ({
      date: day.date,
      slots: day.slots.filter((iso) => {
        const start = new Date(iso).getTime();
        const end = start + BOOKING.durationMinutes * 60_000;
        return !blocks.some((block) => start < block.end && end > block.start);
      }),
    }))
    .filter((day) => day.slots.length > 0);
}
