import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { useTenants } from '../hooks/use-tenants';
import { TenantList } from '../components/tenants/TenantList';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../lib/constants';

export function TenantsPage() {
  const navigate = useNavigate();
  const { data: tenants, isLoading } = useTenants();
  const [search, setSearch] = useState('');
  const [filterTemplate, setFilterTemplate] = useState('');

  const templates = [...new Set(tenants?.map((t) => t.templatePath) || [])];

  const filtered = (tenants || []).filter((t) => {
    const matchSearch = t.brandName.toLowerCase().includes(search.toLowerCase()) ||
      t.subdomain.toLowerCase().includes(search.toLowerCase());
    const matchTemplate = !filterTemplate || t.templatePath === filterTemplate;
    return matchSearch && matchTemplate;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clientes</h1>
          <p className="text-slate-500 mt-1 text-sm">
            {tenants?.length || 0} clientes en total
          </p>
        </div>
        <Button onClick={() => navigate(ROUTES.TENANT_NEW)}>
          <Plus className="h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <select
          value={filterTemplate}
          onChange={(e) => setFilterTemplate(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Todas las plantillas</option>
          {templates.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <TenantList tenants={filtered} isLoading={isLoading} />
    </div>
  );
}
