import { useEffect, useState } from 'react';
import { ASTRO_URL } from '../../lib/constants';
import type { DeviceSize } from './EditorToolbar';

interface PreviewFrameProps {
  tenantSlug: string;
  device: DeviceSize;
  onReady?: () => void;
}

const deviceWidths = {
  desktop: '100%',
  tablet: '768px',
  mobile: '390px',
};

export function PreviewFrame({ tenantSlug, device, onReady }: PreviewFrameProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'PREVIEW_READY') {
        setLoaded(true);
        onReady?.();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onReady]);

  return (
    <div className="flex-1 bg-slate-200 flex items-start justify-center p-4 overflow-auto">
      <div
        className="bg-white shadow-xl transition-all duration-300 relative"
        style={{ width: deviceWidths[device], maxWidth: '100%' }}
      >
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
            <p className="text-slate-500 text-sm">Cargando preview...</p>
          </div>
        )}
        <iframe
          src={`${ASTRO_URL}/preview?tenant=${tenantSlug}`}
          className="w-full h-screen border-0"
          title="Preview"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}

export type { PreviewFrameProps };
