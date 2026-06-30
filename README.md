# Ibda Dev - Software. AI. Automation.

**Ibda Dev** designs and builds modern software, AI products, and automation systems. The site presents a minimal, premium, structured agency brand for mobile apps, web platforms, SaaS products, AI systems, dashboards, commerce, and connected business operations.

*"Building intelligent digital systems."*

---

## Features

- **Premium Brand System**: Black-and-gold Ibda Dev mark, short brand copy, and structured dark visual language.
- **Business-Focused Homepage**: Sections explain software, AI, automation, mobile, web, SaaS, dashboard, and commerce solutions.
- **Purposeful Motion**: Scroll-triggered reveals, assembling cards, live product states, and restrained micro-interactions.
- **Localized Texture**: Richer background texture appears around showcase sections without overpowering copy.
- **Responsive Layouts**: Typography, cards, and product surfaces are tuned for mobile, tablet, and desktop viewports.

---

## Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Engine**: [React Three Fiber](https://r3f.docs.pmnd.rs/) & [Drei](https://github.com/pmndrs/drei) (built on [Three.js](https://threejs.org/))
- **Animations**: [GSAP (GreenSock)](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis Scroll](https://lenis.darkroom.engineering/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Deployment**: [Vercel](https://vercel.com/)

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Project Structure

- `src/app/` — Next.js routing, global styles, and page layouts.
- `src/components/scenes/` — React Three Fiber canvas, camera controls, lighting setups, and 3D geometries.
- `src/components/sections/` — Interactive DOM sections (Hero, Works, Stats, Capabilities, Testimonials, CTA).
- `src/components/ui/` — Reusable interface primitives (Buttons, Navbars, Cards).
- `src/constants/` — Central design system configuration and colors.
- `src/store/` — Scroll physics and interaction stores.
