"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const systems = [
  {
    label: "Plan",
    title: "Strategy and UX",
    description: "We map audience, offer, objections, and page logic before any visual polish begins.",
    tools: ["Figma", "Notion", "Analytics", "Hotjar"],
  },
  {
    label: "Build",
    title: "Interface engineering",
    description: "Sections are built as reusable product surfaces with responsive behavior and fast defaults.",
    tools: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    label: "Move",
    title: "Motion system",
    description: "Animation is applied to guide attention: reveal, confirm, transition, and signal progress.",
    tools: ["GSAP", "Framer Motion", "Lenis", "Reduced motion"],
  },
  {
    label: "Launch",
    title: "Release path",
    description: "Deployment, QA, event mapping, and iteration notes are packaged before handoff.",
    tools: ["Vercel", "Cloudflare", "SEO checks", "QA checklist"],
  },
];

const timeline = ["Brief", "Wire", "Design", "Build", "Motion", "QA", "Launch"];

export const TechStackSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stack-copy", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      gsap.from(".stack-system", {
        opacity: 0,
        y: 24,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stack-grid",
          start: "top 82%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="build-environment"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/8 bg-[#050505] px-6 py-28 md:py-36"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D7B46A]/24 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="stack-copy grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="mb-5 block text-xs font-black uppercase tracking-[0.26em] text-[#D7B46A]">Build environment</span>
            <h2 className="max-w-4xl text-5xl font-black leading-[0.94] tracking-normal text-white md:text-7xl">
              Tools are only useful when the workflow is sharp.
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed text-white/58">
              The stack is designed around clarity, speed, and handoff. We keep the visual layer rich, but the system
              underneath stays simple enough to maintain after launch.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Static-first", "Image-light", "Motion-limited", "Analytics-ready"].map((tag) => (
                <span key={tag} className="rounded-full border border-white/12 px-4 py-2 text-xs font-bold text-white/52">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="stack-grid mt-16 grid gap-4 md:grid-cols-2">
          {systems.map((system) => (
            <article key={system.label} className="stack-system rounded-lg border border-white/12 bg-white/[0.035] p-6">
              <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
                <span className="text-xs font-black uppercase tracking-[0.24em] text-[#D7B46A]">{system.label}</span>
                <span className="h-2 w-16 rounded-full bg-white/12" />
              </div>
              <h3 className="text-2xl font-black tracking-normal text-white">{system.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/54">{system.description}</p>
              <div className="mt-7 grid grid-cols-2 gap-2">
                {system.tools.map((tool) => (
                  <span key={tool} className="rounded-md border border-white/10 bg-[#080808] px-3 py-3 text-sm font-bold text-white/58">
                    {tool}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="stack-system mt-6 rounded-lg border border-white/12 bg-[#080808] p-4">
          <div className="grid gap-2 md:grid-cols-7">
            {timeline.map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-md bg-white/[0.035] px-4 py-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D7B46A] text-xs font-black text-black">
                  {index + 1}
                </span>
                <span className="text-sm font-black uppercase tracking-[0.12em] text-white/56">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
