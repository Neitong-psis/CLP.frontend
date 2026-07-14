import { NextRequest, NextResponse } from 'next/server';
import { apiUrl, AUTH_ENDPOINTS } from '@/lib/api/config';
import { loginRequestSchema, loginResponseSchema } from '@/schemas/auth.schema';
import { fromResponseData } from '@/lib/api/errors';
import { getUserRoleIds, hasRole } from '@/lib/rbac/has-role';
import {
  baseCookieOptions,
  COOKIE,
  SESSION_MAX_AGE_SECONDS,
} from '@/lib/session/cookie-names';
import { ROLE_LABEL, type RoleId } from '@/constants/roles';
import { isMockModeEnabled } from '@/lib/mock/mock-mode';
import { findMockAccount } from '@/lib/mock/mock-users';
import { createMockToken } from '@/lib/mock/mock-token';

export const BACKEND_TIMEOUT_MS = 8_000;

export interface LoginHandlerOptions {
  /**
   * When set, the authenticated user must own this role or the login is
   * rejected with 403 and no session cookies are established.
   */
  requiredRole?: RoleId;
}

export async function establishSessionResponse(
  response: Response,
  options: LoginHandlerOptions = {},
): Promise<NextResponse> {
  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const error = fromResponseData(response.status, data);
    return NextResponse.json(error, { status: error.status });
  }

  const loginResponse = loginResponseSchema.safeParse(data);
  if (!loginResponse.success) {
    return NextResponse.json(
      {
        status: 502,
        message: 'Unexpected response from authentication server.',
      },
      { status: 502 },
    );
  }

  const login = loginResponse.data;

  if (options.requiredRole && !hasRole(login.user, options.requiredRole)) {
    return NextResponse.json(
      {
        status: 403,
        message: `This account does not have ${ROLE_LABEL[options.requiredRole].toLowerCase()} access.`,
      },
      { status: 403 },
    );
  }

  const roleIds = getUserRoleIds(login.user);
  const base = baseCookieOptions();

  // Set cookies directly on the NextResponse — cookies() from next/headers is
  // unreliable in Route Handlers for httpOnly cookies in Next.js App Router.
  const res = NextResponse.json({
    accessToken: login.token,
    tokenExpires: login.tokenExpires,
    user: login.user,
  });

  res.cookies.set(COOKIE.REFRESH_TOKEN, login.refreshToken, {
    ...base,
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  res.cookies.set(COOKIE.SESSION, JSON.stringify({ roleIds }), {
    ...base,
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  res.cookies.set(COOKIE.AUTH_FLAG, '1', {
    ...base,
    httpOnly: false,
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return res;
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

  if (isMockModeEnabled()) {
    const account = findMockAccount(parsed.data.email, parsed.data.password);
    if (!account) {
      return NextResponse.json(
        {
          status: 422,
          message: 'The email or password is incorrect.',
          errors: { password: 'The email or password is incorrect.' },
        },
        { status: 422 },
      );
    }
    const token = createMockToken(account.user.id);
    const mockResponse = new Response(
      JSON.stringify({
        token,
        refreshToken: token,
        tokenExpires: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
        user: account.user,
      }),
      { status: 200 },
    );
    return establishSessionResponse(mockResponse, options);
  }

  let response: Response;
  try {
    response = await fetch(apiUrl(AUTH_ENDPOINTS.login), {
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

  return establishSessionResponse(response, options);
}
