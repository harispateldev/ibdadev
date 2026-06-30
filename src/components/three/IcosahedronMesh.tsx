"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMouseSpring } from "@/hooks/useMouseSpring";

const PARTICLE_COUNT =
  typeof navigator !== "undefined" && navigator.hardwareConcurrency < 4 ? 200 : 800;

export function IcosahedronMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const { tick } = useMouseSpring(0.06);

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
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#D7B46A" wireframe transparent opacity={0.55} />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial
          color="#8E7CFF"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
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
