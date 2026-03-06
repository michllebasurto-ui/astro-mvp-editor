import { useState } from 'react';
import { Plus, Edit, Trash2, FileText } from 'lucide-react';
import type { Page, PageCreate } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { PageForm } from './PageForm';
import { EmptyState } from '../ui/EmptyState';
import { useCreatePage, useUpdatePage, useDeletePage } from '../../hooks/use-pages';
import { toast } from 'sonner';

interface PageListProps {
  tenantId: number;
  pages: Page[];
}

export function PageList({ tenantId, pages }: PageListProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [deletingPage, setDeletingPage] = useState<Page | null>(null);

  const createPage = useCreatePage(tenantId);
  const updatePage = useUpdatePage(tenantId);
  const deletePage = useDeletePage(tenantId);

  const handleCreate = async (data: PageCreate) => {
    try {
      await createPage.mutateAsync(data);
      toast.success('Página creada correctamente');
      setShowCreateModal(false);
    } catch {
      toast.error('Error al crear la página');
    }
  };

  const handleUpdate = async (data: PageCreate) => {
    if (!editingPage) return;
    try {
      await updatePage.mutateAsync({ id: editingPage.id, data });
      toast.success('Página actualizada');
      setEditingPage(null);
    } catch {
      toast.error('Error al actualizar la página');
    }
  };

  const handleDelete = async () => {
    if (!deletingPage) return;
    try {
      await deletePage.mutateAsync(deletingPage.id);
      toast.success('Página eliminada');
      setDeletingPage(null);
    } catch {
      toast.error('Error al eliminar la página');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-slate-700">Páginas ({pages.length})</h3>
        <Button size="sm" onClick={() => setShowCreateModal(true)}>
          <Plus className="h-3.5 w-3.5" />
          Nueva página
        </Button>
      </div>

      {pages.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-8 w-8" />}
          title="Sin páginas"
          description="Agrega páginas a este cliente."
        />
      ) : (
        <div className="space-y-2">
          {pages.map((page) => (
            <div
              key={page.id}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{page.path}</p>
                  <p className="text-xs text-slate-500">{page.pageComponent} — {page.metaTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={page.isActive ? 'success' : 'default'}>
                  {page.isActive ? 'Activa' : 'Inactiva'}
                </Badge>
                <button
                  onClick={() => setEditingPage(page)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeletingPage(page)}
                  className="text-slate-400 hover:text-red-600 p-1 rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={showCreateModal} onClose={() => setShowCreateModal(false)} title="Nueva página">
        <PageForm
          onSubmit={handleCreate}
          onCancel={() => setShowCreateModal(false)}
          isLoading={createPage.isPending}
        />
      </Modal>

      <Modal open={!!editingPage} onClose={() => setEditingPage(null)} title="Editar página">
        {editingPage && (
          <PageForm
            defaultValues={editingPage}
            onSubmit={handleUpdate}
            onCancel={() => setEditingPage(null)}
            isLoading={updatePage.isPending}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={!!deletingPage}
        onClose={() => setDeletingPage(null)}
        onConfirm={handleDelete}
        title="Eliminar página"
        description={`¿Estás seguro de eliminar la página "${deletingPage?.path}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        loading={deletePage.isPending}
      />
    </div>
  );
}
