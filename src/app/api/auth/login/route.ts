/**
 * BFF login for the learner/educator portal (`/auth`). Any valid account may
 * establish a session here; role-based route access is enforced by the proxy.
 */
import { NextRequest, NextResponse } from 'next/server';
import { handleLogin } from '../_lib/handle-login';

export function POST(request: NextRequest): Promise<NextResponse> {
  return handleLogin(request);
}
