import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustSection } from "@/components/landing/trust-section";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Empower Your Future Through Smart Learning`,
  description:
    "Learn from industry experts, track your progress, and gain real-world skills with an interactive online learning experience.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
      </main>
    </>
  );
}
