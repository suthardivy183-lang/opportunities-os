import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/playbook/Bits";
import { PlatformTable } from "@/components/playbook/PlatformTable";
import { CompetitorMatrix } from "@/components/playbook/CompetitorMatrix";
import {
  aggregators,
  sources,
  automationStacks,
  toolNotes,
  legalNotes,
  tractionLoop,
  tractionExamples,
  dailyRoutine,
  sundayRoutine,
  startupAnalysis,
  verdict,
  checklist48h,
} from "@/data/playbook";

export const metadata = { title: "Playbook — Radar" };

const WHY_MISSED = [
  "Information is fragmented across 20+ platforms with no shared calendar.",
  "Discovery is pull, not push — you only find things when you go looking.",
  "Deadlines aren't extracted or reminded, so you see them after they close.",
  "No personalization: generic lists don't tell you what fits YOU.",
  "No action layer: even when you find something, the 'what do I do' is on you.",
];

const TOC = [
  ["why", "01", "Why you miss opportunities"],
  ["platforms", "02", "Best platforms, ranked"],
  ["sources", "03", "Official sources + exact alert"],
  ["automation", "04", "Automation pipeline"],
  ["routine", "05", "Weekly operating system"],
  ["traction", "06", "GitHub + LinkedIn traction"],
  ["competitors", "07", "Competitor matrix"],
  ["startup", "08", "Startup analysis + verdict"],
  ["legal", "09", "Legal / scraping risks"],
  ["checklist", "10", "Next 48 hours"],
];

