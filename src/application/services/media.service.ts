import path from 'node:path';
import fs from 'node:fs/promises';
import sharp from 'sharp';
import { UploadFolders, type UploadFolder } from '@/domain/constants/upload-folders';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { ValidationError } from '@/shared/errors/app-error';
import { toSlug } from '@/shared/utils/slug';

const allowedMimeTypes = new Set([
  'image/webp',
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'application/pdf',
  'video/mp4',
  'video/webm',
  'video/quicktime'
]);

const imageMimeTypes = new Set(['image/webp', 'image/png', 'image/jpeg']);
const maxFileSize = 50 * 1024 * 1024;

export interface UploadOptions {
  folder?: UploadFolder;
  altText?: string;
  caption?: string;
  width?: number;
  height?: number;
  cropX?: number;
  cropY?: number;
  cropWidth?: number;
  cropHeight?: number;
  convertToWebp?: boolean;
}

export class MediaService {
  constructor(private readonly unitOfWork = new UnitOfWork()) {}

  async upload(file: File, options: UploadOptions = {}) {
    if (!file || file.size <= 0) throw new ValidationError('No file uploaded');
    if (file.size > maxFileSize) throw new ValidationError('File size must be 50 MB or less');
    if (!allowedMimeTypes.has(file.type)) throw new ValidationError(`Unsupported file type: ${file.type}`);

    const folder = options.folder && UploadFolders.includes(options.folder) ? options.folder : 'media';
    const buffer = Buffer.from(await file.arrayBuffer());
    const originalExtension = path.extname(file.name).replace('.', '').toLowerCase();
    const baseName = toSlug(path.basename(file.name, path.extname(file.name))) || 'upload';
    const isImage = file.type.startsWith('image/');
    const isRasterImage = imageMimeTypes.has(file.type);
    const type = file.type.startsWith('video/') ? 'video' : file.type === 'application/pdf' ? 'document' : 'image';

    const uploadRoot = path.join(process.cwd(), 'public', 'uploads', folder);
    await fs.mkdir(uploadRoot, { recursive: true });

    let outputBuffer: Buffer = buffer;
    let extension = originalExtension || 'bin';
    let width: number | undefined;
    let height: number | undefined;

    if (isRasterImage) {
      let processor = sharp(buffer, { failOn: 'none' });
      const metadata = await processor.metadata();
      width = metadata.width;
      height = metadata.height;

      if (options.cropWidth && options.cropHeight) {
        processor = processor.extract({
          left: Math.max(0, options.cropX || 0),
          top: Math.max(0, options.cropY || 0),
          width: Math.max(1, options.cropWidth),
          height: Math.max(1, options.cropHeight)
        });
      }

      if (options.width || options.height) {
        processor = processor.resize({ width: options.width, height: options.height, fit: 'cover' });
      }

      if (options.convertToWebp) {
        outputBuffer = await processor.webp({ quality: 82 }).toBuffer();
        extension = 'webp';
      } else if (file.type === 'image/png') {
        outputBuffer = await processor.png({ compressionLevel: 8 }).toBuffer();
        extension = 'png';
      } else {
        outputBuffer = await processor.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
        extension = 'jpg';
      }

      const outputMeta = await sharp(outputBuffer).metadata();
      width = outputMeta.width;
      height = outputMeta.height;
    }

    const fileName = `${baseName}-${Date.now()}.${extension}`;
    const storagePath = path.join(uploadRoot, fileName);
    await fs.writeFile(storagePath, outputBuffer);

    const url = `/uploads/${folder}/${fileName}`;
    return this.unitOfWork.mediaFiles.create({
      folder,
      originalName: file.name,
      fileName,
      extension,
      mimeType: file.type,
      size: outputBuffer.length,
      url,
      storagePath,
      width,
      height,
      altText: options.altText || '',
      caption: options.caption || '',
      type
    });
  }

  async delete(mediaId: string) {
    const media = await this.unitOfWork.mediaFiles.findById(mediaId);
    if (!media) throw new Error('Media file not found');
    
    try {
      await fs.unlink(media.storagePath);
    } catch {
      // File may already be deleted, continue with DB cleanup
    }
    
    return this.unitOfWork.mediaFiles.deleteById(mediaId);
  }
}
