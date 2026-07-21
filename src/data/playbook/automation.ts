import type { AutomationStack } from "./types";

// Three concrete pipelines. Each collects from many sources into one place with
// deadline reminders. Pick by budget; you can graduate from free → Radar over time.

export const automationStacks: AutomationStack[] = [
  {
    tier: "1 · Completely free",
    cost: "₹0 / month",
    stack: [
      "Inoreader Free (or Feedly Free) as the hub",
      "RSS: every framework's releases.atom + AI-lab blogs + Devpost tag feeds",
      "Google Alerts (RSS output) for keywords",
      "Gmail filters + labels for newsletters",
      "Google Calendar for deadlines",
      "1–2 Telegram channels (WeMakeDevs, a hackathon channel)",
    ],
    steps: [
      "Create an Inoreader account; make folders: Hackathons, AI-Releases, Frameworks, Events, India.",
      "Add feeds: github.com/<owner>/<repo>/releases.atom for React/Next/Node/Swift; AI-lab blog RSS from the Sources tab.",
      "Create Google Alerts for: 'hackathon India students', 'Swift Student Challenge', '<your-city> developer meetup' → set delivery = RSS → subscribe those RSS URLs in Inoreader.",
      "In Gmail: filter from:(devpost.com OR unstop.com OR mlh.io) → apply label 'Opportunities', skip inbox.",
      "Each Sunday, triage the hub; add real deadlines to Google Calendar with 30/14/7/2-day reminders.",
    ],
    pros: "Zero cost, no code, covers ~90% of official sources.",
    cons: "Manual triage; no auto dedup/scoring; you still visit Unstop/Devfolio directly.",
  },
  {
    tier: "2 · Under ₹500 / month",
    cost: "~₹400–500 / month",
    stack: [
      "Inoreader Pro (rules, active search, dedupe, Telegram/webhook output)",
      "Make.com free tier OR n8n (self-host free) for one automation",
      "Notion or Airtable free as the dashboard/tracker",
      "Google Calendar + Gmail as before",
    ],
    steps: [
      "Upgrade Inoreader to Pro; turn on 'Active Search' for keywords like 'AI agent hackathon' across all feeds.",
      "Add a Rule: when an item matches your keywords → send to a Telegram channel + push to a webhook.",
      "In Make/n8n: webhook → parse → append row to a Notion/Airtable 'Opportunities' database (dedupe on URL).",
      "Add a formula field for days-left and a status select (Apply/Attend/Build/Publish/Ignore).",
      "Weekly: review the Notion board; the daily Telegram push handles time-sensitive items.",
    ],
    pros: "Near-real-time, deduped, one dashboard, still cheap and mostly no-code.",
    cons: "A little setup; Make/n8n free tiers have operation limits.",
  },
  {
    tier: "3 · Custom developer-built (this is Radar)",
    cost: "₹0 until scale (free tiers)",
    stack: [
      "Next.js + Supabase (Postgres + pgvector + cron)",
      "Source adapters: Devpost JSON, GitHub/HF/PH APIs, RSS, careful Unstop/Devfolio",
      "LLM (Haiku-tier) for deadline/eligibility extraction; embeddings for relevance",
      "Dedup + scoring + action classifier",
      "Dashboard + Tracker + .ics reminders",
    ],
    steps: [
      "Run the seed app (this repo) — it works with zero keys.",
      "Add SUPABASE_URL/KEY to persist; run the SQL migration.",
      "Enable adapters one at a time (start: `npm run ingest:devpost`).",
      "Add ANTHROPIC_API_KEY only when you want LLM extraction on messy sources.",
      "Schedule ingestion with a Supabase cron / Vercel cron every 6–12h.",
    ],
    pros: "Full control, personalized 'why + which project + content', your own product + portfolio piece.",
    cons: "You maintain the adapters; scraping Tier-B sources carries ToS risk (see Legal).",
  },
];

export const toolNotes = [
  { tool: "Inoreader vs Feedly", note: "Both great hubs. Inoreader's rules + Telegram/webhook output edge it for automation; Feedly's Leo AI is nicer for de-noising." },
  { tool: "Zapier vs Make vs n8n", note: "Zapier = easiest but priciest. Make = best free-tier value. n8n = self-host free + code nodes; best for a developer." },
  { tool: "IFTTT", note: "Fine for simple RSS→Telegram, but weak for multi-step/dedup. Outgrown quickly." },
  { tool: "Distill.io vs Visualping", note: "For pages with no RSS (Unstop category pages, program pages). Distill has a generous free tier + local option; Visualping is simpler." },
  { tool: "Notion vs Airtable vs Sheets", note: "Sheets = fastest + free API. Airtable = best relational + views. Notion = nicest to live in daily." },
];

export const legalNotes = [
  "Prefer official APIs / RSS / public JSON first (Devpost, GitHub, HF, Product Hunt) — clearly permitted.",
  "For Tier-B sources (Unstop, Devfolio, HackerEarth): check robots.txt + Terms; many prohibit scraping/republishing.",
  "Rate-limit, cache, and identify a User-Agent; never hammer endpoints.",
  "Store attribution + a link back to the source; don't re-host their full content.",
  "For a public product, get data via partnerships/official feeds where possible; personal-use tooling has more latitude but still respect ToS.",
  "Never put personal data in URLs; don't collect credentials.",
];
