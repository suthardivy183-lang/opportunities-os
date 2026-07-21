import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProfileProvider } from "@/lib/profile-store";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "Radar — Opportunity-to-Action Engine",
  description:
    "One dashboard for hackathons, dev programs, grants, events, AI releases and viral projects — matched to you, with deadlines and content angles.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ProfileProvider>
          <div className="mx-auto flex min-h-screen w-full max-w-[1400px] flex-col lg:flex-row">
            <Sidebar />
            <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12">
              {children}
            </main>
          </div>
        </ProfileProvider>
      </body>
    </html>
  );
}
