"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MagneticWrapper } from "./MagneticWrapper";
import { BrandLogo } from "./BrandLogo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Works", href: "/work" },
];

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-0 top-5 z-50 flex w-full items-center justify-between px-4 pointer-events-none sm:px-6 lg:px-10">
      {/* Spacer for left side balance */}
      <div className="flex-1 hidden lg:block" />

      {/* Centered Glass Pill (Logo + Links) */}
      <nav
        className={cn(
          "nav-glass flex items-center gap-5 rounded-full p-2 transition-all duration-500 pointer-events-auto backdrop-blur-sm border border-white/10 shadow-2xl md:gap-8",
          scrolled ? "scale-95 shadow-black/80 bg-black/55" : "scale-100 bg-white/5"
        )}
      >
        <Link
          href="/"
          aria-label="Ibda Dev home"
          className="group flex h-11 items-center rounded-full border border-white/10 bg-black/55 py-1.5 pl-1.5 pr-4 transition-all duration-300 hover:border-[#D7B46A]/35 hover:bg-[#0E0D0A] active:scale-95"
        >
          <BrandLogo compact className="gap-2.5" textClassName="hidden sm:flex" />
        </Link>
  
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 px-4 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-2 transition-all duration-300",
                  isActive
                    ? "bg-[#D7B46A]/14 text-[#D7B46A] shadow-[inset_0_0_0_1px_rgba(215,180,106,0.22)]"
                    : "text-white/50 hover:bg-white/[0.055] hover:text-white"
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-1 h-px bg-[#D7B46A]" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
  
      {/* CTA Button - Far Right Corner (Outside the pill) */}
      <div className="flex flex-1 justify-end pointer-events-auto">
        <MagneticWrapper>
          <Link
            href="/work#start-project"
            className="rounded-full border border-[#D7B46A]/30 bg-[#D7B46A]/10 px-5 py-3 text-xs font-black uppercase tracking-[0.08em] text-[#D7B46A] transition-all duration-300 hover:bg-[#D7B46A] hover:text-[#050505] active:scale-95 sm:px-7 sm:text-sm"
          >
            <span className="sm:hidden">Start</span>
            <span className="hidden sm:inline">Start a Project</span>
          </Link>
        </MagneticWrapper>
      </div>
    </div>
  );
};
