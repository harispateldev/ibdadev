"use client";

import { useRef, useEffect } from "react";

type Vec2 = { x: number; y: number };

export function useMouseSpring(damping = 0.08) {
  const mouse = useRef<Vec2>({ x: 0, y: 0 });
  const smoothed = useRef<Vec2>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const tick = () => {
    smoothed.current.x += (mouse.current.x - smoothed.current.x) * damping;
    smoothed.current.y += (mouse.current.y - smoothed.current.y) * damping;
    return smoothed.current;
  };

  return { raw: mouse, smoothed, tick };
}
