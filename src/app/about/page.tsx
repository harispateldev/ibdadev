"use client";

import React from "react";
import { motion } from "framer-motion";
import { TeamMemberCard } from "@/components/ui/TeamMemberCard";

import { CapabilitiesStacked } from "@/components/sections/CapabilitiesStacked";

const team = [
  {
    name: "Adam Guarino",
    role: "Co-Founder / Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    name: "Jake Young",
    role: "Co-Founder / Technical Lead",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    name: "Sarah Chen",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    name: "Marcus Thorne",
    role: "Lead 3D Developer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-refract-bg text-white overflow-x-hidden pt-20">
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-6 container mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black max-w-5xl leading-tight tracking-tighter"
        >
          Working with those who <span className="text-white/30 italic font-serif">set the standard.</span>
        </motion.h1>
      </section>

      {/* Statement Section */}
      <section className="py-20 px-6 bg-refract-surface/30 border-y border-white/5">
        <div className="container mx-auto">
           <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ duration: 1 }}
             className="text-4xl md:text-6xl font-medium max-w-6xl leading-snug"
           >
             The gap between <span className="text-white/40 italic">reality</span> and <span className="text-white/40 italic">perception</span> is where we live. We don't just bridge it—<span className="text-refract-orange italic font-black">we close it.</span>
           </motion.p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 container mx-auto">
        <h2 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-20">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <TeamMemberCard key={i} {...member} />
          ))}
        </div>
      </section>

      {/* Stacked Capabilities Section */}
      <CapabilitiesStacked />
    </main>
  );
}
