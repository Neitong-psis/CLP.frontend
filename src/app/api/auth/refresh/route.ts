/**
 * BFF refresh handler. Reads the httpOnly refresh-token cookie, calls the
 * backend refresh endpoint (Bearer REFRESH token), rotates the cookie, and
 * returns the new access token to the browser.
 */
import { NextResponse } from 'next/server';
import { apiUrl, AUTH_ENDPOINTS } from '@/lib/api/config';
import { refreshResponseSchema } from '@/schemas/auth.schema';
import {
  applyRefreshTokenRotation,
  clearAuthCookies,
  readRefreshToken,
} from '@/lib/session/server-cookies';
import { SESSION_MAX_AGE_SECONDS } from '@/lib/session/cookie-names';
import { isMockModeEnabled } from '@/lib/mock/mock-mode';
import { createMockToken, parseMockToken } from '@/lib/mock/mock-token';

export async function POST(): Promise<NextResponse> {
  const refreshToken = await readRefreshToken();
  if (!refreshToken) {
    return NextResponse.json({ message: 'No session.' }, { status: 401 });
  }

  if (isMockModeEnabled()) {
    const userId = parseMockToken(refreshToken);
    if (!userId) {
      const errRes = NextResponse.json(
        { message: 'Session expired.' },
        { status: 401 },
      );
      clearAuthCookies(errRes);
      return errRes;
    }
    const newToken = createMockToken(userId);
    const res = NextResponse.json({
      accessToken: newToken,
      tokenExpires: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
    });
    applyRefreshTokenRotation(res, newToken);
    return res;
  }

  let backendResponse: Response;
  try {
    backendResponse = await fetch(apiUrl(AUTH_ENDPOINTS.refresh), {
      method: 'POST',
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
  } catch {
    return NextResponse.json(
      { message: 'Authentication service is unavailable.' },
      { status: 503 },
    );
  }

  if (!backendResponse.ok) {
    const errRes = NextResponse.json(
      { message: 'Session expired.' },
      { status: 401 },
    );
    clearAuthCookies(errRes);
    return errRes;
  }

  const data = refreshResponseSchema.parse(
    await backendResponse.json().catch(() => null),
  );

  const res = NextResponse.json({
    accessToken: data.token,
    tokenExpires: data.tokenExpires,
  });
  applyRefreshTokenRotation(res, data.refreshToken);
  return res;
}
