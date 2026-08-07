import type { NextRequest } from 'next/server';
import { getRegistryItem } from '@/application/services/module-registry';
import { AdminRoles } from '@/domain/constants/roles';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { requireApiUser } from '@/lib/auth';
import { ValidationError } from '@/shared/errors/app-error';
import { created, ok, withApiErrorHandling } from '@/shared/http/api-response';

interface Context { params: Promise<{ collection: string }> }

export const GET = withApiErrorHandling(async (request: NextRequest, context: Context) => {
  await requireApiUser(request, AdminRoles);
  const { collection } = await context.params;
  if (collection === 'users') {
    throw new ValidationError('Use /api/admin/users for user management');
  }
  const item = getRegistryItem(collection);
  const uow = new UnitOfWork();
  const page = Number(request.nextUrl.searchParams.get('page') || 1);
  const pageSize = Number(request.nextUrl.searchParams.get('pageSize') || 20);
  const search = request.nextUrl.searchParams.get('search') || '';
  const filter: any = {};
  if (search) {
    filter.$or = [
      { slug: { $regex: search, $options: 'i' } },
      { key: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { leadEmail: { $regex: search, $options: 'i' } },
      { 'translations.title': { $regex: search, $options: 'i' } }
    ];
  }
  const result = await item.repo(uow).paginate(filter, { page, pageSize, sort: item.defaultSort as any });
  return ok(result);
});

export const POST = withApiErrorHandling(async (request: NextRequest, context: Context) => {
  const user = await requireApiUser(request, AdminRoles);
  const { collection } = await context.params;
  if (collection === 'users') {
    throw new ValidationError('Use /api/admin/users for user management');
  }
  const item = getRegistryItem(collection);
  const data = item.validator.parse(await request.json());
  const uow = new UnitOfWork();
  const createdItem = await item.repo(uow).create(data);
  await uow.audit({ userId: user.id, userEmail: user.email, action: 'create', entityName: item.entityName, entityId: String(createdItem._id), after: createdItem });
  return created(createdItem);
});
