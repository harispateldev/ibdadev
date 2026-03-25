"use client";

import React from "react";
import { motion } from "framer-motion";

interface WorkCardProps {
  title: string;
  category: string;
  desc: string;
  image: string;
  colors: readonly string[];
  index: number;
}

export const WorkCard = ({ title, category, desc, image, colors, index }: WorkCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 2) * 0.2, duration: 0.8 }}
      className="group"
    >
      <div className="relative aspect-[4/5] md:aspect-[16/10] rounded-[40px] overflow-hidden mb-8 border border-white/10 bg-white/5 backdrop-blur-xl backdrop-saturate-180 transition-all duration-700 hover:border-refract-orange/30 p-2 md:p-3 shadow-2xl">
        <div className="w-full h-full overflow-hidden rounded-[30px] relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          
          {/* Color Palette Overlay */}
          <div className="absolute bottom-6 left-6 flex gap-2">
            {colors.map((color, i) => (
              <div 
                key={i} 
                className="w-6 h-6 rounded-full border border-white/20 shadow-lg"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-4">
        <span className="text-refract-orange font-bold uppercase tracking-widest text-xs mb-2 block">{category}</span>
        <h3 className="text-4xl font-black mb-4 tracking-tight group-hover:text-refract-orange transition-colors">{title}</h3>
        <p className="text-lg text-white/50 leading-relaxed font-medium max-w-md">{desc}</p>
      </div>
    </motion.div>
  );
};
