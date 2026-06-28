"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CTASection } from "@/components/sections/CTASection";
import { useLenis } from "@/context/LenisContext";

const cases = [
  { number: "01", type: "AI Integration",          accent: "#D7B46A", bars: [52, 72, 48, 88], rows: [92, 78, 64] },
  { number: "02", type: "SaaS / Mobile App",       accent: "#60E6D2", bars: [64, 44, 80, 60], rows: [84, 70, 56] },
  { number: "03", type: "Web System",               accent: "#8E7CFF", bars: [40, 68, 56, 76], rows: [88, 62, 74] },
  { number: "04", type: "Automation / Dashboard",   accent: "#F06A3D", bars: [58, 82, 46, 72], rows: [76, 90, 60] },
];

const intake = [
  "What needs to improve?",
  "Who has to believe it?",
  "What proof already exists?",
  "What has to ship first?",
];

const PortfolioCard = ({
  number, type, accent, bars, rows,
}: { number: string; type: string; accent: string; bars: number[]; rows: number[] }) => (
  <article className="w-[340px] flex-shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0A0908] md:w-[380px]">
    <div className="h-[2px]" style={{ backgroundColor: accent }} />
    <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
      <span className="text-xs font-black" style={{ color: accent }}>{number}</span>
      <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/30">{type}</span>
      <div className="ml-auto h-1.5 w-1.5 rounded-full opacity-40" style={{ backgroundColor: accent }} />
    </div>
    <div className="relative overflow-hidden p-4">
      <div
        className="pointer-events-none absolute -right-12 top-0 h-48 w-48 rounded-full blur-3xl"
        style={{ backgroundColor: accent, opacity: 0.1 }}
      />
      <div className="mb-3 flex items-center gap-1.5 rounded border border-white/[0.06] bg-white/[0.02] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#FF6B6B]/60" />
        <span className="h-2 w-2 rounded-full bg-[#FFD166]/60" />
        <span className="h-2 w-2 rounded-full bg-[#6EE7B7]/60" />
        <div className="mx-auto h-1.5 w-28 rounded-full bg-white/[0.06]" />
      </div>
      <div className="grid h-[230px] grid-cols-[0.8fr_1.2fr] gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.025] p-3">
            <div className="mb-4 h-1 w-10 rounded-full" style={{ backgroundColor: accent, opacity: 0.7 }} />
            <div className="mb-2 h-3 w-4/5 rounded bg-white/20" />
            <div className="mb-1.5 h-1.5 w-full rounded bg-white/10" />
            <div className="h-1.5 w-2/3 rounded bg-white/[0.07]" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-16 rounded-lg border border-white/[0.06] bg-white/[0.025]" />
            <div className="h-16 rounded-lg border border-white/[0.06] bg-white/[0.025]" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.025] p-3">
            <div className="flex h-full items-end gap-2">
              {bars.map((h, idx) => (
                <div
                  key={idx}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    backgroundColor: idx === bars.length - 1 ? accent : "rgba(255,255,255,0.08)",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.025] p-3">
            <div className="mb-2 h-1.5 w-16 rounded-full bg-white/[0.06]" />
            <div className="space-y-2">
              {rows.map((w) => (
                <div key={w} className="h-1.5 rounded-full bg-white/[0.08]" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
);

export default function WorkPage() {
  const lenis     = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    // Only on desktop
    if (!section || !track || !lenis || window.innerWidth < 1024) return;

    let cardX    = 0;
    let isPinned = false;

    const getScrollDist = () => track.scrollWidth - track.offsetWidth;

    const pin = () => {
      if (isPinned) return;
      isPinned = true;
      lenis.stop();
    };

    const unpin = () => {
      if (!isPinned) return;
      isPinned = false;
      lenis.start();
    };

    // Lenis fires this on every scroll tick — check if we should pin
    const onLenisScroll = () => {
      const top = section.getBoundingClientRect().top;
      // Section has reached the viewport top and cards aren't fully shown yet
      if (top <= 0 && cardX < getScrollDist()) {
        pin();
      }
    };

    // While pinned, wheel input drives cards instead of the page
    const onWheel = (e: WheelEvent) => {
      if (!isPinned) return;
      e.preventDefault(); // keep page frozen

      const scrollDist = getScrollDist();
      cardX = Math.max(0, Math.min(cardX + e.deltaY, scrollDist));
      track.style.transform = `translate3d(-${cardX}px, 0, 0)`;

      // Scrolled up past card start → unpin and let page scroll up naturally
      if (cardX <= 0 && e.deltaY < 0) {
        unpin();
        return;
      }
      // Scrolled through all cards → unpin and let page continue down
      if (cardX >= scrollDist) {
        unpin();
      }
    };

    lenis.on("scroll", onLenisScroll);
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      lenis.off("scroll", onLenisScroll);
      window.removeEventListener("wheel", onWheel);
      unpin();
    };
  }, [lenis]);

  return (
    <main className="min-h-screen bg-[#050505] pt-32 text-white">

      {/* Desktop: h-screen section — page pauses here, cards scroll on wheel */}
      <section
        ref={sectionRef}
        className="hidden h-screen items-center gap-12 px-6 lg:flex lg:gap-16 lg:px-12"
      >
        {/* Left panel — stays put */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-64 flex-shrink-0 xl:w-72"
        >
          <span className="mb-6 block text-xs font-black uppercase tracking-[0.26em] text-[#D7B46A]">
            Portfolio
          </span>
          <h1 className="text-4xl font-black leading-[0.92] tracking-tight xl:text-5xl">
            Real project slots, ready to fill.
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-white/44">
            Add actual client projects here: problem, shipped system, stack, screenshots, and outcome.
          </p>
          <a
            href="#start-project"
            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/[0.10] bg-white/[0.04] px-5 py-3 text-sm font-black text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white/80"
          >
            View all work <span className="text-[#D7B46A]">+</span>
          </a>
        </motion.div>

        {/* Cards track — clipped, driven left by wheel */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-5"
            style={{ willChange: "transform" }}
          >
            {cases.map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52, delay: i * 0.08 }}
              >
                <PortfolioCard {...item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile: simple vertical stack */}
      <div className="space-y-5 px-6 pb-16 pt-4 lg:hidden">
        <span className="mb-5 block text-xs font-black uppercase tracking-[0.26em] text-[#D7B46A]">Portfolio</span>
        <h1 className="mb-8 text-4xl font-black leading-[0.92] tracking-tight">Real project slots, ready to fill.</h1>
        {cases.map((item) => <PortfolioCard key={item.number} {...item} />)}
      </div>

      {/* ─── Before we scope ── */}
      <section id="start-project" className="container mx-auto max-w-7xl scroll-mt-32 px-6 pb-28 pt-20">
        <div className="grid gap-8 rounded-lg border border-white/12 bg-[#080808] p-6 md:p-9 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
          <div>
            <span className="mb-5 block text-xs font-black uppercase tracking-[0.26em] text-[#D7B46A]">Before we scope</span>
            <h2 className="text-3xl font-black leading-[0.98] tracking-normal text-white md:text-5xl">
              A good project brief starts with constraints, not inspiration.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/52">
              Bring these four answers into the first conversation and the scope gets sharper fast.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {intake.map((question, index) => (
              <div key={question} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <span className="mb-5 block text-xs font-black text-[#D7B46A]">0{index + 1}</span>
                <p className="text-base font-bold leading-relaxed text-white/62">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
