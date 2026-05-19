"use client";

import { AYLA_LOGO_DARK, AYLA_LOGO_DEFAULT, AYLA_LOGO_LIGHT } from "@logos";

interface LogoProps {
  size?: "xl" | "lg" | "md" | "sm";
  isVertical?: boolean;
  isLoading?: boolean;
  variant?: "default" | "light" | "dark";
  showText?: boolean;
  className?: string;
}

const SIZE_CONFIG = {
  sm: { image: "w-60 h-auto max-w-full", text: "text-[clamp(1rem,3vw,1.25rem)]",    gap: "gap-1" },
  md: { image: "w-70 h-auto max-w-full", text: "text-[clamp(1.25rem,4vw,1.75rem)]", gap: "gap-2" },
  lg: { image: "w-80 h-auto max-w-full", text: "text-[clamp(1.5rem,5vw,2.25rem)]",  gap: "gap-3" },
  xl: { image: "w-90 h-auto max-w-full", text: "text-[clamp(2.25rem,10vw,4.5rem)]", gap: "gap-0" },
} as const;

const VARIANT_CONFIG = {
  default: { logo: AYLA_LOGO_DEFAULT, textColor: "text-indigo-500 dark:text-indigo-400", textColor2: "text-black dark:text-zinc-400" },
  light:   { logo: AYLA_LOGO_LIGHT,   textColor: "text-white dark:text-zinc-400",        textColor2: "text-white dark:text-zinc-400" },
  dark:    { logo: AYLA_LOGO_DARK,    textColor: "text-black dark:text-zinc-400",        textColor2: "text-black dark:text-zinc-400" },
} as const;

export default function Logo({
  isVertical = false,
  size = "xl",
  isLoading = false,
  variant = "default",
  showText = false,
  className = "",
}: LogoProps) {
  const { image, text, gap } = SIZE_CONFIG[size];
  const { logo, textColor, textColor2 } = VARIANT_CONFIG[variant];

  return (
    <div
      className={`relative flex max-w-full items-center justify-center ${gap} ${isVertical ? "flex-col" : "flex-row"} ${isLoading ? "animate-pulse opacity-70" : ""} ${className}`}
    >
      <img src={logo} alt="AYLA logo" className={`${image} object-contain`} />
      {showText && (
        <div className="flex items-center justify-center gap-0">
          <span className={`${text} font-extrabold tracking-tight ${textColor}`}>AY</span>
          <span className={`${text} font-extrabold tracking-tight ${textColor2}`}>LA</span>
        </div>
      )}
    </div>
  );
}
