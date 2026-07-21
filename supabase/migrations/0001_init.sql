-- Radar schema. Optional: the app runs fully on seed data without this.
-- Apply with the Supabase CLI (`supabase db push`) or paste into the SQL editor.

create extension if not exists vector;

create table if not exists sources (
  id          bigint generated always as identity primary key,
  name        text not null,
  type        text not null check (type in ('api','rss','scrape')),
  url         text,
  tier        text check (tier in ('A','B')),
  enabled     boolean default true,
  last_run    timestamptz,
  status      text,
  created_at  timestamptz default now()
);

create table if not exists opportunities (
  id                    bigint generated always as identity primary key,
  raw_hash              text unique,                 -- dedup key
  source                text,
  title                 text not null,
  organizer             text,
  category              text check (category in ('hackathon','program','grant','conference','meetup','challenge')),
  description           text,
  url                   text,
  is_online             boolean default false,
  city                  text,
  country               text,
  eligibility           text,
  cost                  text,
  registration_deadline date,
  event_date            text,
  team_size             text,
  prize                 text,
  tech_tags             text[] default '{}',
  status                text default 'open',
  recurring             boolean default false,
  confidence            text default 'verify' check (confidence in ('confirmed','verify')),
  embedding             vector(1536),                -- optional, for similarity scoring
  created_at            timestamptz default now()
);
create index if not exists opportunities_deadline_idx on opportunities (registration_deadline);
create index if not exists opportunities_category_idx on opportunities (category);

create table if not exists trends (
  id          bigint generated always as identity primary key,
  raw_hash    text unique,
  kind        text check (kind in ('model','repo','tool','post','paper')),
  title       text not null,
  url         text,
  source      text,
  summary     text,
  metric      text,
  tags        text[] default '{}',
  embedding   vector(1536),
  created_at  timestamptz default now()
);

create table if not exists profiles (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  role        text,
  location    text,
  skills      text[] default '{}',
  interests   text[] default '{}',
  cities      text[] default '{}',
  goals       text[] default '{}',
  embedding   vector(1536),
  created_at  timestamptz default now()
);

-- Per-user scoring + action, plus the "action layer" narrative fields.
create table if not exists matches (
  id             bigint generated always as identity primary key,
  opportunity_id bigint references opportunities(id) on delete cascade,
  profile_id     uuid references profiles(id) on delete cascade,
  score          int check (score between 0 and 100),
  action         text check (action in ('apply','attend','build','publish','ignore')),
  why_match      text,
  which_project  text,
  prep_steps     text[],
  content_idea   text,
  created_at     timestamptz default now(),
  unique (opportunity_id, profile_id)
);

-- The tracker board with every requested field.
create table if not exists tracker (
  id                 bigint generated always as identity primary key,
  profile_id         uuid references profiles(id) on delete cascade,
  opportunity_id     bigint references opportunities(id) on delete cascade,
  action             text check (action in ('apply','attend','build','publish','ignore')),
  prep_status        text default 'not started',
  application_status text default 'not applied',
  relevant_project   text,
  content_opportunity text,
  github_opportunity  text,
  linkedin_opportunity text,
  startup_relevance   text,
  notes              text,
  updated_at         timestamptz default now(),
  unique (profile_id, opportunity_id)
);

create table if not exists reminders (
  id             bigint generated always as identity primary key,
  opportunity_id bigint references opportunities(id) on delete cascade,
  profile_id     uuid references profiles(id) on delete cascade,
  offset_days    int,                    -- 30 / 14 / 7 / 2
  channel        text default 'ics' check (channel in ('ics','email')),
  sent_at        timestamptz
);
