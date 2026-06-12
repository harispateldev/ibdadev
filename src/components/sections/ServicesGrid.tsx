"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Capability = {
  title: string;
  move: string;
  result: string;
  description: string;
  outcome: string;
  mark: string;
  color: string;
  glow: string;
  path: string;
};

const capabilities: Capability[] = [
  {
    title: "Website",
    move: "Launch",
    result: "Live",
    description: "High-performance site built for speed, trust, and conversions.",
    outcome: "Rank higher. Convert visitors. Win on first impression.",
    mark: "01",
    color: "#D7B46A",
    glow: "rgba(215,180,106,0.28)",
    path: "M28 92 C100 24 188 28 250 104",
  },
  {
    title: "Leads",
    move: "Convert",
    result: "Pipeline",
    description: "AI-powered funnels, forms, and outreach that fill your calendar.",
    outcome: "Turn traffic into booked calls and qualified deals.",
    mark: "02",
    color: "#60E6D2",
    glow: "rgba(96,230,210,0.24)",
    path: "M28 116 C102 68 190 70 252 112",
  },
  {
    title: "Apps",
    move: "Operate",
    result: "Built",
    description: "Custom web and mobile apps built around your exact workflow.",
    outcome: "Replace spreadsheets and manual steps with tools that scale.",
    mark: "03",
    color: "#8E7CFF",
    glow: "rgba(142,124,255,0.24)",
    path: "M28 140 C104 192 190 188 252 124",
  },
  {
    title: "AI Ops",
    move: "Automate",
    result: "Automated",
    description: "Automate repetitive tasks, data flows, and team operations.",
    outcome: "Get more done with fewer people and zero manual errors.",
    mark: "04",
    color: "#F06A3D",
    glow: "rgba(240,106,61,0.22)",
    path: "M28 164 C96 230 206 218 252 144",
  },
];

const SignalMap = ({ active }: { active: number }) => {
  const shouldReduceMotion = useReducedMotion();
  const current = capabilities[active];

  return (
    <div className="relative min-h-[460px] overflow-hidden rounded-xl bg-[#0D0C0A] p-7 shadow-[0_34px_110px_rgba(0,0,0,0.38)] md:min-h-[520px] md:p-9">
      <div
        className="absolute inset-0 opacity-80 services-glow"
        style={{ background: `radial-gradient(circle at 54% 45%, ${current.glow}, transparent 18rem)` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:52px_52px] opacity-35" />

      <div className="relative z-10 flex h-full min-h-[400px] flex-col justify-between md:min-h-[448px]">
        <div className="flex items-start justify-between">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/34">Business map</p>
          <p className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: current.color }}>
            {current.move}
          </p>
        </div>

        <div className="relative mx-auto my-8 h-56 w-full max-w-[520px] md:h-64">
          <svg viewBox="0 0 280 250" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            {capabilities.map((item, index) => (
              <motion.path
                key={index === active ? `active-${item.title}` : item.title}
                d={item.path}
                fill="none"
                stroke={index === active ? item.color : "rgba(255,255,255,0.13)"}
                strokeWidth={index === active ? 4 : 1.6}
                strokeLinecap="round"
                initial={index === active ? { pathLength: 0, opacity: 0 } : false}
                animate={{
                  pathLength: 1,
                  opacity: index === active ? 1 : 0.42,
                }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
            ))}
          </svg>

          <motion.div
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.04, 1] }}
            transition={shouldReduceMotion ? undefined : { duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#080706] text-center shadow-[0_24px_80px_rgba(0,0,0,0.52),inset_0_0_0_1px_rgba(255,255,255,0.12)]"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/34">IbdaDev</span>
            <span className="text-lg font-black uppercase leading-none" style={{ color: current.color }}>
              {current.result}
            </span>
          </motion.div>

          {capabilities.map((item, index) => {
            const positions = [
              "left-0 top-[26%]",
              "right-0 top-[30%]",
              "left-[8%] bottom-[2%]",
              "right-[10%] bottom-[4%]",
            ];
            return (
              <span
                key={item.title}
                className={`absolute ${positions[index]} grid h-16 w-16 place-items-center rounded-full bg-black/42 text-[10px] font-black uppercase tracking-[0.12em] text-white/54 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-colors md:h-20 md:w-20`}
                style={{
                  color: index === active ? item.color : undefined,
                  boxShadow: index === active ? `0 0 46px ${item.glow}, inset 0 1px 0 rgba(255,255,255,0.12)` : undefined,
                }}
                aria-hidden="true"
              >
                {item.title}
              </span>
            );
          })}
        </div>

        <div>
          <div className="flex items-end justify-between gap-4">
            <motion.h3
              key={current.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="text-5xl font-black uppercase leading-none tracking-normal md:text-7xl"
            >
              {current.title}
            </motion.h3>
            <span className="text-8xl font-black leading-none text-white/[0.055] md:text-9xl">{current.mark}</span>
          </div>
          <motion.p
            key={`desc-${current.title}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            className="mt-3 text-sm font-medium leading-relaxed text-white/54"
          >
            {current.description}
          </motion.p>
          <motion.p
            key={`outcome-${current.title}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.08 }}
            className="mt-2 text-xs font-black uppercase tracking-[0.14em]"
            style={{ color: current.color }}
          >
            {current.outcome}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export const ServicesGrid = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative overflow-hidden bg-ibda-bg px-6 py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">What we build</p>
            <h2 className="max-w-4xl text-5xl font-black leading-[0.9] tracking-normal md:text-7xl lg:text-8xl">
              Four services. One system.
            </h2>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full border border-[#D7B46A]/40 px-6 py-3 text-sm font-bold text-[#D7B46A] transition-all duration-300 hover:border-[#D7B46A] hover:bg-[#D7B46A]/10"
          >
            Scope a build →
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.72fr_0.98fr] lg:items-stretch">
          <div className="grid gap-0 divide-y divide-white/[0.08]">
            {capabilities.map((item, index) => {
              const isActive = active === index;
              return (
                <motion.button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.38, delay: index * 0.06 }}
                  className={`group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 border-l-2 py-7 pl-3 text-left outline-none transition-all duration-300 md:grid-cols-[4rem_1fr_auto] md:py-8 ${isActive ? "border-current" : "border-transparent"}`}
                  style={{ color: isActive ? item.color : undefined }}
                >
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white/26">{item.mark}</span>
                  <span
                    className="text-4xl font-black uppercase leading-none tracking-normal transition-all duration-300 group-hover:translate-x-1 md:text-6xl"
                    style={{ color: isActive ? item.color : "rgba(255,255,255,0.72)" }}
                  >
                    {item.title}
                  </span>
                  <span
                    className="text-xs font-black uppercase tracking-[0.18em] transition-colors"
                    style={{ color: isActive ? item.color : "rgba(255,255,255,0.24)" }}
                  >
                    {item.move}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <SignalMap active={active} />
        </div>
      </div>
    </section>
  );
};
