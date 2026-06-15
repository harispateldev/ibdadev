"use client";

import React from "react";
import { motion } from "framer-motion";

// ── Data ─────────────────────────────────────────────────────────────────────

// Replaced {Strategy, Interface, Motion, Launch} with outcome-framed language.
// A founder reads "Conversion design" and understands the business intent.
// They read "Interface" and have to guess.
const capabilities = [
  {
    label: "Clear positioning",
    note:  "Audience, offer, and proof defined before any design starts",
  },
  {
    label: "Conversion design",
    note:  "Interfaces that explain the business and guide visitors to act",
  },
  {
    label: "Scalable systems",
    note:  "Components and patterns built to run without us",
  },
  {
    label: "Launch support",
    note:  "Tested, documented, and handed over clean",
  },
];

const operatingModel = [
  {
    label: "01",
    title: "Positioning first",
    body:  "We clarify the audience, offer, proof, and conversion path before visual exploration starts.",
  },
  {
    label: "02",
    title: "Designed as a system",
    body:  "Pages, sections, states, and motion rules are built to be reused — not recreated every time content changes.",
  },
  {
    label: "03",
    title: "Shipped with restraint",
    body:  "Rich details are kept lightweight. Motion supports comprehension, performance, and accessibility.",
  },
];

// Proof stats: trust bridge between "we have principles" and "here's evidence"
const proofStats = [
  { stat: "50+",   label: "Projects delivered",    sub: "Same process every time" },
  { stat: "100%",  label: "Handoffs documented",   sub: "Nothing ships without it" },
  { stat: "2 wks", label: "Brief to first designs", sub: "Every project"           },
];

// Each role now has its own specific description.
// The previous version used identical copy across all four — a trust signal failure.
const deliveryRoles = [
  {
    title: "Strategy and offer architecture",
    body:  "We map audience, offer, proof, and objections before a layout is touched. Revisions happen in writing, not in production.",
  },
  {
    title: "Brand direction and interface design",
    body:  "Identity and interface built as one system — typography, colour, components, and states designed to scale.",
  },
  {
    title: "Frontend engineering and motion",
    body:  "Production-grade code, optimised for performance and accessibility. Motion supports comprehension — never decoration.",
  },
  {
    title: "QA, analytics, and launch handoff",
    body:  "Everything is tested and documented before it ships. Your team runs it from day one — no follow-up calls needed.",
  },
];

