import type { NextRequest } from 'next/server';
import { DocumentImportSchema, MAX_DOCUMENT_BYTES } from '@/application/validators/document-import.validators';
import { importWordDocument } from '@/application/services/document-import.service';
import { canAccessAdminCollection } from '@/domain/constants/admin-permissions';
import { AdminRoles } from '@/domain/constants/roles';
import { requireApiUser } from '@/lib/auth';
import { ForbiddenError, ValidationError } from '@/shared/errors/app-error';
import { ok, withApiErrorHandling } from '@/shared/http/api-response';

export const runtime = 'nodejs';
export const maxDuration = 60;
export const POST = withApiErrorHandling(async (request: NextRequest) => {
  const user = await requireApiUser(request, AdminRoles);
  if (Number(request.headers.get('content-length')) > MAX_DOCUMENT_BYTES + 65536) throw new ValidationError('Choose a Word file under 4 MB.');
  const form = await request.formData();
  const input = DocumentImportSchema.parse({ collection: form.get('collection'), languageCode: form.get('languageCode') });
  if (!canAccessAdminCollection(user.roles, input.collection, 'POST')) throw new ForbiddenError();
  const file = form.get('file');
  if (!(file instanceof File)) throw new ValidationError('Choose a Word document to import.');
  if (!file.size || file.size > MAX_DOCUMENT_BYTES) throw new ValidationError('Choose a non-empty Word file under 4 MB.');
  return ok(await importWordDocument(input, Buffer.from(await file.arrayBuffer()), file.name));
});
