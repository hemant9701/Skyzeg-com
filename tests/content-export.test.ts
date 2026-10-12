import test from 'node:test';
import assert from 'node:assert/strict';
import AdmZip from 'adm-zip';
import mammoth from 'mammoth';
import { contentToWord } from '../src/infrastructure/documents/word-exporter';
import { ExportQuerySchema } from '../src/application/validators/content-export.validators';

test('Word export includes translations, HTML prose, nested content, and metadata', async () => {
  const result=contentToWord({slug:'safari',price:125,translations:[{languageCode:'en-US',title:'Safari & Travel',body:'<p>Hello <strong>world</strong></p>',itinerary:[{dayNumber:1,title:'Arrival'}]},{languageCode:'fr-FR',title:'Voyage',body:'Bonjour'}]},'trips');
  const archive=new AdmZip(result.buffer);
  assert.ok(archive.getEntry('word/styles.xml'));
  const text=(await mammoth.extractRawText({buffer:result.buffer})).value;
  for(const expected of ['Safari & Travel','Hello world','Arrival','125','fr-FR','Bonjour'])assert.ok(text.includes(expected),expected);
  assert.ok(result.filename.endsWith('.docx'));
  assert.doesNotMatch(result.filename, /["/\\]/);
});
test('export validates content types and record IDs',()=>{
  assert.equal(ExportQuerySchema.safeParse({collection:'users'}).success,false);
  assert.equal(ExportQuerySchema.safeParse({collection:'pages',id:'invalid'}).success,false);
  assert.equal(ExportQuerySchema.safeParse({collection:'menus'}).success,true);
});
