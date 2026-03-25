"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLOR } from "@/constants/colors";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    label: "Revenue Supported",
    value: "$100M+",
    description: "Systems backing nine-figure revenue. When performance is non-negotiable, we deliver.",
  },
  {
    label: "Assets Deployed",
    value: "100+",
    description: "Production-ready assets for every channel. Ship campaigns and launches with confidence.",
  },
  {
    label: "Enterprise DNA",
    value: "$2.65B",
    description: "Applying the architectural standards of a multi-billion dollar valuation to your brand.",
  },
];

export const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".stats-header", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Cards Animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.8,
          delay: index * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-[#050505] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-refract-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl">
        <div className="stats-header mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Impact <span className="text-white/30">at scale</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            Design is subjective. Performance is not. We build systems that perform at the highest level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="bg-white/5 border border-white/10 p-10 rounded-[40px] hover:border-refract-orange/30 transition-colors group relative overflow-hidden"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-refract-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="text-refract-orange font-bold uppercase tracking-widest text-xs mb-8 block relative z-10">
                {stat.label}
              </span>
              <h3 className="text-5xl md:text-6xl font-black mb-6 relative z-10 group-hover:scale-105 transition-transform duration-500 origin-left">
                {stat.value}
              </h3>
              <p className="text-white/50 leading-relaxed relative z-10">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
