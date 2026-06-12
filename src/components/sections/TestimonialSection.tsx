"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const outcomes = [
  { stat: "3×", label: "Inbound leads after launch" },
  { stat: "4.2s", label: "Avg. page load time reduced to" },
  { stat: "100%", label: "On-time, on-budget delivery" },
];

export const TestimonialSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const ctx = gsap.context(() => {
      gsap.from(".testi-intro", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 76%",
        },
      });

      gsap.from(".testi-card", {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testi-card",
          start: "top 82%",
        },
      });

      gsap.from(".testi-outcome", {
        opacity: 0,
        y: 14,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testi-outcomes",
          start: "top 88%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] px-6 py-24 md:py-32"
    >
      {/* Top border gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Atmospheric glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(215,180,106,0.014) 0%, transparent 50%)",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-5xl">

        {/* Section intro — frames the social proof */}
        <div className="testi-intro mb-12 text-center">
          <span className="mb-4 block text-xs font-black uppercase tracking-[0.26em] text-[#D7B46A]">
            Client proof
          </span>
          <h2 className="mx-auto max-w-2xl text-3xl font-black leading-[1.0] tracking-normal text-white md:text-5xl">
            Real clients. Real outcomes.
          </h2>
        </div>

        {/* Testimonial card — editorial, centered focal point */}
        <div
          className="testi-card relative overflow-hidden rounded-xl border border-white/[0.08] p-8 md:p-10"
          style={{
            boxShadow: "0 0 50px -16px rgba(215,180,106,0.10), 0 0 80px -28px rgba(215,180,106,0.05)",
            background: "radial-gradient(ellipse at 50% -20%, rgba(215,180,106,0.05) 0%, rgba(255,255,255,0.026) 50%, rgba(5,5,5,0.6) 100%)",
          }}
        >
          {/* Gold accent line */}
          <div
            className="absolute inset-x-0 top-0 h-[2px]"
            style={{
              background: "linear-gradient(90deg, transparent 10%, rgba(215,180,106,0.45) 50%, transparent 90%)",
            }}
          />

          {/* Quote mark */}
          <div className="mb-5 text-[#D7B46A]/30 select-none" aria-hidden="true">
            <svg width="32" height="24" viewBox="0 0 32 24" fill="currentColor">
              <path d="M0 18.4C0 11.2 3.2 5.6 9.6 1.6L12.8 5.6C9.6 8 7.2 10.4 7.2 13.6H12.8V24H0V18.4ZM18.4 18.4C18.4 11.2 21.6 5.6 28 1.6L31.2 5.6C28 8 25.6 10.4 25.6 13.6H31.2V24H18.4V18.4Z" />
            </svg>
          </div>

          {/* Quote — sharp, scannable */}
          <blockquote className="max-w-3xl text-2xl font-black leading-[1.15] tracking-normal text-white md:text-3xl">
            IbdaDev turned our vision into a digital presence that felt sharper,
            faster, and genuinely easier to trust.
          </blockquote>

          {/* Author + company */}
          <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-black text-white">Shaun Olson</p>
              <p className="mt-0.5 text-sm font-bold text-white/45">
                Founder · Cobe Construction Inc.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-sm border border-[#D7B46A]/20 bg-[#D7B46A]/[0.06] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#D7B46A]/70">
                Web + Brand System
              </span>
            </div>
          </div>
        </div>

        {/* Outcome stats — proves business impact, not just satisfaction */}
        <div className="testi-outcomes mt-5 grid gap-4 sm:grid-cols-3">
          {outcomes.map((item) => (
            <div
              key={item.stat}
              className="testi-outcome rounded-xl border border-white/[0.06] px-5 py-4 transition-colors duration-500 hover:border-white/[0.10]"
              style={{
                background: "radial-gradient(ellipse at 50% 100%, rgba(215,180,106,0.02) 0%, rgba(8,8,8,1) 65%)",
              }}
            >
              <p className="text-2xl font-black text-[#D7B46A]">{item.stat}</p>
              <p className="mt-0.5 text-xs font-bold text-white/50">{item.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
