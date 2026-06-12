# Homepage Visual Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Elevate the IbdaDev homepage with a WebGL icosahedron hero, magnetic cursor, momentum entrance animations, and polished section upgrades.

**Architecture:** React Three Fiber canvas mounted behind the hero (SSR-safe dynamic import), Framer Motion `useMotionValue` for the magnetic cursor, GSAP for the headline word-reveal — all gated behind `useReducedMotion` and `(pointer: fine)` media checks.

**Tech Stack:** Next.js 15, React Three Fiber + Drei, Three.js, Framer Motion, GSAP, Lenis, Tailwind CSS, TypeScript

---

## Task 1: Install dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install R3F, Drei, and Three.js types**

```bash
cd /Users/codeaura/Projects/Agency/ibdadev
npm install @react-three/fiber @react-three/drei three
npm install -D @types/three
```

**Step 2: Verify installation**

```bash
node -e "require('@react-three/fiber'); console.log('R3F OK')"
node -e "require('three'); console.log('Three OK')"
```

Expected: `R3F OK` and `Three OK` printed, no errors.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add @react-three/fiber, drei, and three.js"
```

---

## Task 2: Create `useMouseSpring` hook

**Files:**
- Create: `src/hooks/useMouseSpring.ts`

**Step 1: Create the hook**

```ts
// src/hooks/useMouseSpring.ts
"use client";

import { useRef, useEffect } from "react";

type Vec2 = { x: number; y: number };

/**
 * Returns a ref that holds the current smoothed mouse position
 * normalized to [-1, 1] on both axes.
 * Damping factor: 0.08 (lower = more lag).
 */
export function useMouseSpring(damping = 0.08) {
  const mouse = useRef<Vec2>({ x: 0, y: 0 });
  const smoothed = useRef<Vec2>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Call this each frame (inside useFrame in R3F)
  const tick = () => {
    smoothed.current.x += (mouse.current.x - smoothed.current.x) * damping;
    smoothed.current.y += (mouse.current.y - smoothed.current.y) * damping;
    return smoothed.current;
  };

  return { raw: mouse, smoothed, tick };
}
```

**Step 2: Commit**

```bash
git add src/hooks/useMouseSpring.ts
git commit -m "feat: add useMouseSpring damped tracking hook"
```

---

## Task 3: Create `useReveal` hook

**Files:**
- Create: `src/hooks/useReveal.ts`

**Step 1: Create the hook**

```ts
// src/hooks/useReveal.ts
"use client";

import { useRef, useEffect, useState } from "react";

/**
 * Returns [ref, isVisible].
 * isVisible becomes true once the element enters the viewport (fires once).
 * rootMargin: negative margin so reveal triggers slightly before the element
 * is fully on screen.
 */
export function useReveal(rootMargin = "-80px") {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, isVisible] as const;
}
```

**Step 2: Commit**

```bash
git add src/hooks/useReveal.ts
git commit -m "feat: add useReveal IntersectionObserver hook"
```

---

## Task 4: Create `IcosahedronMesh` — 3D geometry + particles

**Files:**
- Create: `src/components/three/IcosahedronMesh.tsx`

**Step 1: Create the component**

```tsx
// src/components/three/IcosahedronMesh.tsx
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMouseSpring } from "@/hooks/useMouseSpring";

const PARTICLE_COUNT = typeof navigator !== "undefined" && navigator.hardwareConcurrency < 4 ? 200 : 800;

export function IcosahedronMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const { tick } = useMouseSpring(0.06);

  // Generate particle positions once
  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 3.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mouse = tick();

    if (meshRef.current) {
      // Slow base rotation
      meshRef.current.rotation.x = t * 0.08 + mouse.y * 0.4;
      meshRef.current.rotation.y = t * 0.12 + mouse.x * 0.4;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.03;
      pointsRef.current.rotation.x = t * 0.015;
    }
  });

  return (
    <group>
      {/* Wireframe icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial
          color="#D7B46A"
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Inner solid glow */}
      <mesh>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial
          color="#8E7CFF"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Particle field */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.022}
          color="#60E6D2"
          transparent
          opacity={0.55}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/three/IcosahedronMesh.tsx
