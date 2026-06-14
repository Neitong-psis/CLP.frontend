import { NextResponse } from 'next/server';
import { apiUrl, AUTH_ENDPOINTS } from '@/lib/api/config';
import { clearAuthCookies } from '@/lib/session/server-cookies';

export async function POST(request: Request): Promise<NextResponse> {
  const authorization = request.headers.get('authorization');

  if (authorization) {
    await fetch(apiUrl(AUTH_ENDPOINTS.logout), {
      method: 'POST',
      headers: { Authorization: authorization },
    }).catch(() => {});
  }

  await clearAuthCookies();
  return new NextResponse(null, { status: 204 });
}
