"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

const gates = ["Message", "Offer", "Speed", "Mobile", "Handoff"];

const promises = [
  {
    title: "Clear",
    line: "People understand what you do.",
    color: "#D7B46A",
  },
  {
    title: "Fast",
    line: "Motion never slows the page.",
    color: "#60E6D2",
  },
  {
    title: "Ready",
    line: "The team can launch and iterate.",
    color: "#8E7CFF",
  },
];

const LaunchGauge = () => {
  const shouldReduceMotion = useReducedMotion();
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const start = performance.now();
    const duration = 1200;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 5));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView]);

  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-xl bg-[#0C0B09] p-7 shadow-[0_36px_120px_rgba(0,0,0,0.4)] md:min-h-[520px] md:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(215,180,106,0.20),transparent_18rem),radial-gradient(circle_at_80%_22%,rgba(96,230,210,0.10),transparent_16rem)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[length:54px_54px] opacity-45" />

      <div className="relative z-10 flex min-h-[366px] flex-col justify-between md:min-h-[440px]">
        <div className="flex items-start justify-between gap-6">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/34">Launch check</p>
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-ibda-gold">5/5 ready</p>
        </div>

        <div className="relative mx-auto my-8 aspect-square w-full max-w-[430px]">
          <svg viewBox="0 0 420 420" className="h-full w-full overflow-visible" aria-hidden="true">
            <path d="M54 248 A160 160 0 0 1 366 248" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="18" strokeLinecap="round" />
            <motion.path
              d="M54 248 A160 160 0 0 1 366 248"
              fill="none"
              stroke="#D7B46A"
              strokeWidth="18"
              strokeLinecap="round"
              initial={shouldReduceMotion ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            {[0, 1, 2, 3, 4].map((item) => {
              const angle = 205 + item * 32.5;
              const rad = (angle * Math.PI) / 180;
              const x = 210 + Math.cos(rad) * 162;
              const y = 248 + Math.sin(rad) * 162;
              return (
                <motion.circle
                  key={item}
                  cx={x}
                  cy={y}
                  r="9"
                  fill={item === 0 ? "#D7B46A" : item === 2 ? "#60E6D2" : item === 4 ? "#8E7CFF" : "#080706"}
                  stroke="#D7B46A"
                  strokeWidth="2"
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: item * 0.08, duration: 0.3 }}
                />
              );
            })}
          </svg>

          <div className="absolute inset-0 grid place-items-center text-center">
            <motion.div
              ref={countRef}
              animate={shouldReduceMotion ? undefined : { scale: [1, 1.035, 1] }}
              transition={shouldReduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-44 w-44 place-items-center rounded-full bg-[#080706] shadow-[0_28px_90px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.12)]"
            >
              <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/34">Quality</span>
              <span className="block text-6xl font-black leading-none text-white">{count}/5</span>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center">
          {gates.map((gate) => (
            <span key={gate} className="text-[10px] font-black uppercase tracking-[0.12em] text-white/38 md:text-xs">
              {gate}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const StatsSection = () => {
  return (
    <section id="proof-discipline" className="relative overflow-hidden bg-[#050505] px-6 py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-ibda-gold/6 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">Launch standard</p>
            <h2 className="max-w-4xl text-5xl font-black leading-[0.9] tracking-normal text-white md:text-7xl lg:text-8xl">
              Built to launch clean.
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-3 lg:justify-self-end">
            {promises.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.42, delay: index * 0.08 }}
                className="min-h-32 rounded-xl bg-white/[0.035] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.26)]"
              >
                <span className="block text-3xl font-black uppercase leading-none tracking-normal" style={{ color: item.color }}>
                  {item.title}
                </span>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-white/50">{item.line}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <LaunchGauge />
        </div>
      </div>
    </section>
  );
};
