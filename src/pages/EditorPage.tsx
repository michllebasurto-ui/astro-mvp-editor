import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useTenant, useUpdateTenant } from '../hooks/use-tenants';
import { EditorToolbar, type DeviceSize } from '../components/editor/EditorToolbar';
import { PreviewFrame } from '../components/editor/PreviewFrame';
import { EditorSidebar } from '../components/editor/EditorSidebar';
import { FullPageSpinner } from '../components/ui/Spinner';

export function EditorPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: tenant, isLoading } = useTenant(slug!);
  const updateTenant = useUpdateTenant(slug!);

  const [device, setDevice] = useState<DeviceSize>('desktop');

  const [editorConfig, setEditorConfig] = useState({
    primaryColor: '#7c3aed',
    heroHeadline: '',
    heroSubheadline: '',
    showHero: true,
    showFeatures: true,
    showContact: true,
  });

  const sendMessage = useCallback((type: string, payload: unknown) => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe[title="Preview"]');
    iframe?.contentWindow?.postMessage({ type, payload }, '*');
  }, []);

  const handleSave = async () => {
    if (!tenant) return;
    try {
      await updateTenant.mutateAsync({ primaryColor: editorConfig.primaryColor });
      toast.success('Cambios guardados');
    } catch {
      toast.error('Error al guardar');
    }
  };

  if (isLoading) return <FullPageSpinner />;
  if (!tenant) return <div className="flex items-center justify-center h-screen text-slate-500">Cliente no encontrado</div>;

  const config = {
    ...editorConfig,
    primaryColor: tenant.primaryColor,
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <EditorToolbar
        tenantSlug={tenant.slug}
        brandName={tenant.brandName}
        device={device}
        onDeviceChange={setDevice}
        onSave={handleSave}
        isSaving={updateTenant.isPending}
      />
      <div className="flex-1 flex overflow-hidden">
        <PreviewFrame tenantSlug={tenant.slug} device={device} />
        <EditorSidebar
          config={config}
          onChange={setEditorConfig}
          onSendToPreview={sendMessage}
        />
      </div>
    </div>
  );
}
