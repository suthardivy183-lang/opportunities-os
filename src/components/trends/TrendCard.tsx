import type { Trend, TrendKind } from "@/lib/types";
import { formatDate } from "@/lib/dates";

const KIND_COLOR: Record<TrendKind, string> = {
  model: "var(--color-accent-2)",
  tool: "var(--color-build)",
  post: "var(--color-attend)",
  repo: "var(--color-publish)",
  paper: "var(--color-apply)",
};

export function TrendCard({ trend }: { trend: Trend }) {
  const color = KIND_COLOR[trend.kind];
  return (
    <article className="card card-hover flex flex-col p-5">
      <div className="flex items-center justify-between gap-2">
        <span
          className="action-chip"
          style={{ color, background: "color-mix(in oklab, currentColor 14%, transparent)", borderColor: "color-mix(in oklab, currentColor 40%, transparent)", ...({ color } as object) }}
        >
          {trend.kind}
        </span>
        <span className="mono text-[0.68rem] text-faint">
          {trend.metric ? `${trend.metric} · ` : ""}{formatDate(trend.date)}
        </span>
      </div>

      <h3 className="font-display mt-3 text-lg leading-tight">
        <a href={trend.url} target="_blank" rel="noreferrer noopener" className="hover:text-accent">
          {trend.title}
        </a>
      </h3>
      <p className="mono mt-1 text-[0.7rem] text-faint">{trend.source}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{trend.summary}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {trend.tags.map((t) => <span key={t} className="pill">{t}</span>)}
      </div>

      <div className="hairline mt-4 grid gap-2 pt-4 text-sm">
        <p><span className="mono text-[0.68rem] uppercase tracking-widest text-attend">Post ▸ </span><span className="text-muted">{trend.contentAngle}</span></p>
        <p><span className="mono text-[0.68rem] uppercase tracking-widest text-build">Build ▸ </span><span className="text-muted">{trend.buildIdea}</span></p>
      </div>
    </article>
  );
}