// Reordered so the final standard reads as a guarantee, not a restriction
const standards = [
  "No template-first layouts",
  "No decorative motion without a conversion reason",
  "No motion that blocks reading or speed",
  "Nothing ships without QA, content rules, and a documented handoff",
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] px-6 pt-32 text-white">

      {/* ── Hero ── */}
      <section className="container mx-auto grid max-w-7xl gap-14 pb-20 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">

        {/* Left: headline + human statement */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <span className="mb-6 block text-xs font-black uppercase tracking-[0.26em] text-[#D7B46A]">
            About IbdaDev
          </span>
          <h1 className="text-5xl font-black leading-[0.9] tracking-normal md:text-7xl lg:text-8xl">
            A small agency built for serious digital systems.
          </h1>
          {/* The human statement that answers "why small?" — builds trust instantly */}
          <p className="mt-7 max-w-sm text-[0.9375rem] font-medium leading-relaxed text-white/38">
            We stay intentionally small so the people you hire are the people doing the work.
          </p>
        </motion.div>

        {/* Right: supporting explanation + outcome-framed capability list */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="lg:pt-2"
        >
          <p className="text-xl leading-relaxed text-white/60">
            IbdaDev works with founders and teams who need their website, interface, or brand system
            to explain the business clearly, feel premium, and survive real launch constraints.
          </p>

          {/* Capability list — outcome language replaces discipline labels */}
          <ul className="mt-8 flex flex-col gap-2">
            {capabilities.map((cap) => (
              <li
                key={cap.label}
                className="flex items-start gap-3 rounded-lg border border-white/[0.08] bg-white/[0.026] px-4 py-3.5"
              >
                <span className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#D7B46A]/65" />
                <div>
                  <span className="block text-sm font-black text-white/82">{cap.label}</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-white/32">{cap.note}</span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ── Operating principles ── */}
      <section className="border-y border-white/[0.08]">
        <div className="container mx-auto grid max-w-7xl gap-5 py-20 md:grid-cols-3">
          {operatingModel.map((item, index) => (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.52, delay: index * 0.09 }}
              className="rounded-lg border border-white/[0.10] bg-white/[0.030] p-6"
            >
              {/* Reduced mb-10 → mb-6: the previous value left too much dead space */}
              <span className="mb-6 block text-sm font-black text-[#D7B46A]">{item.label}</span>
              <h2 className="text-2xl font-black tracking-normal text-white">{item.title}</h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/54">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── Proof stats ── */}
      {/* Trust bridge: answers "why should I believe those principles?" */}
      {/* Positioned between principles and delivery — validates the claims above */}
      <section className="border-b border-white/[0.08]">
        <div className="container mx-auto grid max-w-7xl gap-px bg-white/[0.055] sm:grid-cols-3">
          {proofStats.map((item) => (
            <div key={item.stat} className="bg-[#050505] px-8 py-10">
              <p className="text-4xl font-black text-[#D7B46A] md:text-5xl">{item.stat}</p>
              <p className="mt-2 text-sm font-bold text-white/68">{item.label}</p>
              <p className="mt-0.5 text-[11px] text-white/28">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Delivery model ── */}
      <section className="container mx-auto grid max-w-7xl gap-12 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <span className="mb-5 block text-xs font-black uppercase tracking-[0.26em] text-[#D7B46A]">
            Delivery model
          </span>
          {/* Flipped to lead with the positive: "complete path" first, "not random tasks" second */}
          <h2 className="text-4xl font-black leading-[0.96] tracking-normal md:text-5xl">
            You hire a complete path to launch — not a random set of tasks.
          </h2>
        </div>

        <div className="space-y-3">
          {deliveryRoles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.46, delay: index * 0.06 }}
              className="grid gap-4 rounded-lg border border-white/[0.09] bg-[#080808] p-5 md:grid-cols-[auto_1fr]"
            >
              <span className="text-3xl font-black text-white/12 md:text-4xl">0{index + 1}</span>
              <div>
                <h3 className="text-xl font-black tracking-normal text-white">{role.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/48">{role.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Standards ── */}
      <section className="container mx-auto max-w-7xl">
        <div className="rounded-lg border border-white/[0.10] bg-white/[0.026] p-6 md:p-9">
          <div className="mb-8 grid gap-4 md:grid-cols-[0.62fr_0.38fr] md:items-end">
            <h2 className="text-3xl font-black tracking-normal text-white md:text-5xl">
              Standards we protect
            </h2>
            <p className="text-sm leading-relaxed text-white/42">
              These rules keep the work from becoming a pretty page that cannot sell, ship, or scale.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {standards.map((standard, index) => (
              <div
                key={standard}
                className="rounded-lg border border-white/[0.08] bg-[#050505] p-5"
              >
                <span className="mb-4 block text-[10px] font-black text-[#D7B46A]">0{index + 1}</span>
                <p className="text-sm font-bold leading-relaxed text-white/58">{standard}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing row ── */}
      {/* Answers "now what?" — every page needs a next step.     */}
      {/* Not a hard CTA (CTASection handles that) — a handshake. */}
      <section className="container mx-auto mt-8 max-w-7xl border-t border-white/[0.06] pb-20 pt-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xl font-black text-white/82">
              See the work.
            </p>
            <p className="mt-1.5 text-sm text-white/34">
              Every project runs the same process. Every handoff is documented.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/work"
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.10] bg-white/[0.038] px-5 py-3 text-sm font-black uppercase tracking-[0.10em] text-white/65 transition-colors hover:bg-white/[0.07] hover:text-white/85"
            >
              Case studies
            </a>
            <a
              href="/work#start-project"
              className="inline-flex items-center gap-2 rounded-lg border border-[#D7B46A]/28 bg-[#D7B46A]/[0.09] px-5 py-3 text-sm font-black uppercase tracking-[0.10em] text-[#D7B46A] transition-colors hover:border-[#D7B46A]/50 hover:bg-[#D7B46A]/[0.15]"
            >
              Start a project
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path
                  d="M1.5 5.5h8M6 1.5l4 4-4 4"
                  stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
