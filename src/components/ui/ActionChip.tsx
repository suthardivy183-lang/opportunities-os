import { ACTION_META } from "@/lib/scoring";
import type { ActionType } from "@/lib/types";

export function ActionChip({ action }: { action: ActionType }) {
  const meta = ACTION_META[action];
  return (
    <span className={`action-chip action-${action}`} title={meta.blurb}>
      <span className="dot" aria-hidden />
      {meta.label}
    </span>
  );
}
