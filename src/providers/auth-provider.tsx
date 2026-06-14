'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import * as authApi from '@/features/auth/auth.api';
import { isApiError, type ApiError } from '@/lib/api/errors';
import { getUserRoleIds } from '@/lib/rbac/has-role';
import { clearSession, hasAuthHint, setSession } from '@/lib/session/session';
import type { RoleId } from '@/constants/roles';
import type {
  LoginRequest,
  LoginResult,
  OAuthLoginRequest,
  RegisterRequest,
} from '@/schemas/auth.schema';
import type { User } from '@/schemas/user.schema';

export interface AuthContextValue {
  user: User | null;
  roles: RoleId[];
  isAuthenticated: boolean;
  /** True only during the silent bootstrap refresh on first mount. */
  loading: boolean;
  isLoggingIn: boolean;
  isRegistering: boolean;
  isLoggingOut: boolean;
  error: ApiError | null;
  clearError: () => void;
  login: (input: LoginRequest, options?: authApi.LoginOptions) => Promise<User>;
  /** Completes a social login with a provider token (e.g. Google `idToken`). */
  loginWithOAuth: (input: OAuthLoginRequest) => Promise<User>;
  register: (input: RegisterRequest) => Promise<User>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

function toApiError(error: unknown): ApiError {
  return isApiError(error)
    ? error
    : { status: 0, message: 'An unexpected error occurred.' };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const bootstrapped = useRef(false);

  // Silent bootstrap on first mount.
  useEffect(() => {
    if (bootstrapped.current) {
      return;
    }
    bootstrapped.current = true;

    let active = true;
    void (async () => {
      try {
        if (!hasAuthHint()) {
          return;
        }
        const session = await authApi.refresh();
        if (!session || !active) {
          return;
        }
        const me = await authApi.getMe();
        if (active) {
          setUser(me);
        }
      } catch {
        clearSession();
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const clearError = useCallback(() => setError(null), []);

  // Shared tail of every login flow: store the access token, then hydrate
  // the canonical user via /me (which also proves the bearer flow end-to-end).
  const completeLogin = useCallback(
    async (loginCall: () => Promise<LoginResult>): Promise<User> => {
      setError(null);
      setIsLoggingIn(true);
      try {
        const result = await loginCall();
        setSession({
          accessToken: result.accessToken,
          tokenExpires: result.tokenExpires,
        });
        const me = await authApi.getMe();
        setUser(me);
        return me;
      } catch (err) {
        const apiError = toApiError(err);
        setError(apiError);
        throw apiError;
      } finally {
        setIsLoggingIn(false);
      }
    },
    [],
  );

  const login = useCallback(
    (input: LoginRequest, options?: authApi.LoginOptions): Promise<User> =>
      completeLogin(() => authApi.login(input, options)),
    [completeLogin],
  );

  const loginWithOAuth = useCallback(
    (input: OAuthLoginRequest): Promise<User> =>
      completeLogin(() => authApi.oauthLogin(input)),
    [completeLogin],
  );

  const register = useCallback(
    async (input: RegisterRequest): Promise<User> => {
      setError(null);
      setIsRegistering(true);
      try {
        return await authApi.register(input);
      } catch (err) {
        const apiError = toApiError(err);
        setError(apiError);
        throw apiError;
      } finally {
        setIsRegistering(false);
      }
    },
    [],
  );

  const logout = useCallback(async (): Promise<void> => {
    setIsLoggingOut(true);
    try {
      await authApi.logout();
    } finally {
      clearSession();
      setUser(null);
      setError(null);
      setIsLoggingOut(false);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      roles: getUserRoleIds(user),
      isAuthenticated: user !== null,
      loading,
      isLoggingIn,
      isRegistering,
      isLoggingOut,
      error,
      clearError,
      login,
      loginWithOAuth,
      register,
      logout,
    }),
    [
      user,
      loading,
      isLoggingIn,
      isRegistering,
      isLoggingOut,
      error,
      clearError,
      login,
      loginWithOAuth,
      register,
      logout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
