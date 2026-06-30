"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export const TestimonialSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#080706] px-6 py-20 md:py-28">
      <div className="brand-texture opacity-[0.26]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.97 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className="brand-card grid overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#0D0C0A] lg:grid-cols-[0.64fr_0.36fr]"
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="p-7 md:p-10"
          >
            <p className="mb-7 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">
              Client proof
            </p>
            <blockquote className="font-display text-3xl font-black leading-[1.05] text-white md:text-5xl">
              “Ibda Dev turned scattered business ideas into one clear digital system customers and teams could actually use.”
            </blockquote>
            <div className="mt-8 border-t border-white/[0.08] pt-6">
              <p className="text-base font-black text-white">Founder</p>
              <p className="mt-1 text-sm font-semibold text-white/42">
                Service business client
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="border-t border-white/[0.08] bg-[#050505] p-7 lg:border-l lg:border-t-0 md:p-10"
          >
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/32">
              Result snapshot
            </p>
            <div className="mt-7 grid gap-4">
              {[
                ["Customer surface", "Mobile and web flows feel simple"],
                ["Business engine", "AI and automation reduce repeated work"],
                ["Team handoff", "Docs and access ready at launch"],
              ].map(([title, line]) => (
                <div key={title} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
                  <p className="text-sm font-black text-[#D7B46A]">{title}</p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-white/48">{line}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
