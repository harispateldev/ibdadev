import React from "react";
import Image from "next/image";
import { BRAND } from "@/constants/brand";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  compact?: boolean;
  showTagline?: boolean;
  className?: string;
  markClassName?: string;
  textClassName?: string;
};

export const BrandLogo = ({
  compact = false,
  showTagline = false,
  className,
  markClassName,
  textClassName,
}: BrandLogoProps) => {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "grid shrink-0 place-items-center overflow-hidden rounded-full border border-white/12 bg-black shadow-[inset_0_0_0_1px_rgba(215,180,106,0.12),0_12px_30px_rgba(0,0,0,0.38)]",
          compact ? "h-9 w-9" : "h-11 w-11",
          markClassName
        )}
      >
        <Image
          src={BRAND.logoSrc}
          alt=""
          aria-hidden="true"
          width={80}
          height={80}
          loading="eager"
          className="h-full w-full scale-[1.24] object-cover"
        />
      </span>
      <span className={cn("flex min-w-0 flex-col", textClassName)}>
        <span className="font-display text-base font-black leading-none tracking-normal text-white">
          {BRAND.name}
        </span>
        {showTagline && (
          <span className="mt-1 text-[9px] font-black uppercase leading-none tracking-[0.18em] text-ibda-gold/72">
            {BRAND.tagline}
          </span>
        )}
      </span>
    </span>
  );
};
