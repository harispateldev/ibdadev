"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type LogoKind = "next" | "react" | "figma" | "framer" | "gsap" | "vercel" | "supabase" | "cloudflare" | "openai" | "tailwind";
type SignalKind = "offer" | "web" | "lead" | "system";

const kineticWords = ["Trusted online", "Leads connected", "Systems live"];

const stackTools: Array<{ name: string; kind: LogoKind; tone: string }> = [
  { name: "Next.js", kind: "next", tone: "text-white" },
  { name: "React", kind: "react", tone: "text-ibda-cyan" },
  { name: "Figma", kind: "figma", tone: "text-ibda-accent" },
  { name: "Framer", kind: "framer", tone: "text-white" },
  { name: "GSAP", kind: "gsap", tone: "text-[#9DFF7A]" },
  { name: "Vercel", kind: "vercel", tone: "text-white" },
  { name: "Supabase", kind: "supabase", tone: "text-[#68F0A5]" },
  { name: "Cloudflare", kind: "cloudflare", tone: "text-[#F7A53A]" },
  { name: "OpenAI", kind: "openai", tone: "text-white" },
  { name: "Tailwind", kind: "tailwind", tone: "text-ibda-cyan" },
];

const signals: Array<{ label: string; outcome: string; kind: SignalKind; className: string; color: string; mobile: boolean }> = [
  { label: "Website", outcome: "Traffic live", kind: "web", className: "left-[6%] top-[18%]", color: "text-ibda-gold", mobile: true },
  { label: "Leads", outcome: "Auto-captured", kind: "lead", className: "right-[7%] top-[12%]", color: "text-ibda-cyan", mobile: true },
  { label: "CRM", outcome: "Always synced", kind: "system", className: "left-[10%] bottom-[18%]", color: "text-ibda-accent", mobile: false },
  { label: "Ops", outcome: "Automated", kind: "offer", className: "right-[10%] bottom-[16%]", color: "text-[#F06A3D]", mobile: false },
];

const StackLogo = ({ kind }: { kind: LogoKind }) => {
  const common = "h-6 w-6 md:h-7 md:w-7";

  if (kind === "react") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="9" ry="3.4" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="12" cy="12" rx="9" ry="3.4" stroke="currentColor" strokeWidth="1.6" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.4" stroke="currentColor" strokeWidth="1.6" transform="rotate(120 12 12)" />
      </svg>
    );
  }

  if (kind === "figma") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <circle cx="9" cy="6" r="3" fill="currentColor" opacity="0.95" />
        <circle cx="15" cy="6" r="3" fill="currentColor" opacity="0.65" />
        <circle cx="9" cy="12" r="3" fill="currentColor" opacity="0.75" />
        <circle cx="15" cy="12" r="3" fill="currentColor" opacity="0.9" />
        <circle cx="9" cy="18" r="3" fill="currentColor" opacity="0.55" />
      </svg>
    );
  }

  if (kind === "framer") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M7 4h10v5H7zM7 9h10l-5 5H7zM7 14h5v6z" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "gsap") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M5 15c4-8 10-10 14-9-2 5-7 11-14 9Z" fill="currentColor" opacity="0.9" />
        <path d="M6 18c5-1 10-4 13-9" stroke="#080706" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "vercel") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="m12 5 9 15H3L12 5Z" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "supabase") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M13 3 5 14h6l-1 7 9-12h-6l0-6Z" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "cloudflare") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M8 17h9.5a3.5 3.5 0 0 0 0-7 5.8 5.8 0 0 0-11.1 1.7A2.7 2.7 0 0 0 8 17Z" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "openai") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M12 4.2 16.8 7v5.6L12 15.4l-4.8-2.8V7L12 4.2Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 9.1 16.8 12M12 9.1 7.2 12M12 9.1v6.3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7.2 7 12 9.8 16.8 7M7.2 12v5l4.8 2.8 4.8-2.8v-5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (kind === "tailwind") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M5 13c1.7-4 4.2-5.4 7.5-4 1.9.8 2.2 2 3.6 2 1.3 0 2.2-.7 2.9-2-1.7 4-4.2 5.4-7.5 4-1.9-.8-2.2-2-3.6-2-1.3 0-2.2.7-2.9 2Zm0 5c1.7-4 4.2-5.4 7.5-4 1.9.8 2.2 2 3.6 2 1.3 0 2.2-.7 2.9-2-1.7 4-4.2 5.4-7.5 4-1.9-.8-2.2-2-3.6-2-1.3 0-2.2.7-2.9 2Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 16V8l8 8V8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const SignalGlyph = ({ kind }: { kind: SignalKind }) => {
  if (kind === "offer") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M6 8h12M6 12h9M6 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "web") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <rect x="4" y="6" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 10h16" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (kind === "lead") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M6 7h12v10H6z" stroke="currentColor" strokeWidth="1.8" />
        <path d="m6 8 6 5 6-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M8 8h8v8H8z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 3v5M12 16v5M3 12h5M16 12h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
};

