"use client";

import React from "react";
import { BRAND } from "@/constants/brand";
import { BrandLockup } from "@/components/ui/BrandLogo";

// ── Data ─────────────────────────────────────────────────────────────────────
// Three columns matching how a client actually navigates their decision:
// "Have I seen proof?" → "Do I trust the process?" → "How do I start?"

const NAV = [
  {
    heading: "The work",
    links: [
      { label: "Home",         href: "/" },
      { label: "Case studies", href: "/work" },
      { label: "About",        href: "/about" },
    ],
  },
  {
    heading: "How we build",
    links: [
      { label: "Our process",     href: "/#our-process" },
      { label: "Launch standard", href: "/#proof-discipline" },
      { label: "What we deliver", href: "/#services" },
    ],
  },
] as const;

// ── Footer ───────────────────────────────────────────────────────────────────

export const FooterSection = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ibda-bg">
      {/* Warm top accent — echoes the gold thread running through the site */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ibda-gold/16 to-transparent" />
      <div className="brand-texture opacity-[0.45]" aria-hidden="true" />

      <div className="container mx-auto px-6 pb-10 pt-16 md:pb-12 md:pt-20">
        <div className="mb-12 flex flex-col items-center gap-5 text-center">
          <div className="h-48 w-48 md:h-56 md:w-56">
            <BrandLockup />
          </div>
          <p className="max-w-xl text-sm font-semibold leading-relaxed text-white/48">
            {BRAND.heroLine}
          </p>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/28">
            {BRAND.footerLine}
          </p>
        </div>

        {/* ── Navigation ── */}
        <nav
          aria-label="Footer navigation"
          className="mt-10 grid gap-10 border-t border-white/[0.06] pt-10 sm:grid-cols-2 md:grid-cols-3 md:gap-14"
        >
          {/* Cols 1 & 2 — site navigation */}
          {NAV.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.26em] text-white/26">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-white/46 transition-colors duration-200 hover:text-white/78"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Col 3 — soft conversion */}
          {/* For the visitor who scrolled past the big CTA but still wants contact */}
          <div>
            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.26em] text-white/26">
              Work with us
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="/contact#project-intake"
                  className="text-sm text-white/46 transition-colors duration-200 hover:text-white/78"
                >
                  Start a project
                </a>
              </li>
              <li>
                {/* Email as the quiet back-door conversion path */}
                <a
                  href="mailto:hello@ibdadev.com"
                  className="text-sm font-semibold text-ibda-gold/65 transition-colors duration-200 hover:text-ibda-gold"
                >
                  hello@ibdadev.com
                </a>
              </li>
            </ul>
            {/* Micro-copy that reduces the final barrier to reaching out */}
            <p className="mt-4 text-[11px] leading-relaxed text-white/20">
              We respond within 24 hours.
              <br />
              No pitch, no pressure.
            </p>
          </div>
        </nav>

        {/* ── Bottom bar ── */}
        <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.05] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-white/24">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          {/* Self-referential — the agency runs its own process on its own site */}
          <p className="text-[11px] text-white/16">
            Built by {BRAND.name}
          </p>
        </div>
      </div>
    </footer>
  );
};
