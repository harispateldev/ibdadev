"use client";

import React from "react";
import { motion } from "framer-motion";

const partners = [
  "Hotjar", "Blender", "Figma", "Hostinger", "GSAP", "Notion", "Vercel", "AWS", "React"
];

export const PartnersMarquee = () => {
  return (
    <div className="py-20 bg-refract-bg overflow-hidden border-y border-white/5">
      <div className="flex whitespace-nowrap overflow-hidden group">
        <motion.div
           animate={{ x: ["0%", "-50%"] }}
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
           className="flex gap-20 items-center pr-20"
        >
          {/* Double the array for seamless loop */}
          {[...partners, ...partners].map((partner, i) => (
            <span 
              key={i} 
              className="text-4xl md:text-5xl font-bold text-white/10 hover:text-white/40 transition-colors cursor-default select-none"
            >
              {partner}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
