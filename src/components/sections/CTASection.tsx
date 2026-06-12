"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";

gsap.registerPlugin(ScrollTrigger);

export const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        scale: 0.96,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-t border-ibda-border bg-ibda-bg py-48">
      <div className="absolute inset-0 z-0 theme-grid opacity-30" />
      <div className="aurora-blob absolute inset-0 z-0" aria-hidden="true" />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="cta-content max-w-4xl mx-auto">
          <h2 className="mb-10 text-5xl font-black leading-[0.95] tracking-normal md:text-8xl">
            Bring a real problem. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ibda-gold via-white to-white/40">
              We&apos;ll build what moves it forward.
            </span>
          </h2>

          <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-white/60">
            Tell us the goal, the deadline, and what needs to improve. We&apos;ll scope and build the right solution.
          </p>

          <div className="mx-auto mb-14 grid max-w-3xl gap-4 text-left md:grid-cols-3">
            {["Scope before style", "Performance before polish", "Handoff before launch"].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/[0.035] px-5 py-4">
                <span className="text-sm font-bold text-white/62">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <MagneticWrapper>
              <a href="/contact" className="w-full rounded-full bg-[#D7B46A] px-12 py-6 text-xl font-black text-[#050505] shadow-[0_20px_60px_rgba(215,180,106,0.24)] transition-all hover:-translate-y-0.5 active:scale-95 md:w-auto">
                Start a Project
              </a>
            </MagneticWrapper>
            <MagneticWrapper>
              <a href="#our-process" className="w-full rounded-full border border-ibda-border bg-white/5 px-10 py-5 text-lg font-black text-white transition-all hover:bg-white/10 md:w-auto">
                See how we work
              </a>
            </MagneticWrapper>
          </div>

          <p className="mx-auto mt-10 max-w-md text-sm font-bold leading-relaxed text-white/[0.42]">
            We&apos;ll talk about your business first. No pitch, no pressure.
          </p>

        </div>
      </div>
    </section>
  );
};
