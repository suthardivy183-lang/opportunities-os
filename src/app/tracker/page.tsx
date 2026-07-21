import { PageHeader } from "@/components/ui/PageHeader";
import { TrackerBoard } from "@/components/tracker/TrackerBoard";
import { reminderCadence } from "@/data/playbook";

export const metadata = { title: "Tracker — Radar" };

export default function TrackerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tracker"
        title="From discovery to done"
        lede="Every opportunity as a card you can drag across Apply · Attend · Build · Publish · Ignore. Set prep + application status, expand for all fields, and export .ics reminders. Saved in your browser."
      />

      <section className="card mb-6 p-4">
        <p className="eyebrow">Deadline reminder cadence</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-4">
          {reminderCadence.map((r) => (
            <div key={r.at} className="rounded-xl border border-border p-3">
              <p className="font-display text-xl text-accent">{r.at}</p>
              <p className="mt-1 text-xs text-muted">{r.do}</p>
            </div>
          ))}
        </div>
      </section>

      <TrackerBoard />
    </>
  );
}
