import type { NextRequest } from 'next/server';
import { ExportDraftSchema, ExportQuerySchema } from '@/application/validators/content-export.validators';
import { exportDraftContent, exportSavedContent } from '@/application/services/content-export.service';
import { canAccessAdminCollection } from '@/domain/constants/admin-permissions';
import { AdminRoles } from '@/domain/constants/roles';
import { requireApiUser } from '@/lib/auth';
import { ForbiddenError, ValidationError } from '@/shared/errors/app-error';
import { withApiErrorHandling } from '@/shared/http/api-response';

export const runtime = 'nodejs';
function download(result: { buffer: Buffer; filename: string; type: string }) {
  return new Response(new Uint8Array(result.buffer), { headers: { 'Content-Type': result.type, 'Content-Disposition': 'attachment; filename="'+result.filename+'"', 'Cache-Control': 'no-store' } });
}
export const GET = withApiErrorHandling(async (request: NextRequest) => {
  const user = await requireApiUser(request, AdminRoles);
  const input = ExportQuerySchema.parse({ collection: request.nextUrl.searchParams.get('collection'), id: request.nextUrl.searchParams.get('id') || undefined });
  if (!canAccessAdminCollection(user.roles, input.collection, 'GET')) throw new ForbiddenError();
  return download(await exportSavedContent(input.collection, input.id));
});
export const POST = withApiErrorHandling(async (request: NextRequest) => {
  const user = await requireApiUser(request, AdminRoles);
  const raw = await request.text();
  if (raw.length > 2000000) throw new ValidationError('Content is too large to export.');
  let body: unknown;
  try { body = JSON.parse(raw); } catch { throw new ValidationError('Invalid JSON request'); }
  const input = ExportDraftSchema.parse(body);
  if (!canAccessAdminCollection(user.roles, input.collection, 'GET')) throw new ForbiddenError();
  return download(exportDraftContent(input.collection, input.content));
});
