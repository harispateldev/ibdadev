"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useScrollStore } from "@/store/scrollStore";

const Sphere = ({ idx, progress }: { idx: number, progress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = idx * Math.PI * 0.5;

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime + offset;
    const angle = time * 0.5 + progress * Math.PI;
    const radius = 8 + Math.sin(time) * 2;
    
    meshRef.current.position.x = Math.sin(angle) * radius;
    meshRef.current.position.y = Math.cos(angle) * radius;
    meshRef.current.position.z = Math.sin(time) * 5;
    
    // Scale pulse
    const scale = 0.5 + Math.sin(time * 2) * 0.2;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={`hsl(${(idx * 60 + progress * 360) % 360}, 80%, 50%)`}
        emissive={`hsl(${(idx * 60 + progress * 360) % 360}, 50%, 20%)`}
        emissiveIntensity={1}
      />
    </mesh>
  );
};

export const FloatingSpheres = () => {
  const progress = useScrollStore((state) => state.progress);
  const count = 10;
  
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Sphere key={i} idx={i} progress={progress} />
      ))}
    </>
  );
};
