import React from "react";
import Image from "next/image";
import { BRAND } from "@/constants/brand";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  compact?: boolean;
  showTagline?: boolean;
  stacked?: boolean;
  className?: string;
  markClassName?: string;
  textClassName?: string;
};

export const BrandMark = ({ className, priority = false }: { className?: string; priority?: boolean }) => {
  return (
    <Image
      src={BRAND.markSrc}
      alt=""
      aria-hidden="true"
      width={806}
      height={950}
      priority={priority}
      className={cn("block h-full w-full object-contain", className)}
    />
  );
};

export const BrandLockup = ({ className, priority = false }: { className?: string; priority?: boolean }) => {
  return (
    <Image
      src={BRAND.lockupSrc}
      alt={BRAND.name}
      width={853}
      height={898}
      priority={priority}
      className={cn("block h-full w-full object-contain", className)}
    />
  );
};

export const BrandLogo = ({
  compact = false,
  showTagline = false,
  stacked = false,
  className,
  markClassName,
  textClassName,
}: BrandLogoProps) => {
  return (
    <span className={cn("inline-flex items-center text-white", stacked ? "flex-col gap-4 text-center" : "gap-4", className)}>
      <span
        className={cn(
          "grid shrink-0 place-items-center drop-shadow-[0_18px_34px_rgba(0,0,0,0.45)]",
          compact ? "h-11 w-10" : "h-14 w-12",
          markClassName
        )}
      >
        <BrandMark priority={compact} />
      </span>
      <span className={cn("flex min-w-0 flex-col", stacked && "items-center", textClassName)}>
        <span className={cn("font-display font-black uppercase leading-none tracking-[0.18em] text-white", compact ? "text-sm" : "text-base")}>
          {BRAND.name.toUpperCase()}
        </span>
        {showTagline && (
          <span className="mt-2 text-[9px] font-black uppercase leading-none tracking-[0.22em] text-ibda-gold/74">
            {BRAND.tagline}
          </span>
        )}
      </span>
    </span>
  );
};
