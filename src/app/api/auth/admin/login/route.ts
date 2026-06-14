/**
 * BFF login for the admin portal (`/admin/login`). Rejects non-admin accounts
 * with 403 BEFORE any session cookies are set — the role gate lives here, not
 * in the client.
 */
import { NextRequest, NextResponse } from 'next/server';
import { ROLE } from '@/constants/roles';
import { handleLogin } from '../../_lib/handle-login';

export function POST(request: NextRequest): Promise<NextResponse> {
  return handleLogin(request, { requiredRole: ROLE.ADMIN });
}
