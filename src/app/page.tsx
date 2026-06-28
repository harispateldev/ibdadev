"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WorksSection } from "@/components/sections/WorksSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip text-white bg-ibda-bg">
      <div className="theme-grid fixed inset-0 z-0 pointer-events-none opacity-40" />

      {/* Hero Section */}
      <HeroSection />

      {/* Partners Marquee */}
      <PartnersMarquee />

      {/* Services/Capabilities Grid */}
      <ServicesGrid />

      {/* Works Section (Horizontal Scroll) */}
      <WorksSection />

      {/* Impact/Stats Section */}
      <StatsSection />

      {/* Tech Stack Marquee */}
      <TechStackSection />

      {/* Testimonial Quote */}
      <TestimonialSection />

      {/* Final CTA Section */}
      <CTASection />

    </main>
  );
}
