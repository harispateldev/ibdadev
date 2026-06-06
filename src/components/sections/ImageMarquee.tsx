"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { COLOR } from "@/constants/colors";

const projectImages = [
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
];

export const ImageMarquee = ({ reverse = false, speed = 40 }: { reverse?: boolean, speed?: number }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const marquee = marqueeRef.current;
      if (!marquee) return;

      const totalWidth = marquee.scrollWidth / 2;
      gsap.set(marquee, { x: reverse ? -totalWidth : 0 });

      gsap.to(marquee, {
        x: reverse ? 0 : -totalWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
      });

    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="py-20 bg-ibda-bg overflow-hidden relative z-10">
      <div 
        ref={marqueeRef} 
        className="flex shrink-0 whitespace-nowrap transform-gpu-blur will-change-transform w-fit"
      >
        {/* Double projection for seamless loop */}
        {[...projectImages, ...projectImages].map((img, i) => (
          <div key={i} className="mx-2 shrink-0 object-contain py-4">
            <div className="p-2 md:p-3 rounded-2xl bg-gradient-to-br from-white/5 to-gray-200/10 border border-white/10 backdrop-blur backdrop-saturate-180 backdrop-brightness-120 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-white/20">
              <img 
                src={img} 
                alt={`Project ${i}`}
                className="object-cover rounded-xl shadow pointer-events-none w-75 xs:w-80 sm:w-100 md:w-120 lg:w-130 xl:w-140 aspect-[16/10]"
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Side Fades for depth */}
      <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-ibda-bg to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-ibda-bg to-transparent z-20 pointer-events-none" />
    </div>
  );
};
