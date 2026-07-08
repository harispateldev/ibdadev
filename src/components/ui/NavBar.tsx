"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MagneticWrapper } from "./MagneticWrapper";
import { BRAND } from "@/constants/brand";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Process", href: "/#our-process" },
  { name: "About", href: "/about" },
];

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed left-0 top-4 z-50 w-full px-4 pointer-events-none sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3">
        <Link
          href="/"
          aria-label="Ibda Dev home"
          className={cn(
            "pointer-events-auto inline-flex w-fit flex-col transition-all duration-500 active:scale-95",
            scrolled ? "scale-95 opacity-92" : "scale-100"
          )}
        >
          <span className="font-display text-sm font-black uppercase leading-none tracking-[0.28em] text-white sm:text-base">
            {BRAND.name}
          </span>
          <span className="mt-1 hidden text-[8px] font-black uppercase leading-none tracking-[0.26em] text-[#D7B46A]/72 sm:block">
            {BRAND.tagline}
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className={cn(
            "nav-glass pointer-events-auto hidden items-center rounded-full border border-white/10 p-1.5 shadow-2xl backdrop-blur-sm transition-all duration-500 md:flex",
            scrolled ? "scale-95 bg-black/58 shadow-black/80" : "scale-100 bg-white/5"
          )}
        >
          <div className="flex items-center gap-1 text-sm font-semibold">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : !link.href.includes("#") && pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-5 py-2.5 transition-all duration-300",
                    isActive
                      ? "bg-[#D7B46A]/14 text-[#D7B46A] shadow-[inset_0_0_0_1px_rgba(215,180,106,0.22)]"
                      : "text-white/54 hover:bg-white/[0.055] hover:text-white"
                  )}
                >
                  <span className="text-sm leading-none">{link.name}</span>
                  {isActive && (
                    <span className="absolute inset-x-4 -bottom-1 h-px bg-[#D7B46A]" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="flex justify-end pointer-events-auto">
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(
              "nav-glass inline-flex h-12 items-center gap-3 rounded-full border border-white/10 bg-black/50 px-4 text-xs font-black uppercase tracking-[0.16em] text-white/78 transition-all duration-300 active:scale-95 md:hidden",
              menuOpen && "border-[#D7B46A]/38 text-[#D7B46A]"
            )}
          >
            Menu
            <span className="grid gap-1" aria-hidden="true">
              <span className={cn("h-px w-4 bg-current transition-transform", menuOpen && "translate-y-1 rotate-45")} />
              <span className={cn("h-px w-4 bg-current transition-opacity", menuOpen && "opacity-0")} />
              <span className={cn("h-px w-4 bg-current transition-transform", menuOpen && "-translate-y-1 -rotate-45")} />
            </span>
          </button>

          <div className="hidden md:block">
            <MagneticWrapper>
              <Link
                href="/contact#project-intake"
                className="group inline-flex items-center gap-3 rounded-full border border-[#D7B46A]/30 bg-[#D7B46A]/10 px-6 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#D7B46A] transition-all duration-300 hover:bg-[#D7B46A] hover:text-[#050505] active:scale-95"
              >
                Start a project
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">↗</span>
              </Link>
            </MagneticWrapper>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "pointer-events-auto mx-auto mt-3 max-w-7xl overflow-hidden transition-all duration-300 md:hidden",
          menuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="rounded-[1.35rem] border border-white/12 bg-[#050505] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.72)]">
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.055] px-4 py-3 text-base font-black text-white transition-colors hover:bg-white/[0.08]"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <Link
            href="/contact#project-intake"
            className="mt-3 flex items-center justify-between rounded-2xl bg-[#D7B46A] px-4 py-4 text-sm font-black uppercase tracking-[0.14em] text-black"
          >
            Start a project
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
