import { NextRequest, NextResponse } from 'next/server';
import { handleLogin } from '../_lib/handle-login';

export function POST(request: NextRequest): Promise<NextResponse> {
  return handleLogin(request);
}
