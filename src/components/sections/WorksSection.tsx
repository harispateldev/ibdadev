"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

type VisualProps = { color: string; reduced: boolean; hovered: boolean };

// WEBSITE — browser mockup: content hierarchy + trust checkmarks + analytics sparkline + launch bar
const WebsiteVisual = ({ color, reduced, hovered }: VisualProps) => (
  <svg viewBox="0 0 520 260" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
    {/* Browser frame */}
    <rect x="38" y="6" width="444" height="248" rx="10" fill="none" stroke={color} strokeWidth="1.4" strokeOpacity="0.22" />
    {/* Chrome bar */}
    <rect x="38" y="6" width="444" height="36" rx="10" fill={color} fillOpacity="0.07" />
    <rect x="38" y="28" width="444" height="14" fill={color} fillOpacity="0.07" />
    {/* Traffic lights */}
    <circle cx="60" cy="24" r="5" fill={color} fillOpacity="0.62" />
    <circle cx="76" cy="24" r="5" fill={color} fillOpacity="0.36" />
    <circle cx="92" cy="24" r="5" fill={color} fillOpacity="0.16" />
    {/* URL bar */}
    <rect x="116" y="16" width="222" height="16" rx="8" fill={color} fillOpacity="0.10" />
    {/* Live status dot + pulsing ring */}
    <circle cx="454" cy="24" r="5" fill="#4ADE80" fillOpacity="0.78" />
    {!reduced && (
      <motion.circle
        cx="454" cy="24" r="5" fill="none" stroke="#4ADE80" strokeWidth="1.5"
        initial={{ strokeOpacity: 0 }}
        animate={{ r: [5, 14], strokeOpacity: [0.55, 0] }}
        transition={{ duration: hovered ? 1.0 : 1.8, repeat: Infinity, ease: "easeOut" }}
      />
    )}
    {/* Separator */}
    <line x1="38" y1="42" x2="482" y2="42" stroke={color} strokeWidth="1" strokeOpacity="0.10" />
    {/* Left: content hierarchy */}
    <rect x="62" y="60" width="168" height="14" rx="4" fill={color} fillOpacity="0.55" />
    <rect x="62" y="80" width="136" height="10" rx="3" fill={color} fillOpacity="0.25" />
    <rect x="62" y="96" width="108" height="10" rx="3" fill={color} fillOpacity="0.16" />
    {/* CTA button */}
    <rect x="62" y="116" width="92" height="24" rx="12" fill={color} fillOpacity="0.38" />
    {/* Trust signals with checkmarks */}
    <text x="57" y="175" fill={color} fillOpacity="0.65" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif">✓</text>
    <rect x="72" y="167" width="46" height="8" rx="2" fill={color} fillOpacity="0.18" />
    <text x="128" y="175" fill={color} fillOpacity="0.65" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif">✓</text>
    <rect x="142" y="167" width="46" height="8" rx="2" fill={color} fillOpacity="0.18" />
    <text x="198" y="175" fill={color} fillOpacity="0.65" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif">✓</text>
    <rect x="212" y="167" width="46" height="8" rx="2" fill={color} fillOpacity="0.18" />
    {/* Right: analytics dashboard area */}
    <rect x="276" y="52" width="164" height="130" rx="8" fill={color} fillOpacity="0.05" stroke={color} strokeWidth="1" strokeOpacity="0.16" />
    {/* Sparkline area fill */}
    <path
      d="M285 128 C299 117 314 105 332 97 C350 89 370 86 392 80 C406 76 418 74 428 68 L428 138 L285 138 Z"
      fill={color} fillOpacity="0.06"
    />
    {/* Sparkline curve */}
    <path
      d="M285 128 C299 117 314 105 332 97 C350 89 370 86 392 80 C406 76 418 74 428 68"
      fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.52"
    />
    {/* Sparkline endpoint dot */}
    <circle cx="428" cy="68" r="4" fill={color} fillOpacity="0.72" />
    {/* Sparkline axis lines */}
    <line x1="285" y1="138" x2="428" y2="138" stroke={color} strokeWidth="0.8" strokeOpacity="0.12" />
    <line x1="285" y1="58" x2="285" y2="138" stroke={color} strokeWidth="0.8" strokeOpacity="0.12" />
    {/* Caption bars */}
    <rect x="284" y="150" width="88" height="8" rx="2" fill={color} fillOpacity="0.11" />
    <rect x="284" y="164" width="64" height="8" rx="2" fill={color} fillOpacity="0.07" />
    {/* Launch progress bar */}
    <rect x="62" y="222" width="396" height="4" rx="2" fill={color} fillOpacity="0.08" />
    <motion.rect
      x="62" y="222" height="4" rx="2"
      fill={color} fillOpacity="0.55"
      initial={{ width: reduced ? 396 : 0 }}
      whileInView={{ width: 396 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }}
    />
  </svg>
);

