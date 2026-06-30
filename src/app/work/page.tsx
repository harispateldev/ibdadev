"use client";

import React from "react";
import { motion } from "framer-motion";
import { CTASection } from "@/components/sections/CTASection";
import { BRAND } from "@/constants/brand";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const slots = Array.from({ length: 6 });

const caseFormat = ["Problem", "System", "Screens", "Outcome"];

const EmptyProjectSlot = ({ index }: { index: number }) => {
  return (
    <ScrollReveal
      direction={index % 3 === 0 ? "left" : index % 3 === 2 ? "right" : "up"}
      distance={46}
    >
      <motion.article
        whileHover={{ y: -7, scale: 1.01 }}
        transition={{ duration: 0.24 }}
        aria-label="Empty real project slot"
        className="brand-card group min-h-[360px] overflow-hidden rounded-[1.4rem] border border-white/[0.08] bg-[#0B0A08] p-5"
      >
        <div className="relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-[1rem] border border-dashed border-white/[0.12] bg-[#050505]/70 p-5">
          <div className="brand-texture opacity-[0.26]" aria-hidden="true" />
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-ibda-gold/70">
              Real project slot
            </span>
            <span className="h-2 w-2 rounded-full bg-white/18 transition-colors group-hover:bg-ibda-gold" />
          </div>

          <div className="relative z-10 mt-auto">
            <div className="mb-6 h-24 rounded-2xl border border-white/[0.07] bg-white/[0.025]" />
            <div className="grid gap-2">
              <span className="h-3 w-2/3 rounded-full bg-white/[0.10]" />
              <span className="h-3 w-1/2 rounded-full bg-white/[0.06]" />
            </div>
          </div>
        </div>
      </motion.article>
    </ScrollReveal>
  );
};

export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#050505] pt-28 text-white md:pt-32">
      <div className="brand-texture opacity-[0.44]" aria-hidden="true" />

      <section className="container relative z-10 mx-auto max-w-7xl px-6 pb-14 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <ScrollReveal direction="left" distance={50}>
            <BrandLogo showTagline />
            <p className="mt-9 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">
              Work
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-black leading-[0.9] text-white md:text-7xl">
              Real projects will live here.
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="right" distance={50}>
            <p className="max-w-2xl text-base font-semibold leading-relaxed text-white/56 md:text-xl">
              {BRAND.name} will only show actual client work, real product surfaces, and honest outcomes here. No fake case studies.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="container relative z-10 mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {slots.map((_, index) => (
            <EmptyProjectSlot key={index} index={index} />
          ))}
        </div>
      </section>

      <ScrollReveal className="container relative z-10 mx-auto max-w-7xl px-6 pb-24" distance={54}>
        <section className="brand-card rounded-[1.5rem] border border-white/[0.08] bg-[#0A0907] p-7 md:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">
                Case format
              </p>
              <h2 className="mt-5 max-w-xl font-display text-4xl font-black leading-[0.94] text-white md:text-5xl">
                Only real proof gets published.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-4">
              {caseFormat.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-5 text-center text-xs font-black uppercase tracking-[0.14em] text-white/52"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <CTASection />
    </main>
  );
}
