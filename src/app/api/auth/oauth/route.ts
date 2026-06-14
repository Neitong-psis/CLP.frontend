/**
 * BFF OAuth login. Receives a provider token from the browser (Google/Apple
 * `idToken`, Facebook `accessToken`), exchanges it with the backend
 * `POST auth/oauth/:provider`, then establishes the same httpOnly-cookie
 * session as the email login flow — the refresh token never reaches the
 * browser.
 */
import { NextRequest, NextResponse } from 'next/server';
import { apiUrl, AUTH_ENDPOINTS } from '@/lib/api/config';
import { oauthLoginRequestSchema } from '@/schemas/auth.schema';
import {
  BACKEND_TIMEOUT_MS,
  establishSessionResponse,
} from '../_lib/handle-login';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body: unknown = await request.json().catch(() => null);
  const parsed = oauthLoginRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { status: 422, message: 'Invalid OAuth payload.' },
      { status: 422 },
    );
  }

  const { provider, idToken, accessToken } = parsed.data;

  let backendResponse: Response;
  try {
    backendResponse = await fetch(
      apiUrl(`${AUTH_ENDPOINTS.oauth}/${provider}`),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          provider === 'facebook' ? { accessToken } : { idToken },
        ),
        cache: 'no-store',
        signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
      },
    );
  } catch {
    return NextResponse.json(
      { status: 503, message: 'Authentication service is unavailable.' },
      { status: 503 },
    );
  }

  return establishSessionResponse(backendResponse);
}
