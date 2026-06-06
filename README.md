# 🎨 IbdaDev — Creative Development Agency

**IbdaDev** (إبداع + Dev) is a high-end, immersive creative development agency website combining absolute technical precision with artistic audacity. The platform features state-of-the-art interactive 3D WebGL experiences, cinematic scroll animations, and premium dark-mode aesthetics.

*"Code with Creativity — Where Innovation Meets Development"*

---

## ✨ Features

- **Immersive 3D Scroll Scenes**: Fully interactive React Three Fiber environment containing an custom geometric Rub-el-Hizb (۞) centerpiece, orbiting satellites, dynamic wireframe icosahedrons, and responsive floating spheres.
- **Scroll-Linked Lighting & Color Cycles**: Real-time canvas lighting transitions and particle color interpolation dynamically reacting to the scroll position using Zustand and GSAP.
- **Cinematic Scroll Animations**: Smooth inertia scrolling powered by Lenis combined with GSAP ScrollTrigger and Framer Motion for premium micro-interactions.
- **Arabic-Inspired Design System**: Tailored brand identity utilizing a deep void black background (`#050508`), electric indigo accent (`#6C63FF`), warm gold (`#D4A853`), and futuristic tech cyan (`#00D4FF`).
- **Responsive Layouts**: Seamless typography scaling and layout transitions optimized for mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Engine**: [React Three Fiber](https://r3f.docs.pmnd.rs/) & [Drei](https://github.com/pmndrs/drei) (built on [Three.js](https://threejs.org/))
- **Animations**: [GSAP (GreenSock)](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis Scroll](https://lenis.darkroom.engineering/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

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

## 📂 Project Structure

- `src/app/` — Next.js routing, global styles, and page layouts.
- `src/components/scenes/` — React Three Fiber canvas, camera controls, lighting setups, and 3D geometries.
- `src/components/sections/` — Interactive DOM sections (Hero, Works, Stats, Capabilities, Testimonials, CTA).
- `src/components/ui/` — Reusable interface primitives (Buttons, Navbars, Cards).
- `src/constants/` — Central design system configuration and colors.
- `src/store/` — Scroll physics and interaction stores.
