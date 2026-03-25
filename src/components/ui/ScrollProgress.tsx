"use client";

import { useScrollStore } from "@/store/scrollStore";
import { motion } from "framer-motion";

export const ScrollIndicator = () => {
  const progress = useScrollStore((state) => state.progress);
  const activeSection = useScrollStore((state) => state.activeSection);

  const sections = ["HERO", "ABOUT", "SERVICES", "WORK", "CONTACT"];

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 bg-white/20 z-50 overflow-hidden">
        <motion.div
           className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
           style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="fixed top-1/2 right-4 -translate-y-1/2 flex flex-col gap-4 z-50">
        {sections.map((section, idx) => (
          <div key={section} className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' })}>
            <span className={`text-[10px] tracking-widest transition-opacity duration-300 ${activeSection === idx ? "opacity-100" : "opacity-0 grupo-hover:opacity-100"}`}>
              {section}
            </span>
            <div className={`w-2 h-2 rounded-full border border-white/50 transition-all duration-500 ${activeSection === idx ? "w-4 h-4 bg-white" : "bg-transparent hover:bg-white/50"}`} />
          </div>
        ))}
      </div>
    </>
  );
};
