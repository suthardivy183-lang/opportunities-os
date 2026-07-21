"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { profile as seedProfile } from "@/data/profile";
import type { Profile } from "@/lib/types";

const KEY = "radar-profile-v1";

interface Ctx {
  profile: Profile;
  setProfile: (p: Profile) => void;
  reset: () => void;
}

const ProfileContext = createContext<Ctx | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  // Start from the seed so server and first client render agree (no hydration mismatch);
  // hydrate any saved profile after mount.
  const [profile, setProfileState] = useState<Profile>(seedProfile);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setProfileState(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(profile));
  }, [profile, loaded]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile: setProfileState,
        reset: () => setProfileState(seedProfile),
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile(): Ctx {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
