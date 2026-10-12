import { getRegistryItem } from './module-registry';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { contentToWord } from '@/infrastructure/documents/word-exporter';
import { NotFoundError, ValidationError } from '@/shared/errors/app-error';

export async function exportSavedContent(collection: string, id?: string) {
  const uow = new UnitOfWork();
  const repo = getRegistryItem(collection).repo(uow);
  if (id) {
    const content = await repo.findById(id);
    if (!content) throw new NotFoundError('Content not found');
    return exportDraftContent(collection, JSON.parse(JSON.stringify(content)));
  }
  const items = await repo.list({}, { limit: 10001 });
  if (items.length > 10000) throw new ValidationError('This collection is too large for one export. Export individual records.');
  return { buffer: Buffer.from(JSON.stringify({ collection, exportedAt: new Date().toISOString(), items }, null, 2)), filename: collection+'.json', type: 'application/json' };
}
export function exportDraftContent(collection: string, content: Record<string, unknown>) {
  return { ...contentToWord(content, collection), type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };
}
