import type { NextRequest } from 'next/server';
import { SiteSettingUpsertSchema } from '@/application/services/module-registry';
import { AdminRoles } from '@/domain/constants/roles';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { requireApiUser } from '@/lib/auth';
import { ok, withApiErrorHandling } from '@/shared/http/api-response';

export const GET = withApiErrorHandling(async (request: NextRequest) => {
  await requireApiUser(request, AdminRoles);
  const settings = await new UnitOfWork().siteSettings.findOne({ key: 'main' });
  return ok(settings);
});

export const PUT = withApiErrorHandling(async (request: NextRequest) => {
  await requireApiUser(request, AdminRoles);
  const data = SiteSettingUpsertSchema.parse(await request.json());
  const item = await new UnitOfWork().siteSettings.updateOne({ key: 'main' }, data) || await new UnitOfWork().siteSettings.create(data);
  return ok(item);
});
