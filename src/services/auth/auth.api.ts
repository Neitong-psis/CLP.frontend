import { AUTH_ENDPOINTS, BFF_ENDPOINTS } from '@/lib/api/config';
import { fromResponseData, normalizeError } from '@/lib/api/errors';
import { http } from '@/lib/api/http';
import { ZodError } from 'zod';
import { getAccessToken } from '@/lib/session/access-token-store';
import { refreshSession } from '@/lib/session/refresh';
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

export async function login(
  input: LoginRequest,
  options: LoginOptions = {},
): Promise<LoginResult> {
  const endpoint = options.role
    ? PORTAL_ENDPOINT[options.role]
    : BFF_ENDPOINTS.login;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    throw fromResponseData(response.status, data);
  }
  try {
    return loginResultSchema.parse(data);
  } catch (err) {
    throw normalizeError(
      err instanceof ZodError
        ? err
        : new Error('Unexpected login response shape.'),
    );
  }
}

/**
 * Logs in with a social provider token via the BFF (`/api/auth/oauth`),
 * which exchanges it with the backend and sets the same httpOnly session
 * cookies as the email flow.
 *
 * @param input - Provider name plus its credential (`idToken` for
 *   Google/Apple, `accessToken` for Facebook).
 * @returns The same {@link LoginResult} shape as {@link login}.
 * @throws {@link ApiError} if the token is rejected or the service is down.
 */
export async function oauthLogin(
  input: OAuthLoginRequest,
): Promise<LoginResult> {
  const response = await fetch(BFF_ENDPOINTS.oauth, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    throw fromResponseData(response.status, data);
  }
  try {
    return loginResultSchema.parse(data);
  } catch (err) {
    throw normalizeError(
      err instanceof ZodError
        ? err
        : new Error('Unexpected login response shape.'),
    );
  }
}

/**
 * Registers a new learner account directly with the backend.
 *
 * No session is established — the returned user is inactive until email
 * verification is completed (backend sets status `Inactive` on creation).
 *
 * @param input - First name, last name, email, and password.
 * @returns The newly created (inactive) {@link User} object.
 * @throws {@link ApiError} on duplicate email (422), validation error, or network failure.
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

/**
 * Confirms a newly registered email address using the hash from the
 * confirmation email link (`/confirm-email?hash=...`).
 *
 * On success the backend flips the account status to Active so the user
 * can log in.
 *
 * @param hash - The JWT hash from the confirmation link's query string.
 * @throws {@link ApiError} if the hash is invalid/expired (422) or already used (404).
 */
export async function confirmEmail(hash: string): Promise<void> {
  try {
    await http.post(`/${AUTH_ENDPOINTS.confirmEmail}`, { hash });
  } catch (error) {
    throw normalizeError(error);
  }
}

/**
 * Fetches the currently authenticated user's profile from the backend.
 *
 * Uses the shared Axios instance, which automatically injects the Bearer access
 * token and handles the 401 → silent refresh → retry flow transparently.
 *
 * @returns The authenticated {@link User}.
 * @throws {@link ApiError} if the token is invalid, unrefreshable, or the network is down.
 */
export async function getMe(): Promise<User> {
  try {
    const { data } = await http.get<unknown>(`/${AUTH_ENDPOINTS.me}`);
    return userSchema.parse(data);
  } catch (error) {
    throw normalizeError(error);
  }
}

/**
 * Requests a password reset email for the given address.
 *
 * Always resolves — the backend returns a generic message whether or not the
 * email is registered (security by design). Only throws on network failure.
 *
 * @param email - The account email to send the reset link to.
 */
export async function forgotPassword(email: string): Promise<void> {
  try {
    await http.post(`/${AUTH_ENDPOINTS.forgotPassword}`, { email });
  } catch (error) {
    throw normalizeError(error);
  }
}

/**
 * Resets the account password using the one-time hash from the reset email.
 *
 * @param hash - The JWT hash from the reset link's query string.
 * @param password - The new plaintext password (must meet the policy).
 * @throws {@link ApiError} if the hash is invalid/expired (422) or already used.
 */
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

/**
 * Signs the user out by revoking the session on the backend and clearing all cookies via the BFF.
 *
 * Best-effort: the backend revocation call is attempted with the current access token,
 * but cookie clearing always runs regardless of whether the backend call succeeds.
 * A network failure does not prevent the local session from being cleared.
 *
 * @returns Resolves when all cookies are cleared; does not throw.
 */
export async function logout(): Promise<void> {
  const accessToken = getAccessToken();
  await fetch(BFF_ENDPOINTS.logout, {
    method: 'POST',
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
}
