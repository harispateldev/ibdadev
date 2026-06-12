"use client";

import React, { useRef, useLayoutEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { HeroCanvasDynamic } from "@/components/three/HeroCanvasDynamic";

const flowPoints = [
  { label: "AI", value: "Connected", x: "28%", y: "10%", color: "#60E6D2", delay: 0 },
  { label: "Product", value: "Built", x: "68%", y: "18%", color: "#8E7CFF", delay: 0.14 },
  { label: "Ops", value: "Automated", x: "72%", y: "64%", color: "#F06A3D", delay: 0.28 },
];

const surfaces = ["AI Tool", "Web App", "Mobile", "Dashboard"];
const storySteps = ["Plan", "Build", "Connect", "Launch"];

const HeroTheater = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, x: 34 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.22 }}
      className="relative min-h-[420px] w-full [perspective:1200px] md:min-h-[540px] lg:min-h-[620px]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_40%,rgba(215,180,106,0.16),transparent_21rem),radial-gradient(circle_at_72%_72%,rgba(96,230,210,0.13),transparent_22rem),radial-gradient(circle_at_24%_70%,rgba(142,124,255,0.12),transparent_23rem)]" />

      <motion.div
        animate={shouldReduceMotion ? undefined : { rotateX: [58, 55, 58], rotateZ: [-10, -8, -10], y: [0, -10, 0] }}
        transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[7%] top-[12%] h-[68%] w-[86%] max-w-[680px] origin-center rounded-[2rem] bg-[#11100E]/72 shadow-[0_54px_150px_rgba(0,0,0,0.56),0_0_110px_rgba(96,230,210,0.12),inset_0_0_0_1px_rgba(255,255,255,0.12)] [transform:rotateX(58deg)_rotateZ(-10deg)] [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
          <motion.div
            animate={shouldReduceMotion ? undefined : { x: ["-36%", "120%"] }}
            transition={shouldReduceMotion ? undefined : { duration: 4.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
            className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/12 to-transparent blur-sm"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:68px_68px]" />
          <div className="absolute inset-x-10 top-10 h-1 bg-gradient-to-r from-[#D7B46A] via-[#60E6D2] to-[#8E7CFF]" />
        </div>
      </motion.div>

      <motion.div
        animate={shouldReduceMotion ? undefined : { rotateY: [-18, -14, -18], rotateX: [8, 11, 8], y: [0, -12, 0] }}
        transition={shouldReduceMotion ? undefined : { duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-[48%] h-[78%] w-[88%] max-w-[660px] -translate-x-1/2 -translate-y-1/2 [transform:rotateY(-18deg)_rotateX(8deg)] [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 rounded-[2rem] bg-[#060505] shadow-[0_38px_120px_rgba(0,0,0,0.62)] [transform:translateZ(-42px)]" />

        <div className="absolute left-[8%] top-[8%] h-[84%] w-[84%] overflow-hidden rounded-[2rem] bg-[#0D0C0A]/88 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),0_38px_130px_rgba(0,0,0,0.55)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(215,180,106,0.24),transparent_14rem),radial-gradient(circle_at_72%_68%,rgba(96,230,210,0.20),transparent_13rem)]" />
          <div className="absolute left-8 top-8">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/32">From business need</p>
            <p className="mt-3 text-4xl font-black uppercase leading-none text-white/90 md:text-6xl">To system</p>
          </div>
          <div className="absolute right-8 top-8 bg-[#D7B46A] px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-black">
            AI connected
          </div>
          <div className="absolute bottom-8 left-8 grid w-[52%] grid-cols-2 gap-2">
            {storySteps.map((step, index) => (
              <span key={step} className="bg-white/[0.055] px-2 py-3 text-center text-[10px] font-black uppercase tracking-[0.1em] text-white/52">
                0{index + 1} {step}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 md:h-[430px] md:w-[430px]">
          <svg viewBox="0 0 430 430" className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <filter id="hero-glow">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="hero-line" x1="60" x2="390" y1="80" y2="360">
                <stop stopColor="#D7B46A" />
                <stop offset="0.5" stopColor="#60E6D2" />
                <stop offset="1" stopColor="#8E7CFF" />
              </linearGradient>
            </defs>
            <path d="M70 225 C82 100 222 38 326 100 C432 164 414 315 296 372 C184 426 64 350 70 225Z" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
            <motion.path
              d="M70 225 C82 100 222 38 326 100 C432 164 414 315 296 372 C184 426 64 350 70 225Z"
              fill="none"
              stroke="url(#hero-line)"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#hero-glow)"
              initial={shouldReduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.25, delay: 0.55, ease: "easeOut" }}
            />
          </svg>

          <motion.div
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
            transition={shouldReduceMotion ? undefined : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 z-10 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center bg-[#070605] text-center shadow-[0_28px_90px_rgba(0,0,0,0.62),0_0_70px_rgba(215,180,106,0.16),inset_0_0_0_1px_rgba(255,255,255,0.14)] md:h-40 md:w-40"
          >
            <span>
              <span className="block text-[10px] font-black uppercase tracking-[0.22em] text-white/34">IbdaDev</span>
              <span className="mt-2 block text-2xl font-black uppercase leading-none text-[#D7B46A] md:text-3xl">Builds</span>
            </span>
          </motion.div>

          {flowPoints.map((node, index) => (
            <motion.div
              key={node.label}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.72, y: 12 }}
              animate={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: [1, 1.04, 1], y: [0, -5, 0] }}
              transition={shouldReduceMotion ? { duration: 0.34, delay: 0.45 + index * 0.08 } : { duration: 3.8, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-20 grid h-20 w-24 place-items-center bg-[#080706]/82 text-center shadow-[0_18px_60px_rgba(0,0,0,0.44),0_0_42px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur md:h-24 md:w-28"
              style={{ left: node.x, top: node.y, color: node.color }}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white/42">{node.label}</span>
              <span className="text-xs font-black uppercase leading-none text-current md:text-sm">{node.value}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[7%] right-[2%] z-30 w-[38%] min-w-[170px] bg-[#090806]/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.52),0_0_54px_rgba(142,124,255,0.12),inset_0_0_0_1px_rgba(255,255,255,0.13)] backdrop-blur [transform:translateZ(70px)_rotateZ(6deg)]"
        >
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/34">What ships</p>
          <div className="grid grid-cols-2 gap-2">
            {surfaces.map((item) => (
              <span key={item} className="bg-white/[0.06] px-2 py-3 text-center text-[10px] font-black uppercase tracking-[0.1em] text-white/62">
                {item}
              </span>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
};

export const HeroSection = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (shouldReduceMotion || !headlineRef.current) return;

    const words = headlineRef.current.querySelectorAll(".hero-word");
    gsap.fromTo(
      words,
      { y: "105%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.15,
      }
    );
  }, [shouldReduceMotion]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-transparent px-6 pb-12 pt-28 md:pb-16">
      {/* WebGL Canvas — behind everything */}
      <HeroCanvasDynamic />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ibda-gold/40 to-transparent" />
      <div className="absolute right-[-14vw] top-20 hidden h-[48vw] max-h-[660px] w-[48vw] max-w-[660px] bg-[radial-gradient(circle,rgba(96,230,210,0.08),transparent_58%)] md:block" />

      <div className="container relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col items-start text-left">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-7 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold"
          >
            From idea to working product
          </motion.p>

          {/* Headline with per-word clip-mask reveal */}
          <h1
            ref={headlineRef}
            className="max-w-4xl text-5xl font-black leading-[0.88] tracking-normal sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {["Build", "the", "tools."].map((word) => (
              <span key={word} className="mr-[0.22em] inline-block overflow-hidden">
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
            <br />
            {["Run", "the", "business."].map((word) => (
              <span key={word} className="mr-[0.22em] inline-block overflow-hidden">
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.22 }}
            className="mt-8 max-w-xl text-base font-medium leading-relaxed text-white/75 md:text-xl"
          >
            We design and build the systems that run your business — AI-connected, fully integrated, and shipped fast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.32 }}
            className="mt-10 flex flex-wrap items-center justify-start gap-5"
          >
            <a href="/contact" className="rounded-full bg-[#D7B46A] px-8 py-4 text-base font-bold text-[#050505] shadow-[0_18px_45px_rgba(215,180,106,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(215,180,106,0.28)]">
              Start a Project
            </a>
            <a href="/work" className="group inline-flex items-center gap-3 py-4 text-sm font-black uppercase tracking-[0.14em] text-white/72 transition-colors hover:text-ibda-gold">
              View our work
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.52 }}
            className="mt-6 text-xs font-medium tracking-wide text-white/38"
          >
            12 products shipped · 3 continents · 100% client retention
          </motion.p>
        </div>

        <HeroTheater />
      </div>
    </section>
  );
};
