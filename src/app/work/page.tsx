"use client";

import React from "react";
import { motion } from "framer-motion";
import { WorkCard } from "../../components/ui/WorkCard";
import { WorkMarquee } from "@/components/sections/WorkMarquee";
import { ImageMarquee } from "@/components/sections/ImageMarquee";
import { CTASection } from "@/components/sections/CTASection";
import { FooterSection } from "@/components/sections/FooterSection";

import { COLOR } from "@/constants/colors";

const projects = [
  {
    title: "Nublink",
    category: "Identity / UI / UX",
    desc: "A high-performance analytics platform for the next generation of SaaS.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
    colors: COLOR.PROJECT_1,
  },
  {
    title: "Project Sentinel",
    category: "Branding / 3D",
    desc: "Securing the future of digital assets with a bold, technical identity.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    colors: COLOR.PROJECT_2,
  },
  {
    title: "Aether Ecosystem",
    category: "Web3 / Strategy",
    desc: "Unified design system for a decentralized world.",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=1200&q=80",
    colors: COLOR.PROJECT_3,
  },
  {
    title: "Chronos AI",
    category: "Product / AI",
    desc: "Intelligence reimagined with a sleek, predictive interface.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    colors: COLOR.PROJECT_4,
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-refract-bg text-white overflow-x-hidden pt-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-32 pt-20 flex flex-col items-center text-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60 mb-8 w-fit"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-refract-orange animate-pulse" />
          2 more Q1 spots available
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-4xl flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase leading-[0.9]">
            Recent <br /> 
            <span className="text-white/40 italic">Works</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-medium max-w-2xl mb-12">
            Let’s discuss scope, timing, and fit. We collaborate with industry leaders 
            to define the next standard of digital excellence.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button className="px-10 py-5 bg-refract-orange text-white rounded-full font-black text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,94,40,0.2)]">
              Work With Us
            </button>
            <button className="flex items-center gap-2 text-white hover:text-refract-orange transition-colors group text-lg">
              Explore our services
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Visual Impact: Dual Marquees immediately after Hero */}
      <ImageMarquee speed={30} />
      <ImageMarquee reverse speed={35} />

      {/* Large Text Marquee (Section Divider) */}
      <WorkMarquee text="RECENT WORKS" />

      {/* Projects Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {projects.map((project, i) => (
            <WorkCard key={i} {...project} index={i} />
          ))}
        </div>
      </section>

      {/* Cinematic Marquee CTA Background Effect */}
      <WorkMarquee text="LET'S TALK SCOPE" />

      {/* Footer CTA */}
      <CTASection />
    </main>
  );
}
