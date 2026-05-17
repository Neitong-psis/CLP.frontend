"use client";

import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface NotificationButtonProps {
  readonly count?: number;
  readonly onClick?: () => void;
  readonly className?: string;
}

export function NotificationButton({ count, onClick, className }: NotificationButtonProps) {
  const showBadge = typeof count === "number" && count > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={showBadge ? `Notifications (${String(count)} unread)` : "Notifications"}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white",
        "text-[#0F172A] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6A23C]",
        className,
      )}
    >
      <Bell className="h-5 w-5" aria-hidden />
      {showBadge ? (
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"
          aria-hidden
        />
      ) : null}
    </button>
  );
}
