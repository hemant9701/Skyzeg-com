import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { AuthService, cookieName, type AuthUser } from '@/application/services/auth.service';
import { UnauthorizedError } from '@/shared/errors/app-error';

export async function getCurrentUserFromCookies(): Promise<AuthUser | null> {
  const store = await cookies();
  const token = store.get(cookieName)?.value;
  if (!token) return null;
  try {
    return await new AuthService().verifyToken(token);
  } catch {
    return null;
  }
}

export async function requireCurrentUser(allowedRoles?: string[]): Promise<AuthUser> {
  const user = await getCurrentUserFromCookies();
  if (!user) throw new UnauthorizedError();
  if (allowedRoles?.length) new AuthService().ensureRole(user, allowedRoles);
  return user;
}

export async function requireApiUser(request: NextRequest | Request, allowedRoles?: string[]): Promise<AuthUser> {
  const cookieHeader = request.headers.get('cookie') || '';
  const token = cookieHeader
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${cookieName}=`))
    ?.split('=')[1];

  const user = await new AuthService().verifyToken(token);
  if (allowedRoles?.length) new AuthService().ensureRole(user, allowedRoles);
  return user;
}
