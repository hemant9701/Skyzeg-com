import { NextResponse, type NextRequest } from 'next/server';
import { AuthService, cookieName } from '@/application/services/auth.service';
import { withApiErrorHandling } from '@/shared/http/api-response';

export const POST = withApiErrorHandling(async (request: NextRequest) => {
  const body = await request.json();
  const { token, user } = await new AuthService().login(body.email, body.password);
  const response = NextResponse.json({ success: true, data: user });
  response.cookies.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/'
  });
  return response;
});
