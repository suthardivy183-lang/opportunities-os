import type { ReactNode } from "react";
import type { Level } from "@/data/playbook";

export function Section({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <div className="flex items-baseline gap-3">
        <span className="mono text-sm text-accent">{n}</span>
        <h2 className="display-lg text-2xl">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

const LEVEL_STYLE: Record<Level, { color: string }> = {
  High: { color: "var(--color-accent)" },
  Medium: { color: "var(--color-apply)" },
  Low: { color: "var(--color-critical)" },
};

export function LevelBadge({ level }: { level: Level }) {
  return (
    <span className="mono text-[0.72rem]" style={LEVEL_STYLE[level]}>
      {level}
    </span>
  );
}

export function Check({ ok }: { ok: boolean }) {
  return (
    <span
      className="mono text-sm"
      style={{ color: ok ? "var(--color-accent)" : "var(--color-faint)" }}
      aria-label={ok ? "yes" : "no"}
    >
      {ok ? "●" : "○"}
    </span>
  );
}
