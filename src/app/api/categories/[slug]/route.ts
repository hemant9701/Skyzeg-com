import { NextRequest } from 'next/server';
import { CategoryUpsertSchema } from '@/application/validators/content.validators';
import { AdminRoles } from '@/domain/constants/roles';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { requireApiUser } from '@/lib/auth';
import { NotFoundError } from '@/shared/errors/app-error';
import { noContent, ok, withApiErrorHandling } from '@/shared/http/api-response';

interface Context { params: Promise<{ slug: string }> }

export const GET = withApiErrorHandling(async (_request: NextRequest, context: Context) => {
  const { slug } = await context.params;
  const item = await new UnitOfWork().categories.findOne({ slug });
  if (!item) throw new NotFoundError('Category not found');
  return ok(item);
});

export const PUT = withApiErrorHandling(async (request: NextRequest, context: Context) => {
  await requireApiUser(request, AdminRoles);
  const { slug } = await context.params;
  const data = CategoryUpsertSchema.parse(await request.json());
  const item = await new UnitOfWork().categories.updateOne({ slug }, data);
  if (!item) throw new NotFoundError('Category not found');
  return ok(item);
});

export const DELETE = withApiErrorHandling(async (request: NextRequest, context: Context) => {
  await requireApiUser(request, AdminRoles);
  const { slug } = await context.params;
  const deleted = await new UnitOfWork().categories.deleteOne({ slug });
  if (!deleted) throw new NotFoundError('Category not found');
  return noContent();
});
