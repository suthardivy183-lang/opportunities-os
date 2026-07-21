// Core domain types for Radar — the opportunity-to-action engine.

export type Category =
  | "hackathon"
  | "program"
  | "grant"
  | "conference"
  | "meetup"
  | "challenge";

export type ActionType = "apply" | "attend" | "build" | "publish" | "ignore";

export type OppStatus = "open" | "upcoming" | "recurring" | "closed";

export type Confidence = "confirmed" | "verify";

export interface Opportunity {
  id: string;
  title: string;
  organizer: string;
  category: Category;
  description: string;
  url: string;
  /** Platform the item was discovered on (Devpost, Unstop, official, ...). */
  source: string;
  isOnline: boolean;
  /** City for offline / hybrid events. */
  city?: string;
  country?: string;
  eligibility: string;
  cost: string;
  /** ISO date (yyyy-mm-dd) or undefined when rolling / unknown. */
  registrationDeadline?: string;
  /** ISO date or free-text range. */
  eventDate?: string;
  teamSize?: string;
  prize?: string;
  techTags: string[];
  status: OppStatus;
  recurring?: boolean;
  /** Whether the deadline/facts are officially confirmed or still need verification. */
  confidence: Confidence;
  /** Curated narrative fields — the "action" half of opportunity-to-action. */
  whyMatch: string;
  whichProject?: string;
  prepSteps?: string[];
  contentIdea?: string;
  githubIdea?: string;
  linkedinIdea?: string;
  startupRelevance?: string;
  /** Optional author-suggested action; the classifier fills this in for ingested items. */
  action?: ActionType;
}

export type TrendKind = "model" | "repo" | "tool" | "post" | "paper";

export interface Trend {
  id: string;
  kind: TrendKind;
  title: string;
  url: string;
  source: string;
  summary: string;
  /** Human metric, e.g. "42k★" or "1.2k pts". */
  metric?: string;
  tags: string[];
  date: string;
  contentAngle: string;
  buildIdea: string;
}

export interface UserProject {
  name: string;
  blurb: string;
  tech: string[];
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  skills: string[];
  interests: string[];
  cities: string[];
  projects: UserProject[];
  goals: string[];
}

/** Result of scoring an opportunity against a profile. */
export interface Scored {
  score: number; // 0-100 relevance
  action: ActionType;
  reasons: string[];
}
