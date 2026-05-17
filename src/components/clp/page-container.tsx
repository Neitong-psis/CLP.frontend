import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PageContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: "div" | "section" | "main";
}

export function PageContainer({
  children,
  className,
  as: Component = "div",
}: PageContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-7xl px-4 pb-10 pt-4 sm:px-6 lg:px-10 lg:pb-14 lg:pt-6",
        className,
      )}
    >
      {children}
    </Component>
  );
}
