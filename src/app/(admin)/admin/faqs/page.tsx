import AdminContentManager from '@/components/admin/AdminContentManager';
import { faqConfig } from '@/components/admin/module-configs';

export default function AdminModulePage() {
  return <AdminContentManager config={faqConfig} />;
}
