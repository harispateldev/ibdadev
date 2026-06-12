"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

// Each gate: label shown on arc + what was actually verified + which promise it fulfills
const SCORE_GATES = [
  {
    label: "Brief",
    check: "Scope document signed and approved",
    promiseIndex: 1,
    promiseTitle: "On Brief",
  },
  {
    label: "Deadline",
    check: "Ship date locked in the contract",
    promiseIndex: 0,
    promiseTitle: "On Time",
  },
  {
    label: "QA",
    check: "Tested across browsers and breakpoints",
    promiseIndex: 1,
    promiseTitle: "On Brief",
  },
  {
    label: "Devices",
    check: "Responsive and performance-checked on mobile",
    promiseIndex: 1,
    promiseTitle: "On Brief",
  },
  {
    label: "Docs",
    check: "Credentials and handoff package delivered",
    promiseIndex: 2,
    promiseTitle: "Handoff Ready",
  },
];

const COLORS: [string, string, string] = ["#D7B46A", "#60E6D2", "#8E7CFF"];

// ── Icon motifs ──────────────────────────────────────────────────────────────

const OnTimeIcon = () => (
  <svg width="56" height="16" viewBox="0 0 56 16" fill="none" aria-hidden="true">
    <line x1="0" y1="8" x2="56" y2="8" stroke="rgba(215,180,106,0.15)" strokeWidth="1.5" />
    {[5, 18, 31, 44].map((x, i) => (
      <circle
        key={i} cx={x} cy={8}
        r={i === 3 ? 4 : 2.8}
        fill={i < 3 ? "#D7B46A" : "transparent"}
        stroke={i === 3 ? "rgba(215,180,106,0.38)" : "none"}
        strokeWidth="1.5"
      />
    ))}
    <path d="M50 5.5 L56 8 L50 10.5"
      stroke="rgba(215,180,106,0.38)" strokeWidth="1.5"
      fill="none" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const OnBriefIcon = () => (
  <svg width="48" height="32" viewBox="0 0 48 32" fill="none" aria-hidden="true">
    {[0, 11, 22].map((y, i) => (
      <g key={i}>
        <rect x="0" y={y} width="10" height="10" rx="2"
          fill={i < 2 ? "rgba(96,230,210,0.09)" : "transparent"}
          stroke="rgba(96,230,210,0.28)" strokeWidth="1.2"
        />
        {i < 2 && (
          <path
            d={`M2 ${y + 5} L4.5 ${y + 7.5} L8 ${y + 2.5}`}
            stroke="#60E6D2" strokeWidth="1.3"
            strokeLinecap="round" strokeLinejoin="round"
          />
        )}
        <line x1="14" y1={y + 5} x2={i === 2 ? 32 : 44} y2={y + 5}
          stroke="rgba(96,230,210,0.14)" strokeWidth="1.2"
        />
      </g>
    ))}
  </svg>
);

const HandoffReadyIcon = () => (
  <svg width="56" height="28" viewBox="0 0 56 28" fill="none" aria-hidden="true">
    <rect x="0" y="3" width="13" height="18" rx="2"
      stroke="rgba(142,124,255,0.30)" strokeWidth="1.2"
      fill="rgba(142,124,255,0.05)"
    />
    <line x1="3" y1="8"  x2="10" y2="8"  stroke="rgba(142,124,255,0.25)" strokeWidth="1" />
    <line x1="3" y1="12" x2="10" y2="12" stroke="rgba(142,124,255,0.25)" strokeWidth="1" />
    <line x1="3" y1="16" x2="7"  y2="16" stroke="rgba(142,124,255,0.25)" strokeWidth="1" />
    <path d="M18 12 L36 12"
      stroke="#8E7CFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.48"
    />
    <path d="M32 8.5 L37 12 L32 15.5"
      stroke="#8E7CFF" strokeWidth="1.4"
      fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.48"
    />
    <circle cx="47" cy="9" r="5"
      stroke="rgba(142,124,255,0.36)" strokeWidth="1.2"
      fill="rgba(142,124,255,0.06)"
    />
    <path d="M40 27 Q40 21 47 21 Q54 21 54 27"
      stroke="rgba(142,124,255,0.28)" strokeWidth="1.2" fill="none"
    />
  </svg>
);

// ── Promise card data ────────────────────────────────────────────────────────

const PROMISES = [
  {
    title:  "On Time",
    metric: "Deadline locked before build starts",
    // Punchy 2-sentence contract language — not a pitch, a process note
    line:   "Deadline in the contract. Tracked weekly — won't move without a signed change order.",
    color:  COLORS[0],
    gateLabels: ["Deadline"],
    Icon:   OnTimeIcon,
  },
  {
    title:  "On Brief",
    metric: "Scope signed before a line of code",
    line:   "Brief signed before build starts. Every deliverable checked against it before it ships.",
    color:  COLORS[1],
    gateLabels: ["Brief", "QA", "Devices"],
    Icon:   OnBriefIcon,
  },
  {
    title:  "Handoff Ready",
    metric: "Docs, access, and walkthrough at launch",
    line:   "Access, documentation, recorded walkthrough. Your team runs it from day one — no follow-up calls.",
    color:  COLORS[2],
    gateLabels: ["Docs"],
    Icon:   HandoffReadyIcon,
  },
];

// ── Launch Gauge ─────────────────────────────────────────────────────────────

const LaunchGauge = () => {
  const shouldReduceMotion = useReducedMotion();
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 5));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView]);

  return (
    <div className="relative overflow-hidden rounded-xl bg-[#0C0B09] px-7 py-8 shadow-[0_32px_100px_rgba(0,0,0,0.38)] md:px-10 md:py-9">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_44%,rgba(215,180,106,0.15),transparent_17rem),radial-gradient(circle_at_82%_20%,rgba(96,230,210,0.06),transparent_15rem)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.020)_1px,transparent_1px)] bg-[length:54px_54px] opacity-38" />

      <div className="relative z-10">

        {/* ── Header ── */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.06] pb-6">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/38">
              Launch check
            </p>
            {/* Credibility anchor — answers "how do I know this is real?" */}
            <p className="mt-1 text-[11px] text-white/24">
              50+ projects — same checklist every time
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-ibda-gold">
              5 / 5 passed
            </p>
            <p className="mt-1 text-[11px] text-white/24">
              all gates cleared
            </p>
          </div>
        </div>

        {/* ── Color decoder — before the checklist, subtle ── */}
        <div className="mb-5 flex flex-wrap gap-x-5 gap-y-1.5">
          {PROMISES.map((p) => (
            <span key={p.title} className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              <span
                className="text-[9px] font-black uppercase tracking-[0.14em]"
                style={{ color: `${p.color}60` }}
              >
                {p.title}
              </span>
            </span>
          ))}
        </div>

        {/* ── Main: gate list (left) + gauge (right) ── */}
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center xl:grid-cols-[1fr_400px]">

          {/* Gate checklist — 4 columns: dot | GATE | what was checked | PROMISE ✓ */}
          <div className="grid gap-0">
            {SCORE_GATES.map((gate, i) => (
              <motion.div
                key={gate.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.12 + i * 0.06, duration: 0.26 }}
                className="grid grid-cols-[8px_52px_1fr_auto] items-center gap-x-3 border-b border-white/[0.048] py-2.5"
              >
                {/* Dot — shared visual token with gauge arc dots */}
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: COLORS[gate.promiseIndex] }}
                />
                {/* Gate label */}
                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/55">
                  {gate.label}
                </span>
                {/* What was actually checked — makes each gate feel real */}
                <span className="text-[11px] text-white/28">
                  {gate.check}
                </span>
                {/* Promise title + check — appears after gauge fill completes */}
                <div className="flex items-center gap-2">
                  <span
                    className="hidden text-[9px] font-black uppercase tracking-[0.10em] sm:block"
                    style={{ color: `${COLORS[gate.promiseIndex]}52` }}
                  >
                    {gate.promiseTitle}
                  </span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.14 + i * 0.07, duration: 0.18 }}
                    className="text-[11px] font-black text-ibda-gold/65"
                  >
                    ✓
                  </motion.span>
                </div>
              </motion.div>
            ))}

            {/* Outcome framing — answers "what does 5/5 mean for me?" */}
            <p className="mt-5 text-[11px] leading-relaxed text-white/22">
              A product that works on the day it ships — tested, documented, and yours to operate.
            </p>
          </div>

          {/* Gauge — the hero visual, wider column */}
          <div className="relative mx-auto aspect-square w-full max-w-[300px] flex-shrink-0 lg:max-w-none">
            <svg
              viewBox="0 0 420 420"
              className="h-full w-full overflow-visible"
              aria-hidden="true"
            >
              {/* Track */}
              <path
                d="M54 248 A160 160 0 0 1 366 248"
                fill="none" stroke="rgba(255,255,255,0.07)"
                strokeWidth="15" strokeLinecap="round"
              />
              {/* Fill — animates on scroll */}
              <motion.path
                d="M54 248 A160 160 0 0 1 366 248"
                fill="none" stroke="#D7B46A"
                strokeWidth="15" strokeLinecap="round"
                initial={shouldReduceMotion ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
              {/* Gate dots — colored by promise pillar, same color as checklist dots */}
              {SCORE_GATES.map((gate, i) => {
                const rad = ((205 + i * 32.5) * Math.PI) / 180;
                return (
                  <motion.circle
                    key={gate.label}
                    cx={210 + Math.cos(rad) * 162}
                    cy={248 + Math.sin(rad) * 162}
                    r="8"
                    fill={COLORS[gate.promiseIndex]}
                    stroke="rgba(12,11,9,0.9)"
                    strokeWidth="2.5"
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.22 }}
                  />
                );
              })}
            </svg>

            {/* Score bubble */}
            <div className="absolute inset-0 grid place-items-center">
              <div
                ref={countRef}
                className="grid h-40 w-40 place-items-center rounded-full bg-[#080706] text-center shadow-[0_24px_80px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.08)]"
              >
                <span className="block text-[9px] font-black uppercase tracking-[0.22em] text-white/26">
                  Launch score
                </span>
                <span className="block text-[3.375rem] font-black leading-none text-white">
                  {count}/5
                </span>
                {/* Client outcome in the score bubble — not just a number */}
                <span className="block text-[9px] leading-snug text-white/20 px-4">
                  ready to ship
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA ── outcome-framed, after proof is consumed ── */}
        <div className="mt-8 flex flex-col items-start gap-4 border-t border-white/[0.055] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/32 sm:max-w-xs">
            For teams that can&apos;t afford a bad launch.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg border border-ibda-gold/28 bg-ibda-gold/[0.09] px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-ibda-gold transition-colors hover:border-ibda-gold/50 hover:bg-ibda-gold/[0.15]"
          >
            Start a project
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1.5 6h9M6.5 2l4 4-4 4"
                stroke="currentColor" strokeWidth="1.7"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </div>
      </div>
    </div>
  );
};

