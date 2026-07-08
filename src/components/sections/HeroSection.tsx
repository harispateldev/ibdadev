"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BRAND } from "@/constants/brand";
import { BrandMark } from "@/components/ui/BrandLogo";

const buildStages = [
  {
    step: "01",
    title: "Brief",
    line: "Business input",
    accent: "#D7B46A",
    className: "left-0 top-8 md:top-16",
  },
  {
    step: "02",
    title: "Shape",
    line: "Product logic",
    accent: "#60E6D2",
    className: "right-0 top-[38%]",
  },
  {
    step: "03",
    title: "Build",
    line: "Working release",
    accent: "#F06A3D",
    className: "left-5 bottom-8 md:left-14 md:bottom-12",
  },
];

const capabilityRing = ["Software", "AI", "Automation", "Mobile", "Dashboards"];
const agencyMoves = ["Strategy", "Product UX", "Engineering"];

const HeroBuildEngine = () => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.72, delay: 0.18, ease: "easeOut" }}
      className="relative mx-auto min-h-[430px] w-full max-w-[700px] lg:mx-0 lg:min-h-[620px]"
      aria-label="Ibda Dev build engine: business input becomes a product plan and working system"
    >
      <div className="absolute inset-0 rounded-[2.25rem] bg-[radial-gradient(circle_at_50%_46%,rgba(215,180,106,0.18),transparent_18rem),radial-gradient(circle_at_78%_36%,rgba(96,230,210,0.11),transparent_16rem)]" />
      <div className="absolute inset-6 rounded-[2rem] border border-white/[0.08] bg-black/[0.06] opacity-90 md:inset-8" />
      <div className="absolute left-6 right-6 top-7 flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] text-white/24 md:left-10 md:right-10">
        <span>Business input</span>
        <span>Working system</span>
      </div>
      <div className="absolute inset-x-16 top-1/2 h-px bg-gradient-to-r from-transparent via-[#D7B46A]/28 to-transparent" />
      <div className="absolute inset-y-14 left-1/2 w-px bg-gradient-to-b from-transparent via-white/12 to-transparent" />
      <div className="absolute left-[18%] top-[19%] h-2 w-2 rounded-full bg-[#D7B46A] shadow-[0_0_30px_rgba(215,180,106,0.55)]" />
      <div className="absolute right-[18%] top-[58%] h-2 w-2 rounded-full bg-[#60E6D2] shadow-[0_0_30px_rgba(96,230,210,0.5)]" />
      <div className="absolute bottom-[19%] left-[28%] h-2 w-2 rounded-full bg-[#F06A3D] shadow-[0_0_30px_rgba(240,106,61,0.45)]" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 700 620" fill="none" aria-hidden="true">
        <motion.path
          d="M138 124C226 132 268 214 334 286"
          stroke="url(#heroGold)"
          strokeWidth="1.5"
          strokeDasharray="8 10"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.45, ease: "easeOut" }}
        />
        <motion.path
          d="M560 268C482 260 422 284 362 306"
          stroke="url(#heroCyan)"
          strokeWidth="1.5"
          strokeDasharray="8 10"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        />
        <motion.path
          d="M170 500C250 438 292 388 334 334"
          stroke="url(#heroEmber)"
          strokeWidth="1.5"
          strokeDasharray="8 10"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.75, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="heroGold" x1="138" y1="124" x2="334" y2="286" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D7B46A" stopOpacity="0" />
            <stop offset="1" stopColor="#D7B46A" />
          </linearGradient>
          <linearGradient id="heroCyan" x1="560" y1="268" x2="362" y2="306" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60E6D2" stopOpacity="0" />
            <stop offset="1" stopColor="#60E6D2" />
          </linearGradient>
          <linearGradient id="heroEmber" x1="170" y1="500" x2="334" y2="334" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F06A3D" stopOpacity="0" />
            <stop offset="1" stopColor="#F06A3D" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.82, rotate: -2 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 grid h-40 w-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#D7B46A]/20 bg-black/45 shadow-[0_0_100px_rgba(215,180,106,0.16)] md:h-56 md:w-56"
      >
        <span className="absolute inset-4 rounded-full border border-white/[0.06]" />
        <span className="h-24 w-20 md:h-36 md:w-32">
          <BrandMark priority className="drop-shadow-[0_24px_42px_rgba(0,0,0,0.48)]" />
        </span>
        <span className="absolute -bottom-10 rounded-full border border-white/[0.08] bg-black/34 px-4 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-white/36">
          Ibda build core
        </span>
      </motion.div>

      {buildStages.map((stage, index) => (
        <motion.div
          key={stage.title}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.48 + index * 0.12 }}
          className={`absolute w-[10.8rem] rounded-2xl border border-white/[0.12] bg-[#070706]/95 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur md:w-[12.5rem] ${stage.className}`}
        >
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: stage.accent }}>
              {stage.step}
            </span>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: stage.accent }} />
          </div>
          <p className="font-display text-xl font-black leading-none text-white md:text-2xl">
            {stage.title}
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/48">
            {stage.line}
          </p>
        </motion.div>
      ))}

      <div className="absolute bottom-0 right-0 hidden max-w-[26rem] flex-wrap justify-end gap-2 md:flex">
        {capabilityRing.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/[0.10] bg-black/24 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/50"
          >
            {item}
          </span>
        ))}
      </div>

      <p className="absolute right-2 top-14 text-[10px] font-black uppercase tracking-[0.24em] text-white/24 md:right-8">
        Build engine
      </p>

      <div className="absolute inset-x-0 bottom-16 mx-auto h-24 max-w-md bg-[#D7B46A]/10 blur-[90px]" aria-hidden="true" />
    </motion.div>
  );
};

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden px-6 pb-14 pt-28 md:pb-20 md:pt-32">
      <div className="brand-texture opacity-[0.55]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ibda-gold/40 to-transparent" />

      <div className="container relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-7"
          >
            <div className="inline-flex items-center rounded-full border border-[#D7B46A]/18 bg-[#D7B46A]/8 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#D7B46A]">
              {BRAND.name}
              <span className="mx-3 h-1 w-1 rounded-full bg-[#D7B46A]/70" aria-hidden="true" />
              <span className="text-white/46">
                Product engineering studio
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.04 }}
            className="mb-6 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold"
          >
            {BRAND.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.64, delay: 0.08 }}
            className="font-display text-4xl font-black leading-[0.9] tracking-normal text-white sm:text-5xl md:text-6xl xl:text-7xl"
          >
            Business problems, shaped into working systems.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.2 }}
            className="mt-6 max-w-xl text-base font-semibold leading-relaxed text-white/68 md:text-lg"
          >
            We map the workflow, design the product surface, and build the software, AI, automation, mobile, dashboard, and web systems behind it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.26 }}
            className="mt-7 grid max-w-xl grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035]"
          >
            {agencyMoves.map((move, index) => (
              <div key={move} className="border-r border-white/[0.08] px-4 py-3 last:border-r-0">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/26">
                  0{index + 1}
                </p>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-white/74">
                  {move}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="/contact#project-intake"
              className="rounded-full bg-[#D7B46A] px-7 py-4 text-sm font-black uppercase tracking-[0.08em] text-[#050505] shadow-[0_20px_60px_rgba(215,180,106,0.24)] transition-all hover:-translate-y-0.5 hover:brightness-110"
            >
              Start a project
            </a>
            <a
              href="#selected-systems"
              className="group inline-flex items-center gap-3 py-4 text-sm font-black uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-white"
            >
              See the work
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>

        <HeroBuildEngine />
      </div>
    </section>
  );
};
