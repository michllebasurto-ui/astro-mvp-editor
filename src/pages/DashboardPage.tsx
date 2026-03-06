import { useNavigate } from 'react-router-dom';
import { Building2, Globe, Layout, Plus, ArrowRight } from 'lucide-react';
import { useTenants } from '../hooks/use-tenants';
import { useTemplates } from '../hooks/use-templates';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Spinner } from '../components/ui/Spinner';
import { ROUTES } from '../lib/constants';
import { formatDate } from '../lib/utils';

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: tenants, isLoading: loadingTenants } = useTenants();
  const { data: templates } = useTemplates();

  const totalTenants = tenants?.length || 0;
  const activeTenants = tenants?.filter((t) => t.isActive).length || 0;
  const totalTemplates = templates?.length || 0;
  const recentTenants = tenants?.slice(0, 5) || [];

  const stats = [
    { label: 'Total Clientes', value: totalTenants, icon: Building2, color: 'text-violet-600 bg-violet-100' },
    { label: 'Sitios Activos', value: activeTenants, icon: Globe, color: 'text-green-600 bg-green-100' },
    { label: 'Plantillas', value: totalTemplates, icon: Layout, color: 'text-blue-600 bg-blue-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1 text-sm">Bienvenido al panel de administración</p>
        </div>
        <Button onClick={() => navigate(ROUTES.TENANT_NEW)}>
          <Plus className="h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                {loadingTenants ? (
                  <Spinner size="sm" />
                ) : (
                  <p className="text-2xl font-bold text-slate-900">{value}</p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Clientes Recientes</h2>
            <button
              onClick={() => navigate(ROUTES.TENANTS)}
              className="text-sm text-violet-600 hover:text-violet-700 flex items-center gap-1"
            >
              Ver todos
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          {loadingTenants ? (
            <div className="flex justify-center py-8"><Spinner /></div>
          ) : recentTenants.length === 0 ? (
            <p className="text-sm text-slate-500 py-4 text-center">No hay clientes aún.</p>
          ) : (
            <div className="space-y-3">
              {recentTenants.map((tenant) => (
                <button
                  key={tenant.id}
                  onClick={() => navigate(ROUTES.TENANT_DETAIL(tenant.slug))}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: tenant.primaryColor }}
                    >
                      {tenant.brandName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{tenant.brandName}</p>
                      <p className="text-xs text-slate-500">{tenant.subdomain}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={tenant.isActive ? 'success' : 'default'}>
                      {tenant.isActive ? 'Activo' : 'Inactivo'}
                    </Badge>
                    <span className="text-xs text-slate-400">{formatDate(tenant.updatedAt)}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="font-semibold text-slate-900 mb-4">Acciones Rápidas</h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate(ROUTES.TENANT_NEW)}
              className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                <Plus className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Agregar Nuevo Cliente</p>
                <p className="text-xs text-slate-500">Crear un nuevo tenant con landing page</p>
              </div>
            </button>
            <button
              onClick={() => navigate(ROUTES.TEMPLATES)}
              className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Layout className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Explorar Plantillas</p>
                <p className="text-xs text-slate-500">Ver todas las plantillas disponibles</p>
              </div>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
