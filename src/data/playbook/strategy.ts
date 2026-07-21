import type { QA } from "./types";

// --- Weekly operating system ---------------------------------------------

export const dailyRoutine = [
  "Open Radar's Dashboard (2 min): scan new items sorted by score.",
  "Triage each into Apply / Attend / Build / Publish / Ignore (5 min).",
  "For anything 'Apply' with <14 days left, add the .ics reminder now (1 min).",
  "Star one Trend to act on this week (2 min).",
];

export const sundayRoutine = [
  "Review the week's captured items and clear the Ignore column (10 min).",
  "Pick 1 Apply, 1 Build, 1 Publish target for the week (10 min).",
  "Confirm deadlines on official pages for anything flagged 'verify' (10 min).",
  "Draft one piece of content from last week's Build (10 min).",
  "Set/verify 30-14-7-2 day reminders for all active deadlines (5 min).",
];

export const reminderCadence = [
  { at: "30 days", do: "Decide: in or out. If in, form/confirm your team." },
  { at: "14 days", do: "Lock the idea + pick which existing project to adapt." },
  { at: "7 days", do: "Build the core; draft the submission + README." },
  { at: "2 days", do: "Polish, record the demo, submit early. Draft the post." },
];

// --- Startup opportunity analysis ----------------------------------------

export const startupAnalysis: QA[] = [
  {
    q: "Is there a real market gap?",
    a: "Yes. Aggregators (Hackathon Radar, Eventio) list events but don't personalize; platforms (Unstop, Devpost) only show their own listings; readers (Inoreader) have no opportunity model. Nobody fuses aggregation + 'why it matches you + eligibility + which project + reminders + content angle'.",
  },
  {
    q: "Who are the target users?",
    a: "Primary: Indian student developers (Tier-1/2/3 campuses) chasing hackathons, GSoC/SSC, internships. Secondary: early founders + dev-creators who monetize being early to AI trends.",
  },
  {
    q: "Is there India demand?",
    a: "Strong. Unstop and Devfolio prove Indian students actively hunt opportunities; SIH mobilizes lakhs. The pain (missing deadlines across fragmented sources) is universal and loud on r/developersIndia.",
  },
  {
    q: "How would it monetize?",
    a: "Freemium: free discovery + basic reminders; Premium (~₹149–299/mo) for personalized matching, AI 'which project + draft submission', unlimited alerts, team features. B2B2C: campus/community partnerships; sponsored (clearly-labeled) opportunities.",
  },
  {
    q: "Free vs premium split?",
    a: "Free: aggregated feed, city/online filters, 3 tracked deadlines, weekly digest. Premium: full personalization + scoring, unlimited tracking, AI draft help, Telegram/WhatsApp push, calendar sync.",
  },
  {
    q: "Is data available? Legal/scraping risk?",
    a: "Mixed. Devpost/GitHub/HF/Product Hunt are API/RSS-friendly. Unstop/Devfolio/HackerEarth are scrape-with-ToS-risk — long term, pursue official feeds/partnerships. Personal-use tooling has latitude; a public SaaS must be careful (see Legal notes).",
  },
  {
    q: "What's the technical difficulty?",
    a: "Medium. Ingestion + dedup + extraction + scoring is very doable solo (this repo proves the shape). The hard part is source reliability + keeping data fresh, not the ML.",
  },
  {
    q: "What's defensible?",
    a: "Not the scraping. The moat is (1) the personalization/action graph per user, (2) a trusted, deduped, always-fresh India-first dataset, (3) community + habit (daily-open product), (4) the content/traction loop that makes users successful.",
  },
];

export const verdict = {
  headline: "Build a private personal dashboard first → open-source it → then decide on SaaS.",
  bullets: [
    "Start as a PERSONAL tool (this repo). It immediately solves your own problem and becomes portfolio + startup evidence — zero downside.",
    "OPEN-SOURCE it within a month. An India-first 'opportunity radar' repo attracts contributors, stars, and the exact users you'd sell to — huge GitHub/LinkedIn traction, and it doubles as GSoC-style credibility.",
    "Only graduate to a COMMERCIAL SaaS after you see real pull (people asking for logins, sharing it). Then the moat = personalization + a clean India dataset + partnerships, not scraping.",
    "Don't start as a funded startup on day one: data/ToS risk is real and defensibility comes from users + habit, which you can only earn by shipping the free/OSS version first.",
  ],
  reasoning:
    "The build cost is near-zero, the personal payoff is immediate, and each stage de-risks the next. Public/OSS traction is the cheapest possible validation and simultaneously advances every one of your stated goals (GitHub, LinkedIn, portfolio, startup evidence).",
};

// --- 48-hour action checklist --------------------------------------------

export const checklist48h = [
  "Verify DataHub Agent Hackathon (deadline 10 Aug) + register if in — it's the nearest high-fit item.",
  "Set up Inoreader (free) + add the framework releases.atom + AI-lab RSS from the Sources tab.",
  "Create 3 Google Alerts ('hackathon India students', 'Swift Student Challenge', 'Ahmedabad developer meetup') → RSS → into Inoreader.",
  "Add a Gmail filter: from Devpost/Unstop/MLH → label 'Opportunities', skip inbox.",
  "Follow GDG Ahmedabad on gdg.community.dev; RSVP the next event.",
  "Turn on Unstop alerts + complete your profile; watch for Flipkart GRiD / campus comps.",
  "Watch releases on facebook/react, vercel/next.js, apple/swift on GitHub.",
  "Run this app (`npm run dev`), edit your Profile + projects in Settings, export the .ics for your top 3 deadlines.",
  "Push this repo to GitHub (public) with a clean README — that's traction item #1.",
  "Pick ONE thing to Build this week from the Trends tab and schedule the post.",
];
