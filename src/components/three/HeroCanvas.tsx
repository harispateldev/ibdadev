"use client";

import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { IcosahedronMesh } from "./IcosahedronMesh";

export function HeroCanvas() {
  const shouldReduceMotion = useReducedMotion();

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
    // Override the global `canvas { position: fixed }` rule scoped to this hero
    <div aria-hidden="true" className="absolute inset-0 z-0" style={{ isolation: "isolate" }}>
      <style>{`
        .hero-canvas-root canvas {
          position: absolute !important;
          width: 100% !important;
          height: 100% !important;
          top: 0 !important;
          left: 0 !important;
        }
      `}</style>
      <div className="hero-canvas-root absolute inset-0">
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
    </div>
  );
}
