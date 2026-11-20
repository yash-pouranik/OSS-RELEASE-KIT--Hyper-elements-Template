'use client';

import React, { useState, useEffect } from 'react';
import {
  Mail,
  Globe,
  FileText,
  Image as ImageIcon,
  Download,
  Smartphone,
  Tablet,
  Monitor,
  Code2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Layers,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { ReleaseData } from '@/data/release';
import { BrandTheme } from '@/theme/brand';

export type OutputFormat = 'email' | 'page' | 'document' | 'canvas';
export type ViewportSize = 'desktop' | 'tablet' | 'mobile';
export type ViewTab = 'preview' | 'outline' | 'code' | 'diagnostics';

interface LivePreviewPaneProps {
  release: ReleaseData;
  theme: BrandTheme;
}

export default function LivePreviewPane({ release, theme }: LivePreviewPaneProps) {
  const [format, setFormat] = useState<OutputFormat>('email');
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [viewTab, setViewTab] = useState<ViewTab>('preview');
  const [loading, setLoading] = useState(false);
  const [emailClientMode, setEmailClientMode] = useState<'standard' | 'gmail' | 'outlook'>('standard');

  const [renderedData, setRenderedData] = useState<{
    html?: string;
    text?: string;
    outline?: string;
    diagnostics?: any[];
    pdfBase64?: string;
    imageBase64?: string;
    valid?: boolean;
  }>({});

  const fetchRender = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ release, theme, format }),
      });
      const data = await res.json();
      if (data.success) {
        setRenderedData(data);
      }
    } catch (err) {
      console.error('Failed to render:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRender();
    }, 250);
    return () => clearTimeout(timer);
  }, [release, theme, format]);

  // Real file download trigger
  const handleDownload = () => {
    if (format === 'email') {
      const blob = new Blob([renderedData.html || ''], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${release.projectName.toLowerCase().replace(/\s+/g, '-')}-v${release.version}-announcement.html`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'page') {
      const blob = new Blob([renderedData.html || ''], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${release.projectName.toLowerCase().replace(/\s+/g, '-')}-v${release.version}-release.html`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'document') {
      if (renderedData.pdfBase64) {
        const byteCharacters = atob(renderedData.pdfBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${release.projectName.toLowerCase().replace(/\s+/g, '-')}-v${release.version}-guide.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        const blob = new Blob([renderedData.html || ''], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${release.projectName.toLowerCase().replace(/\s+/g, '-')}-v${release.version}-guide.html`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } else if (format === 'canvas') {
      if (renderedData.imageBase64) {
        const byteCharacters = atob(renderedData.imageBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${release.projectName.toLowerCase().replace(/\s+/g, '-')}-v${release.version}-social.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    }
  };

  const viewportWidth = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  }[viewport];

  return (
    <div className="flex flex-col h-full bg-[#121215] border border-[#26262b] rounded-xl overflow-hidden shadow-2xl">
      {/* Top Format Selector Header in Deep Neutral Black (#0d0d10) */}
      <div className="bg-[#0d0d10] border-b border-[#26262b] p-3 flex flex-wrap items-center justify-between gap-3">
        {/* Format Tabs in Neutral Palette */}
        <div className="flex items-center gap-1.5 p-1 bg-[#18181c] rounded-lg border border-[#26262b]">
          <button
            type="button"
            onClick={() => setFormat('email')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              format === 'email'
                ? 'bg-white text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Mail size={14} />
            <span>Email</span>
            <span className="text-[10px] opacity-60 font-mono">&lt;Email&gt;</span>
          </button>

          <button
            type="button"
            onClick={() => setFormat('page')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              format === 'page'
                ? 'bg-white text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Globe size={14} />
            <span>Web Page</span>
            <span className="text-[10px] opacity-60 font-mono">&lt;Page&gt;</span>
          </button>

          <button
            type="button"
            onClick={() => setFormat('document')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              format === 'document'
                ? 'bg-white text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <FileText size={14} />
            <span>PDF Guide</span>
            <span className="text-[10px] opacity-60 font-mono">&lt;Document&gt;</span>
          </button>

          <button
            type="button"
            onClick={() => setFormat('canvas')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              format === 'canvas'
                ? 'bg-white text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ImageIcon size={14} />
            <span>Social Canvas</span>
            <span className="text-[10px] opacity-60 font-mono">1200×630</span>
          </button>
        </div>

        {/* View Controls & Export Action */}
        <div className="flex items-center gap-2">
          {/* Viewport Switcher */}
          {(format === 'email' || format === 'page') && (
            <div className="flex items-center bg-[#18181c] border border-[#26262b] rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setViewport('desktop')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewport === 'desktop' ? 'bg-[#27272a] text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title="Desktop View (100%)"
              >
                <Monitor size={14} />
              </button>
              <button
                type="button"
                onClick={() => setViewport('tablet')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewport === 'tablet' ? 'bg-[#27272a] text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title="Tablet View (768px)"
              >
                <Tablet size={14} />
              </button>
              <button
                type="button"
                onClick={() => setViewport('mobile')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewport === 'mobile' ? 'bg-[#27272a] text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title="Mobile View (375px)"
              >
                <Smartphone size={14} />
              </button>
            </div>
          )}

          {/* Email Client Simulator pill */}
          {format === 'email' && (
            <div className="flex items-center gap-1 bg-[#18181c] border border-[#26262b] rounded-lg px-2.5 py-1 text-xs">
              <span className="text-[11px] text-zinc-400">Client:</span>
              <select
                value={emailClientMode}
                onChange={(e) => setEmailClientMode(e.target.value as any)}
                className="bg-transparent text-zinc-200 text-xs focus:outline-none cursor-pointer"
              >
                <option value="standard" className="bg-[#121215]">Standard</option>
                <option value="gmail" className="bg-[#121215]">Gmail Web</option>
                <option value="outlook" className="bg-[#121215]">Outlook App</option>
              </select>
            </div>
          )}

          {/* Refresh Action */}
          <button
            type="button"
            onClick={fetchRender}
            className="p-1.5 bg-[#18181c] hover:bg-[#222227] border border-[#26262b] rounded-lg text-zinc-300 hover:text-white transition-colors"
            title="Refresh Render"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin text-zinc-200' : ''} />
          </button>

          {/* Direct Download Action Button */}
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-zinc-100 hover:bg-white text-black rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <Download size={14} />
            <span>
              Export {format === 'email' ? 'HTML' : format === 'page' ? 'HTML' : format === 'document' ? 'PDF' : 'PNG'}
            </span>
          </button>
        </div>
      </div>

      {/* Sub-bar: View Tabs (Visual, Outline, Code, Diagnostics) */}
      <div className="bg-[#121215] border-b border-[#26262b] px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setViewTab('preview')}
            className={`flex items-center gap-1.5 pb-0.5 border-b-2 font-medium transition-colors ${
              viewTab === 'preview'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Eye size={13} /> Visual Output
          </button>

          <button
            type="button"
            onClick={() => setViewTab('outline')}
            className={`flex items-center gap-1.5 pb-0.5 border-b-2 font-medium transition-colors ${
              viewTab === 'outline'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers size={13} /> Elements Outline
          </button>

          <button
            type="button"
            onClick={() => setViewTab('code')}
            className={`flex items-center gap-1.5 pb-0.5 border-b-2 font-medium transition-colors ${
              viewTab === 'code'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Code2 size={13} /> Raw Output
          </button>

          <button
            type="button"
            onClick={() => setViewTab('diagnostics')}
            className={`flex items-center gap-1.5 pb-0.5 border-b-2 font-medium transition-colors ${
              viewTab === 'diagnostics'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles size={13} /> Diagnostics
            {renderedData.diagnostics && renderedData.diagnostics.length > 0 && (
              <span className="px-1.5 py-0.2 bg-zinc-800 text-zinc-300 rounded text-[10px] border border-zinc-700">
                {renderedData.diagnostics.length}
              </span>
            )}
          </button>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2">
          {renderedData.valid !== false ? (
            <span className="flex items-center gap-1 text-[11px] text-zinc-300 font-medium">
              <CheckCircle2 size={13} className="text-emerald-400" /> Validated Template
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] text-red-400 font-medium">
              <AlertCircle size={13} /> Template Errors Found
            </span>
          )}
        </div>
      </div>

      {/* Main Preview Container in Core Near-Black (#09090b) */}
      <div className="flex-1 bg-[#09090b] overflow-auto p-4 flex items-start justify-center">
        {loading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-10">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#18181c] border border-[#26262b] rounded-lg shadow-xl text-xs font-semibold text-zinc-200">
              <RefreshCw size={14} className="animate-spin text-zinc-300" />
              <span>Rendering {format.toUpperCase()}...</span>
            </div>
          </div>
        )}

        {/* 1. VISUAL PREVIEW TAB */}
        {viewTab === 'preview' && (
          <div
            className="preview-iframe-wrapper w-full flex justify-center transition-all duration-300"
            style={{ maxWidth: viewportWidth }}
          >
            {/* EMAIL OR WEB PAGE PREVIEW */}
            {(format === 'email' || format === 'page') && renderedData.html && (
              <div
                className={`w-full bg-white rounded-lg shadow-2xl overflow-hidden border border-[#26262b] ${
                  emailClientMode === 'gmail'
                    ? 'ring-2 ring-zinc-700'
                    : emailClientMode === 'outlook'
                    ? 'ring-2 ring-zinc-700'
                    : ''
                }`}
              >
                {/* Simulated Email Client Browser Chrome */}
                {format === 'email' && (
                  <div className="bg-[#f4f4f5] border-b border-zinc-300 px-4 py-2 text-xs text-zinc-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
                      <span className="ml-2 font-mono text-[11px] text-zinc-600">
                        {emailClientMode === 'gmail'
                          ? 'Gmail Web App Preview'
                          : emailClientMode === 'outlook'
                          ? 'Outlook Desktop Simulator'
                          : 'Email Client Standard Preview'}
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-500">Width: 600px Max</span>
                  </div>
                )}

                <iframe
                  title="Live Hyper Elements Preview"
                  srcDoc={renderedData.html}
                  className="w-full min-h-[750px] border-none bg-white"
                  sandbox="allow-same-origin"
                />
              </div>
            )}

            {/* DOCUMENT / PDF PREVIEW */}
            {format === 'document' && (
              <div className="w-full max-w-[850px] flex flex-col items-center gap-4">
                {renderedData.pdfBase64 ? (
                  <div className="w-full bg-[#18181c] border border-[#26262b] rounded-lg overflow-hidden shadow-2xl">
                    <div className="bg-[#121215] border-b border-[#26262b] px-4 py-2.5 flex items-center justify-between text-xs text-zinc-300">
                      <span className="font-semibold flex items-center gap-2">
                        <FileText size={14} className="text-zinc-400" />
                        Prism UI Specification PDF (2-Page Printable Document)
                      </span>
                      <button
                        type="button"
                        onClick={handleDownload}
                        className="px-2.5 py-1 bg-white hover:bg-zinc-200 text-black rounded text-[11px] font-semibold transition-colors"
                      >
                        Download PDF
                      </button>
                    </div>
                    <iframe
                      src={`data:application/pdf;base64,${renderedData.pdfBase64}`}
                      className="w-full h-[850px] border-none bg-white"
                      title="PDF Preview"
                    />
                  </div>
                ) : (
                  <div className="w-full bg-white rounded-lg shadow-2xl overflow-hidden border border-zinc-300">
                    <div className="bg-zinc-100 border-b border-zinc-200 px-4 py-2 text-xs text-zinc-600">
                      Print-Ready Document HTML Preview
                    </div>
                    <iframe
                      srcDoc={renderedData.html}
                      className="w-full min-h-[850px] border-none bg-white"
                      title="Print HTML Preview"
                    />
                  </div>
                )}
              </div>
            )}

            {/* CANVAS / SOCIAL GRAPHIC PREVIEW */}
            {format === 'canvas' && (
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="max-w-[1000px] w-full rounded-xl overflow-hidden shadow-2xl border border-[#26262b] bg-[#121215]">
                  <div className="bg-[#0d0d10] border-b border-[#26262b] px-4 py-2 flex items-center justify-between text-xs text-zinc-300">
                    <span className="font-semibold flex items-center gap-2">
                      <ImageIcon size={14} className="text-zinc-300" />
                      1200×630 Social Card (Unified Light Theme • Open Graph / Twitter)
                    </span>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="px-2.5 py-1 bg-white hover:bg-zinc-200 text-black rounded text-[11px] font-semibold transition-colors"
                    >
                      Download PNG
                    </button>
                  </div>

                  <div className="p-4 flex justify-center bg-[#09090b]">
                    {renderedData.imageBase64 ? (
                      <img
                        src={`data:image/png;base64,${renderedData.imageBase64}`}
                        alt="Rendered Social Canvas Card"
                        className="w-full h-auto rounded-lg shadow-lg border border-[#26262b]"
                      />
                    ) : (
                      <iframe
                        srcDoc={renderedData.html}
                        className="w-full h-[550px] border-none"
                        title="Canvas HTML Preview"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. OUTLINE TAB */}
        {viewTab === 'outline' && (
          <div className="w-full max-w-4xl p-6 bg-[#121215] border border-[#26262b] rounded-lg shadow-xl font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#26262b]">
              <div className="flex items-center gap-2 text-zinc-200 font-semibold">
                <Layers size={15} />
                <span>Hyper Elements Layout Tree: outline()</span>
              </div>
              <span className="text-[11px] text-zinc-500">
                Laid-out blocks, widths, and styling tokens
              </span>
            </div>
            <pre className="whitespace-pre-wrap text-zinc-300 font-mono">
              {renderedData.outline || 'Generating outline...'}
            </pre>
          </div>
        )}

        {/* 3. CODE / RAW OUTPUT TAB */}
        {viewTab === 'code' && (
          <div className="w-full max-w-4xl p-6 bg-[#121215] border border-[#26262b] rounded-lg shadow-xl font-mono text-xs text-zinc-300 overflow-x-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#26262b]">
              <div className="flex items-center gap-2 text-zinc-200 font-semibold">
                <Code2 size={15} />
                <span>
                  Rendered Output ({format === 'canvas' ? 'HTML / PNG' : format === 'document' ? 'HTML / PDF' : 'HTML'})
                </span>
              </div>
              <span className="text-[11px] text-zinc-500">
                {(renderedData.html?.length || 0).toLocaleString()} bytes
              </span>
            </div>
            <pre className="whitespace-pre-wrap text-zinc-300 font-mono text-[11px] max-h-[600px] overflow-y-auto">
              {renderedData.html || 'No output available'}
            </pre>
          </div>
        )}

        {/* 4. DIAGNOSTICS TAB */}
        {viewTab === 'diagnostics' && (
          <div className="w-full max-w-4xl p-6 bg-[#121215] border border-[#26262b] rounded-lg shadow-xl text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#26262b]">
              <div className="flex items-center gap-2 text-zinc-200 font-semibold text-sm">
                <Sparkles size={16} />
                <span>Template Validation &amp; Compatibility Diagnostics</span>
              </div>
              <span className="text-[11px] text-zinc-400">
                Engine: @hyper-elements/react + @hyper-elements/email-clients
              </span>
            </div>

            {(!renderedData.diagnostics || renderedData.diagnostics.length === 0) ? (
              <div className="p-4 bg-[#18181c] border border-zinc-700/60 rounded-lg text-zinc-200 flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span>Clean bill of health! Zero errors or compatibility warnings detected in this template.</span>
              </div>
            ) : (
              <div className="space-y-3">
                {renderedData.diagnostics.map((diag, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-lg border text-xs space-y-1.5 ${
                      diag.severity === 'error'
                        ? 'bg-rose-950/30 border-rose-800/50 text-rose-200'
                        : diag.severity === 'warning'
                        ? 'bg-amber-950/30 border-amber-800/50 text-amber-200'
                        : 'bg-[#18181c] border-[#26262b] text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-black/40">
                        {diag.code}
                      </span>
                      <span className="uppercase text-[10px] font-bold tracking-wider opacity-75">
                        {diag.severity}
                      </span>
                    </div>
                    <p className="font-medium">{diag.message}</p>
                    {diag.path && (
                      <p className="font-mono text-[10px] opacity-60">Path: {diag.path}</p>
                    )}
                    {diag.fix && (
                      <p className="text-[11px] text-zinc-300 bg-zinc-900 p-1.5 rounded border border-zinc-700">
                        💡 Fix recommendation: {diag.fix}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
