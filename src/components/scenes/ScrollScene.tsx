"use client";

import { Canvas } from "@react-three/fiber";
import { HeroObject } from "./HeroObject";
import { ParticleSystem } from "./ParticleSystem";
import { CameraController } from "./CameraController";
import { Environment, Float, Stars } from "@react-three/drei";
import { useScrollStore } from "@/store/scrollStore";

import { RotatingCube } from "./RotatingCube";
import { FloatingSpheres } from "./FloatingSpheres";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

const AnimatedLights = () => {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);
  
  useFrame(() => {
    const progress = useScrollStore.getState().progress;
    if (light1Ref.current) {
      light1Ref.current.color.setHSL(progress, 1, 0.7);
    }
    if (light2Ref.current) {
      light2Ref.current.color.setHSL((progress + 0.5) % 1, 1, 0.7);
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <directionalLight position={[-10, 10, 5]} intensity={2} castShadow />
      <pointLight position={[0, -5, 5]} intensity={1} color="#ff5e28" />
    </>
  );
};

export const ScrollScene = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        shadows
        camera={{ position: [0, 0, 18], fov: 45 }}
        dpr={[1, 2]} // Performance optimization
      >
        <CameraController />
        <AnimatedLights />
        
        {/* Main Content */}
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <HeroObject />
        </Float>
        <FloatingSpheres />
        <RotatingCube position={[10, 0, 0]} />
        <RotatingCube position={[-10, 5, -5]} />
        
        <ParticleSystem />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Environment */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
