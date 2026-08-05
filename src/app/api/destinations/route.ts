import { NextRequest } from 'next/server';
import { DestinationUpsertSchema } from '@/application/validators/content.validators';
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
  const filter: any = admin ? {} : { isVisible: true };
  if (search) {
    filter.$or = [{ slug: { $regex: search, $options: 'i' } }, { 'translations.title': { $regex: search, $options: 'i' } }];
  }
  const result = admin
    ? await uow.destinations.paginate(filter, { page, pageSize, sort: { createdAt: -1 } })
    : await uow.destinations.list(filter, { sort: { sortOrder: 1, createdAt: -1 } });
  return ok(result);
});

export const POST = withApiErrorHandling(async (request: NextRequest) => {
  await requireApiUser(request, AdminRoles);
  const data = DestinationUpsertSchema.parse(await request.json());
  const createdItem = await new UnitOfWork().destinations.create(data);
  return created(createdItem);
});
