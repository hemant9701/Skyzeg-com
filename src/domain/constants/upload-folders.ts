export const UploadFolders = [
  'blogs',
  'pages',
  'destinations',
  'trips',
  'slider',
  'gallery',
  'logos',
  'documents',
  'media'
] as const;

export type UploadFolder = (typeof UploadFolders)[number];
