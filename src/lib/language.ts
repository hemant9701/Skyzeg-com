import { cookies } from 'next/headers';
import { languageCookieName } from './language-cookie';

export async function getLanguageCode(): Promise<string> {
  const store = await cookies();
  return store.get(languageCookieName)?.value || 'en-US';
}
