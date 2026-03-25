"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useScrollStore } from "@/store/scrollStore";

export const ParticleSystem = () => {
  const count = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 50;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  const progress = useScrollStore((state) => state.progress);
  const velocity = useScrollStore((state) => state.velocity);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Constant rotation of the whole system
    pointsRef.current.rotation.y += 0.001;
    pointsRef.current.rotation.x += 0.0005;

    // Movement response to scroll velocity
    pointsRef.current.position.y = progress * 5;
    
    // Pulse size based on velocity
    const pulseIntensity = velocity * 0.05;
    pointsRef.current.scale.set(1 + pulseIntensity, 1 + pulseIntensity, 1 + pulseIntensity);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={`hsl(${(progress * 360 + 180) % 360}, 70%, 60%)`}
        sizeAttenuation
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
