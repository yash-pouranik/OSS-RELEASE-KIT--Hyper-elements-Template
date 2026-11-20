'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  RotateCcw,
  DownloadCloud,
  Sliders,
  ListPlus,
  AlertTriangle,
  Palette,
  Terminal,
} from 'lucide-react';
import { defaultReleaseData } from '@/data/defaultRelease';
import { defaultBrandTheme, BrandTheme } from '@/theme/brand';
import { ReleaseData } from '@/data/release';
import ReleaseDetailsForm from '@/components/editor/ReleaseDetailsForm';
import FeaturesForm from '@/components/editor/FeaturesForm';
import BreakingChangesForm from '@/components/editor/BreakingChangesForm';
import BrandThemeForm from '@/components/editor/BrandThemeForm';
import LivePreviewPane from '@/components/preview/LivePreviewPane';

type EditorTab = 'details' | 'features' | 'breaking' | 'theme';

export default function StudioDashboard() {
  const [release, setRelease] = useState<ReleaseData>(defaultReleaseData);
  const [theme, setTheme] = useState<BrandTheme>(defaultBrandTheme);
  const [activeTab, setActiveTab] = useState<EditorTab>('details');
  const [exportingAll, setExportingAll] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleReset = () => {
    setRelease(defaultReleaseData);
    setTheme(defaultBrandTheme);
    showToast('Reset to canonical Prism UI v2.0.0 sample data.');
  };

  const handleExportAll = async () => {
    setExportingAll(true);
    showToast('Exporting all 4 formats (Email, Page, PDF, Social PNG)...');

    try {
      // Trigger download of Email HTML
      const emailRes = await fetch('/api/render?format=email&download=true');
      const emailBlob = await emailRes.blob();
      const emailUrl = URL.createObjectURL(emailBlob);
      const a1 = document.createElement('a');
      a1.href = emailUrl;
      a1.download = `${release.projectName.toLowerCase()}-v${release.version}-announcement.html`;
      a1.click();
      URL.revokeObjectURL(emailUrl);

      // Trigger download of Web Page HTML
      const pageRes = await fetch('/api/render?format=page&download=true');
      const pageBlob = await pageRes.blob();
      const pageUrl = URL.createObjectURL(pageBlob);
      const a2 = document.createElement('a');
      a2.href = pageUrl;
      a2.download = `${release.projectName.toLowerCase()}-v${release.version}-page.html`;
      a2.click();
      URL.revokeObjectURL(pageUrl);

      // Trigger download of PDF Guide
      const docRes = await fetch('/api/render?format=document&type=pdf&download=true');
      const docBlob = await docRes.blob();
      const docUrl = URL.createObjectURL(docBlob);
      const a3 = document.createElement('a');
      a3.href = docUrl;
      a3.download = `${release.projectName.toLowerCase()}-v${release.version}-migration-guide.pdf`;
      a3.click();
      URL.revokeObjectURL(docUrl);

      // Trigger download of Social PNG
      const canvasRes = await fetch('/api/render?format=canvas&type=png&download=true');
      const canvasBlob = await canvasRes.blob();
      const canvasUrl = URL.createObjectURL(canvasBlob);
      const a4 = document.createElement('a');
      a4.href = canvasUrl;
      a4.download = `${release.projectName.toLowerCase()}-v${release.version}-social-card.png`;
      a4.click();
      URL.revokeObjectURL(canvasUrl);

      showToast('All 4 release deliverables exported successfully!');
    } catch (err) {
      console.error(err);
      showToast('Failed to export all files.');
    } finally {
      setExportingAll(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#f4f4f5]">
      {/* Top Navbar in Neutral Near-Black (#121215) with crisp border (#26262b) */}
      <header className="bg-[#121215] border-b border-[#26262b] px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3.5">
          <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold shadow-sm">
            <Terminal size={17} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm tracking-tight text-white">OSS Release Kit</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#1e1e24] text-zinc-300 border border-[#2e2e36]">
                Hyper Elements 0.5
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              One dataset. Four professional formats: Email • Web Page • PDF Guide • Social Canvas
            </p>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#18181c] hover:bg-[#222227] border border-[#26262b] rounded-lg text-xs font-medium text-zinc-300 hover:text-white transition-colors"
          >
            <RotateCcw size={13} />
            <span>Reset Demo (Prism UI)</span>
          </button>

          <button
            type="button"
            onClick={handleExportAll}
            disabled={exportingAll}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-white hover:bg-zinc-200 disabled:opacity-50 text-black rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            <DownloadCloud size={14} className={exportingAll ? 'animate-bounce' : ''} />
            <span>{exportingAll ? 'Exporting Package...' : 'Export All 4 Outputs'}</span>
          </button>
        </div>
      </header>

      {/* Main Studio Workspace */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* LEFT COLUMN: FOCUSED RELEASE EDITOR (5 Cols) in Neutral Near-Black (#121215) */}
        <div className="lg:col-span-5 bg-[#121215] border-r border-[#26262b] flex flex-col h-[calc(100vh-61px)]">
          {/* Editor Tabs Navigation in Deep Neutral Black (#0d0d10) */}
          <div className="border-b border-[#26262b] bg-[#0d0d10] px-3 pt-2 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-t-2 ${
                activeTab === 'details'
                  ? 'bg-[#18181c] text-white border-white'
                  : 'text-zinc-400 hover:text-zinc-200 border-transparent'
              }`}
            >
              <Sliders size={13} />
              <span>Project Details</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('features')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-t-2 ${
                activeTab === 'features'
                  ? 'bg-[#18181c] text-white border-white'
                  : 'text-zinc-400 hover:text-zinc-200 border-transparent'
              }`}
            >
              <ListPlus size={13} />
              <span>Features ({release.features.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('breaking')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-t-2 ${
                activeTab === 'breaking'
                  ? 'bg-[#18181c] text-rose-300 border-rose-500'
                  : 'text-zinc-400 hover:text-zinc-200 border-transparent'
              }`}
            >
              <AlertTriangle size={13} />
              <span>Breaking Changes</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('theme')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-t-2 ${
                activeTab === 'theme'
                  ? 'bg-[#18181c] text-white border-white'
                  : 'text-zinc-400 hover:text-zinc-200 border-transparent'
              }`}
            >
              <Palette size={13} />
              <span>Brand Theme</span>
            </button>
          </div>

          {/* Editor Form Content Area */}
          <div className="flex-1 p-5 overflow-y-auto">
            {activeTab === 'details' && (
              <ReleaseDetailsForm data={release} onChange={setRelease} />
            )}
            {activeTab === 'features' && (
              <FeaturesForm features={release.features} onChange={(f) => setRelease({ ...release, features: f })} />
            )}
            {activeTab === 'breaking' && (
              <BreakingChangesForm
                breakingChanges={release.breakingChanges}
                onChange={(bc) => setRelease({ ...release, breakingChanges: bc })}
              />
            )}
            {activeTab === 'theme' && (
              <BrandThemeForm theme={theme} onChange={setTheme} />
            )}
          </div>

          {/* Quick Info Footer Bar */}
          <div className="p-3 bg-[#0d0d10] border-t border-[#26262b] flex items-center justify-between text-[11px] text-zinc-500">
            <span>Canonical Model: src/data/release.ts</span>
            <span className="font-mono text-zinc-300">Prism UI v{release.version}</span>
          </div>
        </div>

        {/* RIGHT COLUMN: MULTI-FORMAT LIVE STUDIO PREVIEW (7 Cols) in Core Near-Black (#09090b) */}
        <div className="lg:col-span-7 bg-[#09090b] p-4 flex flex-col h-[calc(100vh-61px)] overflow-hidden">
          <LivePreviewPane release={release} theme={theme} />
        </div>
      </main>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#18181c] text-white border border-zinc-700 px-4 py-2.5 rounded-lg shadow-2xl flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-bottom-2">
          <Sparkles size={14} className="text-zinc-300" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
