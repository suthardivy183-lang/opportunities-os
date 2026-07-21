"use client";

import type { Opportunity, Scored } from "@/lib/types";
import { effectiveDeadline, formatDate } from "@/lib/dates";
import { opportunityToICS, downloadICS } from "@/lib/ics";
import { ActionChip } from "@/components/ui/ActionChip";
import { DaysLeft } from "@/components/ui/DaysLeft";

export function OpportunityCard({ opp, scored }: { opp: Opportunity; scored: Scored }) {
  const deadline = effectiveDeadline(opp);
  const location = opp.isOnline ? "Online" : opp.city ?? "In-person";

  function addReminder() {
    const ics = opportunityToICS(opp);
    if (ics) downloadICS(`radar-${opp.id}.ics`, ics);
  }

  return (
    <article className="card card-hover flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="pill capitalize">{opp.category}</span>
          <span className="pill">{opp.source}</span>
          {opp.confidence === "verify" && (
            <span className="pill" style={{ color: "var(--color-apply)", borderColor: "color-mix(in oklab, var(--color-apply) 40%, transparent)" }}>
              verify date
            </span>
          )}
        </div>
        <DaysLeft deadline={deadline} recurring={opp.recurring} />
      </div>

      <h3 className="font-display mt-3 text-xl leading-tight">
        <a href={opp.url} target="_blank" rel="noreferrer noopener" className="hover:text-accent">
          {opp.title}
        </a>
      </h3>

      <p className="mono mt-1.5 text-[0.72rem] text-faint">
        {opp.organizer} · {location} · {opp.teamSize ?? "—"} · {opp.cost}
      </p>

      {opp.prize && (
        <p className="mt-2 text-sm text-text">
          <span className="text-accent-2">◆</span> {opp.prize}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {opp.techTags.map((t) => (
          <span key={t} className="pill">{t}</span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <ActionChip action={scored.action} />
        <ScoreMeter score={scored.score} />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        <span className="text-text">Why it matches — </span>
        {opp.whyMatch}
      </p>

      <details className="mt-3 group">
        <summary className="mono cursor-pointer list-none text-[0.72rem] tracking-wide text-faint hover:text-accent">
          ▸ action plan &amp; content angles
        </summary>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2">
          <Detail label="Which project" value={opp.whichProject} />
          <Detail label="Deadline / event" value={`${formatDate(opp.registrationDeadline)} · ${opp.eventDate ?? "—"}`} />
          <Detail label="Eligibility" value={opp.eligibility} />
          <Detail label="Content idea" value={opp.contentIdea} />
          <Detail label="GitHub" value={opp.githubIdea} />
          <Detail label="LinkedIn" value={opp.linkedinIdea} />
          <Detail label="Startup relevance" value={opp.startupRelevance} full />
        </dl>
        {opp.prepSteps && opp.prepSteps.length > 0 && (
          <div className="mt-3">
            <p className="mono text-[0.68rem] uppercase tracking-widest text-faint">Prep steps</p>
            <ol className="mt-1 list-decimal space-y-1 pl-4 text-sm text-muted">
              {opp.prepSteps.map((s) => <li key={s}>{s}</li>)}
            </ol>
          </div>
        )}
      </details>

      <div className="hairline mt-4 flex items-center gap-2 pt-4">
        <a href={opp.url} target="_blank" rel="noreferrer noopener" className="btn btn-primary text-xs">
          Open
        </a>
        <button type="button" onClick={addReminder} className="btn btn-ghost text-xs" disabled={!deadline} title={deadline ? "Download .ics with 30/14/7/2-day reminders" : "No fixed date to remind on"}>
          + Reminder
        </button>
      </div>
    </article>
  );
}

function Detail({ label, value, full }: { label: string; value?: string; full?: boolean }) {
  if (!value) return null;
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <dt className="mono text-[0.66rem] uppercase tracking-widest text-faint">{label}</dt>
      <dd className="mt-0.5 text-sm text-muted">{value}</dd>
    </div>
  );
}

function ScoreMeter({ score }: { score: number }) {
  return (
    <div className="flex flex-1 items-center gap-2" title={`Relevance score ${score}/100`}>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-2">
        <div
          className="h-full rounded-full"
          style={{
            width: `${score}%`,
            background: "linear-gradient(90deg, var(--color-accent-2), var(--color-accent))",
          }}
        />
      </div>
      <span className="mono text-[0.72rem] text-muted">{score}</span>
    </div>
  );
}
