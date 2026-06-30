"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WorksSection } from "@/components/sections/WorksSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip text-white bg-ibda-bg">
      <div className="theme-grid fixed inset-0 z-0 pointer-events-none opacity-20" />
      <HeroSection />
      <ServicesGrid />
      <WorksSection />
      <StatsSection />
      <TechStackSection />
      <TestimonialSection />
      <CTASection />
    </main>
  );
}
