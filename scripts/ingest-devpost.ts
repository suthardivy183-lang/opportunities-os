/**
 * Live adapter: Devpost hackathons → normalized opportunities.
 *
 * Run: `npm run ingest:devpost`
 *
 * Devpost exposes a public JSON listing at https://devpost.com/api/hackathons.
 * This is Tier-A (machine-readable) but STILL verify their Terms before shipping
 * a public product. For personal use, rate-limit and cache (we fetch a few pages).
 *
 * Output: writes normalized items to data/ingested/devpost.json, deduped against
 * the seed set by a stable hash. If SUPABASE_URL + SUPABASE_SERVICE_KEY are set,
 * it also upserts into the `opportunities` table (optional).
 *
 * Zero third-party deps — uses Node 18+ global fetch. Fails soft: on any network
 * or shape error it logs and exits 0 so it never breaks a pipeline.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const OUT = resolve(process.cwd(), "data/ingested/devpost.json");
const PAGES = 3;
const UA = "RadarOpportunityBot/0.1 (personal use; contact: you@example.com)";

interface DevpostHackathon {
  id: number;
  title: string;
  url: string;
  open_state?: string;
  submission_period_dates?: string;
  displayed_location?: { location?: string };
  prize_amount?: string;
  themes?: { name: string }[];
}

interface NormalizedOpportunity {
  id: string;
  title: string;
  organizer: string;
  category: "hackathon";
  url: string;
  source: "Devpost";
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

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Stable dedup key: title + host. */
function hash(title: string, url: string): string {
  let host = url;
  try {
    host = new URL(url).host;
  } catch {
    /* keep raw */
  }
  const key = `${slug(title)}::${host}`;
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return `dp-${(h >>> 0).toString(36)}`;
}

const MONTHS: Record<string, string> = {
  jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
  jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12",
};

/** Pull a yyyy-mm-dd end date from Devpost's "Mar 01 - Aug 10, 2026" style string. */
function extractDeadline(dates?: string): string | undefined {
  if (!dates) return undefined;
  const year = dates.match(/\b(20\d{2})\b/)?.[1];
  if (!year) return undefined;
  // last "Mon DD" in the string is usually the submission close
  const matches = [...dates.matchAll(/([A-Za-z]{3})[a-z]*\s+(\d{1,2})/g)];
  const last = matches.at(-1);
  if (!last) return undefined;
  const mm = MONTHS[last[1].toLowerCase()];
  if (!mm) return undefined;
  return `${year}-${mm}-${last[2].padStart(2, "0")}`;
}

function normalize(h: DevpostHackathon): NormalizedOpportunity {
  const loc = h.displayed_location?.location ?? "";
  const isOnline = /online/i.test(loc) || loc === "";
  const deadline = extractDeadline(h.submission_period_dates);
  const status: NormalizedOpportunity["status"] =
    h.open_state === "open" ? "open" : h.open_state === "upcoming" ? "upcoming" : "closed";
  return {
    id: hash(h.title, h.url),
    title: h.title,
    organizer: "Devpost host",
    category: "hackathon",
    url: h.url,
    source: "Devpost",
    isOnline,
    city: isOnline ? undefined : loc,
    registrationDeadline: deadline,
    eventDate: h.submission_period_dates,
    prize: h.prize_amount?.replace(/<[^>]+>/g, "").trim() || undefined,
    techTags: (h.themes ?? []).map((t) => slug(t.name)).slice(0, 6),
    status,
    confidence: "verify",
    rawHash: hash(h.title, h.url),
  };
}

async function fetchPage(page: number): Promise<DevpostHackathon[]> {
  const url = `https://devpost.com/api/hackathons?page=${page}&order_by=deadline`;
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!res.ok) throw new Error(`Devpost ${res.status} on page ${page}`);
  const json = (await res.json()) as { hackathons?: DevpostHackathon[] };
  return json.hackathons ?? [];
}

async function main() {
  console.log("→ Fetching Devpost hackathons…");
  const all: DevpostHackathon[] = [];
  try {
    for (let p = 1; p <= PAGES; p++) {
      const items = await fetchPage(p);
      all.push(...items);
      await new Promise((r) => setTimeout(r, 800)); // be polite
    }
  } catch (err) {
    console.warn(`⚠︎  Live fetch failed (${(err as Error).message}). This is expected offline or if ToS-blocked.`);
    console.warn("   The app still runs fully on seed data. Nothing was written.");
    return;
  }

  // Dedup by hash.
  const seen = new Set<string>();
  const normalized = all
    .map(normalize)
    .filter((o) => (seen.has(o.rawHash) ? false : (seen.add(o.rawHash), true)));

  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(normalized, null, 2));
  console.log(`✓ Wrote ${normalized.length} deduped hackathons → ${OUT}`);

  // Optional: upsert into Supabase if configured.
  const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env;
  if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
    console.log("→ SUPABASE_* detected — upserting via REST…");
    const res = await fetch(`${SUPABASE_URL}/rest/v1/opportunities?on_conflict=raw_hash`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify(
        normalized.map((o) => ({
          raw_hash: o.rawHash,
          title: o.title,
          organizer: o.organizer,
          category: o.category,
          url: o.url,
          source: o.source,
          is_online: o.isOnline,
          city: o.city,
          registration_deadline: o.registrationDeadline,
          prize: o.prize,
          tech_tags: o.techTags,
          status: o.status,
          confidence: o.confidence,
        }))
      ),
    });
    console.log(res.ok ? "✓ Upserted to Supabase" : `⚠︎ Supabase upsert failed: ${res.status}`);
  } else {
    console.log("ℹ SUPABASE_* not set — skipped DB upsert (file output only).");
  }
}

main();
