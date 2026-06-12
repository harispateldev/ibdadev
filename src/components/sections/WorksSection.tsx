"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

type Proof = {
  mark: string;
  outcome: string;
  move: string;
  line: string;
  color: string;
  glow: string;
  curve: string;
};

const proofs: Proof[] = [
  {
    mark: "01",
    outcome: "Trust",
    move: "Launch",
    line: "A new business looks ready before the first call.",
    color: "#D7B46A",
    glow: "rgba(215,180,106,0.28)",
    curve: "M34 168 C112 52 214 52 302 142 C354 194 414 182 486 82",
  },
  {
    mark: "02",
    outcome: "Demand",
    move: "Convert",
    line: "The offer is easier to understand and act on.",
    color: "#60E6D2",
    glow: "rgba(96,230,210,0.24)",
    curve: "M34 190 C122 124 194 114 282 154 C360 190 416 162 486 98",
  },
  {
    mark: "03",
    outcome: "Flow",
    move: "Operate",
    line: "Apps and dashboards become calmer to use.",
    color: "#8E7CFF",
    glow: "rgba(142,124,255,0.25)",
    curve: "M34 112 C124 198 232 210 318 142 C384 88 426 92 486 138",
  },
];

const ProofSignal = ({ proof, index }: { proof: Proof; index: number }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group relative min-h-[460px] overflow-hidden rounded-xl bg-white/[0.032] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.34)] md:min-h-[540px] md:p-8"
    >
      <div className="absolute inset-0 opacity-80" style={{ background: `radial-gradient(circle at 54% 44%, ${proof.glow}, transparent 18rem)` }} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:48px_48px] opacity-35" />
      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? undefined : { x: ["-60%", "160%"] }}
        transition={shouldReduceMotion ? undefined : { duration: 6 + index, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 h-full w-28 bg-gradient-to-r from-transparent via-white/[0.055] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative z-10 flex h-full min-h-[404px] flex-col justify-between md:min-h-[476px]">
        <div className="flex items-center justify-between gap-6">
          <span className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: proof.color }}>
            {proof.mark}
          </span>
          <span className="text-xs font-black uppercase tracking-[0.22em] text-white/35">{proof.move}</span>
        </div>

        <div className="relative my-10 min-h-[190px]">
          <svg viewBox="0 0 520 260" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            <path d="M54 48 H470M54 212 H470M86 34 V228M260 34 V228M434 34 V228" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <motion.path
              d={proof.curve}
              fill="none"
              stroke={proof.color}
              strokeWidth="4"
              strokeLinecap="round"
              initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0.25 }}
              whileInView={{ pathLength: 1, opacity: 0.92 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
            {[86, 260, 434].map((x, dotIndex) => (
              <motion.circle
                key={x}
                cx={x}
                cy={[156, 118, 94][dotIndex]}
                r={dotIndex === 2 ? 12 : 8}
                fill={dotIndex === 2 ? proof.color : "#080706"}
                stroke={proof.color}
                strokeWidth="2"
                initial={shouldReduceMotion ? false : { scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: dotIndex * 0.09, duration: 0.35 }}
              />
            ))}
          </svg>

          <span className="absolute bottom-0 left-0 text-[5.2rem] font-black uppercase leading-none tracking-normal text-white/[0.055] md:text-[7rem]">
            {proof.outcome}
          </span>
        </div>

        <div>
          <h3 className="text-5xl font-black uppercase leading-[0.88] tracking-normal text-white md:text-6xl">
            {proof.outcome}
          </h3>
          <p className="mt-5 max-w-sm text-base font-semibold leading-relaxed text-white/54">{proof.line}</p>
        </div>
      </div>
    </motion.article>
  );
};

export const WorksSection = () => {
  const [revealRef, isVisible] = useReveal();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="selected-systems" className="relative overflow-hidden bg-[#050505] px-6 py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="absolute -left-24 top-44 h-80 w-80 rounded-full bg-ibda-gold/6 blur-3xl" />
      <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-ibda-cyan/6 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div
            ref={revealRef as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : shouldReduceMotion
                  ? "opacity-100"
                  : "opacity-0 translate-y-10"
            }`}
          >
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">Selected work</p>
            <h2 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-normal text-white md:text-7xl lg:text-8xl">
              Make the result visible.
            </h2>
          </div>
          <a
            href="/work"
            className="group inline-flex w-fit items-center gap-3 text-sm font-black uppercase tracking-[0.14em] text-white/72 transition-colors hover:text-ibda-gold"
          >
            View work
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
              -&gt;
            </span>
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {proofs.map((proof, index) => (
            <ProofSignal key={proof.mark} proof={proof} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