git commit -m "feat: add 3D IcosahedronMesh with particle field"
```

---

## Task 5: Create `HeroCanvas` — R3F scene wrapper

**Files:**
- Create: `src/components/three/HeroCanvas.tsx`

**Step 1: Create the component**

```tsx
// src/components/three/HeroCanvas.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { IcosahedronMesh } from "./IcosahedronMesh";

export function HeroCanvas() {
  const shouldReduceMotion = useReducedMotion();

  // Accessibility: show static gradient instead of live canvas
  if (shouldReduceMotion) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 55% 45%, rgba(215,180,106,0.18), transparent 38rem), radial-gradient(circle at 75% 70%, rgba(96,230,210,0.13), transparent 30rem)",
        }}
      />
    );
  }

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0">
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} intensity={0.8} color="#D7B46A" />
        <pointLight position={[-4, -2, 2]} intensity={0.5} color="#8E7CFF" />
        <IcosahedronMesh />
      </Canvas>
    </div>
  );
}
```

**Step 2: Create the dynamic export (SSR-safe)**

Create `src/components/three/HeroCanvasDynamic.tsx`:

```tsx
// src/components/three/HeroCanvasDynamic.tsx
import dynamic from "next/dynamic";

export const HeroCanvasDynamic = dynamic(
  () => import("./HeroCanvas").then((m) => ({ default: m.HeroCanvas })),
  {
    ssr: false,
    // Fallback: static gradient while R3F loads
    loading: () => (
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 55% 45%, rgba(215,180,106,0.18), transparent 38rem)",
        }}
      />
    ),
  }
);
```

**Step 3: Commit**

```bash
git add src/components/three/HeroCanvas.tsx src/components/three/HeroCanvasDynamic.tsx
git commit -m "feat: add R3F HeroCanvas with SSR-safe dynamic import"
```

---

## Task 6: Update `HeroSection` — mount canvas + word-by-word reveal

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

**Step 1: Update the file**

Replace the top of the file (imports and section component) — keep `HeroTheater` unchanged:

```tsx
"use client";

import React, { useRef, useLayoutEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { HeroCanvasDynamic } from "@/components/three/HeroCanvasDynamic";

// ... keep flowPoints, surfaces, storySteps, HeroTheater exactly as-is ...

export const HeroSection = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (shouldReduceMotion || !headlineRef.current) return;

    // Word-by-word clip-mask reveal
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
      <div className="absolute right-[-14vw] top-20 hidden h-[48vw] max-h-[660px] w-[48vw] max-w-[660px] bg-[radial-gradient(circle,rgba(96,230,210,0.10),transparent_58%)] md:block" />
      <div className="absolute left-[-16vw] bottom-[-10vw] hidden h-[40vw] max-h-[520px] w-[40vw] max-w-[520px] bg-[radial-gradient(circle,rgba(142,124,255,0.09),transparent_62%)] lg:block" />

      <div className="container relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col items-start text-left">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-7 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold"
          >
            AI / SaaS / web / mobile / automation
          </motion.p>

          {/* Headline with per-word clip-mask reveal */}
          <h1
            ref={headlineRef}
            className="max-w-4xl text-5xl font-black leading-[0.88] tracking-normal sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {["Build", "the", "tools."].map((word) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.22em]">
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
            <br />
            {["Run", "the", "business."].map((word) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.22em]">
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.22 }}
            className="mt-8 max-w-xl text-base font-medium leading-relaxed text-white/56 md:text-xl"
          >
            AI tools, integrations, SaaS, mobile apps, dashboards, automations, and high-performance websites.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.32 }}
            className="mt-10 flex flex-wrap items-center justify-start gap-5"
          >
            <a href="/work#start-project" className="rounded-full bg-[#D7B46A] px-8 py-4 text-base font-bold text-[#050505] shadow-[0_18px_45px_rgba(215,180,106,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(215,180,106,0.28)]">
              Start a Project
            </a>
            <a href="/#services" className="group inline-flex items-center gap-3 py-4 text-sm font-black uppercase tracking-[0.14em] text-white/72 transition-colors hover:text-ibda-gold">
              See services
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">-&gt;</span>
            </a>
          </motion.div>
        </div>

        <HeroTheater />
      </div>
    </section>
  );
};
```

**Step 2: Verify visually**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected:
- Hero loads with static gradient first, then WebGL scene fades in
- Rotating icosahedron wireframe visible behind headline
- Particle field drifting around it
- Moving the mouse tilts the geometry
- Words animate up on page load

**Step 3: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat: mount WebGL canvas and word-by-word headline reveal in HeroSection"
```

