import React from 'react';
import { validate, outline, formatDiagnostics } from '@hyper-elements/react';
import { emailClients } from '@hyper-elements/email-clients';
import ReleaseEmail from '../templates/email/ReleaseEmail';
import ReleasePage from '../templates/page/ReleasePage';
import ReleaseDocument from '../templates/document/ReleaseDocument';
import ReleaseCanvas from '../templates/canvas/ReleaseCanvas';
import { ReleaseData } from '../data/release';
import { defaultReleaseData } from '../data/defaultRelease';
import { BrandTheme, defaultBrandTheme } from '../theme/brand';

export interface ValidationSummary {
  template: 'email' | 'page' | 'document' | 'canvas';
  valid: boolean;
  diagnosticsCount: number;
  diagnostics: Array<{
    code: string;
    severity: string;
    message: string;
    path: string;
    fix?: string;
  }>;
  outlineText: string;
}

export async function validateAllTemplates(
  release: ReleaseData = defaultReleaseData,
  theme: BrandTheme = defaultBrandTheme
): Promise<Record<string, ValidationSummary>> {
  const emailEl = React.createElement(ReleaseEmail, { release, theme });
  const pageEl = React.createElement(ReleasePage, { release, theme });
  const docEl = React.createElement(ReleaseDocument, { release, theme });
  const canvasEl = React.createElement(ReleaseCanvas, { release, theme });

  let emailPlugin = null;
  try {
    emailPlugin = await emailClients();
  } catch (e) {
    // optional fallback
  }

  const emailRes = validate(emailEl, emailPlugin ? { plugins: [emailPlugin] } : undefined);
  const pageRes = validate(pageEl);
  const docRes = validate(docEl);
  const canvasRes = validate(canvasEl);

  return {
    email: {
      template: 'email',
      valid: emailRes.valid,
      diagnosticsCount: emailRes.diagnostics.length,
      diagnostics: emailRes.diagnostics as any,
      outlineText: outline(emailEl),
    },
    page: {
      template: 'page',
      valid: pageRes.valid,
      diagnosticsCount: pageRes.diagnostics.length,
      diagnostics: pageRes.diagnostics as any,
      outlineText: outline(pageEl),
    },
    document: {
      template: 'document',
      valid: docRes.valid,
      diagnosticsCount: docRes.diagnostics.length,
      diagnostics: docRes.diagnostics as any,
      outlineText: outline(docEl),
    },
    canvas: {
      template: 'canvas',
      valid: canvasRes.valid,
      diagnosticsCount: canvasRes.diagnostics.length,
      diagnostics: canvasRes.diagnostics as any,
      outlineText: outline(canvasEl),
    },
  };
}
