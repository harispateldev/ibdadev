"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const proofStandards = [
  {
    title: "Business map",
    line: "Offer, users, workflow, risks, and first-release scope are written before design starts.",
    signal: "Before UI",
    accent: "#D7B46A",
  },
  {
    title: "Working surface",
    line: "You review clickable flows for the customer side and the team side, not isolated screens.",
    signal: "Before build",
    accent: "#60E6D2",
  },
  {
    title: "Launch handoff",
    line: "The final system includes access, docs, QA notes, deployment, and what your team does next.",
    signal: "Before launch",
    accent: "#F06A3D",
  },
];

const evidence = [
  ["Scope clarity", "What is being built, what is not, and why it matters."],
  ["System thinking", "Software, AI, automation, content, CRM, and operations are connected."],
  ["Owner handoff", "A business can run the system after launch without guessing."],
];

export const TestimonialSection = () => {
  return (
    <section id="trust-standard" className="relative overflow-hidden bg-[#080706] px-6 py-20 md:py-28">
      <div className="brand-texture opacity-[0.26]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <ScrollReveal className="mb-10 grid gap-5 lg:grid-cols-[0.68fr_0.32fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">
              Proof discipline
            </p>
            <h2 className="max-w-3xl font-display text-4xl font-black leading-[0.9] text-white md:text-6xl">
              No fake praise. Show the work a client can verify.
            </h2>
          </div>
          <p className="text-sm font-semibold leading-relaxed text-white/58">
            Until published case studies are ready, the honest proof is the standard: clear scope, connected systems, and a handoff that makes the product usable.
          </p>
        </ScrollReveal>

        <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <ScrollReveal direction="left" distance={34}>
            <div className="brand-card relative h-full overflow-hidden rounded-[1.5rem] border border-white/[0.1] bg-[#100F0D] p-7 md:p-9">
              <div className="absolute -right-20 top-0 h-60 w-60 rounded-full bg-[#D7B46A]/10 blur-3xl" />
              <div className="relative">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/32">
                  What replaces testimonials
                </p>
                <p className="mt-8 font-display text-3xl font-black leading-[1.05] text-white md:text-5xl">
                  Evidence beats quotes when the project is serious.
                </p>
                <div className="mt-8 grid gap-3 border-t border-white/[0.08] pt-6">
                  {evidence.map(([title, line]) => (
                    <div key={title} className="grid gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4 sm:grid-cols-[8rem_1fr] sm:items-center">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#D7B46A]">{title}</p>
                      <p className="text-sm font-semibold leading-relaxed text-white/62">{line}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-4">
            {proofStandards.map((item, index) => (
              <ScrollReveal
                key={item.title}
                direction={index === 1 ? "right" : "up"}
                distance={30}
              >
                <article className="brand-card group relative overflow-hidden rounded-[1.25rem] border border-white/[0.1] bg-[#100F0D] p-5 md:p-6">
                  <div
                    className="absolute inset-y-0 left-0 w-px opacity-90"
                    style={{ background: `linear-gradient(180deg, transparent, ${item.accent}, transparent)` }}
                  />
                  <div
                    className="absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20"
                    style={{ backgroundColor: item.accent }}
                  />
                  <div className="relative grid gap-5 md:grid-cols-[1fr_9rem] md:items-start">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: item.accent }}>
                        {item.signal}
                      </p>
                      <h3 className="mt-4 font-display text-3xl font-black leading-none text-white">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-base font-semibold leading-relaxed text-white/72">
                        {item.line}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/[0.08] bg-black/24 p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/34">
                        Client sees
                      </p>
                      <p className="mt-3 text-sm font-black leading-tight text-white">
                        Clear next decision
                      </p>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
