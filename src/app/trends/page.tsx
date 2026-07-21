import { PageHeader } from "@/components/ui/PageHeader";
import { TrendCard } from "@/components/trends/TrendCard";
import { seedTrends } from "@/data/trends";
import { modelLaunchPlaybook } from "@/data/playbook";

export const metadata = { title: "Trends — Radar" };

export default function TrendsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trends"
        title="Ride the wave, don't miss it"
        lede="New AI models, tools and viral builds — each with a ready content angle and a weekend build idea. Seed snapshot now; live GitHub / Hugging Face / Product Hunt adapters refresh it."
      />

      <section aria-label="Model-launch playbook" className="card mb-8 p-5">
        <p className="eyebrow">When a major model drops — the 6-step loop</p>
        <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {modelLaunchPlaybook.map((step, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted">
              <span className="mono text-accent">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {seedTrends.map((t) => (
          <TrendCard key={t.id} trend={t} />
        ))}
      </div>
    </>
  );
}
