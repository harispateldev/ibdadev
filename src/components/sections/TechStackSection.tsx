"use client";

import React from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type IconName = "map" | "surface" | "launch" | "mobile" | "web" | "ai" | "ops" | "crm" | "payments" | "analytics" | "automation" | "cloud";

const SystemIcon = ({ name, className = "" }: { name: IconName; className?: string }) => {
  const shared = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      {name === "map" && (
        <>
          <path {...shared} d="M4 6.5 9 4l6 2.5 5-2.5v13.5l-5 2.5-6-2.5-5 2.5V6.5Z" />
          <path {...shared} d="M9 4v13.5M15 6.5V20" />
        </>
      )}
      {name === "surface" && (
        <>
          <rect {...shared} x="4" y="5" width="16" height="11" rx="2.5" />
          <path {...shared} d="M8 20h8M10 16v4M14 16v4M8 9h5M8 12h8" />
        </>
      )}
      {name === "launch" && (
        <>
          <path {...shared} d="M12 3c3.4 1.8 5.4 4.9 5 8.7L12 21l-5-9.3C6.6 7.9 8.6 4.8 12 3Z" />
          <path {...shared} d="M10 12h4M9 17l-3 2M15 17l3 2" />
        </>
      )}
      {name === "mobile" && <rect {...shared} x="8" y="3" width="8" height="18" rx="2.4" />}
      {name === "web" && (
        <>
          <rect {...shared} x="3" y="5" width="18" height="14" rx="2.5" />
          <path {...shared} d="M3 9h18M8 13h5M8 16h8" />
        </>
      )}
      {name === "ai" && (
        <>
          <path {...shared} d="M12 4v16M4 12h16M7 7l10 10M17 7 7 17" />
          <circle {...shared} cx="12" cy="12" r="3" />
        </>
      )}
      {name === "ops" && (
        <>
          <path {...shared} d="M5 7h14M5 12h14M5 17h14" />
          <circle {...shared} cx="8" cy="7" r="2" />
          <circle {...shared} cx="15" cy="12" r="2" />
          <circle {...shared} cx="11" cy="17" r="2" />
        </>
      )}
      {name === "crm" && (
        <>
          <circle {...shared} cx="8" cy="8" r="3" />
          <circle {...shared} cx="16" cy="8" r="3" />
          <path {...shared} d="M4.5 19c.6-3 2.4-4.5 5.5-4.5M14 14.5c3.1 0 4.9 1.5 5.5 4.5" />
        </>
      )}
      {name === "payments" && (
        <>
          <rect {...shared} x="3" y="6" width="18" height="12" rx="2.5" />
          <path {...shared} d="M3 10h18M7 15h3" />
        </>
      )}
      {name === "analytics" && (
        <>
          <path {...shared} d="M4 19V5M4 19h16" />
          <path {...shared} d="M8 15v-4M12 15V8M16 15v-7" />
        </>
      )}
      {name === "automation" && (
        <>
          <path {...shared} d="M6 12a6 6 0 0 1 10.3-4.2L18 9" />
          <path {...shared} d="M18 12a6 6 0 0 1-10.3 4.2L6 15" />
          <path {...shared} d="M18 5v4h-4M6 19v-4h4" />
        </>
      )}
      {name === "cloud" && (
        <>
          <path {...shared} d="M7.5 18H17a4 4 0 0 0 .8-7.9 6 6 0 0 0-11.3 1.8A3.1 3.1 0 0 0 7.5 18Z" />
        </>
      )}
    </svg>
  );
};

const steps = [
  {
    title: "Map the business",
    line: "We clarify the offer, customer journey, team workflow, data, risks, and launch constraints before a screen is designed.",
    accent: "#D7B46A",
    result: "Scope room",
    icon: "map" as IconName,
    proof: ["User flow", "System map", "Release plan"],
  },
  {
    title: "Design the surface",
    line: "We shape the website, app, dashboard, or portal around how customers buy and how the team actually operates.",
    accent: "#60E6D2",
    result: "Clickable product",
    icon: "surface" as IconName,
    proof: ["UX prototype", "UI system", "Content flow"],
  },
  {
    title: "Ship the system",
    line: "We build the stack, connect the tools, test the workflows, document handoff, and make the system ready to run.",
    accent: "#F06A3D",
    result: "Launch ready",
    icon: "launch" as IconName,
    proof: ["Live build", "QA pass", "Handoff docs"],
  },
];

const stack = [
  { label: "Mobile", outcome: "Apps and field flows", icon: "mobile" as IconName, accent: "#D7B46A" },
  { label: "Web", outcome: "Sites, portals, admin", icon: "web" as IconName, accent: "#60E6D2" },
  { label: "AI", outcome: "Assist, route, draft", icon: "ai" as IconName, accent: "#BDA7FF" },
  { label: "CRM", outcome: "Lead and client memory", icon: "crm" as IconName, accent: "#D7B46A" },
  { label: "Payments", outcome: "Checkout and billing", icon: "payments" as IconName, accent: "#F06A3D" },
  { label: "Analytics", outcome: "Dashboards and signals", icon: "analytics" as IconName, accent: "#60E6D2" },
  { label: "Automation", outcome: "Less manual work", icon: "automation" as IconName, accent: "#D7B46A" },
  { label: "Cloud", outcome: "Deploy, scale, monitor", icon: "cloud" as IconName, accent: "#8E7CFF" },
];

