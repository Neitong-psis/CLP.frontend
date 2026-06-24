/**
 * BFF login for the learner portal (`/auth` or `?role=learner`). Rejects
 * non-learner accounts with 403 BEFORE any session cookies are set.
 */
import { NextRequest, NextResponse } from 'next/server';
import { ROLE } from '@/constants/roles';
import { handleLogin } from '../../_lib/handle-login';

export function POST(request: NextRequest): Promise<NextResponse> {
  return handleLogin(request, { requiredRole: ROLE.LEARNER });
}
