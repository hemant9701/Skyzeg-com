import { NextResponse } from 'next/server';
import { cookieName } from '@/application/services/auth.service';
import { withApiErrorHandling } from '@/shared/http/api-response';

export const POST = withApiErrorHandling(async () => {
  const response = NextResponse.json({ success: true });
  response.cookies.set(cookieName, '', { httpOnly: true, maxAge: 0, path: '/' });
  return response;
});
