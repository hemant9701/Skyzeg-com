import { LanguageService } from '@/application/services/language.service';
import { ok, withApiErrorHandling } from '@/shared/http/api-response';

export const GET = withApiErrorHandling(async () => {
  const languages = await new LanguageService().getLanguages();
  return ok(languages);
});
