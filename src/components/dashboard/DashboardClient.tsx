"use client";

import { useMemo, useState } from "react";
import { allOpportunities } from "@/data/merged";
import { useProfile } from "@/lib/profile-store";
import { rankOpportunities } from "@/lib/scoring";
import { effectiveDeadline, daysUntil } from "@/lib/dates";
import { opportunitiesToICS, downloadICS } from "@/lib/ics";
import { OpportunityCard } from "@/components/opportunity/OpportunityCard";
import type { ActionType, Category } from "@/lib/types";

const CATEGORIES: (Category | "all")[] = [
  "all", "hackathon", "program", "challenge", "grant", "conference", "meetup",
];
const ACTIONS: (ActionType | "all")[] = ["all", "apply", "build", "attend", "publish", "ignore"];

export function DashboardClient() {
  const { profile } = useProfile();
  const ranked = useMemo(() => rankOpportunities(allOpportunities, profile), [profile]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [action, setAction] = useState<ActionType | "all">("all");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [city, setCity] = useState<string>("all");

  const filtered = ranked.filter(({ opp, scored }) => {
    if (category !== "all" && opp.category !== category) return false;
    if (action !== "all" && scored.action !== action) return false;
    if (onlineOnly && !opp.isOnline) return false;
    if (city !== "all") {
      const inCity = opp.isOnline || opp.city?.toLowerCase().includes(city.toLowerCase());
      if (!inCity) return false;
    }
    if (query) {
      const hay = `${opp.title} ${opp.organizer} ${opp.techTags.join(" ")} ${opp.source}`.toLowerCase();
      if (!hay.includes(query.toLowerCase())) return false;
    }
    return true;
  });

  const counts = ranked.reduce<Record<string, number>>((acc, { scored }) => {
    acc[scored.action] = (acc[scored.action] ?? 0) + 1;
    return acc;
  }, {});

  const nearest = ranked
    .map(({ opp }) => ({ opp, d: daysUntil(effectiveDeadline(opp)) }))
    .filter((x) => x.d !== null && x.d >= 0)
    .sort((a, b) => (a.d! - b.d!))[0];

  function exportAll() {
    const opps = ranked.map((r) => r.opp).filter((o) => effectiveDeadline(o));
    downloadICS("radar-deadlines.ics", opportunitiesToICS(opps));
  }

  return (
    <div>
      {/* Summary strip */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Tracked" value={String(ranked.length)} hint="opportunities" />
        <Stat label="Apply now" value={String(counts.apply ?? 0)} hint="high-fit + open" accent />
        <Stat label="To build" value={String((counts.build ?? 0) + (counts.publish ?? 0))} hint="ship + post" />
        <Stat
          label="Next deadline"
          value={nearest ? `${nearest.d}d` : "—"}
          hint={nearest ? nearest.opp.title.slice(0, 22) : "all clear"}
        />
      </div>

      {/* Filters */}
      <div className="card mb-6 flex flex-col gap-3 p-3 sm:flex-row sm:flex-wrap sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title, org, tech…"
          aria-label="Search opportunities"
          className="min-w-0 flex-1 rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none placeholder:text-faint focus:border-accent"
        />
        <Segmented options={ACTIONS} value={action} onChange={setAction} />
        <div className="flex flex-wrap items-center gap-2">
          <Select label="Category" value={category} options={CATEGORIES} onChange={(v) => setCategory(v as Category | "all")} />
          <Select label="City" value={city} options={["all", ...profile.cities]} onChange={setCity} />
          <label className="pill cursor-pointer select-none" style={onlineOnly ? { color: "var(--color-accent)", borderColor: "var(--color-accent)" } : undefined}>
            <input type="checkbox" checked={onlineOnly} onChange={(e) => setOnlineOnly(e.target.checked)} className="sr-only" />
            {onlineOnly ? "● " : "○ "} Online only
          </label>
          <button type="button" onClick={exportAll} className="btn btn-ghost text-xs">
            ⤓ Export deadlines
          </button>
        </div>
      </div>

      <p className="mono mb-4 text-[0.72rem] text-faint">
        {filtered.length} shown · ranked by fit to your profile
      </p>

      <div className="grid gap-4 xl:grid-cols-2">
        {filtered.map(({ opp, scored }) => (
          <OpportunityCard key={opp.id} opp={opp} scored={scored} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card p-10 text-center text-sm text-muted">
          No matches with these filters. Try clearing them.
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, hint, accent }: { label: string; value: string; hint: string; accent?: boolean }) {
  return (
    <div className="card p-4">
      <p className="mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">{label}</p>
      <p className="font-display mt-1 text-3xl leading-none" style={accent ? { color: "var(--color-accent)" } : undefined}>
        {value}
      </p>
      <p className="mt-1 truncate text-[0.7rem] text-muted">{hint}</p>
    </div>
  );
}

function Segmented<T extends string>({ options, value, onChange }: { options: T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-bg p-1">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          data-active={value === o}
          className="nav-link shrink-0 !px-2.5 !py-1 text-xs capitalize"
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="pill cursor-pointer gap-1">
      <span className="text-faint">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer bg-transparent text-text outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-bg capitalize">{o}</option>
        ))}
      </select>
    </label>
  );
}
