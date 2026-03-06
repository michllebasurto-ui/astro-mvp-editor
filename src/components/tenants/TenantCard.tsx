import { useNavigate } from 'react-router-dom';
import { ExternalLink, Edit } from 'lucide-react';
import type { Tenant } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ROUTES } from '../../lib/constants';

interface TenantCardProps {
  tenant: Tenant;
}

export function TenantCard({ tenant }: TenantCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(ROUTES.TENANT_DETAIL(tenant.slug))}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: tenant.primaryColor }}
          >
            {tenant.brandName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">{tenant.brandName}</h3>
            <p className="text-xs text-slate-500">{tenant.subdomain}</p>
          </div>
        </div>
        <Badge variant={tenant.isActive ? 'success' : 'default'}>
          {tenant.isActive ? 'Activo' : 'Inactivo'}
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Plantilla:</span>
          <Badge variant="info">{tenant.templatePath}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Páginas:</span>
          <span className="text-xs text-slate-700 font-medium">{tenant.pages?.length || 0}</span>
        </div>
      </div>

      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={() => navigate(ROUTES.TENANT_DETAIL(tenant.slug))}
        >
          <Edit className="h-3.5 w-3.5" />
          Editar
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => navigate(ROUTES.TENANT_EDITOR(tenant.slug))}
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </div>
    </Card>
  );
}
