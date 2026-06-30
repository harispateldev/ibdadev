"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const scrollReveal = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const systems = [
  {
    title: "Senior-led",
    body: "Direct access to the people shaping the build.",
    signal: "Trust",
    accent: "#D7B46A",
    surface: "from-[rgba(215,180,106,0.18)] via-[#13110D] to-[#0D0C0A]",
  },
  {
    title: "First release clear",
    body: "The launch version is defined before we design deep.",
    signal: "Ship",
    accent: "#60E6D2",
    surface: "from-[rgba(96,230,210,0.16)] via-[#0D1412] to-[#0D0C0A]",
  },
  {
    title: "Built to keep running",
    body: "Automation, tracking, and handoff are part of the build.",
    signal: "Run",
    accent: "#F06A3D",
    surface: "from-[rgba(240,106,61,0.16)] via-[#170F0B] to-[#0D0C0A]",
  },
];

const roles = [
  ["Business", "Right problem", "#D7B46A"],
  ["Offer", "Clear value", "#60E6D2"],
  ["Workflow", "Less friction", "#8E7CFF"],
  ["Interface", "Premium feel", "#D7B46A"],
  ["Speed", "Fast pages", "#60E6D2"],
  ["AI fit", "Useful automation", "#8E7CFF"],
  ["Handoff", "Team-ready", "#F06A3D"],
];

const problemSignals = ["Lost leads", "Manual work", "Scattered tools"];
const shippedSignals = ["AI tool", "Dashboard", "Web app", "Automation"];

