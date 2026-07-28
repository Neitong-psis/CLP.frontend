/**
 * Mock-mode-only BFF profile endpoint. The real flow reads `auth/me` straight
 * from the backend via the shared Axios instance (see `services/auth/auth.api.ts`);
 * this route only exists so mock mode has an equivalent that doesn't depend on
 * the (expired) backend being reachable.
 */
import { NextRequest, NextResponse } from 'next/server';
import { isMockModeEnabled } from '@/lib/mock/mock-mode';
import { parseMockToken } from '@/lib/mock/mock-token';
import { findMockUserById } from '@/lib/mock/mock-users';

export function GET(request: NextRequest): NextResponse {
  if (!isMockModeEnabled()) {
    return NextResponse.json({ message: 'Not found.' }, { status: 404 });
  }

  const authorization = request.headers.get('authorization') ?? '';
  const token = authorization.replace(/^Bearer\s+/i, '');
  const userId = parseMockToken(token);
  const user = userId ? findMockUserById(userId) : null;

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  }

  return NextResponse.json(user);
}
