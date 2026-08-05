'use client';

import { Editor } from '@tinymce/tinymce-react';

export default function RichTextEditor({ value, onChange, height = 420 }: { value?: string; onChange: (value: string) => void; height?: number }) {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'obms506vf782ib2evv6ctwxj03meu1k51bvf442fc71mqdnw'}
      value={value || ''}
      onEditorChange={onChange}
      init={{
        height,
        menubar: true,
        branding: false,
        promotion: false,
        licenseKey: 'gpl',
        plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image media table | forecolor backcolor removeformat | code fullscreen preview',
        image_advtab: true,
        automatic_uploads: true,
        file_picker_types: 'image media file',
        images_upload_handler: async (blobInfo) => {
          const form = new FormData();
          form.append('file', blobInfo.blob(), blobInfo.filename());
          form.append('folder', 'media');
          form.append('convertToWebp', 'true');
          const response = await fetch('/api/media/upload', { method: 'POST', body: form });
          const json = await response.json();
          if (!response.ok) throw new Error(json.message || 'Upload failed');
          return json.data.url as string;
        },
        media_live_embeds: true,
        content_style: 'body{font-family:Arial,sans-serif;font-size:15px;line-height:1.65}'
      }}
    />
  );
}
