import { Fragment } from "react";
import { platforms } from "@/data/playbook";
import { LevelBadge } from "./Bits";

export function PlatformTable() {
  return (
    <div className="card scroll-x">
      <table className="data-table min-w-[820px]">
        <thead>
          <tr>
            <th>#</th>
            <th>Platform</th>
            <th>Best for</th>
            <th>India</th>
            <th>Signal</th>
            <th>Notifications</th>
            <th>Pricing</th>
            <th>Deadlines</th>
            <th>Location</th>
            <th>Feeds/API</th>
          </tr>
        </thead>
        <tbody>
          {platforms.map((p) => (
            <Fragment key={p.name}>
              <tr>
                <td className="mono text-accent">{p.rank}</td>
                <td className="font-medium text-text">{p.name}</td>
                <td>{p.bestFor}</td>
                <td><LevelBadge level={p.india} /></td>
                <td><LevelBadge level={p.signal} /></td>
                <td>{p.notify}</td>
                <td>{p.pricing}</td>
                <td>{p.deadlines}</td>
                <td>{p.location}</td>
                <td>{p.integrations}</td>
              </tr>
              <tr>
                <td />
                <td colSpan={9} className="!pt-0 text-muted">
                  <span className="text-accent-2">↳ </span>{p.verdict}
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
