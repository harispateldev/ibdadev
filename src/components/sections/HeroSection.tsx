"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { COLOR } from "@/constants/colors";

export const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center pt-20 overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-refract-orange animate-pulse" />
          2 more Q1 spots available
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9]"
        >
          Defining <br />
          <span className="text-white/40">Digital Identity</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl text-lg text-white/60 mb-10 leading-relaxed"
        >
          We merge the precision of code with the power of design, orchestrating a single identity that signals authority everywhere.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <Button variant="primary" className="px-8 py-4 text-base">
            Work With Us
          </Button>
          <button className="flex items-center gap-2 text-white hover:text-refract-orange transition-colors group">
            Explore our services
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </motion.div>
      </div>

      {/* Decorative vertical badge "Honors" or similar seen in screenshot */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 px-4 py-8 bg-white/5 border-l border-white/10 backdrop-blur-sm z-20">
        <span className="text-[10px] font-bold tracking-widest uppercase vertical-text">W.</span>
        <div className="w-px h-12 bg-white/10" />
        <span className="text-[10px] font-medium tracking-widest uppercase vertical-text text-white/40">Honors</span>
      </div>
    </section>
  );
};
