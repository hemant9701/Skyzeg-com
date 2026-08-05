import { getCurrentUserFromCookies } from '@/lib/auth';
import { ok, withApiErrorHandling } from '@/shared/http/api-response';

export const GET = withApiErrorHandling(async () => {
  const user = await getCurrentUserFromCookies();
  return ok(user);
});
