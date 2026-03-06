import { ColorPicker } from '../tenants/ColorPicker';
import { Input } from '../ui/Input';

interface EditorConfig {
  primaryColor: string;
  heroHeadline: string;
  heroSubheadline: string;
  showHero: boolean;
  showFeatures: boolean;
  showContact: boolean;
}

interface EditorSidebarProps {
  config: EditorConfig;
  onChange: (config: EditorConfig) => void;
  onSendToPreview: (type: string, payload: unknown) => void;
}

export function EditorSidebar({ config, onChange, onSendToPreview }: EditorSidebarProps) {
  const update = <K extends keyof EditorConfig>(key: K, value: EditorConfig[K]) => {
    const newConfig = { ...config, [key]: value };
    onChange(newConfig);
    if (key === 'primaryColor') {
      onSendToPreview('UPDATE_COLORS', { primaryColor: value });
    } else {
      onSendToPreview('UPDATE_CONTENT', { [key]: value });
    }
  };

  return (
    <aside className="w-72 bg-white border-l border-slate-200 overflow-y-auto flex flex-col">
      <div className="px-4 py-3 border-b border-slate-200">
        <h2 className="text-sm font-semibold text-slate-900">Editor de diseño</h2>
      </div>

      <div className="flex-1 p-4 space-y-6">
        <section>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Colores</h3>
          <ColorPicker
            label="Color principal"
            value={config.primaryColor}
            onChange={(color) => update('primaryColor', color)}
          />
        </section>

        <section>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Hero</h3>
          <div className="space-y-3">
            <Input
              label="Título principal"
              value={config.heroHeadline}
              onChange={(e) => update('heroHeadline', e.target.value)}
              placeholder="Bienvenido a nuestra empresa"
            />
            <Input
              label="Subtítulo"
              value={config.heroSubheadline}
              onChange={(e) => update('heroSubheadline', e.target.value)}
              placeholder="La mejor solución para tu negocio"
            />
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Secciones visibles</h3>
          <div className="space-y-3">
            {([
              { key: 'showHero', label: 'Hero / Banner' },
              { key: 'showFeatures', label: 'Características' },
              { key: 'showContact', label: 'Contacto' },
            ] as const).map(({ key, label }) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-700">{label}</span>
                <button
                  type="button"
                  onClick={() => update(key, !config[key])}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    config[key] ? 'bg-violet-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                      config[key] ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
