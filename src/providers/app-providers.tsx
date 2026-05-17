"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ModalProvider } from "@/contexts/modal-context";
import { ModalRoot } from "@/providers/modal-root";

interface AppProvidersProps {
  readonly children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ModalProvider>
          {children}
          <ModalRoot />
          <Toaster
            richColors
            closeButton
            position="top-right"
            toastOptions={{
              classNames: {
                toast:
                  "!rounded-xl !border !border-[#E2E8F0] !bg-white !shadow-lg !text-[#0F172A]",
              },
            }}
          />
        </ModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
