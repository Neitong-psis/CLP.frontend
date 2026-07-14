import { NextResponse } from 'next/server';
import { apiUrl, AUTH_ENDPOINTS } from '@/lib/api/config';
import { clearAuthCookies } from '@/lib/session/server-cookies';
import { isMockModeEnabled } from '@/lib/mock/mock-mode';

export async function POST(request: Request): Promise<NextResponse> {
  const authorization = request.headers.get('authorization');

  if (authorization && !isMockModeEnabled()) {
    await fetch(apiUrl(AUTH_ENDPOINTS.logout), {
      method: 'POST',
      headers: { Authorization: authorization },
    }).catch(() => {});
  }

  const res = new NextResponse(null, { status: 204 });
  clearAuthCookies(res);
  return res;
}
