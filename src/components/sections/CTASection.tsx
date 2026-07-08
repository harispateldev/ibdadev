"use client";

import React from "react";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { BRAND } from "@/constants/brand";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const CTASection = () => {
  return (
    <section id="start-project" className="relative overflow-hidden border-t border-white/[0.08] bg-[#050505] px-6 py-20 md:py-28">
      <div className="brand-texture opacity-[0.5]" aria-hidden="true" />
      <div className="absolute inset-0 z-0 theme-grid opacity-25" />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="text-center" distance={58}>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">
            {BRAND.tagline}
          </p>
          <h2 className="mx-auto max-w-5xl font-display text-5xl font-black leading-[0.88] text-white md:text-7xl lg:text-8xl">
            Bring the business problem. We’ll make it work beautifully.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base font-semibold leading-relaxed text-white/56 md:text-lg">
            Tell us what needs to improve. We’ll shape the software, AI product, mobile app, automation, and launch plan around it.
          </p>

          <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.025] py-2">
            <div className="motion-marquee flex w-max gap-2">
              {[
                "Mobile apps",
                "Web platforms",
                "AI systems",
                "Dashboards",
                "Commerce",
                "Automation",
                "SaaS portals",
                "Business tools",
                "Mobile apps",
                "Web platforms",
                "AI systems",
                "Dashboards",
                "Commerce",
                "Automation",
                "SaaS portals",
                "Business tools",
              ].map((item, index) => (
                <span key={`${item}-${index}`} className="px-4 text-[10px] font-black uppercase tracking-[0.18em] text-white/36">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticWrapper>
              <a
                href="/contact#project-intake"
                className="sheen-surface inline-flex rounded-full px-9 py-4 text-sm font-black uppercase tracking-[0.1em] text-white/62 shadow-[0_20px_60px_rgba(215,180,106,0.24)] transition-all hover:text-white"
              >
                Start a project
              </a>
            </MagneticWrapper>
            <a
              href="/work"
              className="inline-flex rounded-full border border-white/12 px-8 py-4 text-sm font-black uppercase tracking-[0.1em] text-white/62 transition-colors hover:border-white/26 hover:text-white"
            >
              See work
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
