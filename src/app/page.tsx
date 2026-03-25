"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WorksSection } from "@/components/sections/WorksSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { COLOR } from "@/constants/colors";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CTASection } from "@/components/sections/CTASection";
import { FooterSection } from "@/components/sections/FooterSection";
import { ScrollScene } from "@/components/scenes/ScrollScene";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function Home() {
  // Sync scroll progress with Zustand store
  useScrollProgress();

  return (
    <main className="relative min-h-screen text-white overflow-x-hidden bg-refract-bg">
      {/* 3D Scene Background Layer */}
      <ScrollScene />

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
