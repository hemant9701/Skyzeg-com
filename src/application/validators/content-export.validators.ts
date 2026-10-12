import { z } from 'zod';
import { documentImportCollections } from './document-import.validators';

export const ExportCollectionSchema = z.enum([...documentImportCollections, 'menus', 'settings']);
export const ExportQuerySchema = z.object({ collection: ExportCollectionSchema, id: z.string().regex(/^[a-f0-9]{24}$/i).optional() });
export const ExportDraftSchema = z.object({ collection: ExportCollectionSchema, content: z.record(z.string(), z.json()) }).strict();
