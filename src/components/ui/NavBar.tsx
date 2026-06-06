"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Works", href: "/work" },
];

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 w-full z-50 flex items-center justify-between px-10 pointer-events-none">
      {/* Spacer for left side balance */}
      <div className="flex-1 hidden lg:block" />

      {/* Centered Glass Pill (Logo + Links) */}
      <nav
        className={cn(
          "nav-glass p-2 flex items-center gap-8 rounded-full transition-all duration-500 pointer-events-auto backdrop-blur-sm border border-white/10 shadow-2xl",
          scrolled ? "scale-95 shadow-black/80 bg-black/55" : "scale-100 bg-white/5"
        )}
      >
        <Link 
          href="/" 
          className="gold-pill px-6 h-9 rounded-full flex items-center gap-2 group transition-all duration-300 hover:brightness-110 active:scale-95 shadow-lg"
        >
          <span className="text-white font-black tracking-tighter text-base leading-none">
            IbdaDev
          </span>
        </Link>
  
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 px-4 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white/50 hover:text-white transition-all duration-300 relative group py-2"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
  
      {/* CTA Button - Far Right Corner (Outside the pill) */}
      <div className="flex-1 flex justify-end pointer-events-auto">
        <Link 
          href="/work#start-project" 
          className="accent-pill px-8 py-3.5 rounded-full text-white font-black text-sm transition-all duration-300 hover:brightness-110 active:scale-95"
        >
          Start a Project
        </Link>
      </div>
    </div>
  );
};
