"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    mark: "01",
    title: "Website",
    desc: "High-performance site built for speed, trust, and conversions. We engineer story-driven pages that turn your brand into a premium digital product.",
    outcome: "Rank higher. Convert visitors. Win on first impression.",
    gradient: "from-[rgba(215,180,106,0.18)] via-[rgba(215,180,106,0.06)] to-transparent",
    color: "#D7B46A",
  },
  {
    mark: "02",
    title: "Leads",
    desc: "AI-powered funnels, forms, and outreach that fill your calendar. Turn passive traffic into active pipeline without hiring a sales team.",
    outcome: "Turn traffic into booked calls and qualified deals.",
    gradient: "from-[rgba(96,230,210,0.16)] via-[rgba(96,230,210,0.05)] to-transparent",
    color: "#60E6D2",
  },
  {
    mark: "03",
    title: "Apps",
    desc: "Custom web and mobile apps built around your exact workflow. Replace spreadsheets and manual steps with tools your team actually wants to use.",
    outcome: "Replace manual steps with tools that scale.",
    gradient: "from-[rgba(142,124,255,0.16)] via-[rgba(142,124,255,0.05)] to-transparent",
    color: "#8E7CFF",
  },
  {
    mark: "04",
    title: "AI Ops",
    desc: "Automate repetitive tasks, data flows, and team operations with AI wired into your existing tools. Get more done with fewer people.",
    outcome: "Get more done with fewer people and zero manual errors.",
    gradient: "from-[rgba(240,106,61,0.16)] via-[rgba(240,106,61,0.05)] to-transparent",
    color: "#F06A3D",
  },
];

export const CapabilitiesStacked = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);

    cards.forEach((card, index) => {
      // Pinning each card as it reaches the top
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        pin: true,
        pinSpacing: false,
        endTrigger: containerRef.current,
        end: "bottom bottom",
      });

      // Scaling down previous card when next one overlaps
      if (index < cards.length - 1) {
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-ibda-bg overflow-hidden py-40">
      <div className="container mx-auto px-6 mb-20">
        <h2 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-8 px-4">Core Capabilities</h2>
      </div>
      
      <div className="flex flex-col gap-0">
        {capabilities.map((cap, i) => (
          <div
            key={i}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="w-full flex items-center justify-center min-h-screen py-20"
          >
            <div
              className="relative w-[90%] overflow-hidden rounded-[48px] border border-white/[0.06] bg-[#0D0C0A] shadow-[0_48px_160px_rgba(0,0,0,0.52)] md:w-[85%] flex flex-col md:flex-row"
              style={{ minHeight: "80vh" }}
            >
              {/* Visual Side */}
              <div className="relative w-full overflow-hidden md:w-1/2 md:h-full" style={{ minHeight: "40vh" }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${cap.gradient}`} />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.024)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[length:52px_52px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <svg viewBox="0 0 200 200" width="220" height="220" aria-hidden="true">
                      <circle cx="100" cy="100" r="88" fill="none" stroke={cap.color} strokeWidth="0.8" strokeOpacity="0.14" strokeDasharray="9 9" />
                      <circle cx="100" cy="100" r="64" fill="none" stroke={cap.color} strokeWidth="1.2" strokeOpacity="0.22" />
                      <circle cx="100" cy="100" r="40" fill={cap.color} fillOpacity="0.10" stroke={cap.color} strokeWidth="1.5" strokeOpacity="0.40" />
                      <circle cx="100" cy="100" r="18" fill={cap.color} fillOpacity="0.28" />
                    </svg>
                    <span
                      className="absolute inset-0 flex items-center justify-center text-[11px] font-black uppercase tracking-[0.28em]"
                      style={{ color: cap.color }}
                    >
                      {cap.mark}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0D0C0A]/80 hidden md:block" />
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 md:h-full flex flex-col justify-center p-8 md:p-16">
                <span className="w-10 h-[3px] rounded-full mb-8 block" style={{ backgroundColor: cap.color }} />
                <h3
                  className="text-4xl md:text-6xl font-black mb-4 tracking-tight uppercase leading-none"
                  style={{ color: cap.color }}
                >
                  {cap.title}
                </h3>
                <p className="text-base md:text-lg text-white/70 leading-relaxed font-medium mb-4 max-w-lg">
                  {cap.desc}
                </p>
                <p className="text-xs font-black uppercase tracking-[0.18em] mb-10" style={{ color: cap.color }}>
                  {cap.outcome}
                </p>
                <a
                  href="/contact#project-intake"
                  className="inline-flex items-center gap-3 rounded-full border px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] transition-all w-fit"
                  style={{ borderColor: `${cap.color}50`, color: cap.color }}
                >
                  Start building →
                </a>
              </div>

              {/* Number Indicator */}
              <div className="absolute top-8 right-10 text-7xl font-black italic text-white/[0.04]">
                {cap.mark}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Spacer for scroll end */}
      <div className="h-[20vh]" />
    </section>
  );
};
