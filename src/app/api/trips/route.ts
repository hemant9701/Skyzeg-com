import { NextRequest } from 'next/server';
import { buildTripQuery } from '@/application/services/trip-query.service';
import { TripUpsertSchema } from '@/application/validators/content.validators';
import { AdminRoles } from '@/domain/constants/roles';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { requireApiUser } from '@/lib/auth';
import { created, ok, withApiErrorHandling } from '@/shared/http/api-response';

export const GET = withApiErrorHandling(async (request: NextRequest) => {
  const uow = new UnitOfWork();
  const searchParams = request.nextUrl.searchParams;
  const admin = searchParams.get('admin') === '1';
  if (admin) await requireApiUser(request, AdminRoles);
  const page = Number(searchParams.get('page') || 1);
  const pageSize = Number(searchParams.get('pageSize') || 20);
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const destination = searchParams.get('destination') || '';
  const travelType = searchParams.get('travel-type') || '';
  const featured = searchParams.get('featured') || '';
  const duration = searchParams.get('duration') || '';
  const { filter } = await buildTripQuery(uow, {
    search,
    category,
    destination,
    'travel-type': travelType,
    featured,
    duration,
    admin
  });
  const result = admin
    ? await uow.trips.paginate(filter, { page, pageSize, sort: { createdAt: -1 } })
    : await uow.trips.list(filter, { sort: { sortOrder: 1, createdAt: -1 } });
  return ok(result);
});

export const POST = withApiErrorHandling(async (request: NextRequest) => {
  await requireApiUser(request, AdminRoles);
  const data = TripUpsertSchema.parse(await request.json());
  const createdItem = await new UnitOfWork().trips.create(data);
  return created(createdItem);
});
