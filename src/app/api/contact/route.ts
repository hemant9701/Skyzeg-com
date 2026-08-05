import type { NextRequest } from 'next/server';
import { ContactService } from '@/application/services/contact.service';
import { getRequestMeta } from '@/lib/request';
import { created, withApiErrorHandling } from '@/shared/http/api-response';

export const POST = withApiErrorHandling(async (request: NextRequest) => {
  const enquiry = await new ContactService().createEnquiry(await request.json(), getRequestMeta(request));
  return created(enquiry);
});