// PIPELINE — labeled conversion funnel with flowing dots + CVR indicator
const PipelineVisual = ({ color, reduced, hovered }: VisualProps) => (
  <svg viewBox="0 0 520 260" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
    {/* Stage 1: Traffic */}
    <rect x="58" y="10" width="364" height="32" rx="4" fill={color} fillOpacity="0.07" stroke={color} strokeWidth="1.2" strokeOpacity="0.22" />
    <text x="240" y="30" fill={color} fillOpacity="0.52" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="0.16em">TRAFFIC</text>
    {/* Taper 1→2 */}
    <polygon points="58,42 422,42 392,72 88,72" fill={color} fillOpacity="0.03" />
    {/* Stage 2: Leads */}
    <rect x="88" y="72" width="304" height="30" rx="4" fill={color} fillOpacity="0.11" stroke={color} strokeWidth="1.2" strokeOpacity="0.28" />
    <text x="240" y="91" fill={color} fillOpacity="0.56" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="0.16em">LEADS</text>
    {/* Taper 2→3 */}
    <polygon points="88,102 392,102 360,132 120,132" fill={color} fillOpacity="0.03" />
    {/* Stage 3: Calls */}
    <rect x="120" y="132" width="240" height="28" rx="4" fill={color} fillOpacity="0.16" stroke={color} strokeWidth="1.3" strokeOpacity="0.34" />
    <text x="240" y="150" fill={color} fillOpacity="0.62" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="0.16em">CALLS</text>
    {/* Taper 3→4 */}
    <polygon points="120,160 360,160 330,190 150,190" fill={color} fillOpacity="0.03" />
    {/* Stage 4: Deals — outcome */}
    <rect x="150" y="190" width="180" height="28" rx="4" fill={color} fillOpacity="0.30" stroke={color} strokeWidth="1.5" strokeOpacity="0.55" />
    <text x="222" y="208" fill={color} fillOpacity="0.90" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="0.16em">DEALS</text>
    {/* CVR label to the right of final stage */}
    <rect x="336" y="194" width="58" height="20" rx="4" fill={color} fillOpacity="0.10" stroke={color} strokeWidth="1" strokeOpacity="0.30" />
    <text x="365" y="208" fill={color} fillOpacity="0.80" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="0.08em">4.1% CVR</text>
    {/* Metric volume indicators (right side, visually only) */}
    <rect x="432" y="18" width="50" height="16" rx="3" fill={color} fillOpacity="0.07" />
    <rect x="436" y="21" width="36" height="10" rx="2" fill={color} fillOpacity="0.22" />
    <rect x="406" y="80" width="40" height="14" rx="3" fill={color} fillOpacity="0.09" />
    <rect x="410" y="83" width="26" height="8" rx="2" fill={color} fillOpacity="0.26" />
    <rect x="374" y="138" width="32" height="14" rx="3" fill={color} fillOpacity="0.11" />
    <rect x="377" y="141" width="20" height="8" rx="2" fill={color} fillOpacity="0.30" />
    {/* Conversion pulse on Deals stage */}
    <circle cx="338" cy="204" r="5" fill={color} fillOpacity="0.72" />
    {!reduced && (
      <motion.circle
        cx="338" cy="204" r="5" fill="none" stroke={color} strokeWidth="1.5"
        initial={{ strokeOpacity: 0 }}
        animate={{ r: [5, 16], strokeOpacity: [0.58, 0] }}
        transition={{ duration: hovered ? 0.9 : 1.6, repeat: Infinity, ease: "easeOut" }}
      />
    )}
    {/* Moving lead dots flowing down funnel */}
    {!reduced && [0, 1, 2].map((i) => (
      <motion.circle
        key={i}
        cx={240}
        r="5"
        fill={color}
        initial={{ opacity: 0, cy: 26 }}
        animate={{ cy: [26, 87, 146, 204], opacity: [0, 0.85, 0.85, 0] }}
        transition={{
          duration: hovered ? 1.5 : 2.4,
          delay: i * 0.82,
          repeat: Infinity,
          ease: "easeIn",
          times: [0, 0.33, 0.66, 1],
        }}
      />
    ))}
  </svg>
);

