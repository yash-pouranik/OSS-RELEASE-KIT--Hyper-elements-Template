'use client';

import React from 'react';
import { BreakingChange } from '@/data/release';
import { Plus, Trash2, AlertTriangle } from 'lucide-react';

interface BreakingChangesFormProps {
  breakingChanges: BreakingChange[];
  onChange: (changes: BreakingChange[]) => void;
}

export default function BreakingChangesForm({
  breakingChanges,
  onChange,
}: BreakingChangesFormProps) {
  const addChange = () => {
    const newChange: BreakingChange = {
      id: `break-${Date.now()}`,
      title: 'Renamed API / Import Pattern',
      description: 'Describe the breaking change and reason for the update.',
      beforeCode: `// v1.x\n<OldComponent legacyProp={true} />`,
      afterCode: `// v2.0\n<NewComponent standardProp={true} />`,
      migrationNote: 'Update with automated codemod: npx @project/codemod upgrade',
    };
    onChange([...breakingChanges, newChange]);
  };

  const updateChange = (index: number, key: keyof BreakingChange, value: string) => {
    const updated = [...breakingChanges];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  };

  const removeChange = (index: number) => {
    onChange(breakingChanges.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 text-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle size={15} className="text-rose-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Breaking Changes &amp; Migration Guide ({breakingChanges.length})
          </span>
        </div>
        <button
          type="button"
          onClick={addChange}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-md text-xs font-semibold transition-colors shadow-sm"
        >
          <Plus size={14} /> Add Migration Step
        </button>
      </div>

      <div className="space-y-4">
        {breakingChanges.map((change, idx) => (
          <div
            key={change.id}
            className="p-4 bg-[#18181c] border border-[#26262b] rounded-lg space-y-3"
          >
            <div className="flex items-center justify-between gap-3">
              <input
                type="text"
                value={change.title}
                onChange={(e) => updateChange(idx, 'title', e.target.value)}
                className="w-full bg-[#121215] border border-[#26262b] rounded px-2.5 py-1.5 text-xs font-semibold text-rose-300 focus:outline-none focus:border-rose-400"
                placeholder="Breaking Change Title"
              />
              <button
                type="button"
                onClick={() => removeChange(idx)}
                className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                title="Remove"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div>
              <textarea
                rows={2}
                value={change.description}
                onChange={(e) => updateChange(idx, 'description', e.target.value)}
                className="w-full bg-[#121215] border border-[#26262b] rounded px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-zinc-400 leading-relaxed"
                placeholder="Why was this broken / changed?"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-rose-400 mb-1">
                  Before (v1.x)
                </label>
                <textarea
                  rows={3}
                  value={change.beforeCode}
                  onChange={(e) => updateChange(idx, 'beforeCode', e.target.value)}
                  className="w-full bg-[#0d0d10] border border-rose-950/70 rounded px-2.5 py-1.5 text-xs font-mono text-rose-300 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-emerald-400 mb-1">
                  After (v2.0)
                </label>
                <textarea
                  rows={3}
                  value={change.afterCode}
                  onChange={(e) => updateChange(idx, 'afterCode', e.target.value)}
                  className="w-full bg-[#0d0d10] border border-emerald-950/70 rounded px-2.5 py-1.5 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-zinc-400 mb-1">
                Automated Migration Instruction / Codemod
              </label>
              <input
                type="text"
                value={change.migrationNote}
                onChange={(e) => updateChange(idx, 'migrationNote', e.target.value)}
                className="w-full bg-[#121215] border border-[#26262b] rounded px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-400"
                placeholder="e.g. Use npx @prism-ui/codemod to update automatically."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
