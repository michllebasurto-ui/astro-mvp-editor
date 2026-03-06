import { Monitor, Tablet, Smartphone, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ROUTES } from '../../lib/constants';

export type DeviceSize = 'desktop' | 'tablet' | 'mobile';

interface EditorToolbarProps {
  tenantSlug: string;
  brandName: string;
  device: DeviceSize;
  onDeviceChange: (device: DeviceSize) => void;
  onSave: () => void;
  isSaving?: boolean;
}

export function EditorToolbar({
  tenantSlug,
  brandName,
  device,
  onDeviceChange,
  onSave,
  isSaving,
}: EditorToolbarProps) {
  const navigate = useNavigate();

  return (
    <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(ROUTES.TENANT_DETAIL(tenantSlug))}
          className="text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="font-semibold text-slate-900 text-sm">{brandName}</span>
      </div>

      <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
        {([
          { id: 'desktop', icon: Monitor },
          { id: 'tablet', icon: Tablet },
          { id: 'mobile', icon: Smartphone },
        ] as const).map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onDeviceChange(id)}
            className={`p-1.5 rounded-md transition-colors ${
              device === id
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>

      <Button size="sm" onClick={onSave} loading={isSaving}>
        <Save className="h-3.5 w-3.5" />
        Guardar
      </Button>
    </div>
  );
}
