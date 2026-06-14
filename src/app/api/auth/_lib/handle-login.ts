/**
 * Shared BFF login handler. Validates the payload, exchanges credentials with
 * the backend, optionally enforces a required role (server-side, BEFORE any
 * session cookies are set), then persists the session and returns the access
 * token + user to the browser.
 *
 * Used by both `/api/auth/login` (learner/educator portal) and
 * `/api/auth/admin/login` (admin portal, `requiredRole: ROLE.ADMIN`).
 */
import { NextRequest, NextResponse } from 'next/server';
import { apiUrl, AUTH_ENDPOINTS } from '@/lib/api/config';
import { loginRequestSchema, loginResponseSchema } from '@/schemas/auth.schema';
import { fromResponseData } from '@/lib/api/errors';
import { getUserRoleIds, hasRole } from '@/lib/rbac/has-role';
import { setAuthCookies } from '@/lib/session/server-cookies';
import { ROLE_LABEL, type RoleId } from '@/constants/roles';

export const BACKEND_TIMEOUT_MS = 8_000;

export interface LoginHandlerOptions {
  /**
   * When set, the authenticated user must own this role or the login is
   * rejected with 403 and no session cookies are established.
   */
  requiredRole?: RoleId;
}

/**
 * Shared tail of every login flow (email + OAuth): validates the backend
 * login response, optionally enforces a role, persists the session cookies,
 * and strips the refresh token before anything reaches the browser.
 */
export async function establishSessionResponse(
  backendResponse: Response,
  options: LoginHandlerOptions = {},
): Promise<NextResponse> {
  const data: unknown = await backendResponse.json().catch(() => null);

  if (!backendResponse.ok) {
    const error = fromResponseData(backendResponse.status, data);
    return NextResponse.json(error, { status: error.status });
  }

  const loginResult = loginResponseSchema.safeParse(data);
  if (!loginResult.success) {
    return NextResponse.json(
      {
        status: 502,
        message: 'Unexpected response from authentication server.',
      },
      { status: 502 },
    );
  }

  const login = loginResult.data;

  if (options.requiredRole && !hasRole(login.user, options.requiredRole)) {
    return NextResponse.json(
      {
        status: 403,
        message: `This account does not have ${ROLE_LABEL[options.requiredRole].toLowerCase()} access.`,
      },
      { status: 403 },
    );
  }

  try {
    await setAuthCookies({
      refreshToken: login.refreshToken,
      roleIds: getUserRoleIds(login.user),
    });
  } catch {
    return NextResponse.json(
      { status: 500, message: 'Failed to establish session.' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    accessToken: login.token,
    tokenExpires: login.tokenExpires,
    user: login.user,
  });
}

export async function handleLogin(
  request: NextRequest,
  options: LoginHandlerOptions = {},
): Promise<NextResponse> {
  const body: unknown = await request.json().catch(() => null);
  const parsed = loginRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        status: 422,
        message: 'Invalid login payload.',
        errors: parsed.error.flatten((issue) => issue.message).fieldErrors,
      },
      { status: 422 },
    );
  }

  let backendResponse: Response;
  try {
    backendResponse = await fetch(apiUrl(AUTH_ENDPOINTS.login), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
      cache: 'no-store',
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
  } catch {
    return NextResponse.json(
      { status: 503, message: 'Authentication service is unavailable.' },
      { status: 503 },
    );
  }

  return establishSessionResponse(backendResponse, options);
}
