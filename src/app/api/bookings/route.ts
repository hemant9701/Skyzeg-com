import type { NextRequest } from 'next/server';
import { AdminRoles } from '@/domain/constants/roles';
import { BookingService } from '@/application/services/booking.service';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { requireApiUser } from '@/lib/auth';
import { getRequestMeta } from '@/lib/request';
import { created, ok, withApiErrorHandling } from '@/shared/http/api-response';
import { NotFoundError, ValidationError } from '@/shared/errors/app-error';

const bookingStatuses = ['pending', 'confirmed', 'cancelled', 'completed'] as const;
const paymentStatuses = ['unpaid', 'paid', 'refunded'] as const;

export const GET = withApiErrorHandling(async (request: NextRequest) => {
  await requireApiUser(request, AdminRoles);
  const page = Number(request.nextUrl.searchParams.get('page') || 1);
  const pageSize = Number(request.nextUrl.searchParams.get('pageSize') || 20);
  const status = request.nextUrl.searchParams.get('status');
  const filter = status && bookingStatuses.includes(status as typeof bookingStatuses[number]) ? { status } : {};
  const result = await new UnitOfWork().bookings.paginate(filter, { page, pageSize, sort: { createdAt: -1 } });
  return ok(result);
});

export const POST = withApiErrorHandling(async (request: NextRequest) => {
  const booking = await new BookingService().createBooking(await request.json(), getRequestMeta(request));
  return created(booking);
});

export const PATCH = withApiErrorHandling(async (request: NextRequest) => {
  const user = await requireApiUser(request, AdminRoles);
  const body = await request.json() as {
    id?: string;
    status?: string;
    paymentStatus?: string;
  };

  if (!body.id) {
    throw new ValidationError('Booking id is required');
  }

  const update: Record<string, string> = {};
  if (body.status && bookingStatuses.includes(body.status as typeof bookingStatuses[number])) {
    update.status = body.status;
  }
  if (body.paymentStatus && paymentStatuses.includes(body.paymentStatus as typeof paymentStatuses[number])) {
    update.paymentStatus = body.paymentStatus;
  }
  if (!Object.keys(update).length) {
    throw new ValidationError('A valid booking status or payment status is required');
  }

  const unitOfWork = new UnitOfWork();
  const before = await unitOfWork.bookings.findById(body.id);
  const booking = await unitOfWork.bookings.updateById(body.id, { $set: update });
  if (!booking) {
    throw new NotFoundError('Booking not found');
  }

  await unitOfWork.audit({
    userId: user.id,
    userEmail: user.email,
    action: 'booking.updated',
    entityName: 'Booking',
    entityId: body.id,
    before,
    after: booking,
    ...getRequestMeta(request),
  });

  return ok(booking);
});
