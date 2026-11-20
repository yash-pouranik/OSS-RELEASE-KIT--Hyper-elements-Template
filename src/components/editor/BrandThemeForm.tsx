'use client';

import React from 'react';
import { BrandTheme } from '@/theme/brand';

interface BrandThemeFormProps {
  theme: BrandTheme;
  onChange: (updated: BrandTheme) => void;
}

const PRESET_ACCENTS = [
  { name: 'Obsidian Black (Recommended)', hex: '#18181b', light: '#f4f4f5' },
  { name: 'Graphite Slate', hex: '#334155', light: '#f1f5f9' },
  { name: 'Pure White (Inverted)', hex: '#09090b', light: '#ffffff' },
  { name: 'Emerald Clean', hex: '#059669', light: '#ecfdf5' },
  { name: 'Amber Warmth', hex: '#d97706', light: '#fffbeb' },
  { name: 'Violet Accent', hex: '#7c3aed', light: '#f5f3ff' },
  { name: 'Crimson Minimal', hex: '#be123c', light: '#fff1f2' },
];

export default function BrandThemeForm({ theme, onChange }: BrandThemeFormProps) {
  const selectPreset = (preset: typeof PRESET_ACCENTS[0]) => {
    onChange({
      ...theme,
      primary: preset.hex,
      primaryHover: preset.hex,
      primaryLight: preset.light,
    });
  };

  const updateColor = (key: keyof BrandTheme, val: any) => {
    onChange({ ...theme, [key]: val });
  };

  return (
    <div className="space-y-5 text-sm">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
          Distinctive Brand Accent
        </label>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {PRESET_ACCENTS.map((preset) => (
            <button
              key={preset.hex}
              type="button"
              onClick={() => selectPreset(preset)}
              className={`flex items-center gap-2 px-3 py-2 rounded border text-xs font-medium transition-all ${
                theme.primary === preset.hex
                  ? 'border-white bg-zinc-800 text-white'
                  : 'border-[#26262b] bg-[#18181c] text-zinc-300 hover:border-zinc-500'
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full shadow-sm border border-zinc-700"
                style={{ backgroundColor: preset.hex }}
              />
              <span className="truncate">{preset.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="color"
            value={theme.primary}
            onChange={(e) => updateColor('primary', e.target.value)}
            className="w-10 h-9 rounded bg-[#18181c] border border-[#26262b] cursor-pointer"
          />
          <input
            type="text"
            value={theme.primary}
            onChange={(e) => updateColor('primary', e.target.value)}
            className="flex-1 bg-[#18181c] border border-[#26262b] rounded px-3 py-2 text-xs font-mono text-zinc-100 focus:outline-none focus:border-zinc-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#26262b]">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Page Background
          </label>
          <input
            type="text"
            value={theme.bgPage}
            onChange={(e) => updateColor('bgPage', e.target.value)}
            className="w-full bg-[#18181c] border border-[#26262b] rounded px-3 py-1.5 text-xs font-mono text-zinc-100 focus:outline-none focus:border-zinc-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Card Surface
          </label>
          <input
            type="text"
            value={theme.bgCard}
            onChange={(e) => updateColor('bgCard', e.target.value)}
            className="w-full bg-[#18181c] border border-[#26262b] rounded px-3 py-1.5 text-xs font-mono text-zinc-100 focus:outline-none focus:border-zinc-400"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-[#26262b]">
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
          Primary Font Stack (Poppins)
        </label>
        <input
          type="text"
          value={theme.fontFamily}
          onChange={(e) => updateColor('fontFamily', e.target.value)}
          className="w-full bg-[#18181c] border border-[#26262b] rounded px-3 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-400"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
          Monospace Code Font Stack
        </label>
        <input
          type="text"
          value={theme.fontMono}
          onChange={(e) => updateColor('fontMono', e.target.value)}
          className="w-full bg-[#18181c] border border-[#26262b] rounded px-3 py-1.5 text-xs font-mono text-zinc-100 focus:outline-none focus:border-zinc-400"
        />
      </div>
    </div>
  );
}
