import type { Opportunity, OppStatus } from "@/lib/types";
import { seedOpportunities } from "./opportunities";
import ingestedDevpost from "../../data/ingested/devpost.json";

// Shape written by scripts/ingest-devpost.ts.
interface IngestedItem {
  id: string;
  title: string;
  organizer: string;
  category: "hackathon";
  url: string;
  source: string;
  isOnline: boolean;
  city?: string;
  registrationDeadline?: string;
  eventDate?: string;
  prize?: string;
  techTags: string[];
  status: "open" | "upcoming" | "closed";
  confidence: "verify";
  rawHash: string;
}

function normalizeUrl(url: string): string {
  return url.trim().replace(/\/+$/, "").toLowerCase();
}

function toOpportunity(item: IngestedItem): Opportunity {
  const status: OppStatus = item.status === "closed" ? "closed" : item.status;
  return {
    id: item.id,
    title: item.title,
    organizer: item.organizer,
    category: item.category,
    description: "Live-ingested from Devpost — verify full details on the official page.",
    url: item.url,
    source: item.source,
    isOnline: item.isOnline,
    city: item.city,
    eligibility: "See official listing",
    cost: "See official listing",
    registrationDeadline: item.registrationDeadline,
    eventDate: item.eventDate,
    prize: item.prize,
    techTags: item.techTags,
    status,
    confidence: "verify",
    whyMatch: "Freshly discovered via live Devpost ingestion — matches your tracked interests.",
  };
}

const seedUrls = new Set(seedOpportunities.map((o) => normalizeUrl(o.url)));

const liveOnly = (ingestedDevpost as IngestedItem[])
  .filter((item) => !seedUrls.has(normalizeUrl(item.url)))
  .map(toOpportunity);

/** Curated seed opportunities + anything new the daily Devpost ingest found. */
export const allOpportunities: Opportunity[] = [...seedOpportunities, ...liveOnly];
