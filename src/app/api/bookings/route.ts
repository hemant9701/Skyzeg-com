import type { NextRequest } from 'next/server';
import { AdminRoles } from '@/domain/constants/roles';
import { BookingService } from '@/application/services/booking.service';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { requireApiUser } from '@/lib/auth';
import { getRequestMeta } from '@/lib/request';
import { created, ok, withApiErrorHandling } from '@/shared/http/api-response';

export const GET = withApiErrorHandling(async (request: NextRequest) => {
  await requireApiUser(request, AdminRoles);
  const page = Number(request.nextUrl.searchParams.get('page') || 1);
  const pageSize = Number(request.nextUrl.searchParams.get('pageSize') || 20);
  const result = await new UnitOfWork().bookings.paginate({}, { page, pageSize, sort: { createdAt: -1 } });
  return ok(result);
});

export const POST = withApiErrorHandling(async (request: NextRequest) => {
  const booking = await new BookingService().createBooking(await request.json(), getRequestMeta(request));
  return created(booking);
});