const blueprint = [
  {
    title: "Customer surface",
    line: "Website, app, portal, booking, inquiry, checkout.",
    icon: "mobile" as IconName,
    accent: "#D7B46A",
  },
  {
    title: "Team workspace",
    line: "Admin, CRM, dashboard, content, support flow.",
    icon: "web" as IconName,
    accent: "#60E6D2",
  },
  {
    title: "Intelligence layer",
    line: "AI assistants, routing, summaries, decisions.",
    icon: "ai" as IconName,
    accent: "#BDA7FF",
  },
  {
    title: "Operations engine",
    line: "Payments, alerts, tasks, analytics, cloud ops.",
    icon: "ops" as IconName,
    accent: "#F06A3D",
  },
];

export const TechStackSection = () => {
  return (
    <section id="our-process" className="relative overflow-hidden border-t border-white/8 bg-[#050505] px-6 py-20 md:py-28">
      <div className="brand-texture opacity-[0.34]" aria-hidden="true" />
      <div className="container relative z-10 mx-auto max-w-7xl">
        <ScrollReveal className="mb-11 grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#60E6D2]">
              How an agency build should feel
            </p>
            <h2 className="max-w-3xl font-display text-4xl font-black leading-[0.9] text-white md:text-6xl">
              One business system, designed before it is coded.
            </h2>
          </div>
          <p className="max-w-xl text-base font-semibold leading-relaxed text-white/54 lg:justify-self-end">
            Ibda Dev does not start with random screens. We map the business, design the product surface, and connect the software, AI, automation, and operations layer behind it.
          </p>
        </ScrollReveal>

        <div className="mb-5 overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-[#0D0C0A] p-4 md:p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] pb-4">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/32">
              Solution blueprint
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-ibda-gold">
              Four layers, one launch plan
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {blueprint.map((item, index) => (
              <ScrollReveal
                key={item.title}
                direction={index < 2 ? "left" : "right"}
                distance={38}
              >
                <motion.div
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ duration: 0.24 }}
                  className="brand-card group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#050505] p-4"
                >
                  <div
                    className="absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-25"
                    style={{ backgroundColor: item.accent }}
                  />
                  <div className="mb-8 flex items-center justify-between">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl text-black"
                      style={{ backgroundColor: item.accent }}
                    >
                      <SystemIcon name={item.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-display text-3xl font-black leading-none text-white/[0.07]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-black leading-none text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs font-semibold leading-relaxed text-white/46">
                    {item.line}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.title}
              direction={index === 0 ? "left" : index === 2 ? "right" : "up"}
              distance={40}
            >
              <motion.article
                whileHover={{ y: -5 }}
                transition={{ duration: 0.24 }}
                className="brand-card group relative h-full overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-[#0D0C0A] p-6 md:p-7"
              >
                <div
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${step.accent}, transparent)` }}
                />
                <div
                  className="absolute -bottom-20 -right-16 h-40 w-40 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-20"
                  style={{ backgroundColor: step.accent }}
                />
                <div className="mb-9 flex items-center justify-between">
                  <span className="font-display text-5xl font-black leading-none text-white/[0.08]">
                    0{index + 1}
                  </span>
                  <span
                    className="grid h-12 w-12 place-items-center rounded-2xl text-black"
                    style={{ backgroundColor: step.accent }}
                  >
                    <SystemIcon name={step.icon} className="h-6 w-6" />
                  </span>
                </div>
                <span
                  className="mb-5 inline-flex rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-black"
                  style={{ backgroundColor: step.accent }}
                >
                  {step.result}
                </span>
                <h3 className="font-display text-3xl font-black leading-none text-white md:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-5 text-sm font-semibold leading-relaxed text-white/54">
                  {step.line}
                </p>
                <div className="mt-7 grid gap-2 border-t border-white/[0.07] pt-5">
                  {step.proof.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.14em] text-white/38">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: step.accent }} />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>

        <div className="marquee-fade mt-6 overflow-hidden rounded-[1.2rem] border border-white/[0.08] bg-white/[0.03] p-3">
          <div className="motion-marquee flex w-max gap-3">
            {[...stack, ...stack, ...stack].map((item, index) => (
              <span
                key={`${item.label}-${index}`}
                className="group flex min-w-[13rem] items-center gap-3 rounded-full border border-white/[0.07] bg-[#050505] px-4 py-3"
              >
                <span
                  className="grid h-9 w-9 place-items-center rounded-full text-black"
                  style={{ backgroundColor: item.accent }}
                >
                  <SystemIcon name={item.icon} className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-white/76">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-[10px] font-bold text-white/34">
                    {item.outcome}
                  </span>
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
