import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { AdminRoles } from '@/domain/constants/roles';
import { canAccessAdminPath } from '@/domain/constants/admin-permissions';

const cookieName = process.env.JWT_COOKIE_NAME || 'travel_admin_token';
const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET || 'replace-this-development-secret');

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/admin/login') return NextResponse.next();

  const token = request.cookies.get(cookieName)?.value;
  if (!token) return redirectToLogin(request);

  try {
    const { payload } = await jwtVerify(token, jwtSecret);
    const roles = Array.isArray(payload.roles) ? payload.roles.map(String) : [];
    if (!canAccessAdminPath(roles, pathname)) {
      if (!roles.some((role) => AdminRoles.includes(role as (typeof AdminRoles)[number]))) {
        return new NextResponse(null, { status: 404 });
      }
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      url.search = '';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  } catch {
    return redirectToLogin(request);
  }
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = '/admin/login';
  url.searchParams.set('returnUrl', request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/:path*']
};