// ── Section ──────────────────────────────────────────────────────────────────

export const StatsSection = () => {
  return (
    <section
      id="proof-discipline"
      className="relative overflow-hidden bg-[#050505] px-6 py-12 md:py-16"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-ibda-gold/4 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-7xl">

        {/* ── Header ── */}
        <div className="mb-9">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">
            Launch standard
          </p>
          <h2 className="text-5xl font-black leading-[0.9] tracking-normal text-white md:text-6xl lg:text-7xl">
            Built to launch clean.
          </h2>
          {/* Single line — bridges headline to the cards and gauge below */}
          <p className="mt-4 max-w-md text-[0.9375rem] font-medium leading-relaxed text-white/38">
            Three commitments. Five gates. Checked on every project before it ships.
          </p>
        </div>

        {/* ── Promise cards ── */}
        <div className="mb-6 grid gap-3 md:grid-cols-3">
          {PROMISES.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.34, delay: index * 0.07 }}
              className="group relative rounded-xl bg-white/[0.032] p-5 shadow-[0_12px_44px_rgba(0,0,0,0.20)] transition-colors hover:bg-white/[0.048]"
            >
              {/* Accent top line */}
              <div
                className="absolute inset-x-0 top-0 h-px rounded-t-xl"
                style={{
                  background: `linear-gradient(90deg, transparent, ${item.color}48, transparent)`,
                }}
              />

              <div className="mb-4">
                <item.Icon />
              </div>

              {/* Title */}
              <span
                className="block text-xl font-black uppercase leading-none tracking-tight"
                style={{ color: item.color }}
              >
                {item.title}
              </span>

              {/* Metric — the operational claim */}
              <span className="mt-2 block text-[10px] font-black uppercase tracking-[0.16em] text-white/28">
                {item.metric}
              </span>

              {/* Description — 2 short contract-language sentences */}
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-white/52">
                {item.line}
              </p>

              {/* Gate tags — exact labels that appear in the gauge below */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.gateLabels.map((label) => (
                  <span
                    key={label}
                    className="flex items-center gap-1 rounded-sm px-1.5 py-[3px]"
                    style={{
                      backgroundColor: `${item.color}10`,
                      border: `1px solid ${item.color}24`,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span
                      className="text-[9px] font-black uppercase tracking-[0.14em]"
                      style={{ color: `${item.color}88` }}
                    >
                      {label}
                    </span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Launch check ── */}
        <LaunchGauge />
      </div>
    </section>
  );
};
