"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Service = {
  number: string;
  title: string;
  line: string;
  accent: string;
  kind: "mobile" | "web" | "ai" | "commerce" | "automation" | "dashboard";
};

const services: Service[] = [
  {
    number: "01",
    title: "Mobile apps",
    line: "Customer apps, internal tools, booking flows, and field-team workflows.",
    accent: "#D7B46A",
    kind: "mobile",
  },
  {
    number: "02",
    title: "Web platforms",
    line: "Premium websites, portals, SaaS products, and business dashboards.",
    accent: "#60E6D2",
    kind: "web",
  },
  {
    number: "03",
    title: "AI systems",
    line: "Assistants, lead qualification, document workflows, and smart routing.",
    accent: "#BDA7FF",
    kind: "ai",
  },
  {
    number: "04",
    title: "Commerce",
    line: "Storefronts, payments, admin panels, stock, orders, and reporting.",
    accent: "#F06A3D",
    kind: "commerce",
  },
  {
    number: "05",
    title: "Automation",
    line: "Connect the tools your team already uses and remove repeated work.",
    accent: "#73E2A7",
    kind: "automation",
  },
  {
    number: "06",
    title: "Business dashboards",
    line: "Live visibility into sales, tasks, operations, and performance.",
    accent: "#7AB8FF",
    kind: "dashboard",
  },
];

const MiniSurface = ({ service }: { service: Service }) => {
  if (service.kind === "mobile") {
    return (
      <div className="relative h-52 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080806] p-4">
        <div className="animate-float-small mx-auto h-full max-w-[132px] rounded-[1.55rem] border border-white/12 bg-[#12110E] p-2">
          <div className="screen-scan h-full rounded-[1.15rem] bg-[#070706] p-3">
            <div className="mb-3 h-1.5 w-9 rounded-full bg-white/18" />
            <div className="sheen-surface rounded-xl p-3 text-black">
              <p className="text-[8px] font-black uppercase tracking-[0.12em] text-black/50">Mobile</p>
              <p className="mt-2 font-display text-xl font-black leading-none">Book</p>
            </div>
            <div className="mt-3 grid gap-2">
              <span className="h-7 rounded-lg bg-white/[0.08]" />
              <span className="h-7 rounded-lg bg-white/[0.08]" />
              <span className="h-7 rounded-lg bg-white/[0.08]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (service.kind === "web") {
    return (
      <div className="relative h-52 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080806] p-4">
        <div className="screen-scan rounded-2xl border border-white/10 bg-[#10100D]">
          <div className="flex gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-[#F06A3D]" />
            <span className="h-2 w-2 rounded-full bg-[#D7B46A]" />
            <span className="h-2 w-2 rounded-full bg-[#60E6D2]" />
          </div>
          <div className="p-4">
            <div className="sheen-surface h-16 rounded-xl" />
            <div className="mt-3 grid grid-cols-3 gap-2">
              <span className="h-12 rounded-lg bg-white/[0.07]" />
              <span className="h-12 rounded-lg bg-white/[0.07]" />
              <span className="h-12 rounded-lg bg-white/[0.07]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (service.kind === "ai") {
    return (
      <div className="relative h-52 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080806] p-4">
        <div className="grid gap-3">
          {["Classify request", "Draft response", "Route owner"].map((item, index) => (
            <div key={item} className="motion-progress grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl bg-white/[0.045] px-3 py-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg text-xs font-black text-black" style={{ backgroundColor: index === 1 ? service.accent : `${service.accent}99` }}>
                {index + 1}
              </span>
              <span className="text-xs font-bold text-white/64">{item}</span>
              <span className="live-pulse h-2 w-2 rounded-full" style={{ backgroundColor: service.accent }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (service.kind === "commerce") {
    return (
      <div className="relative h-52 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080806] p-4">
        <div className="grid h-full grid-cols-[0.62fr_0.38fr] gap-3">
          <div className="rounded-2xl bg-[#15100C] p-3">
          <div className="sheen-surface h-20 rounded-xl" />
            <div className="mt-3 h-2 w-2/3 rounded-full bg-white/38" />
            <div className="mt-2 h-2 w-1/2 rounded-full bg-white/14" />
          </div>
          <div className="grid gap-2">
            <span className="rounded-xl bg-white/[0.07]" />
            <span className="rounded-xl bg-white/[0.07]" />
            <span className="rounded-xl bg-white/[0.07]" />
          </div>
        </div>
      </div>
    );
  }

  if (service.kind === "automation") {
    return (
      <div className="relative h-52 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080806] p-4">
        <div className="absolute left-[22%] right-[22%] top-1/2 h-px bg-white/12" />
        <div className="relative grid h-full grid-cols-3 items-center gap-3">
          {["CRM", "AI", "Team"].map((item, index) => (
            <div key={item} className="animate-float-small rounded-2xl border border-white/[0.08] bg-white/[0.045] p-3 text-center" style={{ animationDelay: `${index * 0.28}s` }}>
              <span className="mx-auto mb-4 block h-9 w-9 rounded-xl" style={{ backgroundColor: index === 1 ? service.accent : `${service.accent}2a` }} />
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-white/54">{item}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-52 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080806] p-4">
      <div className="grid h-full grid-cols-[0.45fr_0.55fr] gap-3">
        <div className="grid gap-2">
          <span className="rounded-xl bg-white/[0.07]" />
          <span className="rounded-xl bg-white/[0.07]" />
          <span className="rounded-xl bg-white/[0.07]" />
        </div>
        <div className="flex items-end gap-2 rounded-2xl bg-white/[0.045] p-4">
          {[42, 72, 55, 92].map((height, index) => (
            <span key={height} className="flex-1 origin-bottom animate-float-small rounded-t-lg" style={{ height: `${height}%`, backgroundColor: index === 3 ? service.accent : `${service.accent}66`, animationDelay: `${index * 0.18}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const ServicesGrid = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="relative overflow-hidden bg-[#070706] px-6 py-20 md:py-28">
      <div className="brand-texture opacity-[0.38]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-11 grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end"
        >
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">
              What we build
            </p>
            <h2 className="max-w-3xl font-display text-4xl font-black leading-[0.92] text-white md:text-6xl">
              Complete digital solutions, not random pieces.
            </h2>
          </div>
          <p className="max-w-xl text-base font-semibold leading-relaxed text-white/52 lg:justify-self-end">
            We design and build the mobile apps, web platforms, AI systems, and operations tools a business needs to sell, serve, and scale.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 38,
                      x: index % 3 === 0 ? -24 : index % 3 === 2 ? 24 : 0,
                      scale: 0.96,
                    }
              }
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, x: 0, scale: 1 }}
              whileHover={{ y: -8, scale: 1.01 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.62, delay: index * 0.055, ease: [0.16, 1, 0.3, 1] }}
              className="brand-card group overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-[#0D0C0A] p-4 transition-colors duration-300 hover:border-white/16 hover:bg-[#11100D] md:p-5"
            >
              <MiniSurface service={service} />
              <div className="mt-5 flex items-start justify-between gap-5">
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: service.accent }}>
                    {service.number}
                  </span>
                  <h3 className="mt-2 font-display text-3xl font-black leading-none text-white md:text-4xl">
                    {service.title}
                  </h3>
                </div>
                <span className="pt-2 text-xl text-white/24 transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </div>
              <p className="mt-4 max-w-lg text-sm font-semibold leading-relaxed text-white/54">
                {service.line}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
