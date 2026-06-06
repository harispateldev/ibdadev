"use client";

import React from "react";
import { motion } from "framer-motion";

const operatingModel = [
  {
    label: "01",
    title: "Positioning first",
    body: "We clarify the audience, offer, proof, and conversion path before visual exploration starts.",
  },
  {
    label: "02",
    title: "Designed as a system",
    body: "Pages, sections, states, and motion rules are built to be reused, not recreated every time content changes.",
  },
  {
    label: "03",
    title: "Shipped with restraint",
    body: "Rich details are kept lightweight. Motion supports comprehension, performance, and accessibility.",
  },
];

const deliveryRoles = [
  "Strategy and offer architecture",
  "Brand direction and interface design",
  "Frontend engineering and motion",
  "QA, analytics, and launch handoff",
];

const standards = [
  "No template-first layouts",
  "No decorative motion without a conversion reason",
  "No handoff without content and QA rules",
  "No motion that blocks reading or speed",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] px-6 pt-32 text-white">
      <section className="container mx-auto grid max-w-7xl gap-14 pb-24 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <span className="mb-6 block text-xs font-black uppercase tracking-[0.26em] text-[#D7B46A]">About IbdaDev</span>
          <h1 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-normal md:text-8xl">
            A small agency built for serious digital systems.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="max-w-2xl"
        >
          <p className="text-xl leading-relaxed text-white/62">
            IbdaDev works with founders and teams who need their website, interface, or brand system to explain the
            business clearly, feel premium, and survive real launch constraints.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {["Strategy", "Interface", "Motion", "Launch"].map((item) => (
              <span key={item} className="rounded-lg border border-white/10 bg-white/[0.035] px-4 py-4 text-sm font-black uppercase tracking-[0.14em] text-white/54">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="border-y border-white/10 py-20">
        <div className="container mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {operatingModel.map((item) => (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className="rounded-lg border border-white/12 bg-white/[0.035] p-6"
            >
              <span className="mb-10 block text-sm font-black text-[#D7B46A]">{item.label}</span>
              <h2 className="text-2xl font-black tracking-normal text-white">{item.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-white/56">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="container mx-auto grid max-w-7xl gap-12 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <span className="mb-5 block text-xs font-black uppercase tracking-[0.26em] text-[#D7B46A]">Delivery model</span>
          <h2 className="max-w-3xl text-4xl font-black leading-[0.96] tracking-normal md:text-6xl">
            You do not hire a random set of tasks. You hire a complete path to launch.
          </h2>
        </div>

        <div className="space-y-4">
          {deliveryRoles.map((role, index) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="grid gap-5 rounded-lg border border-white/12 bg-[#080808] p-5 md:grid-cols-[0.18fr_0.82fr]"
            >
              <span className="text-4xl font-black text-white/18">0{index + 1}</span>
              <div>
                <h3 className="text-2xl font-black tracking-normal text-white">{role}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/52">
                  Defined before execution, reviewed during production, and packaged into the final handoff.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-7xl pb-28">
        <div className="rounded-lg border border-white/12 bg-white/[0.035] p-6 md:p-9">
          <div className="mb-8 grid gap-4 md:grid-cols-[0.62fr_0.38fr] md:items-end">
            <h2 className="text-3xl font-black tracking-normal text-white md:text-5xl">Standards we protect</h2>
            <p className="text-sm leading-relaxed text-white/48">
              These rules keep the work from becoming a pretty page that cannot sell, ship, or scale.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {standards.map((standard, index) => (
              <div key={standard} className="min-h-36 rounded-lg border border-white/10 bg-[#050505] p-4">
                <span className="mb-5 block text-xs font-black text-[#D7B46A]">0{index + 1}</span>
                <p className="text-sm font-bold leading-relaxed text-white/62">{standard}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
