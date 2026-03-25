"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { COLOR } from "@/constants/colors";

export const WorkMarquee = ({ text = "RECENT WORKS" }: { text?: string }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const marquee = marqueeRef.current;
      if (!marquee) return;

      const totalWidth = marquee.scrollWidth / 2;
      gsap.to(marquee, {
        x: -totalWidth,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="py-12 bg-refract-bg overflow-hidden border-y border-white/5 relative z-10">
      <div ref={marqueeRef} className="flex whitespace-nowrap w-fit">
        {[...Array(4)].map((_, i) => (
          <h2 
            key={i} 
            className="text-[12vw] md:text-[8vw] font-black tracking-tighter uppercase px-10 text-white/5 hover:text-refract-orange/20 transition-colors duration-700 cursor-default select-none"
          >
            {text}
          </h2>
        ))}
      </div>
    </div>
  );
};
