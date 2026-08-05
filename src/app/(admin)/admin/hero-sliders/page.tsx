import AdminContentManager from '@/components/admin/AdminContentManager';
import { heroSliderConfig } from '@/components/admin/module-configs';

export default function AdminModulePage() {
  return <AdminContentManager config={heroSliderConfig} />;
}
