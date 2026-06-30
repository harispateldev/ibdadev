"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const stats = [
  {
    value: "12",
    label: "products shipped",
    note: "mobile, web, AI, SaaS, commerce",
  },
  {
    value: "3",
    label: "continents served",
    note: "remote delivery, clear handoff",
  },
  {
    value: "100%",
    label: "handoff ready",
    note: "docs, access, walkthrough",
  },
];

const promises = [
  "Solution before screen",
  "Business flow before tech stack",
  "Launch and handoff before finish",
];

export const StatsSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="proof-discipline" className="relative overflow-hidden bg-[#0A0907] px-6 py-16 md:py-20">
      <div className="brand-texture opacity-[0.28]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ibda-gold/20 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 lg:grid-cols-[0.55fr_1fr] lg:items-end"
        >
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">
              Proof
            </p>
            <h2 className="font-display text-4xl font-black leading-[0.9] text-white md:text-6xl">
              Modern work. Clean delivery.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 24,
                        x: index === 0 ? -22 : index === 2 ? 22 : 0,
                        scale: 0.96,
                      }
                }
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, x: 0, scale: 1 }}
                whileHover={{ y: -6, scale: 1.015 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.58, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="brand-card rounded-[1.2rem] border border-white/[0.08] bg-white/[0.035] p-5"
              >
                <p className="font-display text-5xl font-black leading-none text-white md:text-6xl">
                  {item.value}
                </p>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-ibda-gold">
                  {item.label}
                </p>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-white/45">
                  {item.note}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {promises.map((promise, index) => (
            <motion.div
              key={promise}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.42, delay: 0.16 + index * 0.05 }}
              className="rounded-full border border-white/[0.08] bg-[#050505]/70 px-5 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-white/52"
            >
              {promise}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
