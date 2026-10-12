import mammoth from 'mammoth';
import WordExtractor from 'word-extractor';
import AdmZip from 'adm-zip';
import sanitizeHtml from 'sanitize-html';
import { MAX_DOCUMENT_BYTES } from '@/application/validators/document-import.validators';
import { ValidationError } from '@/shared/errors/app-error';

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
export async function extractWordDocument(buffer: Buffer, filename: string) {
  if (!buffer.length || buffer.length > MAX_DOCUMENT_BYTES) throw new ValidationError('Choose a non-empty Word file under 4 MB.');
  const extension = filename.split('.').pop()?.toLowerCase();
  let html: string;
  const warnings: string[] = [];
  try {
    if (extension === 'docx') {
      if (buffer.readUInt32LE(0) !== 0x04034b50) throw new Error('Invalid DOCX');
      const archive = new AdmZip(buffer);
      const entries = archive.getEntries();
      if (!archive.getEntry('word/document.xml') || entries.length > 2000 || entries.reduce((total, entry) => total + entry.header.size, 0) > 25 * 1024 * 1024) throw new Error('Invalid or oversized archive');
      const converted = await mammoth.convertToHtml({ buffer }, {
        externalFileAccess: false, includeEmbeddedStyleMap: false,
        convertImage: mammoth.images.imgElement(async () => ({ src: '' }))
      });
      html = converted.value;
      if (entries.some(entry => entry.entryName.startsWith('word/media/'))) warnings.push('Embedded images were not imported. Add images using the Media section.');
      if (converted.messages.length) warnings.push('Some Word formatting could not be reproduced. Review the imported content.');
    } else if (extension === 'doc') {
      if (!buffer.subarray(0, 8).equals(Buffer.from('d0cf11e0a1b11ae1', 'hex'))) throw new Error('Invalid DOC');
      const document = await new WordExtractor().extract(buffer);
      const text = [document.getBody(), document.getFootnotes(), document.getEndnotes()].filter(Boolean).join('\n\n');
      html = text.split(/\n+/).filter(line => line.trim()).map(line => '<p>' + escapeHtml(line) + '</p>').join('');
      warnings.push('Legacy .doc files import text only. Add images and review formatting in the editor.');
    } else throw new ValidationError('Only .doc and .docx Word documents are supported.');
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw new ValidationError('Could not read this Word document. It may be damaged, encrypted, or too large after extraction. Save it as a new .docx file and try again.');
  }
  html = sanitizeHtml(html, {
    allowedTags: ['p','br','h1','h2','h3','h4','h5','h6','strong','em','u','s','ul','ol','li','blockquote','table','thead','tbody','tr','th','td','a','sup','sub'],
    allowedAttributes: { a: ['href'], th: ['colspan','rowspan'], td: ['colspan','rowspan'] },
    allowedSchemes: ['http','https','mailto'], allowProtocolRelative: false
  });
  const text = sanitizeHtml(html.replace(/<\/(p|h[1-6]|li|tr|blockquote)>/gi, '\n').replace(/<br\s*\/?\s*>/gi, '\n'), { allowedTags: [], allowedAttributes: {} }).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  if (!text.trim()) throw new ValidationError('No readable text was found. Scanned images need to be converted to text first.');
  if (html.length > 250000) throw new ValidationError('The extracted content is too long. Split the document into smaller files.');
  return { html, text, warnings };
}
