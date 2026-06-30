"use client";

import React from "react";
import { motion } from "framer-motion";
import { BRAND } from "@/constants/brand";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const principles = [
  {
    title: "Business first",
    line: "We start from the workflow, customer action, and launch constraint.",
    accent: "#D7B46A",
  },
  {
    title: "Mobile is core",
    line: "Customer apps and team tools are treated as first-class product surfaces.",
    accent: "#60E6D2",
  },
  {
    title: "AI where useful",
    line: "Automation is added where it reduces work, speeds response, or improves decisions.",
    accent: "#BDA7FF",
  },
  {
    title: "Handoff ready",
    line: "Access, docs, deployment, and walkthroughs are part of the build.",
    accent: "#F06A3D",
  },
];

const layers = ["Software", "AI", "Automation", "Mobile", "Web", "Dashboards"];

const delivery = [
  ["01", "Map", "Offer, users, workflow, constraints"],
  ["02", "Shape", "Screens, flows, data, automation"],
  ["03", "Build", "Frontend, backend, AI, integrations"],
  ["04", "Launch", "Testing, docs, handoff, next release"],
];

const AboutSystem = () => {
  return (
    <ScrollReveal direction="right" distance={54}>
      <div className="brand-card relative overflow-hidden rounded-[1.55rem] border border-white/[0.08] bg-[#0A0907] p-5 md:p-6">
        <div className="brand-texture opacity-[0.38]" aria-hidden="true" />
        <div className="relative z-10">
          <div className="mb-6 flex items-center justify-between border-b border-white/[0.07] pb-5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F06A3D]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#D7B46A]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#60E6D2]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/30">
              Ibda Dev Method
            </span>
          </div>

          <div className="grid gap-3">
            {delivery.map(([number, title, line], index) => (
              <motion.div
                key={title}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4"
              >
                <span
                  className="grid h-10 w-10 place-items-center rounded-xl text-xs font-black text-black"
                  style={{ backgroundColor: index === 0 ? "#D7B46A" : index === 1 ? "#60E6D2" : index === 2 ? "#BDA7FF" : "#F06A3D" }}
                >
                  {number}
                </span>
                <div>
                  <p className="font-display text-2xl font-black leading-none text-white">{title}</p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-white/46">{line}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {layers.map((layer) => (
              <span
                key={layer}
                className="rounded-full border border-white/[0.08] bg-black/40 px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.14em] text-white/42"
              >
                {layer}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ibda-bg px-6 pb-20 pt-28 text-white md:pt-32">
      <div className="brand-texture opacity-[0.48]" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <section className="grid items-center gap-12 pb-16 lg:grid-cols-[0.86fr_1.14fr] lg:pb-24">
          <ScrollReveal direction="left" distance={48}>
            <BrandLogo showTagline />
            <p className="mt-9 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">
              About Ibda Dev
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-black leading-[0.9] text-white md:text-7xl">
              We build the systems behind modern businesses.
            </h1>
            <p className="mt-7 max-w-2xl text-base font-semibold leading-relaxed text-white/58 md:text-xl">
              {BRAND.siteLine} We connect product design, engineering, AI, and operations into one launch-ready build.
            </p>
          </ScrollReveal>

          <AboutSystem />
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {principles.map((item, index) => (
            <ScrollReveal
              key={item.title}
              direction={index === 0 ? "left" : index === 3 ? "right" : "up"}
              distance={42}
            >
              <motion.article
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.24 }}
                className="brand-card h-full rounded-[1.25rem] border border-white/[0.08] bg-[#0D0C0A] p-6"
              >
                <span
                  className="mb-8 grid h-10 w-10 place-items-center rounded-xl text-xs font-black text-black"
                  style={{ backgroundColor: item.accent }}
                >
                  0{index + 1}
                </span>
                <h2 className="font-display text-3xl font-black leading-none text-white">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-white/50">
                  {item.line}
                </p>
              </motion.article>
            </ScrollReveal>
          ))}
        </section>

        <ScrollReveal distance={54} className="mt-16 md:mt-20">
          <section className="brand-card overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#080706] p-7 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">
                  What matters
                </p>
                <h2 className="mt-5 max-w-2xl font-display text-4xl font-black leading-[0.94] text-white md:text-6xl">
                  Clear scope. Real product. Calm handoff.
                </h2>
              </div>
              <p className="max-w-2xl text-base font-semibold leading-relaxed text-white/52">
                The goal is not more screens. The goal is a working digital system that customers understand, teams can operate, and the business can keep improving.
              </p>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </main>
  );
}
