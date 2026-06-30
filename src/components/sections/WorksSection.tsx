"use client";

import React from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type Work = {
  title: string;
  type: string;
  statement: string;
  accent: string;
  tags: string[];
  metric: string;
  layout: "mobile" | "commerce" | "ai" | "portal";
};

const works: Work[] = [
  {
    title: "Mobile service app",
    type: "iOS + Android workflow",
    statement: "A customer and team app for bookings, updates, payments, and service status.",
    accent: "#D7B46A",
    tags: ["Mobile", "Booking", "Payments"],
    metric: "Business in the pocket",
    layout: "mobile",
  },
  {
    title: "Commerce platform",
    type: "Storefront + admin",
    statement: "A premium buying experience with the operations layer behind it.",
    accent: "#F06A3D",
    tags: ["Next.js", "Payments", "Admin"],
    metric: "Built for launch",
    layout: "commerce",
  },
  {
    title: "AI lead desk",
    type: "Sales automation",
    statement: "Leads are qualified, answered, and routed before the team opens chat.",
    accent: "#60E6D2",
    tags: ["AI", "CRM", "Routing"],
    metric: "Reply time: minutes",
    layout: "ai",
  },
  {
    title: "Client portal",
    type: "SaaS workspace",
    statement: "Requests, files, invoices, and project status in one simple product.",
    accent: "#F06A3D",
    tags: ["Auth", "Dashboard", "Billing"],
    metric: "One source of truth",
    layout: "portal",
  },
];

