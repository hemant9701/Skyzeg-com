import type { NextRequest } from 'next/server';

export function getRequestMeta(request: NextRequest | Request) {
  return {
    ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
    userAgent: request.headers.get('user-agent') || undefined
  };
}
