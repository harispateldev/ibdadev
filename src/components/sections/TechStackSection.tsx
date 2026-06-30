"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    title: "Map the business",
    line: "We turn the offer, workflow, users, and bottlenecks into a buildable product plan.",
    accent: "#D7B46A",
    result: "Clear scope",
  },
  {
    title: "Design the surface",
    line: "The interface is shaped around how customers buy and how your team operates.",
    accent: "#60E6D2",
    result: "Clickable product",
  },
  {
    title: "Ship the system",
    line: "We build, connect, test, document, and hand over a system your business can run.",
    accent: "#F06A3D",
    result: "Launch ready",
  },
];

const stack = ["AI", "Web", "Mobile", "CRM", "Payments", "Analytics", "Automation", "Cloud"];

const blueprint = [
  {
    title: "Mobile app",
    line: "Customers and teams act fast",
    accent: "#D7B46A",
  },
  {
    title: "Web platform",
    line: "Sales, content, portals, admin",
    accent: "#60E6D2",
  },
  {
    title: "AI layer",
    line: "Assist, classify, draft, route",
    accent: "#BDA7FF",
  },
  {
    title: "Ops layer",
    line: "Payments, data, tasks, reports",
    accent: "#F06A3D",
  },
];

export const TechStackSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="our-process" className="relative overflow-hidden border-t border-white/8 bg-[#050505] px-6 py-20 md:py-28">
      <div className="brand-texture opacity-[0.34]" aria-hidden="true" />
      <div className="container relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-11 grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end"
        >
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#60E6D2]">
              How we work
            </p>
            <h2 className="max-w-3xl font-display text-4xl font-black leading-[0.9] text-white md:text-6xl">
              Strategy first. Then mobile, web, AI, and operations.
            </h2>
          </div>
          <p className="max-w-xl text-base font-semibold leading-relaxed text-white/52 lg:justify-self-end">
            Cool visuals matter. But the best modern products start from one business flow across every surface your team and customers use.
          </p>
        </motion.div>

        <div className="mb-5 overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-[#0D0C0A] p-4 md:p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] pb-4">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/32">
              Solution blueprint
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-ibda-gold">
              One connected build
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {blueprint.map((item, index) => (
              <motion.div
                key={item.title}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: index < 2 ? -32 : 32,
                        y: 18,
                        scale: 0.95,
                      }
                }
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-90px" }}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.58, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="brand-card relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#050505] p-4"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-xl text-xs font-black text-black" style={{ backgroundColor: item.accent }}>
                    {index + 1}
                  </span>
                  <span className="live-pulse h-2 w-2 rounded-full" style={{ backgroundColor: item.accent }} />
                </div>
                <h3 className="font-display text-2xl font-black leading-none text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-xs font-semibold leading-relaxed text-white/44">
                  {item.line}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.97 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.58, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="brand-card relative overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-[#0D0C0A] p-6 md:p-7"
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${step.accent}, transparent)` }}
              />
              <div className="mb-10 flex items-center justify-between">
                <span className="font-display text-5xl font-black leading-none text-white/[0.08]">
                  0{index + 1}
                </span>
                <span className="rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-black" style={{ backgroundColor: step.accent }}>
                  {step.result}
                </span>
              </div>
              <h3 className="font-display text-3xl font-black leading-none text-white md:text-4xl">
                {step.title}
              </h3>
              <p className="mt-5 text-sm font-semibold leading-relaxed text-white/54">
                {step.line}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.2rem] border border-white/[0.08] bg-white/[0.03] p-3">
          <div className="motion-marquee flex w-max gap-2">
            {[...stack, ...stack, ...stack].map((item, index) => (
              <span key={`${item}-${index}`} className="rounded-full bg-[#050505] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/42">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
