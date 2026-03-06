import { type Tenant } from '../../types';
import { TenantCard } from './TenantCard';
import { EmptyState } from '../ui/EmptyState';
import { Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../lib/constants';

interface TenantListProps {
  tenants: Tenant[];
  isLoading?: boolean;
}

export function TenantList({ tenants, isLoading }: TenantListProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
            <div className="flex gap-3 mb-4">
              <div className="w-10 h-10 bg-slate-200 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-2/3" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tenants.length === 0) {
    return (
      <EmptyState
        icon={<Building2 className="h-12 w-12" />}
        title="No hay clientes aún"
        description="Crea tu primer cliente para comenzar a gestionar landing pages."
        action={{ label: 'Crear cliente', onClick: () => navigate(ROUTES.TENANT_NEW) }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tenants.map((tenant) => (
        <TenantCard key={tenant.id} tenant={tenant} />
      ))}
    </div>
  );
}
