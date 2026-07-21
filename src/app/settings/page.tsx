"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useProfile } from "@/lib/profile-store";
import type { Profile } from "@/lib/types";

export default function SettingsPage() {
  const { profile, setProfile, reset } = useProfile();

  function patch(p: Partial<Profile>) {
    setProfile({ ...profile, ...p });
  }

  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title="Your profile drives the ranking"
        lede="Everything here feeds the relevance score and the 'why it matches you' on every card. Edits save to your browser and re-rank the Dashboard + Tracker instantly."
        actions={
          <button type="button" onClick={reset} className="btn btn-ghost text-xs">
            Reset to defaults
          </button>
        }
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card p-5">
          <p className="eyebrow mb-3">Identity</p>
          <TextField label="Name" value={profile.name} onChange={(v) => patch({ name: v })} />
          <TextField label="Role" value={profile.role} onChange={(v) => patch({ role: v })} />
          <TextField label="Location" value={profile.location} onChange={(v) => patch({ location: v })} />
        </div>

        <div className="card p-5">
          <p className="eyebrow mb-3">Goals</p>
          <ChipEditor values={profile.goals} placeholder="Add a goal…" onChange={(v) => patch({ goals: v })} />
        </div>

        <div className="card p-5">
          <p className="eyebrow mb-3">Interests <span className="text-faint">(strongest scoring signal)</span></p>
          <ChipEditor values={profile.interests} placeholder="e.g. ai-agents" onChange={(v) => patch({ interests: v })} />
        </div>

        <div className="card p-5">
          <p className="eyebrow mb-3">Skills</p>
          <ChipEditor values={profile.skills} placeholder="e.g. next.js" onChange={(v) => patch({ skills: v })} />
        </div>

        <div className="card p-5">
          <p className="eyebrow mb-3">Cities <span className="text-faint">(location boost)</span></p>
          <ChipEditor values={profile.cities} placeholder="e.g. Ahmedabad" onChange={(v) => patch({ cities: v })} />
        </div>

        <div className="card p-5">
          <p className="eyebrow mb-3">Projects <span className="text-faint">(for &apos;which project to submit&apos;)</span></p>
          <ProjectEditor
            projects={profile.projects}
            onChange={(projects) => patch({ projects })}
          />
        </div>
      </div>
    </>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="mb-3 block">
      <span className="mono text-[0.66rem] uppercase tracking-widest text-faint">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
      />
    </label>
  );
}

function ChipEditor({ values, placeholder, onChange }: { values: string[]; placeholder: string; onChange: (v: string[]) => void }) {
  const [draft, setDraft] = useState("");
  function add() {
    const v = draft.trim().toLowerCase();
    if (v && !values.includes(v)) onChange([...values, v]);
    setDraft("");
  }
  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {values.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(values.filter((x) => x !== v))}
            className="pill hover:border-critical"
            title="Remove"
          >
            {v} <span className="text-faint">×</span>
          </button>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder={placeholder}
          className="min-w-0 flex-1 rounded-xl border border-border bg-bg px-3 py-1.5 text-sm outline-none focus:border-accent"
        />
        <button type="button" onClick={add} className="btn btn-ghost text-xs">Add</button>
      </div>
    </div>
  );
}

function ProjectEditor({ projects, onChange }: { projects: Profile["projects"]; onChange: (p: Profile["projects"]) => void }) {
  function update(i: number, patch: Partial<Profile["projects"][number]>) {
    onChange(projects.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  }
  return (
    <div className="space-y-3">
      {projects.map((p, i) => (
        <div key={i} className="rounded-xl border border-border p-3">
          <input
            value={p.name}
            onChange={(e) => update(i, { name: e.target.value })}
            className="w-full bg-transparent text-sm font-medium outline-none"
          />
          <input
            value={p.blurb}
            onChange={(e) => update(i, { blurb: e.target.value })}
            className="mt-1 w-full bg-transparent text-xs text-muted outline-none"
          />
          <input
            value={p.tech.join(", ")}
            onChange={(e) => update(i, { tech: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
            className="mono mt-1 w-full bg-transparent text-[0.7rem] text-faint outline-none"
          />
          <button type="button" onClick={() => onChange(projects.filter((_, idx) => idx !== i))} className="mono mt-1 text-[0.66rem] text-faint hover:text-critical">
            remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...projects, { name: "New project", blurb: "What it does", tech: [] }])}
        className="btn btn-ghost text-xs"
      >
        + Add project
      </button>
    </div>
  );
}