const Preview = ({ work }: { work: Work }) => {
  if (work.layout === "mobile") {
    return (
      <div className="relative min-h-[360px] overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-[#080806] p-5">
        <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_50%_0%,rgba(215,180,106,0.28),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-[520px] grid-cols-[0.72fr_0.28fr] gap-4">
          <div className="animate-float-small rounded-[2rem] border border-white/12 bg-[#10100D] p-3 shadow-[0_34px_110px_rgba(0,0,0,0.48)]">
            <div className="screen-scan rounded-[1.55rem] bg-[#070706] p-4">
              <div className="mb-5 flex items-center justify-between">
                <span className="h-1.5 w-10 rounded-full bg-white/18" />
                <span className="live-pulse rounded-full bg-[#60E6D2] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-black">
                  Live
                </span>
              </div>
              <div className="sheen-surface rounded-2xl p-4 text-black">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-black/50">
                  Next booking
                </p>
                <p className="mt-3 font-display text-4xl font-black leading-none">
                  09:30
                </p>
                <p className="mt-2 text-xs font-bold text-black/55">
                  Paid and assigned
                </p>
              </div>
              <div className="mt-4 grid gap-3">
                {["Customer update", "Technician route", "Invoice sent"].map((item) => (
                  <div key={item} className="motion-progress flex items-center justify-between rounded-xl bg-white/[0.07] px-3 py-3">
                    <span className="text-xs font-bold text-white/62">{item}</span>
                    <span className="h-2 w-2 rounded-full bg-[#D7B46A]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-3 py-8">
            {["Book", "Pay", "Track"].map((item, index) => (
              <div key={item} className="animate-float-small rounded-2xl bg-white/[0.055] p-3" style={{ animationDelay: `${index * 0.24}s` }}>
                <p className="text-[9px] font-black uppercase tracking-[0.14em] text-white/30">0{index + 1}</p>
                <p className="mt-5 text-sm font-black text-white/72">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (work.layout === "commerce") {
    return (
      <div className="relative grid h-full min-h-[320px] grid-cols-[0.72fr_0.28fr] gap-4 rounded-[1.25rem] border border-white/[0.08] bg-[#080806] p-4">
        <div className="overflow-hidden rounded-2xl bg-[#16110C]">
          <div className="sheen-surface h-2/3 opacity-85" />
          <div className="p-4">
            <div className="h-3 w-2/3 rounded-full bg-white/55" />
            <div className="mt-3 h-2 w-1/2 rounded-full bg-white/20" />
            <div className="mt-5 grid grid-cols-3 gap-2">
              <span className="h-16 rounded-xl bg-white/[0.08]" />
              <span className="h-16 rounded-xl bg-white/[0.08]" />
              <span className="h-16 rounded-xl bg-white/[0.08]" />
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          {["Orders", "Stock", "Revenue"].map((item, index) => (
            <div key={item} className="motion-progress rounded-xl bg-white/[0.055] p-3">
              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-white/32">{item}</p>
              <p className="mt-3 font-display text-2xl font-black text-white">{index === 0 ? "128" : index === 1 ? "94%" : "Live"}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (work.layout === "ai") {
    return (
      <div className="relative h-full min-h-[320px] rounded-[1.25rem] border border-white/[0.08] bg-[#07110F] p-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-[#60E6D2]/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#60E6D2]">
            AI queue
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/30">24/7</span>
        </div>
        <div className="grid gap-3">
          {[
            ["WhatsApp inquiry", "High intent"],
            ["Website form", "Needs quote"],
            ["Missed call", "Follow up"],
            ["Email request", "Route to sales"],
          ].map(([source, state], index) => (
            <div key={source} className="motion-progress grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl bg-white/[0.055] p-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#60E6D2]/15 text-xs font-black text-[#60E6D2]">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-black text-white/78">{source}</p>
                <p className="mt-1 text-xs font-semibold text-white/32">{state}</p>
              </div>
              <span className="live-pulse h-2.5 w-2.5 rounded-full bg-[#60E6D2]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[320px] rounded-[1.25rem] border border-white/[0.08] bg-[#130B08] p-4">
      <div className="grid h-full gap-4 md:grid-cols-[0.36fr_0.64fr]">
        <div className="rounded-2xl bg-white/[0.055] p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#F06A3D]">Portal</p>
          <div className="mt-6 grid gap-2">
            <span className="h-8 rounded-lg bg-[#F06A3D]/25" />
            <span className="h-8 rounded-lg bg-white/[0.08]" />
            <span className="h-8 rounded-lg bg-white/[0.08]" />
            <span className="h-8 rounded-lg bg-white/[0.08]" />
          </div>
        </div>
        <div className="rounded-2xl bg-[#090806] p-4">
          <div className="sheen-surface mb-4 h-24 rounded-xl" />
          <div className="grid gap-3">
            {["Request approved", "Files received", "Invoice ready"].map((item) => (
              <div key={item} className="motion-progress flex items-center justify-between rounded-xl bg-white/[0.055] px-3 py-3">
                <span className="text-xs font-bold text-white/62">{item}</span>
                <span className="h-2 w-2 rounded-full bg-[#F06A3D]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkCard = ({ work, index }: { work: Work; index: number }) => {
  const offset = index === 0 ? 0 : index === 1 ? -26 : index === 3 ? 26 : 0;

  return (
    <ScrollReveal direction={offset < 0 ? "left" : offset > 0 ? "right" : "up"} distance={48}>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.24 }}
        className={index === 0 ? "grid gap-5 lg:grid-cols-[0.52fr_0.48fr]" : "grid gap-5"}
      >
        <Preview work={work} />
        <div className="brand-card flex flex-col justify-between rounded-[1.25rem] border border-white/[0.08] bg-[#0D0C0A] p-6 md:p-7">
          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: work.accent }}>
                {work.type}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/25">
                0{index + 1}
              </span>
            </div>
            <h3 className="font-display text-4xl font-black leading-[0.92] text-white md:text-5xl">
              {work.title}
            </h3>
            <p className="mt-5 max-w-md text-base font-semibold leading-relaxed text-white/58">
              {work.statement}
            </p>
          </div>
          <div className="mt-8">
            <p className="mb-4 font-display text-2xl font-black" style={{ color: work.accent }}>
              {work.metric}
            </p>
            <div className="flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white/44">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </ScrollReveal>
  );
};

export const WorksSection = () => {
  return (
    <section id="selected-systems" className="relative overflow-hidden bg-[#050505] px-6 py-20 md:py-28">
      <div className="brand-texture opacity-[0.32]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <ScrollReveal className="mb-11 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">
              Selected systems
            </p>
            <h2 className="max-w-4xl font-display text-4xl font-black leading-[0.9] text-white md:text-6xl">
              Mobile, web, AI, and business systems in one portfolio.
            </h2>
          </div>
          <a
            href="/work"
            className="inline-flex items-center gap-3 rounded-full border border-white/12 px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-white/62 transition-colors hover:border-[#D7B46A]/50 hover:text-[#D7B46A]"
          >
            View all work
            <span aria-hidden="true">→</span>
          </a>
        </ScrollReveal>

        <div className="grid gap-5">
          <WorkCard work={works[0]} index={0} />
          <div className="grid gap-5 lg:grid-cols-3">
            {works.slice(1).map((work, index) => (
              <WorkCard key={work.title} work={work} index={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
