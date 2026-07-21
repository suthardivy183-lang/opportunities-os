import { daysUntil, urgencyOf, deadlineLabel, type Urgency } from "@/lib/dates";

const COLOR: Record<Urgency, string> = {
  critical: "var(--color-critical)",
  soon: "var(--color-soon)",
  upcoming: "var(--color-accent)",
  distant: "var(--color-muted)",
  none: "var(--color-faint)",
  past: "var(--color-faint)",
};

export function DaysLeft({
  deadline,
  recurring,
}: {
  deadline?: string;
  recurring?: boolean;
}) {
  const days = daysUntil(deadline);
  const urgency = urgencyOf(days);
  const label = deadlineLabel(deadline, recurring);
  const color = COLOR[urgency];

  return (
    <div className="flex items-center gap-2 whitespace-nowrap" style={{ color }}>
      {days !== null && days >= 0 ? (
        <span className="grid h-9 min-w-9 place-items-center rounded-xl border px-1.5" style={{ borderColor: color }}>
          <span className="mono text-sm font-semibold leading-none">{days}</span>
          <span className="mono text-[0.5rem] uppercase tracking-widest leading-none">days</span>
        </span>
      ) : (
        <span className="dot" aria-hidden />
      )}
      <span className="mono text-[0.72rem]">{label}</span>
    </div>
  );
}
