import type { Profile } from "@/lib/types";

// Editable in Settings. Drives every relevance score and "why it matches you".
// Pre-filled from the founder's brief — tweak the projects to your real repos.
export const profile: Profile = {
  name: "Divy Suthar",
  role: "B.Tech CSE · full-stack + AI developer, aspiring founder",
  location: "Vadodara, Gujarat",
  skills: [
    "typescript", "react", "next.js", "node", "python", "swift", "ios",
    "postgres", "tailwind",
  ],
  interests: [
    "ai", "genai", "ai-agents", "fullstack", "swift", "ios",
    "open-source", "developer-tools", "accessibility", "social-impact",
    "startups", "cloud",
  ],
  cities: [
    "Vadodara", "Ahmedabad", "Surat", "Mumbai", "Pune", "Bengaluru", "Delhi NCR",
  ],
  projects: [
    {
      name: "Radar",
      blurb: "This opportunity-to-action engine — your flagship build.",
      tech: ["next.js", "supabase", "ai-agents", "typescript"],
    },
    {
      name: "(add your project)",
      blurb: "Swap these for your real repos so 'which project to submit' gets sharper.",
      tech: ["react", "ai"],
    },
  ],
  goals: [
    "Win a recognized hackathon",
    "Get into GSoC / Swift Student Challenge",
    "Grow GitHub + LinkedIn traction",
    "Find a startup wedge",
  ],
};