---

## Task 7: Create `CustomCursor` component

**Files:**
- Create: `src/components/ui/CustomCursor.tsx`

**Step 1: Create the component**

```tsx
// src/components/ui/CustomCursor.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [isPointer, setIsPointer] = useState(false);
  const [mounted, setMounted] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = { stiffness: 350, damping: 30, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    // Only enable on pointer devices (no touch-only)
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onEnterInteractive = () => setIsPointer(true);
    const onLeaveInteractive = () => setIsPointer(false);

    window.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, [x, y]);

  if (!mounted || shouldReduceMotion) return null;

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{ x, y }}
      />
      {/* Ring cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 transition-all duration-200"
        style={{
          x: springX,
          y: springY,
          width: isPointer ? 44 : 28,
          height: isPointer ? 44 : 28,
          borderColor: isPointer ? "rgba(215,180,106,0.8)" : "rgba(255,255,255,0.5)",
        }}
      />
    </>
  );
}
```

**Step 2: Add `cursor: none` to globals.css for pointer devices only**

In `src/app/globals.css`, add after the existing `:root` block:

```css
@media (pointer: fine) {
  body {
    cursor: none;
  }
  a, button, [role="button"] {
    cursor: none;
  }
}
```

**Step 3: Commit**

```bash
git add src/components/ui/CustomCursor.tsx src/app/globals.css
git commit -m "feat: add CustomCursor with spring lag and interactive state"
```

---

## Task 8: Create `MagneticWrapper` component

**Files:**
- Create: `src/components/ui/MagneticWrapper.tsx`

**Step 1: Create the component**

```tsx
// src/components/ui/MagneticWrapper.tsx
"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number; // 0-1, how strong the pull is
}

export function MagneticWrapper({ children, strength = 0.35 }: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: springX, y: springY, display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/MagneticWrapper.tsx
git commit -m "feat: add MagneticWrapper spring-pull component"
```

---

## Task 9: Mount `CustomCursor` in `layout.tsx` + wrap CTA nav button

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/ui/NavBar.tsx`
- Modify: `src/components/sections/CTASection.tsx`

**Step 1: Add CustomCursor to layout**

In `src/app/layout.tsx`, import and mount inside `<body>`:

```tsx
import { CustomCursor } from "@/components/ui/CustomCursor";

// Inside the body:
<body className={`${inter.className} antialiased bg-ibda-bg text-white`}>
  <CustomCursor />
  <SmoothScroll>
    <NavBar />
    {children}
    <FooterSection />
  </SmoothScroll>
</body>
```

**Step 2: Wrap the NavBar "Start a Project" CTA in MagneticWrapper**

In `src/components/ui/NavBar.tsx`, import and wrap the CTA link:

```tsx
import { MagneticWrapper } from "./MagneticWrapper";

// Replace the far-right Link with:
<div className="flex-1 flex justify-end pointer-events-auto">
  <MagneticWrapper>
    <Link
      href="/work#start-project"
      className="accent-pill px-8 py-3.5 rounded-full text-white font-black text-sm transition-all duration-300 hover:brightness-110 active:scale-95"
    >
      Start a Project
    </Link>
  </MagneticWrapper>
</div>
```

**Step 3: Wrap CTASection buttons in MagneticWrapper**

In `src/components/sections/CTASection.tsx`, import `MagneticWrapper` and wrap each `<a>` in the button group:

```tsx
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";

// Replace the button flex group:
<div className="flex flex-col md:flex-row items-center justify-center gap-6">
  <MagneticWrapper>
    <a href="/work#start-project" className="w-full rounded-full bg-[#D7B46A] px-12 py-6 text-xl font-black text-[#050505] shadow-[0_20px_60px_rgba(215,180,106,0.24)] transition-all hover:-translate-y-0.5 active:scale-95 md:w-auto">
      Start a Project
    </a>
  </MagneticWrapper>
  <MagneticWrapper>
    <a href="/about" className="w-full rounded-full border border-ibda-border bg-white/5 px-12 py-6 text-xl font-black text-white transition-all hover:bg-white/10 md:w-auto">
      See the process
    </a>
  </MagneticWrapper>
