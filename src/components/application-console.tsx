"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { platforms, site } from "@/lib/config";
import { fill, type Dictionary } from "@/lib/i18n";
import type { FieldErrors, Intent } from "@/lib/validation";

type Availability = {
  timeZone: string;
  durationMinutes: number;
  live: boolean;
  days: { date: string; slots: string[] }[];
};

type Result = {
  reference: string;
  message: string;
  calendarWritten?: boolean;
  meetLink?: string;
};

const EMPTY_FORM = { name: "", email: "", platform: "", handle: "", followers: "", idea: "" };
type Form = typeof EMPTY_FORM;

/** Google Calendar's own appointment page, if you would rather use it. */
const APPOINTMENT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL;

export function ApplicationConsole({ t }: { t: Dictionary }) {
  const c = t.console;
  const [mode, setMode] = useState<Intent>("call");
  const [form, setForm] = useState<Form>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [notice, setNotice] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const [availability, setAvailability] = useState<Availability | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState(false);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);

  const honeypot = useRef<HTMLInputElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const noticeRef = useRef<HTMLParagraphElement>(null);

  const visitorTimeZone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return "UTC";
    }
  }, []);

  const loadAvailability = useCallback(async () => {
    setLoadingSlots(true);
    setSlotsError(false);
    try {
      const response = await fetch("/api/availability", { cache: "no-store" });
      if (!response.ok) throw new Error(String(response.status));
      setAvailability((await response.json()) as Availability);
    } catch {
      setSlotsError(true);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (mode === "call" && !availability && !loadingSlots && !slotsError) void loadAvailability();
  }, [mode, availability, loadingSlots, slotsError, loadAvailability]);

  // Regroup the studio's slots by the visitor's own calendar day, so the rail
  // never offers a "Tuesday" that is Monday night where they are.
  const days = useMemo(() => {
    if (!availability) return [];
    const byDay = new Map<string, string[]>();
    for (const day of availability.days) {
      for (const iso of day.slots) {
        const key = new Date(iso).toLocaleDateString("en-CA");
        byDay.set(key, [...(byDay.get(key) ?? []), iso]);
      }
    }
    return [...byDay.entries()]
      .map(([date, slots]) => ({ date, slots: slots.sort() }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [availability]);

  useEffect(() => {
    if (days.length > 0 && !activeDate) setActiveDate(days[0].date);
  }, [days, activeDate]);

  const activeSlots = days.find((d) => d.date === activeDate)?.slots ?? [];
  const intl = t.locale === "bs" ? "bs-BA" : "en-GB";

  const update = (field: keyof Form) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const switchMode = (next: Intent) => {
    setMode(next);
    setErrors({});
    setNotice(null);
    setStatus("idle");
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("submitting");
    setNotice(null);

    const payload = {
      ...form,
      intent: mode,
      slotStart: mode === "call" ? (slot ?? "") : undefined,
      visitorTimeZone,
      locale: t.locale,
      company: honeypot.current?.value ?? "",
    };

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setStatus("error");
        setNotice(data.message ?? c.errors.generic);
        // A taken slot means the rail is stale — refresh it.
        if (response.status === 409) {
          setSlot(null);
          setAvailability(null);
        }
        requestAnimationFrame(() => noticeRef.current?.focus());
        return;
      }

      setResult(data as Result);
      setStatus("idle");
      requestAnimationFrame(() => confirmationRef.current?.focus());
    } catch {
      setStatus("error");
      setNotice(fill(c.errors.unreachable, { email: site.email }));
      requestAnimationFrame(() => noticeRef.current?.focus());
    }
  }

  if (result) {
    return <Confirmation result={result} mode={mode} slot={slot} t={t} ref={confirmationRef} />;
  }

  const submitting = status === "submitting";

  return (
    <div className="ms-panel ms-gloss relative">
      {/* Console header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--rule)] px-5 py-4 sm:px-7">
        <span className="ms-mono flex items-center gap-2.5">
          <span className="ms-live-dot block h-1.5 w-1.5 rounded-full bg-gold-300" aria-hidden="true" />
          {c.header}
        </span>
        <span className="ms-mono text-[0.5625rem]">{c.confidential}</span>
      </div>

      {/* Route selector */}
      <div role="tablist" aria-label={c.tablistLabel} className="grid grid-cols-2 border-b border-[var(--rule)]">
        {(
          [
            { id: "call", label: c.callTab, note: c.callNote },
            { id: "message", label: c.messageTab, note: c.messageNote },
          ] as const
        ).map((option, i) => {
          const selected = mode === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => switchMode(option.id as Intent)}
              className={`relative px-5 py-5 text-left transition-colors duration-500 sm:px-7 ${
                i === 0 ? "border-r border-[var(--rule)]" : ""
              } ${selected ? "bg-[rgba(217,169,76,0.1)]" : "hover:bg-[rgba(217,169,76,0.04)]"}`}
            >
              <span
                className={`absolute inset-x-0 top-0 h-px origin-left bg-[rgba(240,212,134,0.85)] transition-transform duration-500 ${
                  selected ? "scale-x-100" : "scale-x-0"
                }`}
                aria-hidden="true"
              />
              <span
                className={`block text-[0.9375rem] transition-colors duration-500 ${
                  selected ? "text-bone" : "text-ash"
                }`}
              >
                {option.label}
              </span>
              <span className="ms-mono mt-1.5 block text-[0.5625rem] normal-case tracking-[0.14em]">
                {option.note}
              </span>
            </button>
          );
        })}
      </div>

      <form onSubmit={onSubmit} noValidate>
        {mode === "call" ? (
          <>
            <Step
              n="01"
              title={c.stepDay}
              aside={
                activeDate
                  ? new Date(`${activeDate}T12:00:00`)
                      .toLocaleDateString(intl, { month: "long", year: "numeric" })
                      .toUpperCase()
                  : undefined
              }
            >
              {loadingSlots ? (
                <p className="ms-mono flex items-center gap-3 py-3">
                  <span
                    className="ms-spin block h-3 w-3 rounded-full border border-[var(--rule-gold)] border-t-gold-200"
                    aria-hidden="true"
                  />
                  {c.loadingSlots}
                </p>
              ) : slotsError ? (
                <p className="ms-mono py-3">
                  {c.slotsError}{" "}
                  <button
                    type="button"
                    onClick={loadAvailability}
                    className="text-gold-200 underline underline-offset-4"
                  >
                    {c.tryAgain}
                  </button>{" "}
                  {c.orMessage}
                </p>
              ) : days.length === 0 ? (
                <p className="ms-mono py-3">{c.noSlots}</p>
              ) : (
                <div className="ms-rail-wrap relative -mx-1">
                  <div className="ms-scroll-x ms-rail flex gap-2 overflow-x-auto px-1 pb-1">
                    {days.map((day) => {
                      const selected = day.date === activeDate;
                      const d = new Date(`${day.date}T12:00:00`);
                      return (
                        <button
                          key={day.date}
                          type="button"
                          onClick={() => {
                            setActiveDate(day.date);
                            setSlot(null);
                          }}
                          aria-pressed={selected}
                          className={`ms-chip flex min-w-[4.75rem] shrink-0 flex-col items-center gap-1 px-3 py-3 ${
                            selected ? "ms-chip-active" : ""
                          }`}
                        >
                          <span className="ms-mono text-[0.5625rem] tracking-[0.18em]">
                            {d.toLocaleDateString(intl, { weekday: "short" })}
                          </span>
                          <span className="ms-display text-[1.25rem] leading-none">
                            {d.toLocaleDateString(intl, { day: "numeric" })}
                          </span>
                          <span className="ms-mono text-[0.5rem] tracking-[0.16em]">
                            {d.toLocaleDateString(intl, { month: "short" })}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </Step>

            <Step
              n="02"
              title={c.stepTime}
              aside={
                availability
                  ? `${availability.durationMinutes} ${c.minutes} · ${visitorTimeZone.replace(/_/g, " ")}`
                  : undefined
              }
              error={errors.slotStart}
            >
              {activeSlots.length === 0 ? (
                <p className="ms-mono py-3">{c.pickDayFirst}</p>
              ) : (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {activeSlots.map((iso) => {
                    const selected = slot === iso;
                    return (
                      <button
                        key={iso}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => {
                          setSlot(iso);
                          setErrors((prev) => ({ ...prev, slotStart: undefined }));
                        }}
                        className={`ms-chip px-3 py-3 font-mono text-[0.8125rem] tabular-nums ${
                          selected ? "ms-chip-active" : ""
                        }`}
                      >
                        {new Date(iso).toLocaleTimeString(intl, {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </button>
                    );
                  })}
                </div>
              )}
              {availability && !availability.live ? (
                <p className="ms-mono mt-4 text-[0.5625rem] normal-case tracking-[0.14em]">
                  {c.provisional}
                </p>
              ) : null}
            </Step>

            <Step n="03" title={c.stepAbout}>
              <Fields form={form} errors={errors} update={update} t={t} ideaLabel={c.fields.ideaCall} />
            </Step>
          </>
        ) : (
          <Step n="01" title={c.stepAbout}>
            <Fields form={form} errors={errors} update={update} t={t} ideaLabel={c.fields.ideaMessage} />
          </Step>
        )}

        {/* Honeypot */}
        <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
          <label htmlFor="ms-company">Company</label>
          <input id="ms-company" ref={honeypot} name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-col gap-4 border-t border-[var(--rule)] px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p className="ms-mono max-w-[36ch] text-[0.5625rem] normal-case leading-[1.7] tracking-[0.12em]">
            {mode === "call" ? c.privacyCall : fill(c.privacyMessage, { email: site.email })}
          </p>
          <button type="submit" disabled={submitting} className="ms-btn ms-btn-gold shrink-0">
            {submitting ? (
              <>
                <span
                  className="ms-spin block h-3 w-3 rounded-full border border-[rgba(11,8,5,0.3)] border-t-[#0b0805]"
                  aria-hidden="true"
                />
                {c.sending}
              </>
            ) : mode === "call" ? (
              c.submitCall
            ) : (
              c.submitMessage
            )}
          </button>
        </div>

        <p
          ref={noticeRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className={`px-5 pb-6 text-sm sm:px-7 ${notice ? "block" : "hidden"} ${
            status === "error" ? "text-[rgba(226,122,106,0.95)]" : "text-ash"
          }`}
        >
          {notice}
        </p>

        {APPOINTMENT_URL && mode === "call" ? (
          <p className="ms-mono border-t border-[var(--rule)] px-5 py-4 text-[0.5625rem] normal-case tracking-[0.14em] sm:px-7">
            {c.preferGoogle}{" "}
            <a
              href={APPOINTMENT_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="text-gold-200 underline underline-offset-4"
            >
              {c.openAppointments}
            </a>
          </p>
        ) : null}
      </form>
    </div>
  );
}

function Step({
  n,
  title,
  aside,
  error,
  children,
}: {
  n: string;
  title: string;
  aside?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="ms-step border-b border-[var(--rule)] px-5 py-6 sm:px-7 sm:py-7">
      <legend className="sr-only">{title}</legend>
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="ms-mono flex items-center gap-3">
          <span className="text-gold-200">{n}</span>
          <span className="ms-eyebrow-rule" aria-hidden="true" />
          <span>{title}</span>
        </p>
        {aside ? <span className="ms-mono text-[0.5625rem]">{aside}</span> : null}
      </div>
      {children}
      {error ? <p className="mt-3 text-[0.8125rem] text-[rgba(226,122,106,0.95)]">{error}</p> : null}
    </fieldset>
  );
}

function Fields({
  form,
  errors,
  update,
  t,
  ideaLabel,
}: {
  form: Form;
  errors: FieldErrors;
  update: (field: keyof Form) => (value: string) => void;
  t: Dictionary;
  ideaLabel: string;
}) {
  const f = t.console.fields;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field id="ms-name" label={f.name} error={errors.name}>
        <input
          id="ms-name"
          className={`ms-field ${errors.name ? "ms-field-invalid" : ""}`}
          value={form.name}
          onChange={(e) => update("name")(e.target.value)}
          autoComplete="name"
          placeholder={f.namePlaceholder}
          aria-invalid={Boolean(errors.name)}
          required
        />
      </Field>

      <Field id="ms-email" label={f.email} error={errors.email}>
        <input
          id="ms-email"
          type="email"
          className={`ms-field ${errors.email ? "ms-field-invalid" : ""}`}
          value={form.email}
          onChange={(e) => update("email")(e.target.value)}
          autoComplete="email"
          placeholder={f.emailPlaceholder}
          aria-invalid={Boolean(errors.email)}
          required
        />
      </Field>

      <Field id="ms-platform" label={f.platform} error={errors.platform}>
        <select
          id="ms-platform"
          className={`ms-field ms-select ${errors.platform ? "ms-field-invalid" : ""}`}
          value={form.platform}
          onChange={(e) => update("platform")(e.target.value)}
          aria-invalid={Boolean(errors.platform)}
          required
        >
          <option value="">{f.select}</option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </Field>

      <Field id="ms-handle" label={f.handle} error={errors.handle}>
        <div className="relative">
          <span
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ash"
            aria-hidden="true"
          >
            @
          </span>
          <input
            id="ms-handle"
            className={`ms-field pl-8 ${errors.handle ? "ms-field-invalid" : ""}`}
            value={form.handle}
            onChange={(e) => update("handle")(e.target.value)}
            placeholder={f.handlePlaceholder}
            aria-invalid={Boolean(errors.handle)}
            required
          />
        </div>
      </Field>

      <Field
        id="ms-followers"
        label={f.followers}
        hint={f.followersHint}
        error={errors.followers}
        className="sm:col-span-2"
      >
        <input
          id="ms-followers"
          inputMode="numeric"
          className={`ms-field ${errors.followers ? "ms-field-invalid" : ""}`}
          value={form.followers}
          onChange={(e) => update("followers")(e.target.value)}
          placeholder={f.followersPlaceholder}
          aria-invalid={Boolean(errors.followers)}
          required
        />
      </Field>

      <Field id="ms-idea" label={ideaLabel} error={errors.idea} className="sm:col-span-2">
        <textarea
          id="ms-idea"
          rows={4}
          className={`ms-field resize-y ${errors.idea ? "ms-field-invalid" : ""}`}
          value={form.idea}
          onChange={(e) => update("idea")(e.target.value)}
          placeholder={f.ideaPlaceholder}
          aria-invalid={Boolean(errors.idea)}
          required
        />
      </Field>
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="ms-mono">
          {label}
        </label>
        {hint && !error ? <span className="ms-mono text-[0.5rem] text-char">{hint}</span> : null}
      </div>
      {children}
      {error ? <p className="mt-2 text-[0.8125rem] text-[rgba(226,122,106,0.95)]">{error}</p> : null}
    </div>
  );
}

function Confirmation({
  result,
  mode,
  slot,
  t,
  ref,
}: {
  result: Result;
  mode: Intent;
  slot: string | null;
  t: Dictionary;
  ref: React.Ref<HTMLDivElement>;
}) {
  const c = t.console;
  const intl = t.locale === "bs" ? "bs-BA" : "en-GB";

  const when = slot
    ? new Date(slot).toLocaleString(intl, {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div ref={ref} tabIndex={-1} className="ms-panel ms-gloss ms-rise relative overflow-hidden">
      <span className="ms-strike-beam" aria-hidden="true" />

      <div className="flex items-center justify-between gap-4 border-b border-[var(--rule)] px-5 py-4 sm:px-7">
        <span className="ms-mono">{c.done.received}</span>
        <span className="ms-mono text-[0.5625rem] text-gold-200">{result.reference}</span>
      </div>

      <div className="px-5 py-[clamp(2rem,4vw,3rem)] sm:px-9">
        <h3 className="ms-display ms-gold max-w-[18ch] text-[clamp(1.4rem,2.4vw,1.9rem)]">
          {c.done.thanks}
        </h3>

        {mode === "call" && when ? (
          <dl className="mt-9 grid gap-px border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-2">
            <div className="bg-[rgba(14,12,10,0.7)] px-5 py-4">
              <dt className="ms-mono">{c.done.yourCall}</dt>
              <dd className="mt-2 text-[0.9375rem] text-bone">{when}</dd>
            </div>
            <div className="bg-[rgba(14,12,10,0.7)] px-5 py-4">
              <dt className="ms-mono">{c.done.joining}</dt>
              <dd className="mt-2 text-[0.9375rem] text-bone">
                {result.meetLink ? (
                  <a href={result.meetLink} className="underline underline-offset-4">
                    {c.done.meetLink}
                  </a>
                ) : (
                  c.done.sentToEmail
                )}
              </dd>
            </div>
          </dl>
        ) : null}

        <ul className="mt-9 space-y-3">
          {t.application.terms.map((term) => (
            <li key={term} className="flex items-baseline gap-3 text-[0.9375rem] text-ash">
              <span className="block h-px w-3 shrink-0 bg-gold-500" aria-hidden="true" />
              {term}
            </li>
          ))}
        </ul>

        <p className="ms-mono mt-9 border-t border-[var(--rule)] pt-5 text-[0.5625rem] normal-case tracking-[0.14em]">
          {fill(c.done.quote, { ref: result.reference })}{" "}
          <a href={`mailto:${site.email}`} className="text-gold-200 underline underline-offset-4">
            {site.email}
          </a>
        </p>
      </div>
    </div>
  );
}
