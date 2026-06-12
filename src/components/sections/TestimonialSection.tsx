"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReveal } from "@/hooks/useReveal";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const proofSignals = [
  "Clearer sales narrative",
  "Production-ready web system",
  "Performance-minded motion",
];

export const TestimonialSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealRef, isVisible] = useReveal();
  const shouldReduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".client-proof", {
        opacity: 0,
        y: 34,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 76%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#050505] px-6 py-28 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="container mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
        <div
          ref={revealRef as React.RefObject<HTMLDivElement>}
          className={`client-proof transition-all duration-700 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : shouldReduceMotion
                ? "opacity-100"
                : "opacity-0 translate-y-10"
          }`}
        >
          <span className="mb-5 block text-xs font-black uppercase tracking-[0.26em] text-[#D7B46A]">Client proof</span>
          <h2 className="max-w-xl text-4xl font-black leading-[0.96] tracking-normal text-white md:text-6xl">
            The work has to make the business easier to explain.
          </h2>
        </div>

        <div className="client-proof rounded-lg border border-white/12 bg-white/[0.035] p-6 md:p-9">
          <blockquote className="text-3xl font-black leading-[1.08] tracking-normal text-white md:text-5xl">
            "IbdaDev helped turn our vision into a digital presence that felt sharper, faster, and easier to trust."
          </blockquote>

          <div className="mt-10 grid gap-5 border-t border-white/10 pt-6 md:grid-cols-[0.68fr_0.32fr]">
            <div>
              <p className="text-lg font-black text-white">Shaun Olson</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-white/38">Cobe Construction Inc.</p>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {proofSignals.map((signal) => (
                <span key={signal} className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-bold text-white/50">
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
