import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, Download, Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTenant, useUpdateTenant, useDeleteTenant, useExportTenant } from '../hooks/use-tenants';
import { useTemplates } from '../hooks/use-templates';
import { PageList } from '../components/pages/PageList';
import { TenantForm } from '../components/tenants/TenantForm';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { FullPageSpinner } from '../components/ui/Spinner';
import { ROUTES } from '../lib/constants';
import type { TenantCreate } from '../types';

export function TenantDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'config' | 'pages'>('config');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: tenant, isLoading } = useTenant(slug!);
  const { data: templates } = useTemplates();
  const updateTenant = useUpdateTenant(slug!);
  const deleteTenant = useDeleteTenant();
  const exportTenant = useExportTenant();

  if (isLoading) return <FullPageSpinner />;
  if (!tenant) return <div className="text-center text-slate-500 py-16">Cliente no encontrado</div>;

  const handleUpdate = async (data: TenantCreate) => {
    try {
      await updateTenant.mutateAsync(data);
      toast.success('Cliente actualizado');
      setShowEditModal(false);
    } catch {
      toast.error('Error al actualizar');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTenant.mutateAsync(tenant.slug);
      toast.success('Cliente eliminado');
      navigate(ROUTES.TENANTS);
    } catch {
      toast.error('Error al eliminar');
    }
  };

  const handleExport = async () => {
    try {
      const blob = await exportTenant.mutateAsync(tenant.slug);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${tenant.slug}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Exportado correctamente');
    } catch {
      toast.error('Error al exportar');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(ROUTES.TENANTS)}
            className="text-slate-500 hover:text-slate-900 transition-colors mt-1"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: tenant.primaryColor }}
              >
                {tenant.brandName.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{tenant.brandName}</h1>
                <p className="text-sm text-slate-500">{tenant.subdomain}</p>
              </div>
              <Badge variant={tenant.isActive ? 'success' : 'default'}>
                {tenant.isActive ? 'Activo' : 'Inactivo'}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(ROUTES.TENANT_EDITOR(tenant.slug))}
          >
            <Eye className="h-3.5 w-3.5" />
            Editor Visual
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleExport}
            loading={exportTenant.isPending}
          >
            <Download className="h-3.5 w-3.5" />
            Exportar
          </Button>
          <Button
            size="sm"
            onClick={() => setShowEditModal(true)}
          >
            <Edit3 className="h-3.5 w-3.5" />
            Editar
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="flex gap-1 border-b border-slate-200">
        {([
          { id: 'config', label: 'Configuración' },
          { id: 'pages', label: `Páginas (${tenant.pages?.length || 0})` },
        ] as const).map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === id
                ? 'border-violet-600 text-violet-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'config' && (
        <Card>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Plantilla', value: tenant.templatePath },
                { label: 'Slug', value: tenant.slug },
                { label: 'Subdominio', value: tenant.subdomain },
                { label: 'WhatsApp', value: tenant.whatsapp || '—' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-slate-900">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Footer</p>
              <p className="text-sm text-slate-900">{tenant.footerText}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Color principal</p>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-md border border-slate-200"
                  style={{ backgroundColor: tenant.primaryColor }}
                />
                <span className="text-sm font-mono text-slate-900">{tenant.primaryColor}</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'pages' && (
        <Card>
          <PageList tenantId={tenant.id} pages={tenant.pages || []} />
        </Card>
      )}

      <Modal open={showEditModal} onClose={() => setShowEditModal(false)} title="Editar cliente" size="lg">
        <TenantForm
          defaultValues={tenant}
          templates={templates}
          onSubmit={handleUpdate}
          isLoading={updateTenant.isPending}
        />
      </Modal>

      <ConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Eliminar cliente"
        description={`¿Estás seguro de eliminar "${tenant.brandName}"? Se eliminarán todos sus datos y páginas.`}
        confirmLabel="Eliminar"
        loading={deleteTenant.isPending}
      />
    </div>
  );
}
