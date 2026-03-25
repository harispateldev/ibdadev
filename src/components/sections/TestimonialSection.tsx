"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLOR } from "@/constants/colors";

gsap.registerPlugin(ScrollTrigger);

export const TestimonialSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(quoteRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".testimonial-info", {
        opacity: 0,
        x: -20,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-40 bg-[#050505] relative overflow-hidden flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-refract-orange/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-5xl">
        <blockquote ref={quoteRef} className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-16 tracking-tight">
          "RefractWeb has been <span className="text-refract-orange">instrumental</span> in reducing our overhead in more than one area of our business. We are excited to continue to work with them to identify areas where AI can be leveraged."
        </blockquote>
        
        <div className="testimonial-info flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold border border-white/20">
            SO
          </div>
          <div>
            <h4 className="text-xl font-bold">Shaun Olson</h4>
            <p className="text-white/40 font-medium">Cobe Construction Inc.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
