// Types for the in-app Playbook — the research deliverable rendered as product.

export type Level = "High" | "Medium" | "Low";

export interface PlatformRow {
  rank: number;
  name: string;
  bestFor: string;
  india: Level;
  signal: Level;
  notify: string;
  personalization: string;
  pricing: string;
  deadlines: string;
  location: string;
  integrations: string;
  verdict: string;
}

export interface SourceRow {
  org: string;
  kind: "Vendor" | "AI lab" | "Framework" | "Community" | "Program";
  follow: string;
  notify: string;
  url: string;
}

export interface AutomationStack {
  tier: string;
  cost: string;
  stack: string[];
  steps: string[];
  pros: string;
  cons: string;
}

export interface TractionExample {
  trigger: string;
  play: string;
}

export interface CompetitorRow {
  name: string;
  type: string;
  aggregates: boolean;
  personalized: boolean;
  eligibility: boolean;
  reminders: boolean;
  actionGuidance: boolean;
  india: boolean;
  gap: string;
}

export interface QA {
  q: string;
  a: string;
}
