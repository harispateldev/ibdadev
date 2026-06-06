"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        scale: 0.9,
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
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="cta-content max-w-4xl mx-auto">
          <h2 className="mb-10 text-5xl font-black leading-[0.95] tracking-normal md:text-8xl">
            Bring a real problem. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ibda-gold via-white to-white/40">
              We will shape the system.
            </span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/56 md:text-xl">
            Start with the business goal, deadline, audience, and what has to improve. We will respond with the right
            scope: launch identity, website, product interface, or a focused motion upgrade.
          </p>

          <div className="mx-auto mb-14 grid max-w-3xl gap-3 text-left md:grid-cols-3">
            {["Scope before style", "Performance before polish", "Handoff before launch"].map((item, index) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                <span className="mb-3 block text-xs font-black text-ibda-gold">0{index + 1}</span>
                <span className="text-sm font-bold text-white/62">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="/work#start-project" className="w-full rounded-full bg-[#D7B46A] px-12 py-6 text-xl font-black text-[#050505] shadow-[0_20px_60px_rgba(215,180,106,0.24)] transition-all hover:-translate-y-0.5 active:scale-95 md:w-auto">
              Start a Project
            </a>
            <a href="/about" className="w-full rounded-full border border-ibda-border bg-white/5 px-12 py-6 text-xl font-black text-white transition-all hover:bg-white/10 md:w-auto">
              See the process
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
