import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateTenant } from '../hooks/use-tenants';
import { useTemplates } from '../hooks/use-templates';
import { TenantForm } from '../components/tenants/TenantForm';
import { Card } from '../components/ui/Card';
import { ROUTES } from '../lib/constants';
import type { TenantCreate } from '../types';

export function TenantCreatePage() {
  const navigate = useNavigate();
  const createTenant = useCreateTenant();
  const { data: templates } = useTemplates();

  const handleSubmit = async (data: TenantCreate) => {
    try {
      const tenant = await createTenant.mutateAsync(data);
      toast.success('Cliente creado correctamente');
      navigate(ROUTES.TENANT_DETAIL(tenant.slug));
    } catch {
      toast.error('Error al crear el cliente');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(ROUTES.TENANTS)}
          className="text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Nuevo Cliente</h1>
          <p className="text-slate-500 text-sm mt-0.5">Configura el nuevo tenant</p>
        </div>
      </div>

      <Card>
        <TenantForm
          templates={templates}
          onSubmit={handleSubmit}
          isLoading={createTenant.isPending}
        />
      </Card>
    </div>
  );
}
