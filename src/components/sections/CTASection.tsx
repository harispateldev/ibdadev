"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLOR } from "@/constants/colors";

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
    <section ref={sectionRef} className="py-48 bg-refract-bg relative overflow-hidden border-t border-white/5">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] bg-refract-orange/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[30vw] h-[30vw] bg-refract-blue/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="cta-content max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-9xl font-black mb-12 leading-none tracking-tighter">
            Ready for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-refract-orange via-white to-white/40">
              what's next?
            </span>
          </h2>
          <p className="text-white/50 text-xl md:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed">
            Let's discuss your vision and see if we are the right fit for your business orchestration.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="w-full md:w-auto px-12 py-6 bg-refract-orange text-white rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,94,40,0.3)]">
              Work With Us
            </button>
            <button className="w-full md:w-auto px-12 py-6 bg-white/5 border border-white/10 text-white rounded-full font-black text-xl hover:bg-white/10 transition-all">
              Explore our services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