</div>
```

**Step 4: Verify**

Open `http://localhost:3000`. Expected:
- Custom cursor ring follows mouse with spring lag
- Ring turns gold and expands when hovering nav CTA
- Nav CTA and CTA section buttons pull toward cursor on hover
- On mobile (or touch device), native cursor is restored

**Step 5: Commit**

```bash
git add src/app/layout.tsx src/components/ui/NavBar.tsx src/components/sections/CTASection.tsx
git commit -m "feat: mount CustomCursor globally, MagneticWrapper on CTAs"
```

---

## Task 10: Upgrade `ServicesGrid` — animated SVG stroke + glow pulse

**Files:**
- Modify: `src/components/sections/ServicesGrid.tsx`

**Step 1: Animate the SVG path on capability change**

In `ServicesGrid.tsx`, in the `SignalMap` component, add a `key` on the active path so Framer Motion re-runs the `pathLength` animation each time `active` changes:

```tsx
{capabilities.map((item, index) => (
  <motion.path
    key={index === active ? `active-${item.title}` : item.title}
    d={item.path}
    fill="none"
    stroke={index === active ? item.color : "rgba(255,255,255,0.13)"}
    strokeWidth={index === active ? 4 : 1.6}
    strokeLinecap="round"
    initial={index === active ? { pathLength: 0, opacity: 0 } : false}
    animate={{
      pathLength: 1,
      opacity: index === active ? 1 : 0.42,
    }}
    transition={{ duration: 0.55, ease: "easeOut" }}
  />
))}
```

**Step 2: Add CSS glow pulse to globals.css**

In `src/app/globals.css`, append:

```css
@keyframes glow-pulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}
.services-glow {
  animation: glow-pulse 3s ease-in-out infinite;
}
```

**Step 3: Apply `.services-glow` to the radial gradient overlay in `SignalMap`**

```tsx
<div
  className="absolute inset-0 opacity-80 services-glow"
  style={{ background: `radial-gradient(circle at 54% 45%, ${current.glow}, transparent 18rem)` }}
/>
```

**Step 4: Commit**

```bash
git add src/components/sections/ServicesGrid.tsx src/app/globals.css
git commit -m "feat: animate SVG paths on capability change, add glow pulse"
```

---

## Task 11: Add counter animation to `StatsSection`

**Files:**
- Modify: `src/components/sections/StatsSection.tsx`

**Step 1: Animate the LaunchGauge score counter from 0 to 5**

In `StatsSection.tsx`, inside `LaunchGauge`, replace the static `5/5` display with an animated counter:

```tsx
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Inside LaunchGauge():
const countRef = useRef<HTMLDivElement>(null);
const isInView = useInView(countRef, { once: true, margin: "-100px" });
const [count, setCount] = useState(0);

useEffect(() => {
  if (!isInView) return;
  let frame: number;
  const start = performance.now();
  const duration = 1200;

  const animate = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    setCount(Math.round(eased * 5));
    if (progress < 1) frame = requestAnimationFrame(animate);
  };

  frame = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frame);
}, [isInView]);

// Replace the 5/5 display:
<div ref={countRef} className="grid h-44 w-44 place-items-center rounded-full bg-[#080706] shadow-[0_28px_90px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.12)]">
  <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/34">Quality</span>
  <span className="block text-6xl font-black leading-none text-white">{count}/5</span>
</div>
```

**Step 2: Commit**

```bash
git add src/components/sections/StatsSection.tsx
git commit -m "feat: animate LaunchGauge counter from 0 to 5 on scroll"
```

---

## Task 12: Add fade masks to `PartnersMarquee`

**Files:**
- Modify: `src/components/sections/PartnersMarquee.tsx`
- Modify: `src/app/globals.css`

**Step 1: Add a `.marquee-fade` utility to globals.css**

```css
.marquee-fade {
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 12%,
    black 88%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 12%,
    black 88%,
    transparent 100%
  );
}
```

**Step 2: Apply it to the marquee track wrapper in `PartnersMarquee.tsx`**

Find the outermost scrolling container (the `div` wrapping the repeating items) and add `className="marquee-fade"` to it. The exact element is the overflow-hidden wrapper — wrap or add the class to it.

**Step 3: Commit**

```bash
git add src/components/sections/PartnersMarquee.tsx src/app/globals.css
git commit -m "feat: add fade edge masks to PartnersMarquee"
```

