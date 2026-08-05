import AdminContentManager from '@/components/admin/AdminContentManager';
import { tripConfig } from '@/components/admin/module-configs';

export default function AdminModulePage() {
  return <AdminContentManager config={tripConfig} />;
}
