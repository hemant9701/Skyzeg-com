import test from 'node:test';
import assert from 'node:assert/strict';
import AdmZip from 'adm-zip';
import { extractWordDocument } from '../src/infrastructure/documents/word-extractor';
import { mapDocumentToDraft } from '../src/application/services/document-import.service';
import { DocumentImportSchema } from '../src/application/validators/document-import.validators';

function wordFile(xml: string) {
  const zip = new AdmZip();
  zip.addFile('[Content_Types].xml', Buffer.from('<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'));
  zip.addFile('word/document.xml', Buffer.from('<?xml version="1.0"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+xml+'</w:body></w:document>'));
  return zip.toBuffer();
}

test('DOCX import retains paragraphs, headings, lists of text, and tables', async () => {
  const document = await extractWordDocument(wordFile('<w:p><w:pPr><w:pStyle w:val="Heading1"/></w:pPr><w:r><w:t>Safari Adventure</w:t></w:r></w:p><w:p><w:r><w:t>Explore the national park.</w:t></w:r></w:p><w:tbl><w:tr><w:tc><w:p><w:r><w:t>Day one</w:t></w:r></w:p></w:tc></w:tr></w:tbl>'), 'safari.docx');
  assert.match(document.html, /Safari Adventure/);
  assert.match(document.html, /<table>/);
  assert.match(document.text, /Day one/);
  for (const collection of ['pages','blogs','trips','destinations'] as const) {
    const draft = mapDocumentToDraft(collection, 'en-US', document);
    assert.equal(draft.translation.title, 'Safari Adventure');
    assert.equal(draft.fields.isVisible, false);
    assert.equal(draft.translation[collection==='pages'||collection==='blogs'?'body':'overview'], document.html);
  }
  assert.equal(mapDocumentToDraft('blogs','en-US',document).fields.status,'draft');
});

test('document import rejects invalid formats, corrupt Word files, and empty documents', async () => {
  await assert.rejects(()=>extractWordDocument(Buffer.from('not a Word file'),'file.docx'), /Could not read/);
  await assert.rejects(()=>extractWordDocument(Buffer.from('not a Word file'),'file.doc'), /Could not read/);
  await assert.rejects(()=>extractWordDocument(Buffer.from('text'),'file.pdf'), /Only .doc/);
  await assert.rejects(()=>extractWordDocument(wordFile('<w:p/>'),'empty.docx'), /No readable text/);
  assert.equal(DocumentImportSchema.safeParse({collection:'users',languageCode:'en-US'}).success,false);
});

test('document import escapes text that resembles executable HTML', async () => {
  const document = await extractWordDocument(wordFile('<w:p><w:r><w:t>&lt;script&gt;alert(1)&lt;/script&gt;</w:t></w:r></w:p>'), 'safe.docx');
  assert.doesNotMatch(document.html, /<script>/);
  assert.match(document.html, /&lt;script&gt;/);
});