---

## Task 13: Upgrade `CTASection` — aurora background blob

**Files:**
- Modify: `src/components/sections/CTASection.tsx`
- Modify: `src/app/globals.css`

**Step 1: Add the aurora keyframes to globals.css**

```css
@keyframes aurora-shift {
  0%   { background-position: 52% 46%; }
  33%  { background-position: 68% 38%; }
  66%  { background-position: 40% 58%; }
  100% { background-position: 52% 46%; }
}

.aurora-blob {
  background: radial-gradient(
    circle at 52% 46%,
    rgba(215,180,106,0.14) 0%,
    rgba(142,124,255,0.10) 38%,
    rgba(96,230,210,0.08) 62%,
    transparent 80%
  );
  background-size: 200% 200%;
  animation: aurora-shift 8s ease-in-out infinite;
}
```

**Step 2: Add the aurora div inside CTASection**

In `CTASection.tsx`, inside the `<section>`, add after the existing `theme-grid` div:

```tsx
<div className="aurora-blob absolute inset-0 z-0" aria-hidden="true" />
```

**Step 3: Commit**

```bash
git add src/components/sections/CTASection.tsx src/app/globals.css
git commit -m "feat: add animated aurora blob to CTASection background"
```

---

## Task 14: Apply `useReveal` momentum entrance to remaining sections

**Files:**
- Modify: `src/components/sections/TestimonialSection.tsx`
- Modify: `src/components/sections/TechStackSection.tsx`
- Modify: `src/components/sections/WorksSection.tsx`

**Context:** `StatsSection` and `ServicesGrid` already have `whileInView` on their key elements. `TechStackSection` and `CTASection` use GSAP ScrollTrigger. Apply `useReveal` only to sections that still have no entrance animation on their heading/copy block.

**Step 1: Pattern to apply (same for each section)**

For any section that lacks entrance animation on its heading `<div>`, wrap it:

```tsx
import { useReveal } from "@/hooks/useReveal";
import { useReducedMotion } from "framer-motion";

// Inside the component:
const [revealRef, isVisible] = useReveal();
const shouldReduceMotion = useReducedMotion();

// On the heading container div:
<div
  ref={revealRef as React.RefObject<HTMLDivElement>}
  className={`transition-all duration-700 ease-out ${
    isVisible
      ? "opacity-100 translate-y-0"
      : shouldReduceMotion
        ? "opacity-100"
        : "opacity-0 translate-y-10"
  }`}
>
  {/* existing heading content */}
</div>
```

**Step 2: Apply to `TestimonialSection.tsx`**
Wrap the testimonial quote block.

**Step 3: Apply to `WorksSection.tsx`**
Wrap the section heading `<div>`.

**Step 4: Verify**

Scroll through the homepage. Expected: headings slide up as they enter the viewport. Fast, clean, no jank.

**Step 5: Commit**

```bash
git add src/components/sections/TestimonialSection.tsx src/components/sections/TechStackSection.tsx src/components/sections/WorksSection.tsx
git commit -m "feat: apply useReveal momentum entrance to remaining sections"
```

---

## Task 15: Final visual QA pass

**Step 1: Run dev server**

```bash
npm run dev
```

**Step 2: Check each item**

- [ ] Hero: WebGL scene loads after hydration, icosahedron rotates, particles drift, mouse tilts geometry
- [ ] Hero: Headline words animate up on page load
- [ ] Cursor: Custom cursor ring visible on desktop, hidden on mobile/touch
- [ ] Cursor: Ring turns gold + expands on nav CTA and CTA section buttons
- [ ] Magnetic: Nav CTA and CTA buttons pull toward cursor on hover
- [ ] ServicesGrid: Switching capability re-draws SVG arc, glow pulses
- [ ] StatsSection: 0→5 counter animates when section scrolls into view
- [ ] PartnersMarquee: Left/right fade edges visible, no hard clip
- [ ] CTASection: Aurora gradient blob slowly shifts in background
- [ ] Sections: TestimonialSection, WorksSection headings slide up on scroll
- [ ] Reduced motion: All animations off, static gradient in hero, no cursor overlay

**Step 3: Build check**

```bash
npm run build
```

Expected: No TypeScript or build errors.

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete homepage visual overhaul — WebGL hero, magnetic cursor, entrance animations"
```
