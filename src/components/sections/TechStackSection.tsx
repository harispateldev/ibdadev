"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLOR } from "@/constants/colors";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  "AWS", "Vercel", "Figma", "Blender", "After Effects", "NextJS", "React", "GSAP", "Typescript", "Hotjar", "Adobe Creative Cloud", "Notion"
];

export const TechStackSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Background large text animation
      gsap.from(".bg-text", {
        scale: 0.8,
        opacity: 0,
        duration: 2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          scrub: 1,
        },
      });

      // Infinite Marquee
      const marquee = marqueeRef.current;
      if (!marquee) return;

      const totalWidth = marquee.scrollWidth / 2;
      gsap.to(marquee, {
        x: -totalWidth,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-40 bg-refract-bg relative overflow-hidden border-t border-white/5">
      {/* Background Text Overlay */}
      <div className="bg-text absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[25vw] font-black text-white/5 whitespace-nowrap leading-none tracking-tighter select-none">
          BUILD ENVIRONMENT
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-24">
          <h3 className="text-4xl md:text-5xl font-black mb-8 leading-[1.1]">
            A proven stack for <span className="text-white/30">speed and scale.</span>
          </h3>
          <p className="text-white/50 text-xl leading-relaxed">
            We leverage these tools to ensure reliability and uncompromising polish across every digital product we ship.
          </p>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative overflow-visible group">
          <div ref={marqueeRef} className="flex gap-12 md:gap-24 items-center whitespace-nowrap w-fit">
            {[...techStack, ...techStack].map((tech, i) => (
              <div 
                key={i}
                className="text-3xl md:text-5xl font-bold text-white/20 hover:text-refract-orange transition-colors duration-500 cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
          
          {/* Side Fades */}
          <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-refract-bg to-transparent z-20" />
          <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-refract-bg to-transparent z-20" />
        </div>

        <div className="mt-24 flex flex-wrap gap-4">
           {["Start a project", "Explore services"].map((btn, i) => (
             <button 
              key={i}
              className={`px-8 py-4 rounded-full font-bold transition-all duration-300 ${
                i === 0 ? "bg-refract-orange text-white hover:scale-105" : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
              }`}
             >
               {btn}
             </button>
           ))}
        </div>
      </div>
    </section>
  );
};
