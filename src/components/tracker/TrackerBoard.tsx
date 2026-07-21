"use client";

import { useEffect, useMemo, useState } from "react";
import { allOpportunities } from "@/data/merged";
import { useProfile } from "@/lib/profile-store";
import { rankOpportunities, ACTION_META } from "@/lib/scoring";
import { effectiveDeadline, deadlineLabel } from "@/lib/dates";
import { opportunityToICS, downloadICS } from "@/lib/ics";
import type { ActionType, Opportunity } from "@/lib/types";

const COLUMNS: ActionType[] = ["apply", "attend", "build", "publish", "ignore"];
const PREP = ["not started", "prepping", "ready"] as const;
const APPLIED = ["not applied", "in progress", "submitted", "accepted", "rejected"] as const;
const STORAGE_KEY = "radar-tracker-v1";

interface Override {
  action?: ActionType;
  prep?: (typeof PREP)[number];
  applied?: (typeof APPLIED)[number];
}
type Store = Record<string, Override>;

export function TrackerBoard() {
  const { profile } = useProfile();
  const ranked = useMemo(() => rankOpportunities(allOpportunities, profile), [profile]);
  const defaults = useMemo(() => {
    const m: Record<string, ActionType> = {};
    ranked.forEach(({ opp, scored }) => (m[opp.id] = scored.action));
    return m;
  }, [ranked]);

  const [store, setStore] = useState<Store>({});
  const [loaded, setLoaded] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setStore(JSON.parse(raw));
    } catch {
      /* ignore corrupt store */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }, [store, loaded]);

  function update(id: string, patch: Override) {
    setStore((s) => ({ ...s, [id]: { ...s[id], ...patch } }));
  }
  function actionOf(id: string): ActionType {
    return store[id]?.action ?? defaults[id];
  }

  const byColumn = (col: ActionType) =>
    ranked.map((r) => r.opp).filter((o) => actionOf(o.id) === col);

  return (
    <div className="scroll-x -mx-1 pb-2">
      <div className="grid min-w-[900px] grid-cols-5 gap-3 px-1">
        {COLUMNS.map((col) => {
          const items = byColumn(col);
          return (
            <section
              key={col}
              aria-label={ACTION_META[col].label}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragId) update(dragId, { action: col });
                setDragId(null);
              }}
              className="flex flex-col rounded-2xl border border-border bg-bg-2/50 p-2"
            >
              <header className="flex items-center justify-between px-1 py-2">
                <span className={`action-chip action-${col}`}>
                  <span className="dot" aria-hidden />
                  {ACTION_META[col].label}
                </span>
                <span className="mono text-[0.7rem] text-faint">{items.length}</span>
              </header>
              <div className="flex flex-col gap-2">
                {items.map((opp) => (
                  <TrackerCard
                    key={opp.id}
                    opp={opp}
                    override={store[opp.id] ?? {}}
                    onUpdate={(p) => update(opp.id, p)}
                    onDragStart={() => setDragId(opp.id)}
                  />
                ))}
                {items.length === 0 && (
                  <p className="px-1 py-4 text-center text-[0.72rem] text-faint">
                    drop here
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function TrackerCard({
  opp,
  override,
  onUpdate,
  onDragStart,
}: {
  opp: Opportunity;
  override: Override;
  onUpdate: (p: Override) => void;
  onDragStart: () => void;
}) {
  const deadline = effectiveDeadline(opp);
  return (
    <article
      draggable
      onDragStart={onDragStart}
      className="card cursor-grab p-3 active:cursor-grabbing"
    >
      <a href={opp.url} target="_blank" rel="noreferrer noopener" className="text-sm font-medium leading-tight hover:text-accent">
        {opp.title}
      </a>
      <p className="mono mt-1 text-[0.66rem] text-faint">
        {opp.organizer} · {deadlineLabel(deadline, opp.recurring)}
      </p>

      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <MiniSelect label="Prep" value={override.prep ?? "not started"} options={PREP} onChange={(v) => onUpdate({ prep: v as Override["prep"] })} />
        <MiniSelect label="Status" value={override.applied ?? "not applied"} options={APPLIED} onChange={(v) => onUpdate({ applied: v as Override["applied"] })} />
      </div>

      <details className="mt-2">
        <summary className="mono cursor-pointer list-none text-[0.66rem] text-faint hover:text-accent">▸ fields</summary>
        <dl className="mt-2 space-y-1 text-[0.72rem] text-muted">
          <Field k="Location" v={opp.isOnline ? "Online" : opp.city} />
          <Field k="Eligibility" v={opp.eligibility} />
          <Field k="Team" v={opp.teamSize} />
          <Field k="Prize" v={opp.prize} />
          <Field k="Tech" v={opp.techTags.join(", ")} />
          <Field k="Project" v={opp.whichProject} />
          <Field k="Content" v={opp.contentIdea} />
          <Field k="GitHub" v={opp.githubIdea} />
          <Field k="LinkedIn" v={opp.linkedinIdea} />
          <Field k="Startup" v={opp.startupRelevance} />
        </dl>
      </details>

      {deadline && (
        <button
          type="button"
          onClick={() => {
            const ics = opportunityToICS(opp);
            if (ics) downloadICS(`radar-${opp.id}.ics`, ics);
          }}
          className="mono mt-2 text-[0.66rem] text-faint hover:text-accent"
        >
          + reminder (.ics)
        </button>
      )}
    </article>
  );
}

function MiniSelect({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-0.5">
      <span className="mono text-[0.56rem] uppercase tracking-widest text-faint">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-border bg-bg px-1.5 py-1 text-[0.72rem] outline-none focus:border-accent"
      >
        {options.map((o) => <option key={o} value={o} className="bg-bg">{o}</option>)}
      </select>
    </label>
  );
}

function Field({ k, v }: { k: string; v?: string }) {
  if (!v) return null;
  return (
    <div className="flex gap-1.5">
      <dt className="shrink-0 text-faint">{k}:</dt>
      <dd>{v}</dd>
    </div>
  );
}
