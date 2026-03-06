import { useState } from 'react';
import { Button } from '../ui/Button';

interface ContentEditorProps {
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
}

export function ContentEditor({ value, onChange }: ContentEditorProps) {
  const [raw, setRaw] = useState(JSON.stringify(value, null, 2));
  const [error, setError] = useState('');

  const handleChange = (text: string) => {
    setRaw(text);
    try {
      const parsed = JSON.parse(text);
      setError('');
      onChange(parsed);
    } catch {
      setError('JSON inválido');
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(raw);
      setRaw(JSON.stringify(parsed, null, 2));
      setError('');
    } catch {
      setError('JSON inválido');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">Contenido (JSON)</label>
        <Button size="sm" variant="outline" type="button" onClick={handleFormat}>
          Formatear
        </Button>
      </div>
      <textarea
        value={raw}
        onChange={(e) => handleChange(e.target.value)}
        rows={12}
        className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
        placeholder="{}"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
