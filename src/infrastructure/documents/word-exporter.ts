import AdmZip from 'adm-zip';
import sanitizeHtml from 'sanitize-html';

const xml = (text: string) => text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&apos;' })[char]!);
export function contentToWord(content: Record<string, unknown>, fallback: string) {
  const translations = Array.isArray(content.translations) ? content.translations : [];
  const title = String(translations.find(item => item.languageCode === 'en-US')?.title || translations[0]?.title || content.tripName || content.slug || content.key || fallback);
  const paragraphs: string[] = [];
  function paragraph(text: string, style?: string) {
    paragraphs.push('<w:p>'+(style?'<w:pPr><w:pStyle w:val="'+style+'"/></w:pPr>':'')+'<w:r><w:t xml:space="preserve">'+xml(text)+'</w:t></w:r></w:p>');
  }
  function walk(value: unknown, label: string, depth = 0) {
    if (value === null || value === undefined || value === '') return;
    if (depth > 15) return;
    if (Array.isArray(value)) {
      if (!value.length) return;
      paragraph(label, 'Heading2');
      value.forEach((item,index) => walk(item, String((item as { languageCode?: string })?.languageCode || 'Item '+(index+1)), depth+1));
    } else if (typeof value === 'object') {
      paragraph(label, 'Heading2');
      for (const [key,item] of Object.entries(value)) if (!['_id','__v'].includes(key)) walk(item, key.replace(/([a-z])([A-Z])/g,'$1 $2'), depth+1);
    } else {
      paragraph(label, 'Heading3');
      const text = sanitizeHtml(String(value).replace(/<\/(p|h[1-6]|li|tr|blockquote|div)>/gi, '\n').replace(/<br\s*\/?\s*>/gi,'\n').replace(/<\/(td|th)>/gi,'\t'), {allowedTags:[],allowedAttributes:{}}).replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
      text.split('\n').forEach(line=>paragraph(line));
    }
  }
  paragraph(title, 'Title');
  for (const [key,value] of Object.entries(content)) if (!['_id','__v'].includes(key)) walk(value,key.replace(/([a-z])([A-Z])/g,'$1 $2'));
  const archive = new AdmZip();
  archive.addFile('[Content_Types].xml', Buffer.from('<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>'));
  archive.addFile('_rels/.rels', Buffer.from('<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'));
  archive.addFile('word/_rels/document.xml.rels', Buffer.from('<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'));
  archive.addFile('word/document.xml', Buffer.from('<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+paragraphs.join('')+'<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr></w:body></w:document>'));
  archive.addFile('word/styles.xml', Buffer.from('<?xml version="1.0"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="22"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="160" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>'+[['Title',36],['Heading2',28],['Heading3',24]].map(([name,size])=>'<w:style w:type="paragraph" w:styleId="'+name+'"><w:name w:val="'+name+'"/><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="120"/></w:pPr><w:rPr><w:b/><w:sz w:val="'+size+'"/></w:rPr></w:style>').join('')+'</w:styles>'));
  return { buffer: archive.toBuffer(), filename: (title.replace(/[^a-z0-9_-]/gi,'-').slice(0,80)||fallback)+'.docx' };
}
