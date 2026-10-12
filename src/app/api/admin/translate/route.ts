import type { NextRequest } from 'next/server';
import { TranslateContentSchema } from '@/application/validators/translation.validators';
import { translateContent } from '@/application/services/translation.service';
import { getRegistryItem } from '@/application/services/module-registry';
import { canAccessAdminCollection } from '@/domain/constants/admin-permissions';
import { AdminRoles } from '@/domain/constants/roles';
import { requireApiUser } from '@/lib/auth';
import { ForbiddenError, ValidationError } from '@/shared/errors/app-error';
import { ok, withApiErrorHandling } from '@/shared/http/api-response';

export const maxDuration = 90;
export const POST = withApiErrorHandling(async (request: NextRequest) => {
  const user = await requireApiUser(request, AdminRoles);
  const raw = await request.text();
  if (raw.length > 75000) throw new ValidationError('Translation request is too large');
  let body: unknown;
  try { body = JSON.parse(raw); } catch { throw new ValidationError('Invalid JSON request'); }
  const input = TranslateContentSchema.parse(body);
  if (!canAccessAdminCollection(user.roles, input.collection, 'POST')) throw new ForbiddenError();
  getRegistryItem(input.collection);
  return ok({ content: await translateContent(input) });
});
