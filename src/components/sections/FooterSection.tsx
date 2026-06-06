"use client";

import React from "react";

export const FooterSection = () => {
  return (
    <footer className="py-40 bg-ibda-bg relative z-10 border-t border-white/5 flex flex-col items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-[15vw] font-black tracking-tighter text-white/5 hover:text-ibda-accent/10 transition-colors duration-700 select-none">
          IBDADEV
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-left mt-20 border-t border-white/5 pt-20">
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/30">Website</h4>
            <div className="flex flex-col gap-2">
              <a href="/" className="hover:text-ibda-accent transition-colors">Home</a>
              <a href="/#services" className="hover:text-ibda-accent transition-colors">Services</a>
              <a href="/about" className="hover:text-ibda-accent transition-colors">About</a>
              <a href="/work#start-project" className="hover:text-ibda-accent transition-colors">Start a Project</a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/30">Capabilities</h4>
            <div className="flex flex-col gap-2">
              <a href="/about" className="hover:text-ibda-accent transition-colors">Brand Systems</a>
              <a href="/about" className="hover:text-ibda-accent transition-colors">Conversion Websites</a>
              <a href="/about" className="hover:text-ibda-accent transition-colors">Product Interfaces</a>
              <a href="/about" className="hover:text-ibda-accent transition-colors">Motion UI</a>
            </div>
          </div>
          <div className="col-span-2 space-y-4 md:text-right">
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/30">Next steps</h4>
            <div className="flex flex-col md:items-end gap-2">
              <a href="/work#start-project" className="hover:text-white/60 transition-colors">Project inquiry</a>
              <a href="/about" className="hover:text-white/60 transition-colors">Delivery model</a>
              <a href="/#proof-discipline" className="hover:text-white/60 transition-colors">Quality standards</a>
            </div>
          </div>
        </div>
        <p className="mt-20 text-white/20 text-xs text-center border-t border-white/5 pt-8 w-full max-w-sm mx-auto">
          © {new Date().getFullYear()} IbdaDev. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
