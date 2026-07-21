"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProfile } from "@/lib/profile-store";

const NAV = [
  { href: "/", label: "Dashboard", icon: "M3 12l9-9 9 9M5 10v10h14V10", hint: "Matched opportunities" },
  { href: "/trends", label: "Trends", icon: "M3 17l6-6 4 4 8-8M14 7h7v7", hint: "AI releases + viral builds" },
  { href: "/tracker", label: "Tracker", icon: "M4 6h16M4 12h16M4 18h10", hint: "Apply · Attend · Build · Publish" },
  { href: "/playbook", label: "Playbook", icon: "M4 5a2 2 0 012-2h12v18H6a2 2 0 01-2-2z M8 3v18", hint: "Sources, automation, strategy" },
  { href: "/settings", label: "Settings", icon: "M12 15a3 3 0 100-6 3 3 0 000 6z M19 12a7 7 0 00-.1-1l2-1.5-2-3.4-2.3 1a7 7 0 00-1.7-1L14.5 2h-5l-.4 2.6a7 7 0 00-1.7 1l-2.3-1-2 3.4L2.9 11a7 7 0 000 2l-2 1.5 2 3.4 2.3-1a7 7 0 001.7 1l.4 2.6h5l.4-2.6a7 7 0 001.7-1l2.3 1 2-3.4-2-1.5a7 7 0 00.1-1z", hint: "Your profile drives scoring" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useProfile();

  return (
    <aside className="shrink-0 border-b border-border px-4 py-5 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r lg:sticky lg:top-0 lg:px-5 lg:py-7">
      <Link href="/" className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-accent-ink">
          <RadarGlyph />
        </span>
        <span>
          <span className="font-display text-lg leading-none">Radar</span>
          <span className="mono block text-[0.62rem] tracking-[0.2em] text-faint uppercase">
            opportunity engine
          </span>
        </span>
      </Link>

      <nav aria-label="Main navigation" className="mt-6 flex gap-1 overflow-x-auto lg:mt-8 lg:flex-col lg:overflow-visible">
        {NAV.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={active}
              className="nav-link shrink-0"
              aria-current={active ? "page" : undefined}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={item.icon} />
              </svg>
              <span className="flex flex-col">
                <span className="leading-tight">{item.label}</span>
                <span className="hidden text-[0.68rem] text-faint lg:block">{item.hint}</span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto hidden pt-8 lg:block">
        <div className="card p-3">
          <p className="mono text-[0.62rem] tracking-[0.16em] text-faint uppercase">Signed in as</p>
          <p className="mt-1 text-sm font-medium">{profile.name}</p>
          <p className="text-xs text-muted">{profile.location}</p>
        </div>
      </div>
    </aside>
  );
}

function RadarGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="9" opacity="0.5" />
      <circle cx="12" cy="12" r="4.5" opacity="0.8" />
      <path d="M12 12L18.5 7" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