// SYSTEMS — labeled automation network with full-loop (node→hub→node) pulses
const SystemsVisual = ({ color, reduced, hovered }: VisualProps) => {
  const hub = { x: 260, y: 130 };
  const nodes = [
    { x: 94, y: 66, label: "CRM" },
    { x: 426, y: 66, label: "EMAIL" },
    { x: 94, y: 198, label: "PAYMENTS" },
    { x: 426, y: 198, label: "SUPPORT" },
  ];

  return (
    <svg viewBox="0 0 520 260" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
      {/* Dashed connection lines */}
      {nodes.map((n, i) => (
        <line
          key={i}
          x1={n.x} y1={n.y} x2={hub.x} y2={hub.y}
          stroke={color} strokeWidth="1.2" strokeOpacity="0.18" strokeDasharray="6 5"
        />
      ))}
      {/* Center hub pulsing rings */}
      {!reduced && [0, 0.72].map((delay, i) => (
        <motion.circle
          key={i}
          cx={hub.x} cy={hub.y} r={22} fill="none"
          stroke={color} strokeWidth="1.5"
          initial={{ strokeOpacity: 0 }}
          animate={{ r: [22, 46], strokeOpacity: [0.42, 0] }}
          transition={{ duration: hovered ? 1.3 : 2.2, repeat: Infinity, ease: "easeOut", delay }}
        />
      ))}
      {/* Center hub */}
      <circle cx={hub.x} cy={hub.y} r="24" fill={color} fillOpacity="0.14" stroke={color} strokeWidth="2" strokeOpacity="0.44" />
      <circle cx={hub.x} cy={hub.y} r="10" fill={color} fillOpacity="0.65" />
      {/* Outer nodes with pulsing rings + labels */}
      {nodes.map((n, i) => {
        const labelY = n.y > hub.y ? n.y + 24 : n.y - 18;
        return (
          <g key={i}>
            {!reduced && (
              <motion.circle
                cx={n.x} cy={n.y} r={12} fill="none"
                stroke={color} strokeWidth="1.2"
                initial={{ strokeOpacity: 0 }}
                animate={{ r: [12, 26], strokeOpacity: [0.38, 0] }}
                transition={{ duration: hovered ? 1.1 : 1.9, repeat: Infinity, ease: "easeOut", delay: i * 0.44 }}
              />
            )}
            <circle cx={n.x} cy={n.y} r="13" fill={color} fillOpacity="0.09" stroke={color} strokeWidth="1.5" strokeOpacity="0.38" />
            <circle cx={n.x} cy={n.y} r="5" fill={color} fillOpacity="0.72" />
            <text
              x={n.x} y={labelY}
              fill={color} fillOpacity="0.48"
              fontSize="8.5" fontWeight="900"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
              letterSpacing="0.12em"
            >
              {n.label}
            </text>
          </g>
        );
      })}
      {/* Full-loop pulses: node → hub (visible) → node (fading) */}
      {!reduced && nodes.map((n, i) => (
        <motion.circle
          key={i}
          r="4"
          fill={color}
          initial={{ cx: n.x, cy: n.y, opacity: 0.85 }}
          animate={{
            cx: [n.x, hub.x, hub.x, n.x],
            cy: [n.y, hub.y, hub.y, n.y],
            opacity: [0.85, 0.85, 0.55, 0],
          }}
          transition={{
            duration: hovered ? 0.85 : 1.4,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.42, 0.58, 1],
          }}
        />
      ))}
    </svg>
  );
};

