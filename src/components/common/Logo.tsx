"use client";

import { useState } from "react";

interface LogoProps {
    size?: "xl" | "lg" | "md" | "sm";
    isVertical?: boolean;
    isLoading?: boolean;
    variant?: "default" | "light" | "dark";
    showText?: boolean;
    showBeta?: boolean;
}

interface BetaDialogProps {
    isBetaDialogOpen: boolean;
    setIsBetaDialogOpen: (value: boolean) => void;
}

function BetaDialog({ isBetaDialogOpen }: BetaDialogProps) {
    if (!isBetaDialogOpen) {
        return null;
    }

    return null;
}

export default function Logo({
    isVertical = false,
    size = "xl",
    isLoading = false,
    variant = "default",
    showText = false,
    showBeta = false,
}: LogoProps) {
    const [isBetaDialogOpen, setIsBetaDialogOpen] = useState(false);

    const sizeConfig = {
        sm: {
            image: "w-60 h-auto max-w-full",
            text: "text-[clamp(1rem,3vw,1.25rem)]",
            gap: "gap-1",
        },
        md: {
            image: "w-70 h-auto max-w-full",
            text: "text-[clamp(1.25rem,4vw,1.75rem)]",
            gap: "gap-2",
        },
        lg: {
            image: "w-80 h-auto max-w-full",
            text: "text-[clamp(1.5rem,5vw,2.25rem)]",
            gap: "gap-3",
        },
        xl: {
            image: "w-90 h-auto max-w-full",
            text: "text-[clamp(2.25rem,10vw,4.5rem)]",
            gap: "gap-0",
        },
    } as const;

    const currentSize = sizeConfig[size];

    const variantConfig = {
        default: {
            logo: "/logo/AYLA%20All%20Logo-11.svg",
            textColor: "text-indigo-500 dark:text-indigo-400",
            textColor2: "text-black dark:text-zinc-400",
        },
        light: {
            logo: "/logo/AYLA%20All%20Logo-11.svg",
            textColor: "text-white dark:text-zinc-400",
            textColor2: "text-white dark:text-zinc-400",
        },
        dark: {
            logo: "/logo/AYLA%20All%20Logo-25.svg",
            textColor: "text-black dark:text-zinc-400",
            textColor2: "text-black dark:text-zinc-400",
        },
    } as const;

    const currentVariant = variantConfig[variant];

    return (
        <>
            <div
                className={`flex relative items-center justify-center max-w-full 
                    ${currentSize.gap} 
                    ${isVertical ? "flex-col" : "flex-row"}
                    ${isLoading ? "opacity-70 animate-pulse" : ""}
                `}
            >
                {showBeta && (
                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            setIsBetaDialogOpen(true);
                        }}
                        className={`absolute flex items-center gap-1 ${
                            isVertical ? "-top-4 right-0" : " top-[6px] -right-14"
                        } py-0.5 px-2 text-indigo-500 bg-indigo-500/10 border border-indigo-500 rounded-full hover:bg-indigo-500/20 transition-colors cursor-pointer dark:text-white dark:bg-indigo-900/80 dark:border-indigo-800/80 dark:hover:bg-indigo-900/80`}
                    >
                        <span className="text-xs font-bold">Beta</span>
                    </button>
                )}
                <img
                    src={currentVariant.logo}
                    alt="logo"
                    className={`${currentSize.image} object-contain`}
                />
                {showText && (
                    <div className="flex items-center justify-center gap-0">
                        <span
                            className={`${currentSize.text} font-extrabold tracking-tight ${
                                currentVariant.textColor
                            }`}
                        >
                            AY
                        </span>
                        <span
                            className={`${currentSize.text} font-extrabold tracking-tight ${
                                currentVariant.textColor2
                            }`}
                        >
                            LA
                        </span>
                    </div>
                )}
            </div>

            <BetaDialog
                isBetaDialogOpen={isBetaDialogOpen}
                setIsBetaDialogOpen={setIsBetaDialogOpen}
            />
        </>
    );
}
