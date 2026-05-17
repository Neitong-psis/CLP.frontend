"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { DEFAULT_DEMO_USER } from "@/config/demo-users";
import {
  clearMockSession,
  readMockSession,
  writeMockSession,
} from "@/lib/auth/session";
import type { MockSession } from "@/types/auth";

interface AuthContextValue {
  readonly session: MockSession | null;
  readonly isAuthenticated: boolean;
  readonly signIn: (session: MockSession) => void;
  readonly signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function subscribe(onStoreChange: () => void): () => void {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener("clp-auth-change", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("clp-auth-change", handler);
  };
}

function getSnapshot(): MockSession | null {
  return readMockSession();
}

function getServerSnapshot(): MockSession | null {
  return null;
}

function emitAuthChange(): void {
  window.dispatchEvent(new Event("clp-auth-change"));
}

interface AuthProviderProps {
  readonly children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const session = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const signIn = useCallback((next: MockSession) => {
    writeMockSession(next);
    emitAuthChange();
  }, []);

  const signOut = useCallback(() => {
    clearMockSession();
    emitAuthChange();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: session !== null,
      signIn,
      signOut,
    }),
    [session, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

export function useOptionalAuth(): AuthContextValue | null {
  return useContext(AuthContext);
}

/** Stable learner profile for layout chrome when session is loading. */
export function useLearnerProfile(): MockSession {
  const { session } = useAuth();
  return session ?? DEFAULT_DEMO_USER;
}
