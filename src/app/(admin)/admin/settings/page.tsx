import AdminContentManager from '@/components/admin/AdminContentManager';
import { settingsConfig } from '@/components/admin/module-configs';

export default function AdminModulePage() {
  return <AdminContentManager config={settingsConfig} />;
}
