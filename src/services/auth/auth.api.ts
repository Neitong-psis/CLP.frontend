import { AUTH_ENDPOINTS, BFF_ENDPOINTS } from '@/lib/api/config';
import { fromResponseData, normalizeError } from '@/lib/api/errors';
import { http } from '@/lib/api/http';
import { ZodError } from 'zod';
import { getAccessToken } from '@/lib/session/access-token-store';
import { refreshSession } from '@/lib/session/refresh';
import { isMockModeEnabled } from '@/lib/mock/mock-mode';
import {
  loginResultSchema,
  type LoginRequest,
  type LoginResult,
  type OAuthLoginRequest,
  type RegisterRequest,
} from '@/schemas/auth.schema';
import { userSchema, type User } from '@/schemas/user.schema';

export interface LoginOptions {
  /**
   * Routes the login through a portal-specific BFF endpoint that enforces
   * the required role server-side before any session cookies are set.
   */
  role?: 'admin' | 'educator' | 'learner';
}

const PORTAL_ENDPOINT: Record<NonNullable<LoginOptions['role']>, string> = {
  admin: BFF_ENDPOINTS.adminLogin,
  educator: BFF_ENDPOINTS.educatorLogin,
  learner: BFF_ENDPOINTS.learnerLogin,
};

/** POSTs to a BFF endpoint and parses the session it returns. */
async function postForSession(
  endpoint: string,
  body: unknown,
): Promise<LoginResult> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    throw fromResponseData(response.status, data);
  }
  try {
    return loginResultSchema.parse(data);
  } catch (error) {
    throw normalizeError(
      error instanceof ZodError
        ? error
        : new Error('Unexpected login response shape.'),
    );
  }
}

/** Logs in with email and password, optionally through a role-gated portal. */
export async function login(
  input: LoginRequest,
  options: LoginOptions = {},
): Promise<LoginResult> {
  const endpoint = options.role
    ? PORTAL_ENDPOINT[options.role]
    : BFF_ENDPOINTS.login;
  return postForSession(endpoint, input);
}

/** Logs in with a social provider token, yielding the same session as email login. */
export async function oauthLogin(
  input: OAuthLoginRequest,
): Promise<LoginResult> {
  return postForSession(BFF_ENDPOINTS.oauth, input);
}

/**
 * Registers a new learner account. Establishes no session — the account stays
 * inactive until the email is confirmed.
 */
export async function register(input: RegisterRequest): Promise<User> {
  try {
    const { data } = await http.post<unknown>(
      `/${AUTH_ENDPOINTS.register}`,
      input,
    );
    return userSchema.parse(data);
  } catch (error) {
    throw normalizeError(error);
  }
}

/** Confirms a registration using the hash from the email link, activating the account. */
export async function confirmEmail(hash: string): Promise<void> {
  try {
    await http.post(`/${AUTH_ENDPOINTS.confirmEmail}`, { hash });
  } catch (error) {
    throw normalizeError(error);
  }
}

/** Fetches the authenticated user's profile. Token injection and 401-refresh are handled by `http`. */
export async function getMe(): Promise<User> {
  try {
    if (isMockModeEnabled()) {
      const token = getAccessToken();
      const response = await fetch(BFF_ENDPOINTS.me, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        throw fromResponseData(response.status, data);
      }
      return userSchema.parse(data);
    }
    const { data } = await http.get<unknown>(`/${AUTH_ENDPOINTS.me}`);
    return userSchema.parse(data);
  } catch (error) {
    throw normalizeError(error);
  }
}

/**
 * Requests a password reset email. Succeeds even for unregistered addresses —
 * the backend answers generically so it cannot be used to enumerate accounts.
 */
export async function forgotPassword(email: string): Promise<void> {
  try {
    await http.post(`/${AUTH_ENDPOINTS.forgotPassword}`, { email });
  } catch (error) {
    throw normalizeError(error);
  }
}

/** Sets a new password using the one-time hash from the reset email. */
export async function resetPassword(
  hash: string,
  password: string,
): Promise<void> {
  try {
    await http.post(`/${AUTH_ENDPOINTS.resetPassword}`, { hash, password });
  } catch (error) {
    throw normalizeError(error);
  }
}

/** Refresh the access token (single-flight). Returns null if no valid session. */
export const refresh = refreshSession;

/** Signs out: revokes the backend session and clears the session cookies. */
export async function logout(): Promise<void> {
  const accessToken = getAccessToken();
  await fetch(BFF_ENDPOINTS.logout, {
    method: 'POST',
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
}
