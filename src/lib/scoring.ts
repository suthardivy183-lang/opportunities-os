// Deterministic, explainable relevance scoring + action classification.
//
// This is the rule-based tier that ships in the MVP: no API key required, fully
// transparent. The plan's embedding-similarity tier layers on top of this later
// (cosine(profile, opportunity) blended into `base`) without changing the shape.

import type { ActionType, Opportunity, Profile, Scored } from "./types";
import { daysUntil } from "./dates";

const PRESTIGE = new Set([
  "apple", "google", "microsoft", "aws", "amazon", "nvidia", "meta", "openai",
  "anthropic", "google deepmind", "hugging face", "github", "goldman sachs",
  "government of india", "mlh", "ethglobal", "devfolio",
]);

function norm(values: string[]): Set<string> {
  return new Set(values.map((v) => v.toLowerCase().trim()));
}

/**
 * Score an opportunity 0-100 against a profile and explain why.
 * Weights are intentionally simple and legible so the "why" is always defensible.
 */
export function scoreOpportunity(opp: Opportunity, profile: Profile): Scored {
  const reasons: string[] = [];
  let score = 30; // neutral floor so nothing is invisible

  const interests = norm([...profile.interests, ...profile.skills]);
  const tags = norm(opp.techTags);
  const overlap = [...tags].filter((t) => interests.has(t));
  if (overlap.length) {
    const pts = Math.min(30, overlap.length * 10);
    score += pts;
    reasons.push(
      `Matches your focus on ${overlap.slice(0, 3).join(", ")}`
    );
  }

  const cities = norm(profile.cities);
  if (opp.isOnline) {
    score += 10;
    reasons.push("Online — no travel needed");
  } else if (opp.city && cities.has(opp.city.toLowerCase())) {
    score += 18;
    reasons.push(`In ${opp.city} — one of your cities`);
  } else if (opp.city) {
    score -= 4;
  }

  if (PRESTIGE.has(opp.organizer.toLowerCase())) {
    score += 12;
    reasons.push(`Recognized organizer (${opp.organizer}) — strong on a résumé`);
  }

  const days = daysUntil(opp.registrationDeadline);
  if (opp.status === "open" && days !== null && days >= 0 && days <= 30) {
    score += 8;
    reasons.push("Open now with a near deadline — actionable this month");
  }
  if (opp.recurring) {
    reasons.push("Recurring — good to prep for next cycle");
  }

  if (/free|no fee|₹0/i.test(opp.cost)) {
    score += 3;
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  return { score, action: classifyAction(opp, score), reasons };
}

/** Map an opportunity to one of the five actions. Author override wins if set. */
export function classifyAction(opp: Opportunity, score: number): ActionType {
  if (opp.action) return opp.action;
  if (score < 40) return "ignore";
  switch (opp.category) {
    case "conference":
    case "meetup":
      return "attend";
    case "grant":
    case "program":
      return "apply";
    case "hackathon":
    case "challenge":
      // High relevance + open → apply; otherwise it's a "build for practice" item.
      return score >= 55 ? "apply" : "build";
    default:
      return "build";
  }
}

export interface RankedOpportunity {
  opp: Opportunity;
  scored: Scored;
}

export function rankOpportunities(
  opps: Opportunity[],
  profile: Profile
): RankedOpportunity[] {
  return opps
    .map((opp) => ({ opp, scored: scoreOpportunity(opp, profile) }))
    .sort((a, b) => {
      // Primary: score. Tiebreak: sooner open deadline first.
      if (b.scored.score !== a.scored.score) return b.scored.score - a.scored.score;
      const da = daysUntil(a.opp.registrationDeadline) ?? 9999;
      const db = daysUntil(b.opp.registrationDeadline) ?? 9999;
      const na = da < 0 ? 9999 : da;
      const nb = db < 0 ? 9999 : db;
      return na - nb;
    });
}

export const ACTION_META: Record<
  ActionType,
  { label: string; blurb: string }
> = {
  apply: { label: "Apply", blurb: "Register / submit before the deadline" },
  attend: { label: "Attend", blurb: "Show up, network, learn" },
  build: { label: "Build", blurb: "Ship a small project from this" },
  publish: { label: "Publish", blurb: "Turn it into content" },
  ignore: { label: "Ignore", blurb: "Not worth your time right now" },
};
