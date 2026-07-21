// Build an .ics calendar file with 30/14/7/2-day reminders before a deadline.
// Pure string generation — no dependencies, runs in the browser for one-click export.

import type { Opportunity } from "./types";
import { REMINDER_OFFSETS } from "./dates";

function toICSDate(iso: string, allDay = true): string {
  // allDay: yyyymmdd ; timed: yyyymmddThhmmssZ
  const [y, m, d] = iso.split("-");
  if (allDay) return `${y}${m}${d}`;
  return `${y}${m}${d}T090000`;
}

function escapeText(text: string): string {
  return text.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
}

function stamp(): string {
  return new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

/**
 * One VEVENT for the deadline itself, plus VALARM triggers at each offset so the
 * user's calendar app fires reminders at 30/14/7/2 days out.
 */
export function opportunityToICS(opp: Opportunity): string | null {
  const anchor = opp.registrationDeadline ?? opp.eventDate;
  if (!anchor || !/^\d{4}-\d{2}-\d{2}$/.test(anchor)) return null;

  const alarms = REMINDER_OFFSETS.map(
    (days) => [
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeText(`${opp.title} — ${days} days left`)}`,
      `TRIGGER:-P${days}D`,
      "END:VALARM",
    ].join("\r\n")
  ).join("\r\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Radar//Opportunity Engine//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:radar-${opp.id}@radar.app`,
    `DTSTAMP:${stamp()}`,
    `DTSTART;VALUE=DATE:${toICSDate(anchor)}`,
    `SUMMARY:${escapeText(`⏰ ${opp.title} — deadline`)}`,
    `DESCRIPTION:${escapeText(
      `${opp.organizer} · ${opp.category}\n${opp.whyMatch}\nRegister: ${opp.url}`
    )}`,
    `URL:${opp.url}`,
    alarms,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

/** Bundle many opportunities into one downloadable calendar. */
export function opportunitiesToICS(opps: Opportunity[]): string {
  const events = opps
    .map(opportunityToICS)
    .filter((v): v is string => Boolean(v))
    // strip the wrapping VCALENDAR from each so we can concatenate the VEVENTs
    .map((cal) =>
      cal
        .split("\r\n")
        .filter(
          (l) =>
            !l.startsWith("BEGIN:VCALENDAR") &&
            !l.startsWith("END:VCALENDAR") &&
            !l.startsWith("VERSION:") &&
            !l.startsWith("PRODID:") &&
            !l.startsWith("CALSCALE:") &&
            !l.startsWith("METHOD:")
        )
        .join("\r\n")
    )
    .join("\r\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Radar//Opportunity Engine//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    events,
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Trigger a browser download of an .ics string. Client-only. */
export function downloadICS(filename: string, ics: string): void {
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
