import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  lede,
  actions,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-lg mt-2 text-balance">{title}</h1>
        {lede && <p className="mt-3 text-sm leading-relaxed text-muted">{lede}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  );
}
