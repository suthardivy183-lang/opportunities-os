// Date helpers — deadline math drives the whole "days left" urgency system.

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/** Whole days from now until the given ISO date. Negative if in the past. */
export function daysUntil(iso?: string, now: Date = new Date()): number | null {
  if (!iso) return null;
  const target = new Date(`${iso}T23:59:59`);
  if (Number.isNaN(target.getTime())) return null;
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target.getTime() - startOfToday.getTime()) / MS_PER_DAY);
}

export type Urgency = "critical" | "soon" | "upcoming" | "distant" | "none" | "past";

export function urgencyOf(days: number | null): Urgency {
  if (days === null) return "none";
  if (days < 0) return "past";
  if (days <= 3) return "critical";
  if (days <= 7) return "soon";
  if (days <= 30) return "upcoming";
  return "distant";
}

/** "18 days left", "Closes today", "Rolling", "Closed". */
export function deadlineLabel(iso?: string, recurring?: boolean): string {
  const days = daysUntil(iso);
  if (days === null) return recurring ? "Rolling / recurring" : "Date TBA";
  if (days < 0) return recurring ? "Recurring — plan ahead" : "Closed";
  if (days === 0) return "Closes today";
  if (days === 1) return "1 day left";
  return `${days} days left`;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "10 Aug 2026" from an ISO date; passes through free-text ranges unchanged. */
export function formatDate(value?: string): string {
  if (!value) return "TBA";
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(value);
  if (!iso) return value;
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function isISODate(value?: string): value is string {
  return !!value && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/** The date to count down to: registration deadline, else an ISO event date. */
export function effectiveDeadline(opp: {
  registrationDeadline?: string;
  eventDate?: string;
}): string | undefined {
  if (opp.registrationDeadline) return opp.registrationDeadline;
  return isISODate(opp.eventDate) ? opp.eventDate : undefined;
}

/** Reminder offsets (days before deadline) used across the tracker + .ics export. */
export const REMINDER_OFFSETS = [30, 14, 7, 2] as const;
