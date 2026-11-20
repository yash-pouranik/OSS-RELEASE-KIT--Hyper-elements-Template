'use client';

import React from 'react';
import { FeatureItem } from '@/data/release';
import { Plus, Trash2, Code2 } from 'lucide-react';

interface FeaturesFormProps {
  features: FeatureItem[];
  onChange: (features: FeatureItem[]) => void;
}

export default function FeaturesForm({ features, onChange }: FeaturesFormProps) {
  const addFeature = () => {
    const newFeature: FeatureItem = {
      id: `feature-${Date.now()}`,
      title: 'New Feature Capability',
      description: 'Describe the developer benefits and implementation details here.',
      tag: 'New',
      codeSnippet: `import { NewComponent } from 'prism-ui';\n\n<NewComponent />`,
    };
    onChange([...features, newFeature]);
  };

  const updateFeature = (index: number, key: keyof FeatureItem, value: string) => {
    const updated = [...features];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  };

  const removeFeature = (index: number) => {
    onChange(features.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Key Features &amp; Changes ({features.length})
        </span>
        <button
          type="button"
          onClick={addFeature}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-zinc-200 text-black rounded-md text-xs font-semibold transition-colors shadow-sm"
        >
          <Plus size={14} /> Add Feature
        </button>
      </div>

      <div className="space-y-4">
        {features.map((feature, idx) => (
          <div
            key={feature.id}
            className="p-4 bg-[#18181c] border border-[#26262b] rounded-lg space-y-3 relative group"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => updateFeature(idx, 'title', e.target.value)}
                  className="w-full bg-[#121215] border border-[#26262b] rounded px-2.5 py-1.5 text-xs font-semibold text-zinc-100 focus:outline-none focus:border-zinc-400"
                  placeholder="Feature Title"
                />
              </div>

              <div className="w-32">
                <input
                  type="text"
                  value={feature.tag || ''}
                  onChange={(e) => updateFeature(idx, 'tag', e.target.value)}
                  className="w-full bg-[#121215] border border-[#26262b] rounded px-2 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-zinc-400"
                  placeholder="Tag (e.g. A11y)"
                />
              </div>

              <button
                type="button"
                onClick={() => removeFeature(idx)}
                className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                title="Delete Feature"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div>
              <textarea
                rows={2}
                value={feature.description}
                onChange={(e) => updateFeature(idx, 'description', e.target.value)}
                className="w-full bg-[#121215] border border-[#26262b] rounded px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-zinc-400 leading-relaxed"
                placeholder="Feature description and developer impact..."
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mb-1">
                <Code2 size={13} className="text-zinc-400" />
                <span>Code Example (Optional)</span>
              </div>
              <textarea
                rows={3}
                value={feature.codeSnippet || ''}
                onChange={(e) => updateFeature(idx, 'codeSnippet', e.target.value)}
                className="w-full bg-[#0d0d10] border border-[#26262b] rounded px-2.5 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none focus:border-zinc-400"
                placeholder="// code snippet..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
