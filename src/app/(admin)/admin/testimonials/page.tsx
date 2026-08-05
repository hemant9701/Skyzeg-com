import AdminContentManager from '@/components/admin/AdminContentManager';
import { testimonialConfig } from '@/components/admin/module-configs';

export default function AdminModulePage() {
  return <AdminContentManager config={testimonialConfig} />;
}
