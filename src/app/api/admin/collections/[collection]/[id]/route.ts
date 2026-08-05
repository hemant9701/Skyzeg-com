import type { NextRequest } from 'next/server';
import { getRegistryItem } from '@/application/services/module-registry';
import { AdminRoles } from '@/domain/constants/roles';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { requireApiUser } from '@/lib/auth';
import { NotFoundError } from '@/shared/errors/app-error';
import { noContent, ok, withApiErrorHandling } from '@/shared/http/api-response';

interface Context { params: Promise<{ collection: string; id: string }> }

export const GET = withApiErrorHandling(async (request: NextRequest, context: Context) => {
  await requireApiUser(request, AdminRoles);
  const { collection, id } = await context.params;
  const item = getRegistryItem(collection);
  const found = await item.repo(new UnitOfWork()).findById(id);
  if (!found) throw new NotFoundError(`${item.entityName} not found`);
  return ok(found);
});

export const PUT = withApiErrorHandling(async (request: NextRequest, context: Context) => {
  const user = await requireApiUser(request, AdminRoles);
  const { collection, id } = await context.params;
  const item = getRegistryItem(collection);
  const data = item.validator.parse(await request.json());
  const uow = new UnitOfWork();
  const before = await item.repo(uow).findById(id);
  const updated = await item.repo(uow).updateById(id, data);
  if (!updated) throw new NotFoundError(`${item.entityName} not found`);
  await uow.audit({ userId: user.id, userEmail: user.email, action: 'update', entityName: item.entityName, entityId: id, before, after: updated });
  return ok(updated);
});

export const DELETE = withApiErrorHandling(async (request: NextRequest, context: Context) => {
  const user = await requireApiUser(request, AdminRoles);
  const { collection, id } = await context.params;
  const item = getRegistryItem(collection);
  const uow = new UnitOfWork();
  const before = await item.repo(uow).findById(id);
  const deleted = await item.repo(uow).deleteById(id);
  if (!deleted) throw new NotFoundError(`${item.entityName} not found`);
  await uow.audit({ userId: user.id, userEmail: user.email, action: 'delete', entityName: item.entityName, entityId: id, before });
  return noContent();
});
