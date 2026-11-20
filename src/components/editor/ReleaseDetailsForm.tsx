'use client';

import React from 'react';
import { ReleaseData, ReleaseType } from '@/data/release';

interface ReleaseDetailsFormProps {
  data: ReleaseData;
  onChange: (updated: ReleaseData) => void;
}

export default function ReleaseDetailsForm({ data, onChange }: ReleaseDetailsFormProps) {
  const updateField = (field: keyof ReleaseData, val: any) => {
    onChange({ ...data, [field]: val });
  };

  const updateInstallation = (pm: 'npm' | 'pnpm' | 'yarn' | 'bun', val: string) => {
    onChange({
      ...data,
      installation: { ...data.installation, [pm]: val },
    });
  };

  const updateLink = (key: keyof ReleaseData['links'], val: string) => {
    onChange({
      ...data,
      links: { ...data.links, [key]: val },
    });
  };

  return (
    <div className="space-y-5 text-sm">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Project Name
          </label>
          <input
            type="text"
            value={data.projectName}
            onChange={(e) => updateField('projectName', e.target.value)}
            className="w-full bg-[#18181c] border border-[#26262b] rounded-md px-3 py-2 text-zinc-100 focus:outline-none focus:border-zinc-400"
            placeholder="e.g. Prism UI"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Version
          </label>
          <input
            type="text"
            value={data.version}
            onChange={(e) => updateField('version', e.target.value)}
            className="w-full bg-[#18181c] border border-[#26262b] rounded-md px-3 py-2 text-zinc-100 font-mono focus:outline-none focus:border-zinc-400"
            placeholder="2.0.0"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Release Type
          </label>
          <select
            value={data.releaseType}
            onChange={(e) => updateField('releaseType', e.target.value as ReleaseType)}
            className="w-full bg-[#18181c] border border-[#26262b] rounded-md px-3 py-2 text-zinc-100 focus:outline-none focus:border-zinc-400"
          >
            <option value="major">Major (vX.0.0)</option>
            <option value="minor">Minor (vX.Y.0)</option>
            <option value="patch">Patch (vX.Y.Z)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Release Date
          </label>
          <input
            type="text"
            value={data.releaseDate}
            onChange={(e) => updateField('releaseDate', e.target.value)}
            className="w-full bg-[#18181c] border border-[#26262b] rounded-md px-3 py-2 text-zinc-100 focus:outline-none focus:border-zinc-400"
            placeholder="November 20, 2026"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
          Tagline
        </label>
        <input
          type="text"
          value={data.tagline}
          onChange={(e) => updateField('tagline', e.target.value)}
          className="w-full bg-[#18181c] border border-[#26262b] rounded-md px-3 py-2 text-zinc-100 focus:outline-none focus:border-zinc-400 font-medium"
          placeholder="e.g. Build better interfaces, faster."
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
          Executive Summary / Release Notes
        </label>
        <textarea
          rows={4}
          value={data.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          className="w-full bg-[#18181c] border border-[#26262b] rounded-md px-3 py-2 text-zinc-100 focus:outline-none focus:border-zinc-400 text-xs leading-relaxed"
          placeholder="Detailed release narrative..."
        />
      </div>

      {/* Installation Commands */}
      <div className="pt-2 border-t border-[#26262b]">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3">
          Package Installation Commands
        </h4>
        <div className="space-y-3">
          <div>
            <span className="text-[11px] text-zinc-400 font-mono">npm</span>
            <input
              type="text"
              value={data.installation.npm}
              onChange={(e) => updateInstallation('npm', e.target.value)}
              className="w-full bg-[#18181c] border border-[#26262b] rounded-md px-3 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none focus:border-zinc-400 mt-1"
            />
          </div>
          <div>
            <span className="text-[11px] text-zinc-400 font-mono">pnpm</span>
            <input
              type="text"
              value={data.installation.pnpm}
              onChange={(e) => updateInstallation('pnpm', e.target.value)}
              className="w-full bg-[#18181c] border border-[#26262b] rounded-md px-3 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none focus:border-zinc-400 mt-1"
            />
          </div>
        </div>
      </div>

      {/* External Links */}
      <div className="pt-2 border-t border-[#26262b]">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3">
          Documentation &amp; Repository Links
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-zinc-400 mb-1">Docs URL</label>
            <input
              type="text"
              value={data.links.documentation}
              onChange={(e) => updateLink('documentation', e.target.value)}
              className="w-full bg-[#18181c] border border-[#26262b] rounded-md px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-400"
            />
          </div>
          <div>
            <label className="block text-[11px] text-zinc-400 mb-1">GitHub Repo</label>
            <input
              type="text"
              value={data.links.github}
              onChange={(e) => updateLink('github', e.target.value)}
              className="w-full bg-[#18181c] border border-[#26262b] rounded-md px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
