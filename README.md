# Radar — Opportunity-to-Action Engine

One dashboard for **hackathons, dev programs, grants, events, AI releases and viral
projects** — matched to *you*, with days-left, which project to submit, and the
content angle. Built for Indian student developers who keep finding things *after*
registration closes.

> It doesn't just list opportunities. For each one it answers: **why it matches you,
> are you eligible, how many days are left, which of your projects to submit, what to
> prepare, and what GitHub/LinkedIn content to make** — then sorts it into
> **Apply · Attend · Build · Publish · Ignore**.

## Quickstart

```bash
npm install
npm run dev
# open http://localhost:3000
```

**No API keys needed** — the app runs entirely on verified seed data (`src/data/`).
Edit your profile in **Settings** and the whole app re-ranks instantly.

## Pages

| Page | What it does |
|------|--------------|
| **Dashboard** | Opportunities ranked by fit, with action chips, days-left, why-match, filters (city / online / category / tech), `.ics` export |
| **Trends** | AI model releases + viral builds, each with a content angle + weekend build idea |
| **Tracker** | Kanban across the 5 actions; every tracker field; prep/application status; drag or drop; `.ics` reminders (30/14/7/2-day) |
| **Playbook** | The full research: ranked platforms, official sources + exact alert to enable, free/₹500/custom automation, weekly routine, 20 traction plays, competitor matrix, startup analysis + verdict |
| **Settings** | Your skills/interests/cities/projects → drives scoring |

## How it works

- **Scoring** (`src/lib/scoring.ts`) — deterministic, explainable: interest/tech
  overlap + city boost + online boost + organizer prestige + deadline proximity →
  0–100 relevance + a reason string. The embedding-similarity tier layers on top later.
- **Action classifier** — maps category + score → Apply / Attend / Build / Publish / Ignore.
- **Deadlines** (`src/lib/dates.ts`) — days-left + urgency drive the whole UI.
- **Reminders** (`src/lib/ics.ts`) — generate an `.ics` with VALARMs at 30/14/7/2 days.
- **Confidence flags** — every seed item is `confirmed` or `verify` so facts and
  assumptions never blur.

## Live ingestion (optional)

```bash
npm run ingest:devpost   # fetches Devpost hackathons → data/ingested/devpost.json
```

- Tier-A sources (Devpost JSON, GitHub/HF/Product Hunt APIs, RSS) are safe to pull.
- Tier-B (Unstop, Devfolio, HackerEarth) = scrape-with-ToS-risk — see the Playbook's
  **Legal & scraping risks** section. Prefer official feeds/partnerships for a public build.
- The adapter dedups by a stable hash and fails soft (offline → app still works on seed data).

## Persistence (optional)

Create a free [Supabase](https://supabase.com) project, run
`supabase/migrations/0001_init.sql`, and set the vars in `.env.example`. Ingest
scripts will upsert into `opportunities` (deduped on `raw_hash`).

## Stack & cost

Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript · optional Supabase
(Postgres + pgvector). Deploys on Vercel Hobby + Supabase Free → **effectively ₹0**
until real scale.

## Roadmap (from the plan)

1. More live adapters (GitHub Releases, Hugging Face, Product Hunt, RSS).
2. LLM extraction (Haiku-tier) for messy Tier-B sources; embedding relevance.
3. Server-side accounts + cron ingestion; email/Telegram push.
4. Open-source it → then decide on SaaS (see the Playbook verdict).

---

Data verified **July 2026**. Re-check any `verify`-flagged dates on the official page
before you rely on them.
