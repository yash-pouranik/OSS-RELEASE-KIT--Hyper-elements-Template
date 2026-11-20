import React from 'react';
import fs from 'fs';
import path from 'path';
import { render, validate, outline } from '@hyper-elements/react';
import { renderPdf } from '@hyper-elements/react/pdf';
import { renderImage } from '@hyper-elements/react/image';
import { emailClients, renderInEmailClients } from '@hyper-elements/email-clients';

import ReleaseEmail from '../templates/email/ReleaseEmail';
import ReleasePage from '../templates/page/ReleasePage';
import ReleaseDocument from '../templates/document/ReleaseDocument';
import ReleaseCanvas from '../templates/canvas/ReleaseCanvas';
import { ReleaseData } from '../data/release';
import { defaultReleaseData } from '../data/defaultRelease';
import { BrandTheme, defaultBrandTheme } from '../theme/brand';

let loadedFonts: Array<{ family: string; src: Buffer; weight: number; style: 'normal' }> | null = null;

function getFonts() {
  if (loadedFonts) return loadedFonts;

  const fontsDir = path.join(process.cwd(), 'src', 'fonts');
  const fonts = [];

  // Poppins fonts
  const popReg = path.join(fontsDir, 'Poppins-Regular.ttf');
  const popSemi = path.join(fontsDir, 'Poppins-SemiBold.ttf');
  const popBold = path.join(fontsDir, 'Poppins-Bold.ttf');
  const popXBold = path.join(fontsDir, 'Poppins-ExtraBold.ttf');

  if (fs.existsSync(popReg)) {
    fonts.push({ family: 'Poppins', src: fs.readFileSync(popReg), weight: 400, style: 'normal' as const });
    fonts.push({ family: 'Poppins', src: fs.readFileSync(popReg), weight: 500, style: 'normal' as const });
  }
  if (fs.existsSync(popSemi)) {
    fonts.push({ family: 'Poppins', src: fs.readFileSync(popSemi), weight: 600, style: 'normal' as const });
  }
  if (fs.existsSync(popBold)) {
    fonts.push({ family: 'Poppins', src: fs.readFileSync(popBold), weight: 700, style: 'normal' as const });
  }
  if (fs.existsSync(popXBold)) {
    fonts.push({ family: 'Poppins', src: fs.readFileSync(popXBold), weight: 800, style: 'normal' as const });
    fonts.push({ family: 'Poppins', src: fs.readFileSync(popXBold), weight: 900, style: 'normal' as const });
  }

  // Inter fallback
  const regPath = path.join(fontsDir, 'Inter-Regular.ttf');
  const semiPath = path.join(fontsDir, 'Inter-SemiBold.ttf');
  const boldPath = path.join(fontsDir, 'Inter-Bold.ttf');
  const blackPath = path.join(fontsDir, 'Inter-Black.ttf');

  if (fs.existsSync(regPath)) {
    fonts.push({ family: 'Inter', src: fs.readFileSync(regPath), weight: 400, style: 'normal' as const });
  }
  if (fs.existsSync(semiPath)) {
    fonts.push({ family: 'Inter', src: fs.readFileSync(semiPath), weight: 600, style: 'normal' as const });
  }
  if (fs.existsSync(boldPath)) {
    fonts.push({ family: 'Inter', src: fs.readFileSync(boldPath), weight: 700, style: 'normal' as const });
  }
  if (fs.existsSync(blackPath)) {
    fonts.push({ family: 'Inter', src: fs.readFileSync(blackPath), weight: 900, style: 'normal' as const });
  }

  loadedFonts = fonts;
  return loadedFonts;
}

export async function renderEmailOutput(
  release: ReleaseData = defaultReleaseData,
  theme: BrandTheme = defaultBrandTheme
) {
  const element = React.createElement(ReleaseEmail, { release, theme });
  const val = validate(element);
  const out = outline(element);
  const { html, text, diagnostics } = await render(element);

  return {
    valid: val.valid,
    diagnostics: [...val.diagnostics, ...(diagnostics || [])],
    outline: out,
    html,
    text,
  };
}

export async function renderPageOutput(
  release: ReleaseData = defaultReleaseData,
  theme: BrandTheme = defaultBrandTheme
) {
  const element = React.createElement(ReleasePage, { release, theme });
  const val = validate(element);
  const out = outline(element);
  const { html, diagnostics } = await render(element);

  return {
    valid: val.valid,
    diagnostics: [...val.diagnostics, ...(diagnostics || [])],
    outline: out,
    html,
  };
}

export async function renderDocumentOutput(
  release: ReleaseData = defaultReleaseData,
  theme: BrandTheme = defaultBrandTheme
) {
  const element = React.createElement(ReleaseDocument, { release, theme });
  const val = validate(element);
  const out = outline(element);
  const { html } = await render(element);
  const { pdf, diagnostics } = await renderPdf(element);

  return {
    valid: val.valid,
    diagnostics: [...val.diagnostics, ...(diagnostics || [])],
    outline: out,
    html,
    pdf,
  };
}

export async function renderCanvasOutput(
  release: ReleaseData = defaultReleaseData,
  theme: BrandTheme = defaultBrandTheme
) {
  const element = React.createElement(ReleaseCanvas, { release, theme });
  const val = validate(element);
  const out = outline(element);
  const { html } = await render(element);

  const fonts = getFonts();
  const { image, width, height, diagnostics } = await renderImage(element, {
    fonts,
    format: 'png',
    scale: 2,
    strict: false,
  });

  return {
    valid: val.valid,
    diagnostics: [...val.diagnostics, ...(diagnostics || [])],
    outline: out,
    html,
    image,
    width,
    height,
  };
}

export async function validateEmailWithClients(
  release: ReleaseData = defaultReleaseData,
  theme: BrandTheme = defaultBrandTheme
) {
  const element = React.createElement(ReleaseEmail, { release, theme });
  const plugin = await emailClients();
  const result = validate(element, { plugins: [plugin] });
  return result;
}

export async function checkEmailCompatibility(html: string) {
  try {
    const previews = await renderInEmailClients(html, {
      dark: false,
    });
    return previews;
  } catch (err: any) {
    return { error: err.message };
  }
}