export default function PlaybookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Playbook"
        title="The intelligence system behind Radar"
        lede="The full research: where to look, what to switch on, how to automate it, and how to convert every signal into GitHub + LinkedIn traction. Facts are sourced; assumptions are flagged in the data."
      />

      {/* TOC */}
      <nav aria-label="Playbook sections" className="card mb-10 grid gap-x-4 gap-y-1 p-4 sm:grid-cols-2">
        {TOC.map(([id, n, label]) => (
          <a key={id} href={`#${id}`} className="nav-link !py-1.5 text-sm">
            <span className="mono text-accent">{n}</span>
            {label}
          </a>
        ))}
      </nav>

      <div className="space-y-14">
        <Section id="why" n="01" title="Why you miss opportunities">
          <ul className="grid gap-2 sm:grid-cols-2">
            {WHY_MISSED.map((w) => (
              <li key={w} className="card p-4 text-sm text-muted">{w}</li>
            ))}
          </ul>
        </Section>

        <Section id="platforms" n="02" title="Best platforms, ranked">
          <PlatformTable />
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {aggregators.map((a) => (
              <div key={a.name} className="card p-3 text-sm">
                <span className="font-medium text-text">{a.name}</span>
                <span className="text-muted"> — {a.note}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="sources" n="03" title="Official sources + the exact alert to switch on">
          <div className="card scroll-x">
            <table className="data-table min-w-[720px]">
              <thead>
                <tr><th>Source</th><th>Follow</th><th>Enable this exact notification</th><th>Link</th></tr>
              </thead>
              <tbody>
                {sources.map((s) => (
                  <tr key={s.org}>
                    <td className="font-medium text-text">{s.org}<div className="mono text-[0.6rem] text-faint">{s.kind}</div></td>
                    <td>{s.follow}</td>
                    <td className="text-muted">{s.notify}</td>
                    <td><a href={s.url} target="_blank" rel="noreferrer noopener" className="text-accent hover:underline">open ↗</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="automation" n="04" title="Automation pipeline — free / ₹500 / custom">
          <div className="grid gap-4 lg:grid-cols-3">
            {automationStacks.map((s) => (
              <div key={s.tier} className="card flex flex-col p-5">
                <p className="eyebrow">{s.tier}</p>
                <p className="font-display mt-1 text-2xl text-accent">{s.cost}</p>
                <ul className="mt-3 space-y-1 text-sm text-muted">
                  {s.stack.map((x) => <li key={x}>· {x}</li>)}
                </ul>
                <details className="mt-3">
                  <summary className="mono cursor-pointer list-none text-[0.72rem] text-faint hover:text-accent">▸ setup steps</summary>
                  <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm text-muted">
                    {s.steps.map((x) => <li key={x}>{x}</li>)}
                  </ol>
                </details>
                <div className="hairline mt-auto pt-3 text-xs">
                  <p><span className="text-accent">＋</span> {s.pros}</p>
                  <p className="mt-1"><span className="text-critical">－</span> {s.cons}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {toolNotes.map((t) => (
              <p key={t.tool} className="card p-3 text-sm text-muted">
                <span className="font-medium text-text">{t.tool}: </span>{t.note}
              </p>
            ))}
          </div>
        </Section>

        <Section id="routine" n="05" title="Weekly operating system">
          <div className="grid gap-4 sm:grid-cols-2">
            <RoutineCard title="10 min / day" items={dailyRoutine} />
            <RoutineCard title="30–45 min / Sunday" items={sundayRoutine} />
          </div>
        </Section>

        <Section id="traction" n="06" title="Turn signals into GitHub + LinkedIn traction">
          <div className="card mb-4 p-5">
            <p className="eyebrow">The loop</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {tractionLoop.map((s, i) => (
                <div key={s.step} className="flex items-center gap-2">
                  <span className="pill"><span className="mono text-accent">{i + 1}</span> {s.step}</span>
                  {i < tractionLoop.length - 1 && <span className="text-faint">→</span>}
                </div>
              ))}
            </div>
            <div className="mt-3 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
              {tractionLoop.map((s) => (
                <p key={s.step} className="text-xs text-muted"><span className="text-text">{s.step}: </span>{s.detail}</p>
              ))}
            </div>
          </div>
          <p className="eyebrow mb-2">20 concrete plays</p>
          <div className="card scroll-x">
            <table className="data-table min-w-[640px]">
              <thead><tr><th>#</th><th>Trigger</th><th>Do this end-to-end</th></tr></thead>
              <tbody>
                {tractionExamples.map((e, i) => (
                  <tr key={e.trigger}>
                    <td className="mono text-accent">{i + 1}</td>
                    <td className="font-medium text-text">{e.trigger}</td>
                    <td>{e.play}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="competitors" n="07" title="Competitor matrix">
          <CompetitorMatrix />
          <p className="mt-3 text-sm text-muted">
            The combination — aggregation + personalization + eligibility + reminders + action guidance, India-first — is what nobody ships today. That gap is Radar&apos;s wedge.
          </p>
        </Section>

        <Section id="startup" n="08" title="Startup opportunity analysis">
          <div className="grid gap-3 sm:grid-cols-2">
            {startupAnalysis.map((qa) => (
              <div key={qa.q} className="card p-4">
                <p className="font-medium text-text">{qa.q}</p>
                <p className="mt-1 text-sm text-muted">{qa.a}</p>
              </div>
            ))}
          </div>
          <div className="card mt-4 border-accent p-5" style={{ borderColor: "color-mix(in oklab, var(--color-accent) 45%, transparent)" }}>
            <p className="eyebrow">Verdict</p>
            <p className="display-lg mt-1 text-xl text-accent">{verdict.headline}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {verdict.bullets.map((b) => <li key={b} className="flex gap-2"><span className="text-accent">▸</span>{b}</li>)}
            </ul>
            <p className="mt-3 text-sm text-text">{verdict.reasoning}</p>
          </div>
        </Section>

        <Section id="legal" n="09" title="Legal & scraping risks">
          <ul className="grid gap-2 sm:grid-cols-2">
            {legalNotes.map((l) => (
              <li key={l} className="card p-3 text-sm text-muted">{l}</li>
            ))}
          </ul>
        </Section>

        <Section id="checklist" n="10" title="Your next 48 hours">
          <ol className="grid gap-2">
            {checklist48h.map((c, i) => (
              <li key={c} className="card flex items-start gap-3 p-3 text-sm">
                <span className="mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-muted">{c}</span>
              </li>
            ))}
          </ol>
        </Section>
      </div>
    </>
  );
}

function RoutineCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card p-5">
      <p className="eyebrow">{title}</p>
      <ol className="mt-3 space-y-2 text-sm text-muted">
        {items.map((it, i) => (
          <li key={it} className="flex gap-2">
            <span className="mono text-accent">{i + 1}</span>{it}
          </li>
        ))}
      </ol>
    </div>
  );
}
