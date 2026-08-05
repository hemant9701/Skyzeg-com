import type { NextRequest } from 'next/server';
import { MediaService } from '@/application/services/media.service';
import { AdminRoles } from '@/domain/constants/roles';
import { type UploadFolder } from '@/domain/constants/upload-folders';
import { requireApiUser } from '@/lib/auth';
import { created, withApiErrorHandling } from '@/shared/http/api-response';

export const runtime = 'nodejs';

export const POST = withApiErrorHandling(async (request: NextRequest) => {
  await requireApiUser(request, AdminRoles);
  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) throw new Error('Missing file');

  const media = await new MediaService().upload(file, {
    folder: (form.get('folder')?.toString() || 'media') as UploadFolder,
    altText: form.get('altText')?.toString(),
    caption: form.get('caption')?.toString(),
    width: form.get('width') ? Number(form.get('width')) : undefined,
    height: form.get('height') ? Number(form.get('height')) : undefined,
    cropX: form.get('cropX') ? Number(form.get('cropX')) : undefined,
    cropY: form.get('cropY') ? Number(form.get('cropY')) : undefined,
    cropWidth: form.get('cropWidth') ? Number(form.get('cropWidth')) : undefined,
    cropHeight: form.get('cropHeight') ? Number(form.get('cropHeight')) : undefined,
    convertToWebp: form.get('convertToWebp') === 'true'
  });

  return created(media);
});
