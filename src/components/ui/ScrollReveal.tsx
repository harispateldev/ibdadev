"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  scaleFrom?: number;
  start?: number;
  end?: number;
};

export const ScrollReveal = ({
  children,
  className,
  direction = "up",
  distance = 56,
  scaleFrom = 0.975,
  start = 0.08,
  end = 0.86,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const rawProgress = useMotionValue(0);

  useEffect(() => {
    if (reduceMotion) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const range = viewport * 0.54;
      const progress = (viewport * 0.96 - rect.top) / range;
      rawProgress.set(Math.max(0, Math.min(1, progress)));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [rawProgress, reduceMotion]);

  const eased = useSpring(rawProgress, {
    stiffness: 74,
    damping: 28,
    mass: 0.7,
  });

  const opacity = useTransform(eased, [0, start, end], [0, 0, 1]);
  const scale = useTransform(eased, [0, end], [scaleFrom, 1]);
  const x = useTransform(
    eased,
    [0, end],
    [direction === "left" ? distance : direction === "right" ? -distance : 0, 0]
  );
  const y = useTransform(
    eased,
    [0, end],
    [direction === "up" ? distance : direction === "down" ? -distance : 0, 0]
  );

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative will-change-transform", className)}
      style={{ position: "relative", opacity, x, y, scale }}
    >
      {children}
    </motion.div>
  );
};
