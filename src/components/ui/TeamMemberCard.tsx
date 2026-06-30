"use client";

import React from "react";
import { motion } from "framer-motion";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

export const TeamMemberCard = ({ name, role, image }: TeamMemberProps) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative rounded-[32px] overflow-hidden bg-ibda-surface border border-white/5 p-4 transition-colors hover:border-ibda-accent/30"
    >
      <div className="aspect-square rounded-[24px] overflow-hidden mb-6 relative">
         <img 
           src={image} 
           alt={name} 
           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>
      <div className="px-2 pb-2">
        <h3 className="text-2xl font-bold mb-1">{name}</h3>
        <p className="text-sm font-medium text-white/40 uppercase tracking-widest">{role}</p>
      </div>
      
      {/* Corner Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-ibda-accent/0 group-hover:bg-ibda-accent/5 blur-[60px] transition-all" />
    </motion.div>
  );
};