const HeroStory = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div {...reveal(0.18)} className="relative min-h-[430px] w-full [perspective:1200px] md:min-h-[500px] lg:min-h-[520px]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(215,180,106,0.18),transparent_18rem),radial-gradient(circle_at_76%_58%,rgba(96,230,210,0.18),transparent_20rem),radial-gradient(circle_at_60%_20%,rgba(142,124,255,0.12),transparent_18rem)]" />

      <motion.div
        animate={shouldReduceMotion ? undefined : { rotateX: [54, 51, 54], rotateZ: [-8, -6, -8], y: [0, -8, 0] }}
        transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[7%] top-[10%] h-[64%] w-[86%] rounded-[1.6rem] bg-[linear-gradient(135deg,rgba(215,180,106,0.18),rgba(96,230,210,0.07)_45%,rgba(142,124,255,0.10))] shadow-[0_54px_150px_rgba(0,0,0,0.55),0_0_110px_rgba(96,230,210,0.16),inset_0_0_0_1px_rgba(255,255,255,0.13)] [transform:rotateX(54deg)_rotateZ(-8deg)]"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:64px_64px]" />
          <div className="absolute inset-x-10 top-10 h-1 bg-gradient-to-r from-[#D7B46A] via-[#60E6D2] to-[#8E7CFF]" />
        </div>
      </motion.div>

      <motion.div
        animate={shouldReduceMotion ? undefined : { rotateY: [-16, -13, -16], rotateX: [7, 9, 7], y: [0, -9, 0] }}
        transition={shouldReduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-[45%] h-[72%] w-[90%] max-w-[650px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.6rem] bg-[#0D0C0A]/92 p-6 shadow-[0_38px_130px_rgba(0,0,0,0.58),0_0_90px_rgba(215,180,106,0.08),inset_0_0_0_1px_rgba(255,255,255,0.15)] [transform:rotateY(-16deg)_rotateX(7deg)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_56%,rgba(215,180,106,0.20),transparent_12rem),radial-gradient(circle_at_84%_60%,rgba(96,230,210,0.20),transparent_13rem),radial-gradient(circle_at_54%_45%,rgba(142,124,255,0.14),transparent_11rem)]" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/32">Client delivery model</p>
            <p className="mt-3 text-4xl font-black uppercase leading-none text-white/90 md:text-4xl lg:text-5xl">Problem to launch</p>
          </div>
          <span className="bg-[#D7B46A] px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-black">
            Senior led
          </span>
        </div>

        <div className="relative z-10 mt-6 grid grid-cols-[0.9fr_0.38fr_0.9fr] items-center gap-3">
          <div className="bg-[linear-gradient(135deg,rgba(240,106,61,0.15),rgba(0,0,0,0.36))] p-3 shadow-[inset_0_0_0_1px_rgba(240,106,61,0.16)]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Before</p>
            <p className="mt-2 text-2xl font-black uppercase leading-none text-white/86">Messy workflow</p>
            <div className="mt-4 grid gap-1.5">
              {problemSignals.map((item) => (
                <span key={item} className="bg-white/[0.055] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white/46">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid place-items-center">
            <motion.div
              animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1] }}
              transition={shouldReduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-20 w-20 place-items-center rounded-full bg-[#D7B46A] text-center text-black shadow-[0_0_70px_rgba(215,180,106,0.24)]"
            >
              <span className="text-[10px] font-black uppercase leading-tight tracking-[0.12em]">Ibda Dev<br />builds</span>
            </motion.div>
          </div>

          <div className="bg-[linear-gradient(135deg,rgba(96,230,210,0.16),rgba(0,0,0,0.34))] p-3 shadow-[inset_0_0_0_1px_rgba(96,230,210,0.16)]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">After</p>
            <p className="mt-2 text-2xl font-black uppercase leading-none text-[#60E6D2]">Live system</p>
            <div className="mt-4 grid grid-cols-2 gap-1.5">
              {shippedSignals.map((item) => (
                <span key={item} className="bg-white/[0.055] px-2 py-1.5 text-center text-[10px] font-black uppercase tracking-[0.1em] text-white/52">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-ibda-bg px-6 pb-16 pt-28 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_22%,rgba(215,180,106,0.10),transparent_24rem),radial-gradient(circle_at_88%_28%,rgba(96,230,210,0.10),transparent_24rem),radial-gradient(circle_at_62%_78%,rgba(142,124,255,0.08),transparent_28rem)]" />
      <div className="container mx-auto max-w-7xl">
        <div className="grid items-center gap-10 pb-12 md:pb-16 lg:grid-cols-[0.92fr_1.08fr] lg:pb-16">
          <div>
            <motion.p
              {...reveal(0)}
              className="mb-7 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold"
            >
              About Ibda Dev
            </motion.p>

            <motion.h1
              {...reveal(0.08)}
              className="max-w-4xl text-5xl font-black leading-[0.9] tracking-normal md:text-7xl"
            >
              From problem to shipped system.
            </motion.h1>

            <motion.p
              {...reveal(0.16)}
              className="mt-7 max-w-lg text-base font-medium leading-relaxed text-white/56 md:text-xl"
            >
              Senior product studio for AI tools, apps, dashboards, automations, and websites.
            </motion.p>

            <motion.div
              {...reveal(0.24)}
              className="mt-8 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.14em] text-white/44"
            >
              <span className="bg-[rgba(215,180,106,0.14)] px-3 py-2 text-[#D7B46A]">Senior-led</span>
              <span className="bg-[rgba(96,230,210,0.12)] px-3 py-2 text-[#60E6D2]">Launch-ready</span>
              <span className="bg-[rgba(142,124,255,0.14)] px-3 py-2 text-[#A99CFF]">Handoff built in</span>
            </motion.div>
          </div>

          <HeroStory />
        </div>

        <motion.div
          {...scrollReveal(0.04)}
          className="mb-16 grid gap-3 md:grid-cols-3 lg:mb-20"
        >
          {systems.map((item) => (
            <div key={item.title} className={`relative overflow-hidden bg-gradient-to-br ${item.surface} p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_28px_80px_rgba(0,0,0,0.22)] md:p-7`}>
              <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: item.accent }} />
              <p className="mb-6 text-xs font-black uppercase tracking-[0.24em]" style={{ color: item.accent }}>
                {item.signal}
              </p>
              <h2 className="text-2xl font-black leading-none text-white">{item.title}</h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/58">{item.body}</p>
            </div>
          ))}
        </motion.div>

        <div className="mb-16 grid gap-9 lg:mb-20 lg:grid-cols-[0.76fr_1.24fr]">
          <motion.div {...scrollReveal(0)}>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">
              Seven launch checks
            </p>
            <h2 className="max-w-xl text-4xl font-black leading-[0.94] text-white md:text-5xl">
              Checked before customers see it.
            </h2>
          </motion.div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map(([role, value, color], index) => (
              <motion.div
                key={role}
                {...scrollReveal(index * 0.03)}
                className="bg-[#0D0C0A] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-300 hover:-translate-y-1 md:p-6"
              >
                <p className="mb-5 text-[11px] font-black" style={{ color }}>0{index + 1}</p>
                <h3 className="text-lg font-black uppercase tracking-normal text-white">{role}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/46">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          {...scrollReveal(0.06)}
          className="flex flex-col gap-7 bg-[linear-gradient(135deg,rgba(215,180,106,0.16),rgba(96,230,210,0.08)_45%,rgba(142,124,255,0.12))] p-7 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10)] md:flex-row md:items-center md:justify-between md:p-8"
        >
          <div>
            <p className="text-2xl font-black text-white">Start with the problem. Leave with a first release.</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/42">
              Tell us what is slowing the business down. We will shape the build path.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/work#start-project"
              className="inline-flex items-center rounded-full bg-[#D7B46A] px-6 py-3.5 text-sm font-black text-ibda-bg shadow-[0_18px_45px_rgba(215,180,106,0.24)] transition-transform hover:-translate-y-0.5"
            >
              Start the Conversation
            </a>
            <a
              href="/work"
              className="inline-flex items-center rounded-full bg-[#60E6D2]/14 px-6 py-3.5 text-sm font-black text-[#60E6D2] shadow-[inset_0_0_0_1px_rgba(96,230,210,0.20)] transition-transform hover:-translate-y-0.5"
            >
              See Work
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
