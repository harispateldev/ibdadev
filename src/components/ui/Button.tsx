"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

export const Button = ({ className, variant = "primary", children, ...props }: ButtonProps) => {
  const variants = {
    primary: "bg-[#D7B46A] text-[#050505] hover:-translate-y-0.5 shadow-[0_18px_45px_rgba(215,180,106,0.22)] hover:shadow-[0_22px_60px_rgba(215,180,106,0.28)]",
    secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md",
    outline: "border border-ibda-border text-white hover:bg-white/10",
  };

  return (
    <button
      className={cn(
        "px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 relative overflow-hidden group",
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </button>
  );
};
