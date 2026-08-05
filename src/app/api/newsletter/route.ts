import type { NextRequest } from 'next/server';
import { ContactService } from '@/application/services/contact.service';
import { created, withApiErrorHandling } from '@/shared/http/api-response';

export const POST = withApiErrorHandling(async (request: NextRequest) => {
  const subscriber = await new ContactService().subscribe(await request.json());
  return created(subscriber);
});
