"use client";

import { useFrame } from "@react-three/fiber";
import { useScrollStore } from "@/store/scrollStore";
import * as THREE from "three";
import { useRef } from "react";

export const CameraController = () => {
  const progress = useScrollStore((state) => state.progress);
  const targetPosition = useRef(new THREE.Vector3(0, 5, 20));
  const currentPosition = useRef(new THREE.Vector3(0, 5, 20));

  useFrame((state) => {
    // Camera Orbit logic
    const angle = progress * Math.PI * 2;
    const radius = 20;
    
    // Target position based on scroll progress
    targetPosition.current.x = Math.sin(angle) * radius;
    targetPosition.current.z = Math.cos(angle) * radius;
    targetPosition.current.y = 5 + Math.sin(progress * Math.PI * 4) * 2;

    // Smoothly interpolate camera position (lerp)
    currentPosition.current.lerp(targetPosition.current, 0.05);
    state.camera.position.copy(currentPosition.current);
    
    // Always look at the center
    state.camera.lookAt(0, 0, 0);
  });

  return null;
};
