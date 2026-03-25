"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useScrollStore } from "@/store/scrollStore";

export const RotatingCube = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const progress = useScrollStore((state) => state.progress);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta;
    meshRef.current.rotation.x = progress * Math.PI * 2;
    // Scale up as user reaches the specific middle section (40-60%)
    const inRange = progress > 0.3 && progress < 0.7;
    const targetScale = inRange ? 2 : 0.5;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="white" wireframe />
    </mesh>
  );
};
