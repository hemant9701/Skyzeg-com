import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { ok, withApiErrorHandling } from '@/shared/http/api-response';

export const GET = withApiErrorHandling(async () => {
  const settings = await new UnitOfWork().siteSettings.findOne({ key: 'main' });
  return ok(settings);
});
