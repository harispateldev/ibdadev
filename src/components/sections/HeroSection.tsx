"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BRAND } from "@/constants/brand";
import { BrandLogo } from "@/components/ui/BrandLogo";

const signalRows = [
  ["Mobile booking", "Synced", "Live"],
  ["New inquiry", "Qualified", "2 min"],
  ["Payment flow", "Ready", "99.9%"],
];

const buildTypes = ["Mobile", "Web", "AI", "SaaS", "Automation", "Dashboards"];

const ProductShowcase = () => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28, rotateX: 4 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.72, delay: 0.18, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-[720px] lg:mx-0"
      aria-label="Preview of business systems built by Ibda Dev"
    >
      <div className="absolute -inset-4 rounded-[2rem] border border-[#D7B46A]/10 bg-[#D7B46A]/[0.035] blur-2xl" aria-hidden="true" />

      <div className="animate-float-small relative overflow-hidden rounded-[1.55rem] border border-white/12 bg-[#0A0A08] shadow-[0_42px_140px_rgba(0,0,0,0.48)]">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F06A3D]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#D7B46A]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#60E6D2]" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35">
            Ibda Dev OS
          </span>
        </div>

        <div className="grid gap-0 lg:grid-cols-[0.58fr_0.42fr]">
          <div className="min-h-[430px] border-b border-white/10 p-5 lg:border-b-0 lg:border-r lg:border-white/10 md:p-7">
            <div className="rounded-2xl border border-white/10 bg-[#10100D] p-5">
              <div className="mb-7 flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D7B46A]">
                    Business command
                  </p>
                  <h3 className="mt-3 max-w-[12ch] font-display text-4xl font-black leading-[0.92] text-white md:text-5xl">
                    Mobile to market.
                  </h3>
                </div>
                <span className="live-pulse rounded-full bg-[#60E6D2] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-black">
                  Live
                </span>
              </div>

              <div className="grid gap-3">
                {signalRows.map(([name, state, value], index) => (
                  <motion.div
                    key={name}
                    initial={reduceMotion ? false : { opacity: 0, x: 14 }}
                    animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.38, delay: 0.38 + index * 0.08 }}
                    className="motion-progress grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-xl border border-white/[0.07] bg-black/30 px-4 py-3"
                  >
                    <span className="text-sm font-bold text-white/78">{name}</span>
                    <span className="rounded-full bg-white/[0.07] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white/46">
                      {state}
                    </span>
                    <span className="text-sm font-black text-[#D7B46A]">{value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                ["12", "Products"],
                ["3", "Continents"],
                ["100%", "Handoff"],
              ].map(([stat, label]) => (
                <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.035] p-4">
                  <p className="font-display text-3xl font-black leading-none text-white">{stat}</p>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/36">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 md:p-7">
            <div className="mb-5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
                What clients get
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/58">
                One connected solution across mobile, web, AI, and operations.
              </p>
            </div>

            <div className="mb-4 rounded-[1.4rem] border border-white/[0.08] bg-[#050505] p-3">
              <div className="animate-float mx-auto max-w-[168px] rounded-[1.35rem] border border-white/12 bg-[#10100D] p-2 shadow-[0_22px_70px_rgba(0,0,0,0.38)]">
                <div className="rounded-[1.15rem] bg-[#070706] p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="h-1.5 w-8 rounded-full bg-white/20" />
                    <span className="rounded-full bg-[#60E6D2] px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-black">
                      App
                    </span>
                  </div>
                  <div className="sheen-surface rounded-xl p-3 text-black">
                    <p className="text-[9px] font-black uppercase tracking-[0.14em] text-black/55">
                      Today
                    </p>
                    <p className="mt-2 font-display text-2xl font-black leading-none">
                      18 orders
                    </p>
                  </div>
                  <div className="mt-3 grid gap-2">
                    <span className="h-7 rounded-xl bg-white/[0.08]" />
                    <span className="h-7 rounded-xl bg-white/[0.08]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {buildTypes.map((item, index) => (
                <motion.div
                  key={item}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, delay: 0.48 + index * 0.06 }}
                  className="group flex min-h-12 items-center justify-between rounded-xl border border-white/[0.07] bg-[#11100D] px-3 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D7B46A]/30 hover:bg-[#16130E]"
                >
                  <span className="text-xs font-black text-white/78">{item}</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.12em] text-[#D7B46A]/60">
                    0{index + 1}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
            <BrandLogo showTagline />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.04 }}
            className="mb-6 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold"
          >
            Premium software and AI solutions
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.64, delay: 0.08 }}
            className="font-display text-4xl font-black leading-[0.9] tracking-normal text-white sm:text-5xl md:text-6xl xl:text-7xl"
          >
            {BRAND.heroLine}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.2 }}
            className="mt-6 max-w-xl text-base font-semibold leading-relaxed text-white/68 md:text-lg"
          >
            {BRAND.siteLine} Across mobile apps, web platforms, SaaS, dashboards, commerce, and connected operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="/work#start-project"
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

        <ProductShowcase />
      </div>
    </section>
  );
};
