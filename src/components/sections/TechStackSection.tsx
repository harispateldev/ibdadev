"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Phase = {
  label: string;
  title: string;
  line: string;
  proof: string;
  chip: string;
  color: string;
  icon: React.ReactNode;
};

const phases: Phase[] = [
  {
    label: "Plan",
    color: "#F06A3D",
    title: "Aligned on outcomes before anything is designed",
    line: "We map audience, offer, and objections — revisions happen on paper.",
    proof: "You approve the direction before a single pixel is placed.",
    chip: "Goal-driven scope",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="10" cy="10" r="8" />
        <circle cx="10" cy="10" r="4" />
        <circle cx="10" cy="10" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Build",
    color: "#60E6D2",
    title: "Built to work, not just look good",
    line: "Fast on every device, easy for your team to run independently.",
    proof: "Loads fast, works everywhere, yours to operate from day one.",
    chip: "Production-grade code",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="13.5" width="16" height="3" rx="1" />
        <rect x="2" y="8.5" width="16" height="3" rx="1" />
        <rect x="2" y="3.5" width="16" height="3" rx="1" />
      </svg>
    ),
  },
  {
    label: "Refine",
    color: "#8E7CFF",
    title: "Made to feel as good as it works",
    line: "Every interaction tuned until the product feels trustworthy on first visit.",
    proof: "Visitors trust it within seconds — that trust converts.",
    chip: "Premium on first impression",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 2 L11.5 8.5 L18 10 L11.5 11.5 L10 18 L8.5 11.5 L2 10 L8.5 8.5 Z" />
      </svg>
    ),
  },
  {
    label: "Launch",
    color: "#D7B46A",
    title: "Handed off, not abandoned",
    line: "Tested, SEO-ready, analytics wired, full handoff your team can use.",
    proof: "You run it from day one — no follow-up calls needed.",
    chip: "Complete handoff package",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 16 L16 4" />
        <path d="M8 4 L16 4 L16 12" />
      </svg>
    ),
  },
];

const proofStats = [
  {
    stat: "50+",
    label: "Successful launches",
    sub: "Same process every time",
  },
  {
    stat: "2 weeks",
    label: "From brief to first designs",
    sub: "Every single project",
  },
  {
    stat: "100%",
    label: "Handoffs fully documented",
    sub: "Nothing ships undocumented",
  },
];

export const TechStackSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const ctx = gsap.context(() => {
      gsap.from(".stack-copy", {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      gsap.from(".stack-phase", {
        opacity: 0,
        y: 22,
        duration: 0.72,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stack-grid",
          start: "top 82%",
        },
      });

      gsap.from(".stack-proof", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stack-proof-row",
          start: "top 88%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="our-process"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/8 bg-[#050505] px-6 py-20 md:py-28"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D7B46A]/22 to-transparent" />


      <div className="container relative z-10 mx-auto max-w-7xl">

        {/* Header — headline only, cards speak for themselves */}
        <div className="stack-copy">
          <span className="mb-5 block text-xs font-black uppercase tracking-[0.26em] text-[#D7B46A]">
            How we build
          </span>
          <h2 className="max-w-4xl text-5xl font-black leading-[0.94] tracking-normal text-white md:text-7xl">
            From brief to launch — no surprises.
          </h2>
        </div>

        {/* Phase cards — editorial panels with ambient glow */}
        <div className="stack-grid mt-14 grid gap-4 md:grid-cols-2">
          {phases.map((phase) => {
            const isRefine = phase.label === "Refine";
            const isLaunch = phase.label === "Launch";
            return (
              <article
                key={phase.label}
                className="stack-phase group relative overflow-hidden rounded-xl border border-white/[0.08] p-6 transition-all duration-500 hover:border-white/[0.15]"
                style={{
                  boxShadow: `0 0 ${isRefine ? 50 : 36}px ${isRefine ? -8 : -12}px ${phase.color}${isRefine ? "18" : "10"}, 0 0 80px -28px ${phase.color}06`,
                  background: `radial-gradient(ellipse at 50% -10%, ${phase.color}${isRefine ? "0C" : "07"} 0%, rgba(255,255,255,0.026) 55%, rgba(5,5,5,0.6) 100%)`,
                }}
              >
                {/* Phase color accent line */}
                <div
                  className="absolute inset-x-0 top-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent 8%, ${phase.color}${isRefine ? "88" : "60"} 50%, transparent 92%)`,
                  }}
                />

                {/* Phase label + icon */}
                <div className="mb-5 flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <span
                    className="text-xs font-black uppercase tracking-[0.26em]"
                    style={{ color: phase.color }}
                  >
                    {phase.label}
                  </span>
                  <span style={{ color: isLaunch ? phase.color : `${phase.color}78` }}>{phase.icon}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black leading-snug tracking-normal text-white">
                  {phase.title}
                </h3>

                {/* Single-sentence description */}
                <p className={`mt-2 text-sm leading-relaxed ${isLaunch ? "text-white/72" : "text-white/55"}`}>
                  {phase.line}
                </p>

                {/* Proof statement */}
                <p
                  className="mt-3 text-xs font-bold"
                  style={{ color: isLaunch ? phase.color : `${phase.color}92` }}
                >
                  ✓ {phase.proof}
                </p>

                {/* Single strongest chip */}
                <div className="mt-4">
                  <span
                    className="rounded-sm px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.10em]"
                    style={{
                      color: isLaunch ? `${phase.color}D0` : `${phase.color}78`,
                      backgroundColor: isLaunch ? `${phase.color}14` : `${phase.color}0E`,
                      border: `1px solid ${phase.color}${isLaunch ? "30" : "1C"}`,
                    }}
                  >
                    {phase.chip}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Visual bridge — connects process cards to evidence */}
        <div className="mx-auto mt-8 h-px w-1/2 bg-gradient-to-r from-transparent via-[#D7B46A]/14 to-transparent" />

        {/* Proof stats — evidence that supports the trust story */}
        <div className="stack-proof-row mt-8 grid gap-4 sm:grid-cols-3">
          {proofStats.map((item) => (
            <div
              key={item.stat}
              className="stack-proof rounded-xl border border-white/[0.07] px-6 py-5 transition-colors duration-500 hover:border-white/[0.12]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 100%, rgba(215,180,106,0.025) 0%, rgba(8,8,8,1) 65%)",
              }}
            >
              <p className="text-3xl font-black text-[#D7B46A]">{item.stat}</p>
              <p className="mt-1 text-sm font-bold text-white/68">{item.label}</p>
              <p className="mt-0.5 text-xs font-bold text-white/34">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Emotional close + CTA — the natural conclusion */}
        <div className="mt-12 flex flex-col gap-5 border-t border-white/[0.06] pt-9 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-sm font-bold text-white/44">
            This is the process we run on every project.{" "}
            <span className="text-white/68">Bring yours.</span>
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2.5 rounded-lg border border-[#D7B46A]/25 bg-[#D7B46A]/[0.06] px-5 py-2.5 text-sm font-black uppercase tracking-[0.12em] text-[#D7B46A] transition-all duration-300 hover:border-[#D7B46A]/40 hover:bg-[#D7B46A]/[0.10]"
          >
            Start a project
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1.5 6h9M6.5 2l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};
