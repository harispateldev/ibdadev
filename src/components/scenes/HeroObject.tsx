"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useScrollStore } from "@/store/scrollStore";
import { RoundedBox, MeshReflectorMaterial, Float, Text } from "@react-three/drei";

export const HeroObject = () => {
  const meshRef = useRef<THREE.Group>(null);
  const progress = useScrollStore((state) => state.progress);

  // Procedural chip pins
  const pins = useMemo(() => {
    const p = [];
    const count = 12;
    const spacing = 0.6;
    const offset = (count - 1) * spacing / 2;
    
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        // Only on edges
        if (i === 0 || i === count - 1 || j === 0 || j === count - 1) {
          p.push([i * spacing - offset, -0.4, j * spacing - offset]);
        }
      }
    }
    return p;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Direct scroll-based rotation and tilt
    meshRef.current.rotation.x = Math.PI * 0.15 + (progress * Math.PI * 0.2);
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 + (progress * Math.PI * 0.1);
    
    // Floating effect
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
  });

  return (
    <group ref={meshRef}>
      {/* Main Chip Body */}
      <RoundedBox args={[8, 0.8, 8]} radius={0.2} smoothness={4}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.8} 
          roughness={0.2}
        />
      </RoundedBox>

      {/* Center Metal Plate */}
      <RoundedBox args={[5, 0.2, 5]} radius={0.1} position={[0, 0.45, 0]}>
        <meshStandardMaterial
          color="#333"
          metalness={1}
          roughness={0.1}
        />
      </RoundedBox>

      {/* The 'R' Logo on the chip */}
      <Text
        position={[0, 0.6, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={3}
        color="#ff5e28"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hJP8.woff"
        fontWeight="bold"
      >
        R
      </Text>

      {/* Glowing traces on the chip */}
      <mesh position={[0, 0.41, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.8, 4.8]} />
        <meshStandardMaterial 
          color="#ff5e28" 
          emissive="#ff5e28" 
          emissiveIntensity={4} 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* Pins / Solder balls */}
      {pins.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#888" metalness={1} roughness={0.1} />
        </mesh>
      ))}

      {/* Extra small tech details */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[Math.cos(i) * 3, 0.45, Math.sin(i) * 3]}>
          <boxGeometry args={[0.2, 0.05, 0.8]} />
          <meshStandardMaterial color="#ff5e28" emissive="#ff5e28" emissiveIntensity={5} />
        </mesh>
      ))}
    </group>
  );
};