type Proof = {
  mark: string;
  outcome: string;
  project: string;
  metric: string;
  line: string;
  color: string;
  glow: string;
  Visual: React.ComponentType<VisualProps>;
};

const proofs: Proof[] = [
  {
    mark: "01",
    outcome: "Website",
    project: "Construction tech",
    metric: "2× organic reach",
    line: "A new business looks ready and trusted before the first call.",
    color: "#D7B46A",
    glow: "rgba(215,180,106,0.28)",
    Visual: WebsiteVisual,
  },
  {
    mark: "02",
    outcome: "Pipeline",
    project: "SaaS startup",
    metric: "47 leads / month",
    line: "Traffic turns into booked calls without a sales team.",
    color: "#60E6D2",
    glow: "rgba(96,230,210,0.24)",
    Visual: PipelineVisual,
  },
  {
    mark: "03",
    outcome: "Systems",
    project: "E-commerce ops",
    metric: "12 automations live",
    line: "Every repetitive step runs without any manual input.",
    color: "#8E7CFF",
    glow: "rgba(142,124,255,0.25)",
    Visual: SystemsVisual,
  },
];

const ProofSignal = ({ proof, index }: { proof: Proof; index: number }) => {
  const reduced = useReducedMotion() ?? false;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.018, boxShadow: "0 48px 140px rgba(0,0,0,0.50)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      style={{ boxShadow: "0 30px 100px rgba(0,0,0,0.34)" }}
      className="group relative min-h-[460px] overflow-hidden rounded-xl bg-white/[0.032] p-7 md:min-h-[540px] md:p-8"
    >
      {/* Glow brightens on hover */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.80 }}
        animate={{ opacity: hovered ? 1.0 : 0.80 }}
        transition={{ duration: 0.35 }}
        style={{ background: `radial-gradient(circle at 54% 44%, ${proof.glow}, transparent 18rem)` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:48px_48px] opacity-35" />
      {/* Hover shimmer */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          animate={{ x: ["-60%", "160%"] }}
          transition={{ duration: 6 + index, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 h-full w-28 bg-gradient-to-r from-transparent via-white/[0.055] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}

      <div className="relative z-10 flex h-full min-h-[404px] flex-col justify-between md:min-h-[476px]">
        {/* Header: mark + project type */}
        <div className="flex items-center justify-between gap-6">
          <span className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: proof.color }}>
            {proof.mark}
          </span>
          <span className="text-xs font-black uppercase tracking-[0.22em] text-white/35">{proof.project}</span>
        </div>

        {/* Service-specific visual */}
        <div className="relative my-8 min-h-[190px]">
          <proof.Visual color={proof.color} reduced={reduced} hovered={hovered} />
          {/* Background word — reduced so it doesn't compete */}
          <span className="pointer-events-none absolute bottom-0 left-0 text-[3.8rem] font-black uppercase leading-none tracking-normal text-white/[0.026] md:text-[5rem]">
            {proof.outcome}
          </span>
        </div>

        {/* Visual hierarchy: Title → Metric chip → Description */}
        <div>
          <div className="flex flex-wrap items-end gap-3">
            <h3 className="text-5xl font-black uppercase leading-[0.88] tracking-normal text-white md:text-6xl">
              {proof.outcome}
            </h3>
            <span
              className="mb-1 rounded-md px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em]"
              style={{
                backgroundColor: `${proof.color}22`,
                color: proof.color,
                border: `1px solid ${proof.color}45`,
              }}
            >
              {proof.metric}
            </span>
          </div>
          <p className="mt-5 max-w-sm text-base font-semibold leading-relaxed text-white/72">{proof.line}</p>
        </div>
      </div>
    </motion.article>
  );
};

export const WorksSection = () => {
  const [revealRef, isVisible] = useReveal();
  const reduced = useReducedMotion();

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
                : reduced
                  ? "opacity-100"
                  : "opacity-0 translate-y-10"
            }`}
          >
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">Selected work</p>
            <h2 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-normal text-white md:text-7xl lg:text-8xl">
              Proof is in the build.
            </h2>
          </div>
          <a
            href="/work"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/14 px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-white/72 transition-all hover:border-ibda-gold hover:text-ibda-gold"
          >
            Explore our work
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
              →
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
