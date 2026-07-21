import { PageHeader } from "@/components/ui/PageHeader";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { profile } from "@/data/profile";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="Opportunities, matched to you"
        lede={`Hackathons, programs, grants and events — ranked by fit for ${profile.name.split(" ")[0]}, with days-left, which project to submit, and the content angle. Every item links to its official source.`}
      />
      <DashboardClient />
    </>
  );
}
