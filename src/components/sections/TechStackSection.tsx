"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StackLane = {
  title: string;
  purpose: string;
  color: string;
  tools: string[];
};

const lanes: StackLane[] = [
  {
    title: "AI layer",
    purpose: "Qualify, answer, classify, summarize, and route work.",
    color: "#D7B46A",
    tools: ["OpenAI", "Claude", "LangChain", "Vector DB"],
  },
  {
    title: "Product layer",
    purpose: "Web apps, SaaS portals, dashboards, and mobile surfaces.",
    color: "#60E6D2",
    tools: ["Next.js", "React", "Node", "React Native"],
  },
  {
    title: "Business layer",
    purpose: "The systems your team already depends on.",
    color: "#8E7CFF",
    tools: ["Supabase", "Postgres", "Stripe", "HubSpot"],
  },
  {
    title: "Launch layer",
    purpose: "Fast hosting, analytics, automation, and secure delivery.",
    color: "#F06A3D",
    tools: ["Vercel", "Cloudflare", "Zapier", "Analytics"],
  },
];

const outcomes = [
  "Lead captured",
  "AI qualifies",
  "CRM updates",
  "Team acts",
  "Dashboard proves",
];

const Wordmark = ({ name, color }: { name: string; color: string }) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="tech-logo group relative overflow-hidden bg-[#0C0B0A] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16),0_18px_60px_rgba(0,0,0,0.34)]">
      <div
        className="absolute inset-x-0 top-0 h-px opacity-70"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
      <div className="flex items-center gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center text-xs font-black text-black"
          style={{ backgroundColor: color }}
        >
          {initials}
        </span>
        <span className="text-sm font-black tracking-normal text-white/78">{name}</span>
      </div>
    </div>
  );
};

const StackLaneCard = ({ lane, index }: { lane: StackLane; index: number }) => (
  <article className="stack-lane relative overflow-hidden bg-[#090807] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
    <div
      className="absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl"
      style={{ backgroundColor: `${lane.color}1f` }}
    />
    <div className="relative z-10">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/32">
            0{index + 1}
          </p>
          <h3 className="mt-2 text-2xl font-black uppercase leading-none text-white">
            {lane.title}
          </h3>
        </div>
        <span className="h-3 w-3" style={{ backgroundColor: lane.color }} />
      </div>

      <p className="mb-5 min-h-12 text-sm leading-relaxed text-white/52">{lane.purpose}</p>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {lane.tools.map((tool) => (
          <Wordmark key={tool} name={tool} color={lane.color} />
        ))}
      </div>
    </div>
  </article>
);

const StackFlow = () => (
  <div className="relative overflow-hidden bg-[#0D0C0A] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09),0_32px_100px_rgba(0,0,0,0.28)] md:p-7">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(215,180,106,0.12),transparent_18rem),radial-gradient(circle_at_86%_74%,rgba(96,230,210,0.10),transparent_18rem)]" />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[length:48px_48px] opacity-70" />

    <div className="relative z-10">
      <div className="mb-8 flex items-center justify-between border-b border-white/[0.07] pb-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/34">
            Integration map
          </p>
          <h3 className="mt-2 text-3xl font-black leading-none text-white md:text-5xl">
            Tools connected to outcomes.
          </h3>
        </div>
        <span className="hidden bg-[#D7B46A] px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-black sm:inline-flex">
          Live system
        </span>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-5 hidden h-px w-[calc(100%-2.5rem)] bg-white/12 md:block" />
        <div className="grid gap-3 md:grid-cols-5">
          {outcomes.map((item, index) => {
            const color = lanes[index % lanes.length].color;
            return (
              <div key={item} className="relative bg-black/38 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                <span
                  className="relative z-10 mb-10 grid h-10 w-10 place-items-center text-xs font-black text-black"
                  style={{ backgroundColor: color }}
                >
                  {index + 1}
                </span>
                <p className="text-sm font-black uppercase leading-tight text-white/86">{item}</p>
                <p className="mt-3 h-1.5 bg-white/10">
                  <span
                    className="block h-full"
                    style={{ width: `${64 + index * 7}%`, backgroundColor: color }}
                  />
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {["AI and API ready", "Mobile and SaaS ready", "Analytics wired"].map((item, index) => (
          <div key={item} className="bg-white/[0.045] px-4 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]">
            <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: lanes[index].color }}>
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const TechStackSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".tech-copy", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 76%",
        },
      });

      gsap.from(".stack-lane", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stack-lanes",
          start: "top 82%",
        },
      });

      gsap.from(".tech-logo", {
        opacity: 0,
        scale: 0.96,
        duration: 0.45,
        stagger: 0.025,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stack-lanes",
          start: "top 78%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/8 bg-[#050505] px-6 py-24 md:py-32"
    >
      <span id="our-process" className="absolute -top-28" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#60E6D2]/18 to-transparent" />
      <div className="absolute left-[8%] top-12 h-64 w-64 rounded-full bg-[#8E7CFF]/[0.08] blur-3xl" />
      <div className="absolute right-[6%] bottom-12 h-72 w-72 rounded-full bg-[#D7B46A]/[0.08] blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="tech-copy mb-12 grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#60E6D2]">
              Tech stack
            </p>
            <h2 className="max-w-4xl text-5xl font-black leading-[0.9] tracking-normal text-white md:text-7xl">
              The stack is chosen after the business flow.
            </h2>
          </div>
          <p className="max-w-xl text-base font-medium leading-relaxed text-white/54 lg:justify-self-end">
            AI tools, apps, dashboards, websites, and automations only work when the stack connects to how the company actually sells and operates.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="stack-lanes grid gap-4 sm:grid-cols-2">
            {lanes.map((lane, index) => (
              <StackLaneCard key={lane.title} lane={lane} index={index} />
            ))}
          </div>

          <StackFlow />
        </div>
      </div>
    </section>
  );
};
