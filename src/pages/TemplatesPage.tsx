import { Layout, FileText } from 'lucide-react';
import { useTemplates } from '../hooks/use-templates';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';

export function TemplatesPage() {
  const { data: templates, isLoading } = useTemplates();

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Plantillas</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Explora las plantillas disponibles para tus landing pages
        </p>
      </div>

      {!templates || templates.length === 0 ? (
        <EmptyState
          icon={<Layout className="h-12 w-12" />}
          title="No hay plantillas"
          description="No se encontraron plantillas disponibles."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <div className="mb-4">
                {template.previewImageUrl ? (
                  <img
                    src={template.previewImageUrl}
                    alt={template.name}
                    className="w-full h-40 object-cover rounded-lg bg-slate-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-40 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Layout className="h-12 w-12 text-slate-300" />
                  </div>
                )}
              </div>

              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-slate-900">{template.name}</h3>
                <Badge variant={template.isActive ? 'success' : 'default'}>
                  {template.isActive ? 'Activa' : 'Inactiva'}
                </Badge>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Badge variant="info">{template.category}</Badge>
              </div>

              {template.description && (
                <p className="text-sm text-slate-500 mb-3">{template.description}</p>
              )}

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <FileText className="h-3.5 w-3.5" />
                <span>{template.availablePages?.length || 0} páginas disponibles</span>
              </div>

              {template.availablePages?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {template.availablePages.map((page) => (
                    <span key={page} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {page}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
