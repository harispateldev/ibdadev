"use client";

import React from "react";
import { COLOR } from "@/constants/colors";

export const FooterSection = () => {
  return (
    <footer className="py-40 bg-refract-bg relative z-10 border-t border-white/5 flex flex-col items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-[15vw] font-black tracking-tighter text-white/5 hover:text-refract-orange/10 transition-colors duration-700 select-none">
          DEVELOPERS
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-left mt-20 border-t border-white/5 pt-20">
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/30">Website</h4>
            <div className="flex flex-col gap-2">
              <a href="/" className="hover:text-refract-orange transition-colors">Home</a>
              <a href="/about" className="hover:text-refract-orange transition-colors">Services</a>
              <a href="/about" className="hover:text-refract-orange transition-colors">About</a>
              <a href="/work" className="hover:text-refract-orange transition-colors">Work With Us</a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/30">Capabilities</h4>
            <div className="flex flex-col gap-2">
              <a href="/about" className="hover:text-refract-orange transition-colors">Digital Identity</a>
              <a href="/about" className="hover:text-refract-orange transition-colors">3D Experience</a>
              <a href="/about" className="hover:text-refract-orange transition-colors">SaaS Design</a>
            </div>
          </div>
          <div className="col-span-2 space-y-4 md:text-right">
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/30">Legal</h4>
            <div className="flex flex-col md:items-end gap-2">
              <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
        <p className="mt-20 text-white/20 text-xs text-center border-t border-white/5 pt-8 w-full max-w-sm mx-auto">
          © {new Date().getFullYear()} RefractWeb. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
