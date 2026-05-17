"use client";

import { useMemo } from "react";
import { greetingForHour } from "@/lib/greeting";

export function useClientGreeting(): string {
  return useMemo(() => {
    const now = new Date();
    return greetingForHour(now.getHours());
  }, []);
}
