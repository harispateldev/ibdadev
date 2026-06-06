"use client";

import React from "react";
import { motion } from "framer-motion";
import { CTASection } from "@/components/sections/CTASection";

const cases = [
  {
    type: "Founder launch",
    title: "A credible first impression before the first sales call.",
    context: "For new companies that need positioning, identity, and a sharp web presence fast.",
    outcome: "A launch-ready story, visual system, and conversion page that make the company easier to trust.",
    scope: ["Positioning", "Art direction", "Landing page", "Launch assets"],
    accent: "#D7B46A",
  },
  {
    type: "B2B website",
    title: "A service site rebuilt around buyer confidence.",
    context: "For teams whose current website looks fine but fails to explain the offer clearly.",
    outcome: "A stronger page sequence: problem, offer, proof, process, and a clear inquiry path.",
    scope: ["Offer architecture", "UX writing", "Next.js build", "Analytics map"],
    accent: "#7C6BFF",
  },
  {
    type: "Product interface",
    title: "A product surface designed for repeat use.",
    context: "For dashboards, portals, and internal tools where clarity beats decoration.",
    outcome: "A calmer interface system with better scanning, states, and handoff rules.",
    scope: ["User flows", "Wireframes", "UI system", "Coded components"],
    accent: "#59D7F7",
  },
];

const intake = [
  "What needs to improve?",
  "Who has to believe it?",
  "What proof already exists?",
  "What has to ship first?",
];

const CasePreview = ({ accent }: { accent: string }) => (
  <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-white/12 bg-[#080808] p-4">
    <div className="absolute -right-16 top-8 h-44 w-44 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: accent }} />
    <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B6B]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFD166]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#6EE7B7]" />
      </div>
      <span className="h-2 w-20 rounded-full" style={{ backgroundColor: accent }} />
    </div>
    <div className="grid h-[260px] grid-cols-[0.8fr_1.2fr] gap-4">
      <div className="space-y-4">
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
          <span className="mb-8 block h-2 w-14 rounded-full" style={{ backgroundColor: accent }} />
          <span className="mb-3 block h-4 w-4/5 rounded bg-white/30" />
          <span className="mb-2 block h-2 w-full rounded bg-white/15" />
          <span className="block h-2 w-2/3 rounded bg-white/10" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[0, 1].map((item) => (
            <span key={item} className="h-24 rounded-lg border border-white/10 bg-white/[0.035]" />
          ))}
        </div>
      </div>
      <div className="grid grid-rows-[1fr_0.7fr] gap-4">
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
          <div className="grid h-full grid-cols-4 items-end gap-3">
            {[52, 72, 48, 88].map((height, index) => (
              <span
                key={height}
                className="rounded-sm bg-white/14"
                style={{ height: `${height}%`, backgroundColor: index === 3 ? accent : undefined }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
          <span className="mb-4 block text-[10px] font-black uppercase tracking-[0.2em] text-white/38">Launch path</span>
          <div className="space-y-3">
            {[92, 78, 64].map((width) => (
              <span key={width} className="block h-2 rounded-full bg-white/14" style={{ width: `${width}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function WorkPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] pt-32 text-white">
      <section className="container mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-12 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <span className="mb-6 block text-xs font-black uppercase tracking-[0.26em] text-[#D7B46A]">Works and engagement patterns</span>
          <h1 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-normal md:text-8xl">
            Work should prove the agency can solve a business problem.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="max-w-xl"
        >
          <p className="text-lg leading-relaxed text-white/60">
            Until a client case study is approved for public release, we show the engagement systems we build most:
            launch identity, conversion websites, and product interfaces.
          </p>
          <div className="mt-8 rounded-lg border border-white/12 bg-white/[0.035] p-5">
            <span className="mb-3 block text-xs font-black uppercase tracking-[0.2em] text-white/35">How to read this page</span>
            <p className="text-sm leading-relaxed text-white/54">
              Each card explains the buyer moment, expected outcome, and practical scope. This is more useful than a
              pretty image with no context.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto max-w-7xl space-y-6 px-6 pb-24">
        {cases.map((item, index) => (
          <motion.article
            key={item.type}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="grid gap-8 rounded-lg border border-white/12 bg-white/[0.035] p-5 md:p-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center"
          >
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg text-sm font-black text-black" style={{ backgroundColor: item.accent }}>
                  0{index + 1}
                </span>
                <span className="text-xs font-black uppercase tracking-[0.24em] text-white/42">{item.type}</span>
              </div>
              <h2 className="max-w-2xl text-3xl font-black leading-[0.98] tracking-normal text-white md:text-5xl">
                {item.title}
              </h2>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/35">Context</span>
                  <p className="text-sm leading-relaxed text-white/56">{item.context}</p>
                </div>
                <div>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/35">Outcome</span>
                  <p className="text-sm leading-relaxed text-white/56">{item.outcome}</p>
                </div>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {item.scope.map((scope) => (
                  <span key={scope} className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-bold text-white/50">
                    {scope}
                  </span>
                ))}
              </div>
            </div>

            <CasePreview accent={item.accent} />
          </motion.article>
        ))}
      </section>

      <section id="start-project" className="container mx-auto max-w-7xl scroll-mt-32 px-6 pb-28">
        <div className="grid gap-8 rounded-lg border border-white/12 bg-[#080808] p-6 md:p-9 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
          <div>
            <span className="mb-5 block text-xs font-black uppercase tracking-[0.26em] text-[#D7B46A]">Before we scope</span>
            <h2 className="text-3xl font-black leading-[0.98] tracking-normal text-white md:text-5xl">
              A good project brief starts with constraints, not inspiration.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/52">
              Bring these four answers into the first conversation and the scope gets sharper fast: what changes, who
              needs to believe it, what proof exists, and what must ship first.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {intake.map((question, index) => (
              <div key={question} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <span className="mb-5 block text-xs font-black text-[#D7B46A]">0{index + 1}</span>
                <p className="text-base font-bold leading-relaxed text-white/62">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
