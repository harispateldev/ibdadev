# Homepage Visual Overhaul Design
**Date:** 2026-06-12
**Branch:** new-theme
**Status:** Approved

---

## Goal

Elevate the IbdaDev homepage to award-level visual quality — inspired by refractweb.com, awwwards.com, and motionsites.ai. The site already has a solid dark foundation (Framer Motion, GSAP, Lenis, good color palette). This overhaul layers in a WebGL hero, systematic entrance animations, and a magnetic cursor without replacing what works.

---

## Section 1: Hero Overhaul

### WebGL Scene (`HeroCanvas.tsx`)
- Full-bleed canvas rendered behind hero content via `position: absolute`, `z-index: 0`
- Scene: floating icosahedron (wireframe, emissive edges) + ~800 drifting particles
- Colors from existing palette: gold `#D7B46A`, cyan `#60E6D2`, purple `#8E7CFF`
- Mouse move → icosahedron tilts toward cursor via damped spring physics (`useMouseSpring` hook)
- Scroll → mesh scales down and opacity fades out (linked to scroll progress)
- `frameloop="always"` — continuous 60fps for particle drift and geometry animation
- `pixelRatio` capped at `1.5` via `gl.setPixelRatio`
- Particle count: 800 desktop → 200 mobile (`navigator.hardwareConcurrency < 4`)
- `useReducedMotion` true → canvas unmounts, static radial gradient fallback renders

### Headline Reveal
- Word-by-word clip-mask reveal on mount using GSAP
- Each word slides up through a `clip-path` rect, staggered 80ms per word
- `useReducedMotion` → plain opacity fade only, no transform

### SSR Safety
- `HeroCanvas` imported via `next/dynamic({ ssr: false })`
- Fallback: existing CSS 3D theater renders instantly; WebGL hydrates on top
- Zero layout shift

---

## Section 2: Homepage Section Upgrades

### Momentum Entrance System (Global)
- `useReveal` hook using `IntersectionObserver` (once, `-80px` margin)
- Elements animate: `y: 40 → 0`, `opacity: 0 → 1`, staggered 60ms per child
- `useReducedMotion` → transforms disabled, opacity fade only
- Applied systematically to all 8 homepage sections

### ServicesGrid
- SVG polyline in `SignalMap` animates on capability change via `stroke-dashoffset` GSAP tween
- Active service glow pulses with CSS `@keyframes` radial breath animation

### StatsSection
- Numbers animate from 0 to final value (counter spring) when section enters viewport
- Powered by Framer Motion `useMotionValue` + `animate()`

### TechStackSection / PartnersMarquee
- CSS `mask-image` fade on left/right edges of both marquees
- Prevents hard-clip of scrolling logos

### CTASection
- CTA button wrapped in `MagneticWrapper`
- Background gets slow-shifting animated gradient blob: `@keyframes` radial-gradient position shift over 8s

---

## Section 3: Magnetic Cursor

- `CustomCursor.tsx` — global overlay, hides OS cursor (`cursor: none` on `body`)
- Small circle follows mouse with spring lag via Framer Motion `useMotionValue` + `useSpring`
- On hover of any `<a>` or `<button>`: cursor expands + pulls toward element center
- **Enabled only on pointer devices** (`@media (pointer: fine)`)
- Disabled when `useReducedMotion` is true
- Mobile: OS cursor restored, `CustomCursor` unmounts

---

## Section 4: Technical Architecture

### New Dependencies
```
@react-three/fiber   ← React renderer for Three.js
@react-three/drei    ← helpers (OrbitControls, Points, etc.)
three                ← explicit peer dep (currently transitive)
```

### File Structure
```
src/
  components/
    three/
      HeroCanvas.tsx         ← R3F Canvas (dynamic import, ssr: false)
      IcosahedronMesh.tsx    ← icosahedron geometry + particle Points
    ui/
      MagneticWrapper.tsx    ← magnetic pull HOC
      CustomCursor.tsx       ← global cursor overlay
  hooks/
    useReveal.ts             ← IntersectionObserver entrance hook
    useMouseSpring.ts        ← damped mouse tracking for canvas tilt
```

### Globals
- `cursor: none` added to `body` in `globals.css` (pointer devices only via media query)
- `CustomCursor` mounted once in `layout.tsx`

---

## Constraints & Non-Goals

- No horizontal scroll panels (not requested)
- No noise/grain overlay (not requested)
- No animated gradient mesh background (not requested)
- No changes to routing, page structure, or copy
- No changes to About or Work pages in this pass
- Existing `NavBar`, `FooterSection`, `WorksSection` unchanged
