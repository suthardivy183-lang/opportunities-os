import { competitors } from "@/data/playbook";
import { Check } from "./Bits";

export function CompetitorMatrix() {
  return (
    <div className="card scroll-x">
      <table className="data-table min-w-[760px]">
        <thead>
          <tr>
            <th>Product</th>
            <th>Type</th>
            <th>Aggregates</th>
            <th>Personalized</th>
            <th>Eligibility</th>
            <th>Reminders</th>
            <th>Action guidance</th>
            <th>India-first</th>
            <th>Gap</th>
          </tr>
        </thead>
        <tbody>
          {competitors.map((c) => {
            const isUs = c.name.startsWith("Radar");
            return (
              <tr key={c.name} style={isUs ? { background: "color-mix(in oklab, var(--color-accent) 8%, transparent)" } : undefined}>
                <td className="font-medium" style={{ color: isUs ? "var(--color-accent)" : "var(--color-text)" }}>{c.name}</td>
                <td>{c.type}</td>
                <td><Check ok={c.aggregates} /></td>
                <td><Check ok={c.personalized} /></td>
                <td><Check ok={c.eligibility} /></td>
                <td><Check ok={c.reminders} /></td>
                <td><Check ok={c.actionGuidance} /></td>
                <td><Check ok={c.india} /></td>
                <td className="text-muted">{c.gap}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
