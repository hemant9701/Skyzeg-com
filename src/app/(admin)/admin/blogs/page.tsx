import AdminContentManager from '@/components/admin/AdminContentManager';
import { blogConfig } from '@/components/admin/module-configs';

export default function AdminModulePage() {
  return <AdminContentManager config={blogConfig} />;
}
