import { useState } from 'react';
import { Input } from '../ui/Input';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  error?: string;
}

const presetColors = [
  '#7c3aed', '#2563eb', '#0891b2', '#059669',
  '#ca8a04', '#dc2626', '#db2777', '#ea580c',
];

export function ColorPicker({ value, onChange, label, error }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => { onChange(e.target.value); setInputValue(e.target.value); }}
          className="h-10 w-12 rounded-lg border border-slate-300 cursor-pointer p-0.5"
        />
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="#7c3aed"
          className="font-mono text-sm"
          error={error}
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {presetColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => { onChange(color); setInputValue(color); }}
            className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
            style={{
              backgroundColor: color,
              borderColor: value === color ? 'white' : 'transparent',
              boxShadow: value === color ? `0 0 0 2px ${color}` : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}
