import type { NextRequest } from 'next/server';
import { Roles } from '@/domain/constants/roles';
import { TailorMadeRequestService } from '@/application/services/tailor-made-request.service';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { requireApiUser } from '@/lib/auth';
import { getRequestMeta } from '@/lib/request';
import { created, ok, withApiErrorHandling } from '@/shared/http/api-response';

export const GET = withApiErrorHandling(async (request: NextRequest) => {
  await requireApiUser(request, [Roles.Admin, Roles.Editor]);
  const page = Number(request.nextUrl.searchParams.get('page') || 1);
  const pageSize = Number(request.nextUrl.searchParams.get('pageSize') || 100);
  const result = await new UnitOfWork().tailorMadeRequests.paginate({}, { page, pageSize, sort: { createdAt: -1 } });
  return ok(result);
});

export const POST = withApiErrorHandling(async (request: NextRequest) => {
  const tailorMadeRequest = await new TailorMadeRequestService().createRequest(await request.json(), getRequestMeta(request));
  return created(tailorMadeRequest);
});