export const PartnersMarquee = () => {
  const shouldReduceMotion = useReducedMotion();
  const repeatedTools = [...stackTools, ...stackTools, ...stackTools];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden border-y border-ibda-border bg-[#080706] px-6 py-24 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(215,180,106,0.10),transparent_24rem),radial-gradient(circle_at_78%_28%,rgba(96,230,210,0.08),transparent_25rem),radial-gradient(circle_at_52%_92%,rgba(142,124,255,0.07),transparent_27rem)]" />
      <div className="absolute inset-0 theme-grid opacity-16" />

      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={shouldReduceMotion ? undefined : { duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-14 flex w-max gap-10 whitespace-nowrap text-[10vw] font-black uppercase leading-none tracking-normal text-white/[0.026]"
      >
        {[...kineticWords, ...kineticWords].map((word, index) => (
          <span key={`${word}-${index}`}>{word}</span>
        ))}
      </motion.div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">Digital presence layer</p>
          <h2 className="text-4xl font-black leading-[0.92] tracking-normal md:text-6xl lg:text-7xl">
            Website. Leads. Ops. Automated.
          </h2>
          <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/72 md:text-lg">
            We connect your website, CRM, and operations into one system — visitors become leads, leads become customers, ops run themselves.
          </p>
          <a
            href="/contact#project-intake"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#D7B46A] px-7 py-3.5 text-sm font-bold text-[#050505] shadow-[0_14px_40px_rgba(215,180,106,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(215,180,106,0.28)]"
          >
            Start building
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative mt-14 overflow-hidden rounded-xl bg-[#10100E]/84 p-4 shadow-[0_50px_150px_rgba(0,0,0,0.48)] ring-1 ring-white/10 md:p-6"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(96,230,210,0.18),transparent_20rem),linear-gradient(120deg,rgba(215,180,106,0.08),transparent_34%,rgba(142,124,255,0.07)_72%,transparent)]" />
          <motion.div
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { x: ["-25%", "125%"] }}
            transition={shouldReduceMotion ? undefined : { duration: 5.8, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 h-full w-40 bg-gradient-to-r from-transparent via-white/8 to-transparent"
          />

          <div className="relative min-h-[580px] overflow-hidden rounded-lg bg-black/32 ring-1 ring-white/8 md:min-h-[560px]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-80" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
              <path d="M160 170 C290 120 390 180 470 265" stroke="rgba(215,180,106,0.30)" strokeWidth="2" fill="none" />
              <path d="M835 150 C700 105 605 170 530 265" stroke="rgba(96,230,210,0.28)" strokeWidth="2" fill="none" />
              <path d="M160 440 C300 510 410 420 472 320" stroke="rgba(142,124,255,0.28)" strokeWidth="2" fill="none" />
              <path d="M840 442 C680 510 605 420 532 320" stroke="rgba(240,106,61,0.24)" strokeWidth="2" fill="none" />
            </svg>

            {signals.map((signal, index) => (
              <motion.div
                key={signal.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                animate={shouldReduceMotion ? undefined : { y: [0, index % 2 === 0 ? -8 : 8, 0] }}
                transition={{
                  opacity: { duration: 0.45, delay: index * 0.08 },
                  scale: { duration: 0.45, delay: index * 0.08 },
                  y: { duration: 5 + index * 0.4, repeat: Infinity, ease: "easeInOut" },
                }}
                className={`absolute h-[6.5rem] w-24 place-items-center rounded-2xl bg-white/[0.035] shadow-[0_18px_55px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur ${signal.mobile ? "grid" : "hidden md:grid"} ${signal.className}`}
              >
                <div className={signal.color}>
                  <SignalGlyph kind={signal.kind} />
                </div>
                <span className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-white/42">{signal.label}</span>
                <span className="text-[9px] font-medium leading-none text-current opacity-60">{signal.outcome}</span>
              </motion.div>
            ))}

            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, -10, 0], rotateX: [5, 3, 5], rotateY: [-7, -4, -7] }}
              transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-[44%] z-20 w-[78%] max-w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#11100E]/96 p-4 shadow-[0_42px_130px_rgba(0,0,0,0.62),inset_0_0_0_1px_rgba(255,255,255,0.10)] md:w-[64%] md:p-5"
              style={{ transformPerspective: 1100 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F06A3D]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#D7B46A]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#60E6D2]" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.18em] text-white/24">Live presence</span>
              </div>

              <div className="overflow-hidden rounded-xl bg-[linear-gradient(135deg,rgba(215,180,106,0.24),rgba(96,230,210,0.14)_48%,rgba(142,124,255,0.18))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr]">
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-white/38">ibdadev.com</span>
                    <p className="mt-4 text-2xl font-black uppercase leading-tight text-white/88 md:text-3xl">Book a<br />Discovery Call</p>
                    <p className="mt-2 text-xs font-medium text-white/50">AI-connected business systems</p>
                    <span className="mt-6 inline-flex items-center gap-2 bg-[#D7B46A] px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-black">
                      Get Started →
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "47", label: "Leads" },
                      { value: "12", label: "Automations" },
                      { value: "3.2×", label: "ROI" },
                      { value: "Live", label: "Systems" },
                    ].map((metric) => (
                      <span key={metric.label} className="flex min-h-24 flex-col items-center justify-center rounded-lg bg-black/22 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                        <span className="text-xl font-black text-white/80">{metric.value}</span>
                        <span className="mt-1 text-[9px] font-black uppercase tracking-[0.14em] text-white/38">{metric.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, 10, 0], rotate: [1.5, 0, 1.5] }}
              transition={shouldReduceMotion ? undefined : { duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 right-[9%] z-30 w-40 rounded-[1.35rem] bg-[#171512]/94 p-3 shadow-[0_26px_90px_rgba(0,0,0,0.52),inset_0_0_0_1px_rgba(255,255,255,0.08)] md:w-48"
            >
              <div className="rounded-[1rem] bg-black/42 p-3">
                <p className="mb-2 text-[9px] font-black uppercase tracking-[0.18em] text-white/34">Mobile App</p>
                <span className="block h-20 rounded-lg bg-[linear-gradient(135deg,rgba(96,230,210,0.30),rgba(215,180,106,0.18))]" />
                <span className="mt-3 block h-2 w-4/5 rounded-full bg-white/20" />
                <span className="mt-2 block h-2 w-3/5 rounded-full bg-white/14" />
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <span className="flex h-10 items-center justify-center rounded-md bg-white/[0.035] text-[8px] font-black uppercase tracking-wide text-white/30">Book</span>
                  <span className="flex h-10 items-center justify-center rounded-md bg-white/[0.035] text-[8px] font-black uppercase tracking-wide text-white/30">Track</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={shouldReduceMotion ? undefined : { x: [0, -8, 0], y: [0, 5, 0] }}
              transition={shouldReduceMotion ? undefined : { duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-14 left-[9%] z-30 hidden w-56 rounded-2xl bg-[#11100E]/90 p-4 shadow-[0_22px_80px_rgba(0,0,0,0.46),inset_0_0_0_1px_rgba(215,180,106,0.10)] md:block"
            >
              <p className="mb-3 text-[9px] font-black uppercase tracking-[0.18em] text-white/34">Lead Growth</p>
              <div className="flex items-end gap-2">
                {[34, 58, 45, 76, 63].map((height, index) => (
                  <span
                    key={height}
                    className="w-full rounded-t-md"
                    style={{
                      height,
                      backgroundColor: index === 3 ? "#D7B46A" : index === 4 ? "#60E6D2" : "rgba(255,255,255,0.12)",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="marquee-fade mt-8 overflow-hidden py-6">
          <motion.div
            animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={shouldReduceMotion ? undefined : { duration: 26, repeat: Infinity, ease: "linear" }}
            className="flex w-max items-center gap-12"
          >
            {repeatedTools.map((tool, index) => (
              <span
                key={`${tool.name}-${index}`}
                className={`flex items-center gap-3 whitespace-nowrap px-1 py-3 text-sm font-black uppercase tracking-[0.15em] opacity-70 transition-opacity hover:opacity-100 ${tool.tone}`}
              >
                <StackLogo kind={tool.kind} />
                <span className="text-white/48">{tool.name}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
